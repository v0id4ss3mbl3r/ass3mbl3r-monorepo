"use client";
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [logs, setLogs] = useState<string[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [heroTyped, setHeroTyped] = useState("");
  const [startTypewriter, setStartTypewriter] = useState(false);

  const fullLogs = [
    "> INITIALIZING BOOT_SEQUENCE...",
    "> LOADING KERNEL_MODULES...",
    "> CONNECTING TO ass3mbl3r.com.ar...",
    "> ACCESS GRANTED.",
    "> STARTING INTERFACE..."
  ];

  const heroText = "Construyendo el futuro bit a bit.";

  // Lógica del Loader (Logs)
  useEffect(() => {
    let currentLog = 0;
    const interval = setInterval(() => {
      if (currentLog < fullLogs.length) {
        setLogs(prev => [...prev, fullLogs[currentLog]]);
        currentLog++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowLoader(false);
          setStartTypewriter(true);
        }, 800);
      }
    }, 400);
    return () => clearInterval(interval);
  }, []);

  // Lógica del Typewriter (Efecto de escritura)
  useEffect(() => {
    if (startTypewriter && heroTyped.length < heroText.length) {
      const timeout = setTimeout(() => {
        setHeroTyped(heroText.slice(0, heroTyped.length + 1));
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [startTypewriter, heroTyped]);

  return (
    <div className="bg-black text-gray-300 min-h-screen selection:bg-green-500 selection:text-black font-mono">
      {/* LOADER / BOOT SEQUENCE */}
      {showLoader && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col justify-center items-center p-10">
          <div className="text-green-500 max-w-md w-full text-xs md:text-sm">
            {logs.map((log, i) => (
              <p key={i} className="mb-2 animate-pulse">{log}</p>
            ))}
          </div>
        </div>
      )}

      <nav className="p-6 border-b border-gray-800 flex justify-between items-center">
        <div className="text-green-500 font-bold text-xl hover:text-shadow-[2px_0_#00ff00,_-2px_0_#ff00ff] tracking-tighter cursor-default">
          [ass3mbl3r]
        </div>
        <div className="hidden md:flex space-x-6 text-sm">
          <a href="#about" className="hover:text-green-400 transition">.sobre_mí</a>
          <a href="#stack" className="hover:text-green-400 transition">.stack</a>
          <a href="#projects" className="hover:text-green-400 transition">.proyectos</a>
          <a href="#contact" className="hover:text-green-400 transition">.contacto</a>
        </div>
      </nav>

      <header className="h-[70vh] flex flex-col justify-center px-10 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-light mb-4 min-h-[1em]">
          {heroTyped}
        </h1>
        <p className="text-green-600 text-lg mb-8">
          {">"} Soluciones digitales de bajo nivel, alta eficiencia.
        </p>
        <div className="flex space-x-4">
          <a href="#projects" className="border border-green-500 text-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition">
            Ver Proyectos
          </a>
        </div>
      </header>

      {/* Secciones simplificadas para el ejemplo */}
      <section id="about" className="py-20 px-10 max-w-5xl mx-auto border-t border-gray-900 text-gray-400">
        <h2 className="text-2xl text-green-500 mb-6 tracking-widest">// MANIFIESTO_0x01</h2>
        <p>En un mundo saturado de software pesado, <span className="text-white">ass3mbl3r</span> vuelve a lo esencial.</p>
      </section>

      <footer className="p-10 text-center text-xs text-gray-600 border-t border-gray-900">
        <p>© 2026 ass3mbl3r. All rights reserved.</p>
        <p className="mt-2 text-green-900">// Efficiency is not an option, it's the core.</p>
      </footer>
    </div>
  );
}