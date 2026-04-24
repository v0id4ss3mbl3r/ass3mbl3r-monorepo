"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Difficulty = 'fácil' | 'medio' | 'difícil' | 'imposible';

interface Question {
  id: number;
  category: string;
  difficulty: Difficulty;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function GamesCenter() {
  const [view, setView] = useState<'menu' | 'config' | 'playing' | 'loading'>('menu');
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Configuración de Trivia
  const [config, setConfig] = useState({ difficulty: 'medio' as Difficulty, count: 5 });
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const startTrivia = async () => {
    setView('loading');
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('difficulty', config.difficulty)
      .limit(config.count);

    if (error || !data) {
      console.error("Error:", error);
      setView('config');
      return;
    }

    const formatted = data.map((q: any) => ({
      ...q,
      q: q.question,
      correct: q.correct_index
    }));

    setCurrentQuestions(formatted.sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setScore(0);
    setView('playing');
  };

  // VISTA: MENÚ PRINCIPAL DE JUEGOS
  if (view === 'menu') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center">
        <h1 className="text-2xl mb-10 border-b border-green-900 w-full max-w-md pb-2 text-center tracking-widest">ASS3MBL3R_ARCADE</h1>
        <div className="grid gap-4 w-full max-w-md">
          <button
            onClick={() => { setActiveGame('trivia'); setView('config'); }}
            className="border border-green-900 p-6 hover:bg-green-900/20 text-left transition-all group"
          >
            <span className="block text-white font-bold group-hover:text-green-400 font-xl">[01] TRIVIA_CORE</span>
            <span className="text-[10px] text-zinc-500 uppercase italic">Sistema de preguntas y respuestas por dificultad.</span>
          </button>

          <div className="border border-zinc-900 p-6 opacity-40 cursor-not-allowed">
            <span className="block text-zinc-600 font-bold">[02] ??????</span>
            <span className="text-[10px] text-zinc-800 uppercase">PRÓXIMAMENTE_</span>
          </div>
        </div>
      </div>
    );
  }

  // VISTA: CONFIGURACIÓN
  if (view === 'config') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center">
        <button onClick={() => setView('menu')} className="mb-6 text-[10px] self-start text-zinc-500 hover:text-white">{"<"} VOLVER_AL_MENU</button>
        <div className="space-y-8 w-full max-w-md border border-green-900 p-6 bg-zinc-950">
          <h2 className="text-center text-white text-sm tracking-tighter uppercase">Configuración de Partida</h2>

          <div>
            <p className="mb-3 text-[10px] text-zinc-500 uppercase tracking-widest">Dificultad:</p>
            <div className="grid grid-cols-2 gap-2">
              {(['fácil', 'medio', 'difícil', 'imposible'] as Difficulty[]).map((d) => (
                <button
                  key={d}
                  onClick={() => setConfig({ ...config, difficulty: d })}
                  className={`border p-2 text-[10px] uppercase transition-all ${config.difficulty === d ? 'bg-green-600 text-black border-green-600' : 'border-zinc-800 text-zinc-500'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] text-zinc-500 uppercase tracking-widest">Cantidad de Preguntas:</p>
            <div className="grid grid-cols-3 gap-2">
              {[5, 10, 15].map((n) => (
                <button
                  key={n}
                  onClick={() => setConfig({ ...config, count: n })}
                  className={`border p-2 text-[10px] transition-all ${config.count === n ? 'bg-green-600 text-black border-green-600' : 'border-zinc-800 text-zinc-500'}`}
                >
                  {n} Q
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startTrivia}
            className="w-full bg-green-600 text-black font-bold py-3 hover:bg-green-400 transition-colors uppercase text-xs"
          >
            Inicializar_Sistema
          </button>
        </div>
      </div>
    );
  }

  if (view === 'loading') return <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center animate-pulse tracking-tighter underline">_ACCEDIENDO_AL_KERNEL_DATOS...</div>;

  const currentQ = currentQuestions[currentIndex];

  // VISTA: JUEGO ACTIVO
  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl border border-green-900 p-6 mt-10">
        <div className="flex justify-between text-[10px] text-zinc-500 mb-6 border-b border-zinc-900 pb-2 uppercase">
          <span>CAT: {currentQ?.category}</span>
          <span>SCORE: {score}</span>
          <span>{currentIndex + 1} / {currentQuestions.length}</span>
        </div>

        <h2 className="text-lg md:text-xl mb-8 leading-relaxed text-white">
          {currentQ?.q}
        </h2>

        <div className="grid gap-3 mb-8">
          {currentQ?.options.map((opt, i) => (
            <button
              key={i}
              disabled={selectedOption !== null}
              onClick={() => {
                setSelectedOption(i);
                if (i === currentQ.correct) setScore(score + 1);
              }}
              className={`text-left p-4 border text-sm transition-all ${selectedOption === null ? 'border-zinc-800 hover:border-green-500' :
                  i === currentQ.correct ? 'bg-green-900/20 border-green-500 text-white' :
                    selectedOption === i ? 'bg-red-900/20 border-red-500 text-red-400' : 'opacity-30 border-zinc-900'
                }`}
            >
              <span className="mr-3 text-zinc-600">[{String.fromCharCode(65 + i)}]</span> {opt}
            </button>
          ))}
        </div>

        {selectedOption !== null && (
          <div className="bg-zinc-950 border border-zinc-800 p-4 mb-8">
            <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-tighter">_EXPLICACIÓN_SISTEMA:</p>
            <p className="text-sm text-gray-300 italic">{currentQ.explanation}</p>
          </div>
        )}

        <button
          disabled={selectedOption === null}
          onClick={() => {
            if (currentIndex < currentQuestions.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setSelectedOption(null);
            } else {
              setView('menu');
            }
          }}
          className={`w-full py-3 font-bold uppercase text-xs ${selectedOption !== null ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-700'}`}
        >
          {currentIndex === currentQuestions.length - 1 ? 'Finalizar_Sesion' : 'Siguiente_Bloque'}
        </button>
      </div>
    </div>
  );
}