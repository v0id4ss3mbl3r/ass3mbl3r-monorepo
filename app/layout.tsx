import './globals.css'

export const metadata = {
  title: 'ass3mbl3r | Low-Level Digital Solutions',
  description: 'Construyendo el futuro bit a bit.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}