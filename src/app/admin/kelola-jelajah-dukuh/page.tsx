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
import { Plus, Pencil, Trash2, Image as ImageIcon, Loader2, Search } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Image from 'next/image'
import { JelajahDukuh, KATEGORI } from '@/types/JelajahDukuh'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'

export default function KelolaJelajahDukuhPage() {
  const [data, setData] = useState<JelajahDukuh[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<JelajahDukuh | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [searchQuery, setSearchQuery] = useState('')
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

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
        .from('umkm')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setData(result || [])
    } catch (error: unknown) {
      console.error('Error fetching data:', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Terjadi kesalahan saat mengambil data.')
      }
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

      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const dataToSave = {
        ...formData,
        image_url: imageUrl,
      }

      if (editingItem) {
        const { error } = await supabase
          .from('umkm')
          .update(dataToSave)
          .eq('id', editingItem.id)

        if (error) throw error
      } else {
        // Insert
        const { error } = await supabase
          .from('umkm')
          .insert([dataToSave])

        if (error) throw error
      }

      await fetchData()
      setIsDialogOpen(false)
      resetForm()
    } catch (error: unknown) {
      console.error('Error saving data:', error)
      if (error instanceof Error)
        setError(error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return

    try {
      const { error } = await supabase
        .from('umkm')
        .delete()
        .eq('id', id)

      if (error) throw error
      await fetchData()
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert('Gagal menghapus data: ' + error.message)
      } else {
        alert('Gagal menghapus data: Terjadi kesalahan tidak terduga.')
      }
      console.error('Error deleting data:', error)
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'UMKM': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Wisata': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Produsen': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'Kuliner': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Kerajinan': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'Jasa': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'Lainnya': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    }
    return colors[category] || colors['Lainnya']
  }

  // Filter data based on search query
  const filteredData = data.filter((item) => {
    const query = searchQuery.toLowerCase()
    return (
      item.nama_usaha.toLowerCase().includes(query) ||
      item.deskripsi.toLowerCase().includes(query) ||
      item.kategori_usaha.toLowerCase().includes(query)
    )
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = filteredData.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <article className="min-h-screen container mx-auto flex flex-col gap-6 items-end p-4">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className='w-fit' onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Data
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full max-h-[90vh] overflow-y-auto">
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

            <section className="space-y-2">
              <Label htmlFor="nama_usaha">Nama *</Label>
              <Input
                id="nama_usaha"
                value={formData.nama_usaha}
                onChange={(e) => setFormData({ ...formData, nama_usaha: e.target.value })}
                required
                placeholder="Nama usaha, tempat wisata, atau kegiatan"
              />
            </section>

            <section className="space-y-2">
              <Label htmlFor="kategori_usaha">Kategori *</Label>
              <Select
                value={formData.kategori_usaha}
                onValueChange={(value) => setFormData({ ...formData, kategori_usaha: value })}
                required
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {KATEGORI.map((kategori) => (
                    <SelectItem key={kategori} value={kategori}>
                      {kategori}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </section>
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
                    width={400}
                    height={192}
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

      {/* Main Content */}
      <main className="container mx-auto">
        <Card>
          <CardHeader>
            <article className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <section>
                <CardTitle>Data Jelajahi Dukuh</CardTitle>
                <CardDescription>
                  <Badge className="text-white mt-2">
                  Total: {data.length} data pada Halaman {currentPage} dari {totalPages || 1}
                  </Badge>
                </CardDescription>
              </section>
              <section className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Cari nama, deskripsi, kategori..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </section>
            </article>
          </CardHeader>
          <CardContent>
            {loading ? (
              <section className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </section>
            ) : data.length === 0 ? (
              <section className="text-center py-8">
                <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Belum ada data. Klik &quot;Tambah Data&quot; untuk memulai.</p>
              </section>
            ) : filteredData.length === 0 ? (
              <section className="text-center py-8">
                <p className="text-muted-foreground">Tidak ada hasil yang ditemukan untuk &quot;{searchQuery}&quot;</p>
              </section>
            ) : (
              <section className="overflow-x-auto">
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
                    {currentData.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {item.image_url ? (
                            <Image
                              width={64}
                              height={64}
                              src={item.image_url}
                              alt={item.nama_usaha}
                              className="w-16 h-16 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                              onClick={() => {
                                setPreviewImage(item.image_url)
                                setIsPreviewOpen(true)
                              }}
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
                            <p className="text-sm text-muted-foreground line-clamp-1 text-wrap">
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
              </section>
            )}

            {/* Pagination */}
            {!loading && data.length > 0 && (
              <div className="mt-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Preview Gambar</DialogTitle>
          </DialogHeader>
          {previewImage && (
            <div className="relative w-full h-screen max-h-[80vh]">
              <Image
                src={previewImage}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </article>
  )
}