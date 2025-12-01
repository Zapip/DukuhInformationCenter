'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Save, Upload, X, Image as ImageIcon } from 'lucide-react'
import { Profile, ProfileImage } from '@/types/profile'

export default function KelolaProfilPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [images, setImages] = useState<ProfileImage[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    deskripsi: '',
    nama_kontak: '',
    total_penduduk: 0,
    kontak: '',
    total_umkm: 0,
    total_fasilitas_umum: 0,
  })

  const [newImages, setNewImages] = useState<File[]>([])
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([])
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([])
  const [deletedImages, setDeletedImages] = useState<ProfileImage[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: profileData, error: profileError } = await supabase
        .from('profile')
        .select('*')
        .single()

      if (profileError) throw profileError

      setProfile(profileData)
      setFormData({
        name: profileData.name,
        deskripsi: profileData.deskripsi,
        nama_kontak: profileData.nama_kontak,
        total_penduduk: profileData.total_penduduk,
        total_umkm: profileData.total_umkm,
        kontak: profileData.kontak,
        total_fasilitas_umum: profileData.total_fasilitas_umum,
      })

      // Fetch images
      const { data: imagesData, error: imagesError } = await supabase
        .from('profile_images')
        .select('*')
        .eq('profile_id', profileData.id)
        .order('order_index', { ascending: true })

      if (imagesError) throw imagesError
      setImages(imagesData || [])
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan saat mengambil data.')
      }
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setNewImages([...newImages, ...files])

    // Create previews
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        setNewImagePreviews((prev) => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
    setNewImagePreviews(newImagePreviews.filter((_, i) => i !== index))
  }

  const removeExistingImage = (imageId: string) => {
    const imageToDelete = images.find((img) => img.id === imageId)
    if (imageToDelete) {
      setDeletedImages([...deletedImages, imageToDelete])
      setDeletedImageIds([...deletedImageIds, imageId])
    }
    setImages(images.filter((img) => img.id !== imageId))
  }

  const uploadImage = async (file: File, profileId: string, orderIndex: number): Promise<void> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `profile/${fileName}`

    // Upload ke storage
    const { error: uploadError } = await supabase.storage
      .from('profil-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('profil-images')
      .getPublicUrl(filePath)

    // Save to database
    const { error: dbError } = await supabase
      .from('profile_images')
      .insert([{
        profile_id: profileId,
        image_url: publicUrl,
        order_index: orderIndex,
      }])

    if (dbError) throw dbError
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess(false)

    try {
      if (!profile) throw new Error('Profile not found')

      // Update profile data
      const { error: updateError } = await supabase
        .from('profile')
        .update({
          name: formData.name,
          deskripsi: formData.deskripsi,
          total_penduduk: formData.total_penduduk,
          kontak: formData.kontak,
          nama_kontak: formData.nama_kontak,
          total_umkm: formData.total_umkm,
          total_fasilitas_umum: formData.total_fasilitas_umum,
        })
        .eq('id', profile.id)

      if (updateError) throw updateError

      if (deletedImageIds.length > 0) {
        const { error: deleteError } = await supabase
          .from('profile_images')
          .delete()
          .in('id', deletedImageIds)

        if (deleteError) throw deleteError
      }

      const remainingImagesCount = images.length

      for (let i = 0; i < newImages.length; i++) {
        const orderIndex = remainingImagesCount + i
        await uploadImage(newImages[i], profile.id, orderIndex)
      }

      // Reset state BEFORE fetching to prevent race condition
      setNewImages([])
      setNewImagePreviews([])
      setDeletedImageIds([])
      setDeletedImages([])

      // Refresh data after state is reset
      await fetchData()

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan saat menyimpan data.')
      }
      console.error('Error saving data:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const moveImage = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return

    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)

    // Update order_index for all images
    const updates = newImages.map((img, index) => ({
      id: img.id,
      order_index: index,
    }))

    try {
      for (const update of updates) {
        await supabase
          .from('profile_images')
          .update({ order_index: update.order_index })
          .eq('id', update.id)
      }

      setImages(newImages)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan saat memperbarui urutan gambar.')
      }
      console.error('Error updating image order:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground">Loading data...</p>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-900 border-green-200">
              <AlertDescription>Data berhasil disimpan!</AlertDescription>
            </Alert>
          )}

          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar</CardTitle>
              <CardDescription>Informasi umum tentang dukuh</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Dukuh *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Contoh: Dukuh Sleman"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi *</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  required
                  rows={6}
                  placeholder="Jelaskan tentang dukuh ini..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kontak">Nomor Kontak *</Label>
                <Input
                  id="kontak"
                  type="tel"
                  placeholder="Contoh: 081234567890 atau +62 812-3456-7890"
                  value={formData.kontak}
                  onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nama_kontak">Nama Pemilik Kontak *</Label>
                <Input
                  id="nama_kontak"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={formData.nama_kontak}
                  onChange={(e) => setFormData({ ...formData, nama_kontak: e.target.value })}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Data Statistik</CardTitle>
              <CardDescription>Data kuantitatif tentang dukuh</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="total_penduduk">Total Penduduk *</Label>
                  <Input
                    id="total_penduduk"
                    type="number"
                    min="0"
                    value={formData.total_penduduk}
                    onChange={(e) => setFormData({ ...formData, total_penduduk: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>



                <div className="space-y-2">
                  <Label htmlFor="total_umkm">Total UMKM *</Label>
                  <Input
                    id="total_umkm"
                    type="number"
                    min="0"
                    value={formData.total_umkm}
                    onChange={(e) => setFormData({ ...formData, total_umkm: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_fasilitas_umum">Total Fasilitas Umum *</Label>
                  <Input
                    id="total_fasilitas_umum"
                    type="number"
                    min="0"
                    value={formData.total_fasilitas_umum}
                    onChange={(e) => setFormData({ ...formData, total_fasilitas_umum: parseInt(e.target.value) || 0 })}
                    required
                  />
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Images Gallery */}
          <Card>
            <CardHeader>
              <CardTitle>Galeri Foto</CardTitle>
              <CardDescription>Kelola foto-foto profil dukuh (drag untuk mengatur urutan)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Existing Images */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((image, index) => (
                    <div key={image.id} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-border">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image.image_url}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        {/* Overlay with controls */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => moveImage(index, index - 1)}
                            disabled={index === 0}
                          >
                            ←
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="secondary"
                            onClick={() => moveImage(index, index + 1)}
                            disabled={index === images.length - 1}
                          >
                            →
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => removeExistingImage(image.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        Foto {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* New Images Preview */}
              {newImagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t">
                  {newImagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square relative rounded-lg overflow-hidden border-2 border-dashed border-primary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview}
                          alt={`New ${index + 1}`}
                          className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={() => removeNewImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        Foto Baru {index + 1}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Button */}
              <section className="flex justify-center pt-4">
                <Label htmlFor="images" className="w-full cursor-pointer">
                  <section className="w-full border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 hover:border-primary hover:bg-primary/5 transition-colors text-center">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm font-medium">Upload Foto</p>
                    <p className="text-xs text-muted-foreground mt-1">Klik untuk memilih foto</p>
                  </section>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageAdd}
                    className="hidden"
                  />
                </Label>
              </section>

              {images.length === 0 && newImagePreviews.length === 0 && (
                <section className="text-center py-8 text-muted-foreground">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Belum ada foto. Upload foto untuk memulai.</p>
                </section>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <section className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => fetchData()}
              disabled={submitting}
            >
              Reset
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Simpan Perubahan
            </Button>
          </section>
        </form>
      </main>
    </article>
  )
}