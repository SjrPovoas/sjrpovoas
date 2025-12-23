// src/components/NewsletterForm.tsx

'use client';

import React, { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/send-newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, nome }),
            });

            if (response.ok) {
                setStatus('success');
                setMensagem('✨ Dicas enviadas! Confira sua caixa de entrada.');
                setEmail('');
                setNome('');
            } else {
                throw new Error();
            }
        } catch (err) {
            setStatus('error');
            setMensagem('❌ Ops! Algo deu errado. Tente novamente mais tarde.');
        }
    };

    return (
        <section style={{
            maxWidth: '500px',
            margin: '60px auto 40px',
            padding: '30px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            textAlign: 'center'
        }}>
            <h3 style={{ color: '#0070f3', marginBottom: '20px' }}>
                <i className="bi bi-shield-lock-fill"></i> Blindagem Digital
            </h3>
            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '20px' }}>
                Receba gratuitamente o guia <strong>3 Dicas de Ouro</strong> para proteger seu celular.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input
                    type="text"
                    placeholder="Seu primeiro nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    style={inputStyle}
                />
                <input
                    type="email"
                    placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={inputStyle}
                />
                <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    style={{
                        ...buttonStyle,
                        backgroundColor: status === 'loading' ? '#ccc' : '#0070f3'
                    }}
                >
                    {status === 'loading' ? 'Enviando...' : 'Receber Dicas Gratuitas'}
                </button>
            </form>

            {mensagem && (
                <p style={{ 
                    marginTop: '20px', 
                    fontSize: '0.9rem', 
                    color: status === 'success' ? '#28a745' : '#dc3545',
                    fontWeight: '500'
                }}>
                    {mensagem}
                </p>
            )}
        </section>
    );
}

const inputStyle = {
    padding: '12px 15px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    outlineColor: '#0070f3'
};

const buttonStyle = {
    padding: '12px',
    borderRadius: '6px',
    border: 'none',
    color: 'white',
    fontSize: '1rem',
    fontWeight: 'bold' as const,
    cursor: 'pointer',
    transition: 'background 0.3s'
};