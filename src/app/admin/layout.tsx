import NavbarAdmin from '@/components/NavbarAdmin'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <article className="min-h-screen">
      <NavbarAdmin />
      <main>
        {children}
      </main>
    </article>
  )
}