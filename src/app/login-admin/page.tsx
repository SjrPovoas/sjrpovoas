// src/app/login-admin/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginAdminPage() {
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
            // 🚀 Chamada para a Rota de API do Admin
            const response = await fetch('/api/auth/login-admin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (response.ok) {
                // Login bem-sucedido: o cookie 'adminToken' foi setado pelo servidor.
                alert('Login de Admin bem-sucedido! Redirecionando...');
                
                // 🚀 Redireciona para o Painel de Administração
                router.push('/admin'); 
                router.refresh(); 
                
            } else {
                setError(data.message || 'Erro ao fazer login.');
            }

        } catch (err) {
            console.error('Erro de rede ou cliente no login:', err);
            setError('Não foi possível conectar ao servidor. Verifique a conexão.');
        } finally {
            setLoading(false);
        }
    };

    // --- Estilos básicos ---
    const inputStyle = { width: '100%', padding: '10px', margin: '5px 0 15px 0', border: '1px solid #ccc', borderRadius: '4px' };
    const boxStyle = { padding: '20px', maxWidth: '400px', margin: '50px auto', border: '1px solid #0070f3', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
    const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' };


    return (
        <div style={boxStyle}>
            <div style={{ textAlign: 'center' }}><img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}></img></div>
            <h1 style={{ textAlign: 'center', color: '#0070f3' }}>Acesso Administrativo</h1>
            
            <form onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email Admin:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                        style={inputStyle}
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
                        style={inputStyle}
                    />
                </div>
                
                {error && (
                    <p style={{ color: 'red', marginBottom: '15px', padding: '10px', border: '1px solid red', backgroundColor: '#fee' }}>
                        {error}
                    </p>
                )}
                
                <button 
                    type="submit" 
                    disabled={loading}
                    style={buttonStyle}
                >
                    {loading ? 'A processar...' : 'Login Admin'}
                </button>
            </form>
        </div>
    );
}