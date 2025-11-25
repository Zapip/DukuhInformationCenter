'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@/types/user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Database, 
  LogOut,
  Clock,
  Eye
} from 'lucide-react'

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTables: 0,
    lastLogin: '',
  })
  const router = useRouter()

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    try {
      // Middleware sudah protect route, jadi tinggal ambil user aja
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      
      if (currentUser) {
        setUser({
          email: currentUser.email!,
          id: currentUser.id,
          created_at: currentUser.created_at,
        })

        setStats({
          totalTables: 0,
          lastLogin: new Date().toLocaleString('id-ID'),
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const featureCards = [
    {
      title: 'User Management',
      description: 'Kelola pengguna, hak akses, dan data user',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950',
      href: '/admin/users'
    },
    {
      title: 'Database',
      description: 'Kelola tabel, data, dan struktur database',
      icon: Database,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-950',
      href: '/admin/database'
    },
  ]

  return (
    <section className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Dashboard Admin</h1>
                <p className="text-sm text-muted-foreground">Selamat datang, {user?.email}</p>
              </div>
            </div>
            <Button onClick={handleLogout} variant="destructive" className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <article className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pengunjung</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <h1 className="text-4xl md:text-6xl text-primary font-bold">1925±</h1>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Last Login</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-sm font-semibold">{stats.lastLogin}</div>
              <p className="text-xs text-muted-foreground mt-2">Waktu terakhir login</p>
            </CardContent>
          </Card>
        </article>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="secondary" className="w-full">
                    Buka {feature.title}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Admin Info */}
        <Card>
          <CardHeader>
            <CardTitle>Informasi Admin</CardTitle>
            <CardDescription>Detail akun administrator</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p className="text-base font-semibold">{user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">User ID</p>
                <p className="text-xs font-mono bg-muted px-2 py-1 rounded">{user?.id}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Account Created</p>
                <p className="text-base font-semibold">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : '-'}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <Badge className="bg-primary">Super Admin</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </section>
  )
}