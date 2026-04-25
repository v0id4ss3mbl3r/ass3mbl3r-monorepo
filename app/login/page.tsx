"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ESCUCHADOR DE SESIÓN: Si detecta que te logueaste, te saca del login
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/pv-games');
        router.refresh(); // Forzamos a Next.js a re-validar el Middleware
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Login tradicional
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Error: " + error.message);
    } else {
      router.push('/pv-games');
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Usamos el origin del navegador para que coincida con el www
        redirectTo: `${window.location.origin}/auth/callback`,
        // Esto fuerza a que el token no venga por el hash #
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
    if (error) console.error("Error Google Auth:", error.message);
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-6">
      <div className="w-full max-w-xs border border-green-900 p-8 bg-zinc-950 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
        <form onSubmit={handleLogin} className="space-y-6">
          <h1 className="text-center text-xl tracking-tighter font-bold uppercase text-white">System_Auth</h1>

          <div className="space-y-4">
            <input
              type="email"
              placeholder="USER_EMAIL"
              className="w-full bg-transparent border-b border-zinc-800 p-2 focus:border-green-500 outline-none text-xs text-white"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-transparent border-b border-zinc-800 p-2 focus:border-green-500 outline-none text-xs text-white"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-black py-2 font-bold text-xs hover:bg-green-400 transition-colors uppercase"
          >
            {loading ? "Verificando..." : "Enter_System"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-900"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-zinc-950 px-2 text-zinc-600">O usar identidad externa</span></div>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full border border-zinc-800 py-2 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all text-[10px] font-bold uppercase"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Google_ID
        </button>
      </div>
    </div>
  );
}