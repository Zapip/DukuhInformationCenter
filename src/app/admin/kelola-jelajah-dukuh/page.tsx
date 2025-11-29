'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Trash2, Image as ImageIcon, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'
import { JelajahDukuh, KATEGORI_USAHA } from '@/types/JelajahDukuh'

export default function KelolaJelajahDukuhPage() {
  const [data, setData] = useState<JelajahDukuh[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<JelajahDukuh | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    nama_usaha: '',
    deskripsi: '',
    kategori_usaha: '',
    kontak: '',
    lokasi: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const { data: result, error } = await supabase
        .from('jelajah_dukuh')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setData(result || [])
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      nama_usaha: '',
      deskripsi: '',
      kategori_usaha: '',
      kontak: '',
      lokasi: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setEditingItem(null)
    setError('')
  }

  const handleOpenDialog = (item?: JelajahDukuh) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        nama_usaha: item.nama_usaha,
        deskripsi: item.deskripsi,
        kategori_usaha: item.kategori_usaha,
        kontak: item.kontak || '',
        lokasi: item.lokasi || '',
      })
      setImagePreview(item.image_url)
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('jelajah-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('jelajah-images')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      let imageUrl = editingItem?.image_url || null

      // Upload image jika ada file baru
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const dataToSave = {
        ...formData,
        image_url: imageUrl,
      }

      if (editingItem) {
        // Update
        const { error } = await supabase
          .from('jelajah_dukuh')
          .update(dataToSave)
          .eq('id', editingItem.id)

        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase
          .from('jelajah_dukuh')
          .insert([dataToSave])

        if (error) throw error
      }

      await fetchData()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: any) {
      console.error('Error saving data:', error)
      setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return

    try {
      const { error } = await supabase
        .from('jelajah_dukuh')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchData()
    } catch (error: any) {
      console.error('Error deleting data:', error)
      alert('Gagal menghapus data: ' + error.message)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'UMKM': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Wisata': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Kuliner': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Kerajinan': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Jasa': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Lainnya': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    }
    return colors[category] || colors['Lainnya']
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Kelola Jelajah Dukuh</h1>
                <p className="text-sm text-muted-foreground">Kelola data UMKM, wisata, dan kuliner</p>
              </div>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Data
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingItem ? 'Edit Data' : 'Tambah Data Baru'}</DialogTitle>
                  <DialogDescription>
                    {editingItem ? 'Perbarui informasi data jelajah dukuh' : 'Tambahkan data baru untuk jelajah dukuh'}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="nama_usaha">Nama Usaha *</Label>
                    <Input
                      id="nama_usaha"
                      value={formData.nama_usaha}
                      onChange={(e) => setFormData({ ...formData, nama_usaha: e.target.value })}
                      required
                      placeholder="Contoh: Warung Makan Pak Budi"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kategori_usaha">Kategori Usaha *</Label>
                    <Select
                      value={formData.kategori_usaha}
                      onValueChange={(value) => setFormData({ ...formData, kategori_usaha: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {KATEGORI_USAHA.map((kategori) => (
                          <SelectItem key={kategori} value={kategori}>
                            {kategori}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deskripsi">Deskripsi *</Label>
                    <Textarea
                      id="deskripsi"
                      value={formData.deskripsi}
                      onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                      required
                      rows={4}
                      placeholder="Jelaskan tentang usaha ini..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kontak">Kontak</Label>
                    <Input
                      id="kontak"
                      value={formData.kontak}
                      onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                      placeholder="Contoh: 081234567890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lokasi">Lokasi Google Maps (URL)</Label>
                    <Input
                      id="lokasi"
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      placeholder="https://maps.google.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Gambar</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false)
                        resetForm()
                      }}
                      disabled={submitting}
                    >
                      Batal
                    </Button>
                    <Button type="submit" disabled={submitting}>
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      {editingItem ? 'Update' : 'Simpan'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Data Jelajah Dukuh</CardTitle>
            <CardDescription>
              Total: {data.length} data
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : data.length === 0 ? (
              <div className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada data. Klik "Tambah Data" untuk memulai.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Gambar</TableHead>
                      <TableHead>Nama Usaha</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Kontak</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.nama_usaha}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-muted rounded flex items-center justify-center">
                              <ImageIcon className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          <div>
                            <p>{item.nama_usaha}</p>
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {item.deskripsi}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getCategoryColor(item.kategori_usaha)}>
                            {item.kategori_usaha}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.kontak || '-'}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleOpenDialog(item)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}