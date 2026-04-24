"use client";
import Link from 'next/link';

export default function PvGamesMenu() {
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center">
      <header className="w-full max-w-2xl border-b border-green-900 pb-4 mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tighter">ASS3MBL3R // PV_ARCADE</h1>
          <p className="text-[10px] text-zinc-500">ACCESO_RESTRINGIDO // MODO_PRIVADO</p>
        </div>
        <Link href="/" className="text-[10px] hover:text-white border border-zinc-800 px-2 py-1">.salir</Link>
      </header>

      <div className="grid gap-4 w-full max-w-md">
        <Link href="/pv-games/quiz">
          <div className="border border-green-900 p-6 hover:bg-green-900/20 text-left transition-all cursor-pointer group">
            <span className="block text-white font-bold group-hover:text-green-400 text-lg">[01] TRIVIA_CORE</span>
            <span className="text-[10px] text-zinc-500 uppercase italic">Sistema de evaluación de conocimientos.</span>
          </div>
        </Link>

        {/* Placeholder para futuro juego */}
        <div className="border border-zinc-900 p-6 opacity-40 cursor-not-allowed">
          <span className="block text-zinc-600 font-bold">[02] PRÓXIMAMENTE_</span>
          <span className="text-[10px] text-zinc-800 uppercase">Encriptando nuevos módulos...</span>
        </div>
      </div>
    </div>
  );
}
<footer className="p-10 text-center text-xs text-gray-900 border-t border-gray-900 relative">
  <p>© 2026 ass3mbl3r. All rights reserved.</p>
  {/* Área invisible en la esquina para acceder al login */}
  <Link href="/login" className="absolute bottom-0 right-0 w-4 h-4 cursor-default opacity-0">
    .admin
  </Link>
</footer>