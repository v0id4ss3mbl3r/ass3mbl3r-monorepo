"use client";
import { useState } from 'react';
import Link from 'next/link';
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

export default function TriviaGame() {
    const [view, setView] = useState<'config' | 'playing' | 'loading'>('config');
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

    if (view === 'config') {
        return (
            <div className="min-h-screen bg-black text-green-500 font-mono p-8 flex flex-col items-center">
                <Link href="/pv-games" className="mb-6 text-[10px] self-start text-zinc-500 hover:text-white uppercase">{"<"} Volver_al_hub</Link>
                <div className="space-y-8 w-full max-w-md border border-green-900 p-6 bg-zinc-950">
                    <h2 className="text-center text-white text-sm uppercase">Config_Trivia</h2>
                    <div>
                        <p className="mb-3 text-[10px] text-zinc-500 uppercase">Dificultad:</p>
                        <div className="grid grid-cols-2 gap-2">
                            {(['fácil', 'medio', 'difícil', 'imposible'] as Difficulty[]).map((d) => (
                                <button key={d} onClick={() => setConfig({ ...config, difficulty: d })}
                                    className={`border p-2 text-[10px] uppercase ${config.difficulty === d ? 'bg-green-600 text-black' : 'border-zinc-800 text-zinc-500'}`}>{d}</button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="mb-3 text-[10px] text-zinc-500 uppercase">Cantidad:</p>
                        <div className="grid grid-cols-3 gap-2">
                            {[5, 10, 15].map((n) => (
                                <button key={n} onClick={() => setConfig({ ...config, count: n })}
                                    className={`border p-2 text-[10px] ${config.count === n ? 'bg-green-600 text-black' : 'border-zinc-800 text-zinc-500'}`}>{n} Q</button>
                            ))}
                        </div>
                    </div>
                    <button onClick={startTrivia} className="w-full bg-green-600 text-black font-bold py-3 text-xs uppercase">Iniciar</button>
                </div>
            </div>
        );
    }

    if (view === 'loading') return <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center animate-pulse">_ACCEDIENDO_AL_DB_...</div>;

    const currentQ = currentQuestions[currentIndex];

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-4 flex flex-col items-center">
            <div className="w-full max-w-2xl border border-green-900 p-6 mt-10">
                <div className="flex justify-between text-[10px] text-zinc-500 mb-6 border-b border-zinc-900 pb-2 uppercase">
                    <span>{currentQ?.category}</span>
                    <span>Score: {score}</span>
                    <span>{currentIndex + 1}/{currentQuestions.length}</span>
                </div>
                <h2 className="text-lg mb-8 text-white">{currentQ?.q}</h2>
                <div className="grid gap-3 mb-8">
                    {currentQ?.options.map((opt, i) => (
                        <button key={i} disabled={selectedOption !== null}
                            onClick={() => { setSelectedOption(i); if (i === currentQ.correct) setScore(score + 1); }}
                            className={`text-left p-4 border text-sm ${selectedOption === null ? 'border-zinc-800 hover:border-green-500' : i === currentQ.correct ? 'bg-green-900/20 border-green-500 text-white' : selectedOption === i ? 'bg-red-900/20 border-red-500' : 'opacity-30 border-zinc-900'}`}>
                            [{String.fromCharCode(65 + i)}] {opt}
                        </button>
                    ))}
                </div>
                {selectedOption !== null && (
                    <div className="bg-zinc-950 border border-zinc-800 p-4 mb-8 text-sm text-gray-300 italic">{currentQ.explanation}</div>
                )}
                <button disabled={selectedOption === null}
                    onClick={() => { if (currentIndex < currentQuestions.length - 1) { setCurrentIndex(currentIndex + 1); setSelectedOption(null); } else { setView('config'); } }}
                    className={`w-full py-3 font-bold text-xs uppercase ${selectedOption !== null ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-700'}`}>
                    {currentIndex === currentQuestions.length - 1 ? 'Finalizar' : 'Siguiente'}
                </button>
            </div>
        </div>
    );
}