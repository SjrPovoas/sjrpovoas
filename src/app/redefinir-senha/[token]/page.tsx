// src/app/redefinir-senha/[token]/page.tsx

'use client';

import React, { useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// CORREÇÃO DE TIPAGEM: Define a interface para satisfazer o Next.js App Router.
type ResetParams = {
    token: string;
    [key: string]: string | string[] | undefined;
}

export default function RedefinirSenhaPage() {
    // 1. OBTENÇÃO DO TOKEN DA URL
    const params = useParams() as ResetParams;
    const token = params.token; // Captura o valor dinâmico da rota

    const router = useRouter();

    // 2. ESTADOS DO FORMULÁRIO
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // 3. FUNÇÃO DE SUBMISSÃO
    const handleRedefinirSenha = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        // Validação de correspondência
        if (novaSenha !== confirmaSenha) {
            setError('As senhas não coincidem.');
            setLoading(false);
            return;
        }

        // Validação de comprimento
        if (novaSenha.length < 6) {
            setError('A nova senha deve ter pelo menos 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            // Chamada à API de redefinição de senha (POST /api/auth/redefinir-senha)
            const response = await fetch('/api/auth/redefinir-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token, // Envia o token capturado da URL
                    novaSenha
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage(data.message || 'Sua senha foi redefinida com sucesso!');

                // Redireciona para o login após o sucesso
                setTimeout(() => {
                    router.push('/login');
                }, 3000);
            } else {
                // Erro do backend (ex: token inválido/expirado, 401 ou 400)
                setError(data.message || 'Falha ao redefinir a senha. O link pode ter expirado.');
            }

        } catch (err) {
            setError('Erro de conexão com o servidor. Verifique sua rede.');
        } finally {
            setLoading(false);
        }
    };

    // 4. ESTILOS INLINE (Para fins de demonstração)
    const containerStyle: React.CSSProperties = {
        maxWidth: '450px',
        margin: '100px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        margin: '5px 0 20px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };
    const buttonStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        opacity: loading ? 0.7 : 1,
    };
    const labelStyle: React.CSSProperties = { fontWeight: 'bold' };


    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '20px' }}>
                Nova Senha
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '25px', color: '#0070f3' }}>
                Defina sua nova senha de acesso.
            </p>

            {/* Mensagens de Feedback */}
            {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
            {successMessage && <p style={{ color: '#0070f3', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>{successMessage}</p>}

            <form onSubmit={handleRedefinirSenha}>
                <div>
                    <label style={labelStyle}>Nova Senha:</label>
                    <input
                        type="password"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Confirmar Senha:</label>
                    <input
                        type="password"
                        value={confirmaSenha}
                        onChange={(e) => setConfirmaSenha(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>

                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? 'Redefinindo...' : 'Redefinir Senha'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>Voltar para Login</Link>
            </p>
        </div>
    );
}