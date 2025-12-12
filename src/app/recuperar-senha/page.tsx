// src/app/recuperar-senha/page.tsx

'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function RecuperarSenhaPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleRecuperarSenha = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch('/api/auth/recuperar-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                // Mensagem de sucesso genérica para segurança (não diz se o email existe ou não)
                setMessage('Se o seu email estiver cadastrado, você receberá um link de recuperação em breve.');
            } else {
                // Caso a API retorne um erro 400, 500, etc.
                setError(data.message || 'Falha ao processar a solicitação. Tente novamente.');
            }

        } catch (err) {
            setError('Erro de conexão com o servidor. Verifique sua rede.');
        } finally {
            setLoading(false);
        }
    };

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
        backgroundColor: '#0070f3', // Cor de destaque para recuperação
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        opacity: loading ? 0.7 : 1,
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '20px' }}>
                Recuperar Senha
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '25px', color: '#555' }}>
                Informe seu email para receber o link de redefinição de senha.
            </p>

            {error && <p style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}
            {message && <p style={{ color: 'green', marginBottom: '15px', textAlign: 'center', fontWeight: 'bold' }}>{message}</p>}

            <form onSubmit={handleRecuperarSenha}>
                <div>
                    <label style={{ fontWeight: 'bold' }}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                        placeholder="seu@email.com"
                    />
                </div>

                <button type="submit" disabled={loading} style={buttonStyle}>
                    {loading ? 'Enviando...' : 'Receber Link'}
                </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Lembrou? <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>Voltar para Login</Link>
            </p>
        </div>
    );
}