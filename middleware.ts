import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  })

  // LOG 1: ¿Estamos entrando al middleware?
  console.log("MIDDLEWARE_CHECK:", request.nextUrl.pathname);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
            domain: '.ass3mbl3r.com.ar', // El punto adelante permite que funcione en www y sin www
            sameSite: 'lax',
            secure: true,
            path: '/',
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // LOG 2: ¿Hay sesión?
  console.log("SESSION_STATUS:", session ? "ACTIVE_USER" : "NO_SESSION");

  // Protección de la ruta privada
  if (request.nextUrl.pathname.startsWith('/pv-games') && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return response
}

export const config = {
  matcher: ['/pv-games/:path*'],
}