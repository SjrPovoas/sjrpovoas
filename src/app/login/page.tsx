// src/app/login/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserLoginPage() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/auth/assinante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),

                // 🚀 CRÍTICO: Permite que o navegador aceite e envie o cookie
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok && data.success) {
                console.log("Login de assinante bem-sucedido.");

                // Limpa o cache de navegação do Next.js para forçar a verificação do cookie
                router.refresh();

                // Redireciona para a área protegida do assinante
                router.push('/minha-area');

            } else {
                // Tratar falha de credenciais (401) ou outros erros
                setError(data.message || 'Credenciais inválidas. Tente novamente.');
            }

        } catch (err) {
            console.error('Erro de rede ou cliente no login:', err);
            setError('Não foi possível conectar ao servidor. Verifique a conexão.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #0070f3', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ textAlign: 'center', color: '#0070f3' }}>Área Exclusiva</h1>
            <p style={{ textAlign: 'center', marginBottom: '20px' }}>Acesse seu conteúdo como assinante.</p>

            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        style={{ width: '100%', padding: '10px', margin: '5px 0 15px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                <div>
                    <label htmlFor="senha" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                        disabled={loading}
                        style={{ width: '100%', padding: '10px', margin: '5px 0 20px 0', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                </div>

                {error && (
                    <p style={{ color: 'red', marginBottom: '15px', padding: '10px', border: '1px solid red', backgroundColor: '#fee' }}>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}
                >
                    {loading ? 'Entrando...' : 'Acessar Conteúdo'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                <Link href="/cadastro" style={{ color: '#0070f3', textDecoration: 'none' }}>
                    Ainda não é assinante? Cadastre-se
                </Link>
            </div>
        </div>
    );
}