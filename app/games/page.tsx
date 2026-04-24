"use client";
import { useState } from 'react';

// Tipado para mayor control
type Difficulty = 'fácil' | 'medio' | 'difícil' | 'imposible';

interface Question {
  id: number;
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: Difficulty;
  category: string;
}

// Base de datos de ejemplo (Podés expandir esto)
const DB_QUESTIONS: Question[] = [
  {
    id: 1,
    category: "Hardware",
    difficulty: "medio",
    q: "¿Qué significan las siglas RISC en arquitectura de procesadores?",
    options: ["Reduced Instruction Set Computer", "Rapid Input System Core", "Random Instruction Set Code", "Reallocated Internal Storage Chip"],
    correct: 0,
    explanation: "RISC es un tipo de diseño de CPU que utiliza un conjunto de instrucciones pequeño y altamente optimizado.",
  },
  {
    id: 2,
    category: "Cultura General",
    difficulty: "fácil",
    q: "¿Cuál es el lenguaje de programación más antiguo aún en uso?",
    options: ["C", "Fortran", "COBOL", "Lisp"],
    correct: 1,
    explanation: "Fortran fue creado en 1957 y sigue siendo fundamental en computación científica.",
  },
  {
    id: 3,
    category: "Sistemas",
    difficulty: "imposible",
    q: "En el kernel de Linux, ¿cuál es el PID del proceso 'init'?",
    options: ["0", "1", "1024", "404"],
    correct: 1,
    explanation: "El PID 1 es siempre para el proceso init, el primer proceso que inicia el kernel.",
  }
];

export default function TriviaGame() {
  // Estados de configuración
  const [gameState, setGameState] = useState<'config' | 'playing' | 'results'>('config');
  const [config, setConfig] = useState({ difficulty: 'medio' as Difficulty, count: 5 });
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  // Iniciar partida filtrando por dificultad
  const startLocalGame = () => {
    const filtered = DB_QUESTIONS
      .filter(q => q.difficulty === config.difficulty)
      .sort(() => Math.random() - 0.5)
      .slice(0, config.count);
    
    setCurrentQuestions(filtered);
    setCurrentIndex(0);
    setScore(0);
    setGameState('playing');
  };

  if (gameState === 'config') {
    return (
      <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center">
        <h1 className="text-2xl mb-10 border-b border-green-900 w-full max-w-md pb-2 text-center">GAME_CONFIG_v2.0</h1>
        <div className="space-y-6 w-full max-w-md border border-green-900 p-6 bg-zinc-950">
          <div>
            <p className="mb-2 text-xs text-zinc-500">_DIFICULTAD:</p>
            <div className="grid grid-cols-2 gap-2">
              {['fácil', 'medio', 'difícil', 'imposible'].map((d) => (
                <button 
                  key={d}
                  onClick={() => setConfig({...config, difficulty: d as Difficulty})}
                  className={`border p-2 text-xs uppercase ${config.difficulty === d ? 'bg-green-600 text-black border-green-600' : 'border-zinc-800 text-zinc-500'}`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={startLocalGame}
            className="w-full bg-green-600 text-black font-bold py-3 hover:bg-green-400 transition-colors"
          >
            INICIALIZAR_PARTIDA
          </button>
        </div>
      </div>
    );
  }

  const currentQ = currentQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center">
      <div className="w-full max-w-2xl border border-green-900 p-6 mt-10">
        <div className="flex justify-between text-[10px] text-zinc-500 mb-6 border-b border-zinc-900 pb-2 uppercase">
          <span>CAT: {currentQ?.category}</span>
          <span>DIF: {currentQ?.difficulty}</span>
          <span>SCORE: {score}</span>
        </div>

        <h2 className="text-lg md:text-xl mb-8 leading-relaxed text-white">
          {currentIndex + 1}. {currentQ?.q}
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
              className={`text-left p-4 border text-sm transition-all ${
                selectedOption === null ? 'border-zinc-800 hover:border-green-500 hover:bg-zinc-900' :
                i === currentQ.correct ? 'border-green-500 bg-green-900/20 text-white' :
                selectedOption === i ? 'border-red-500 bg-red-900/20 text-red-400' : 'border-zinc-900 opacity-50'
              }`}
            >
              <span className="mr-3 text-zinc-600">[{String.fromCharCode(65 + i)}]</span> {opt}
            </button>
          ))}
        </div>

        {selectedOption !== null && (
          <div className="bg-zinc-950 border border-zinc-800 p-4 mb-8 animate-in slide-in-from-bottom-2">
            <p className="text-xs text-zinc-400 mb-2 font-bold uppercase tracking-widest">_Explicación:</p>
            <p className="text-sm text-gray-300 leading-relaxed italic">{currentQ.explanation}</p>
          </div>
        )}

        <button 
          disabled={selectedOption === null}
          onClick={() => {
            if (currentIndex < currentQuestions.length - 1) {
              setCurrentIndex(currentIndex + 1);
              setSelectedOption(null);
            } else {
              setGameState('config');
            }
          }}
          className={`w-full py-3 font-bold uppercase text-xs tracking-widest ${selectedOption !== null ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-700 cursor-not-allowed'}`}
        >
          {currentIndex === currentQuestions.length - 1 ? 'Finalizar' : 'Siguiente Pregunta'}
        </button>
      </div>
    </div>
  );
}