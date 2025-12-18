'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Info } from 'lucide-react'
import Image from 'next/image'

export default function AuthPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            // Login dengan Supabase
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            // Cek apakah email adalah admin
            if (data.user?.email !== 'admindukuh@gmail.com') {
                await supabase.auth.signOut()
                throw new Error('Akses ditolak! Hanya admin yang bisa login.')
            }

            // Redirect ke halaman admin
            router.push('/admin')
            // router.refresh()
        } catch (error: unknown) {
            setError((error as Error).message || 'Login gagal!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold flex flex-col items-center justify-center gap-2">
                        <Image src="/logo.webp" alt="Logo Pedukuhan Dukuh" width={94} height={94}
                        //  style={{ width: 'auto', height: 'auto' }} 
                         />
                        <h1>Halaman Masuk Admin</h1>
                    </CardTitle>
                    <CardDescription>Masukkan kredensial admin Anda</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Masukkan email anda"
                                disabled={loading}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Masukkan password anda"
                                disabled={loading}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full"
                        >
                            {loading ? 'Loading...' : 'Masuk'}
                        </Button>
                    </form>

                    {/* Info Box */}

                    <Alert className='mt-6 p-4 bg-yellow-50 border border-secondary rounded-lg'>
                        <Info />
                        <AlertTitle>Informasi</AlertTitle>
                        <AlertDescription>
                            Hanya admin yang dapat mengakses dashboard.
                        </AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        </div>
    )
}