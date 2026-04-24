"use client";
import { useState } from 'react';

// Ejemplo de preguntas (Podés mover esto a Supabase después)
const TRIVIA_DATA = [
  {
    category: "Cultura General",
    questions: [
      { q: "¿Cuál es el país más grande del mundo?", a: "Rusia" },
      { q: "¿Quién pintó la última cena?", a: "Leonardo da Vinci" }
    ]
  },
  {
    category: "Series y Cine",
    questions: [
      { q: "¿Cómo se llama el protagonista de Breaking Bad?", a: "Walter White" },
      { q: "¿En qué año se estrenó Titanic?", a: "1997" }
    ]
  }
];

export default function TriviaPage() {
  const [selectedCat, setSelectedCat] = useState<typeof TRIVIA_DATA[0] | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono p-6 flex flex-col items-center">
      <header className="w-full max-w-2xl border-b border-green-900 pb-4 mb-10">
        <h1 className="text-xl font-bold tracking-tighter">ASS3MBL3R // GAME_CENTER</h1>
      </header>

      {!selectedCat ? (
        <div className="grid gap-4 w-full max-w-md">
          <p className="text-zinc-500 mb-2">{">"} SELECCIONAR_CATEGORIA:</p>
          {TRIVIA_DATA.map((c) => (
            <button 
              key={c.category}
              onClick={() => setSelectedCat(c)}
              className="border border-green-900 p-4 hover:bg-green-900/20 text-left transition-all"
            >
              [ {c.category} ]
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-xl border border-green-900 p-8">
          <div className="flex justify-between text-xs mb-6 text-zinc-500">
            <span>MODO: LOCAL_COOP</span>
            <span>PREGUNTA: {qIndex + 1}/{selectedCat.questions.length}</span>
          </div>

          <h2 className="text-2xl mb-10 leading-tight">
            {selectedCat.questions[qIndex].q}
          </h2>

          {revealed && (
            <div className="bg-zinc-900 p-4 border-l-2 border-green-500 mb-8 animate-in fade-in duration-500">
              <span className="text-zinc-500 block text-xs mb-1">RESPUESTA_CORRECTA:</span>
              <span className="text-white">{selectedCat.questions[qIndex].a}</span>
            </div>
          )}

          <div className="flex gap-4">
            <button 
              onClick={() => setRevealed(!revealed)}
              className="bg-green-600 text-black px-4 py-2 hover:bg-green-400 font-bold"
            >
              {revealed ? "OCULTAR" : "REVELAR"}
            </button>
            <button 
              onClick={() => {
                if (qIndex < selectedCat.questions.length - 1) {
                  setQIndex(qIndex + 1);
                  setRevealed(false);
                } else {
                  setSelectedCat(null);
                  setQIndex(0);
                }
              }}
              className="border border-green-600 px-4 py-2 hover:bg-green-900"
            >
              SIGUIENTE {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}