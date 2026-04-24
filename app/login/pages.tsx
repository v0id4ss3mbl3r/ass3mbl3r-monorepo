"use client";
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

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

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono flex items-center justify-center p-6">
            <form onSubmit={handleLogin} className="w-full max-w-xs border border-green-900 p-8 space-y-6">
                <h1 className="text-center text-xl tracking-tighter">RESTRICTED_ACCESS</h1>
                <input
                    type="email" placeholder="USER_EMAIL"
                    className="w-full bg-transparent border-b border-zinc-800 p-2 focus:border-green-500 outline-none text-sm"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password" placeholder="PASSWORD"
                    className="w-full bg-transparent border-b border-zinc-800 p-2 focus:border-green-500 outline-none text-sm"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full bg-green-600 text-black py-2 font-bold text-xs hover:bg-green-400 transition-colors">
                    {loading ? "VERIFYING..." : "ENTER_SYSTEM"}
                </button>
            </form>
        </div>
    );
}