// src/components/NewsletterForm.tsx

'use client';

import React, { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [mensagem, setMensagem] = useState('');
    // -------------------------------------------------------------------
    // ESTADOS (Gerenciamento do Formulário de Lead da Blindagem)
    // -------------------------------------------------------------------
    const [loadingLead, setLoadingLead] = useState(false);
    const [leadEnviado, setLeadEnviado] = useState(false);


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
            <i className="bi bi-shield-lock" style={{ color: '#0d6efd', fontSize: '2.5rem' }}></i>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '700', margin: '15px 0 8px 0', color: '#0d6efd' }}>Blindagem Digital</h2>
            <p style={{ color: '#aaa', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
                Receba gratuitamente no seu e-mail o guia <strong>3 Dicas de Ouro</strong> para proteger seu dispositivo contra invasões.
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
                {/* Botão com Cor de Ação Destacada / Vibrante para Maior Conversão */}
                <button
                    type="submit"
                    disabled={loadingLead}
                    style={{
                        padding: '14px', borderRadius: '6px', border: 'none',
                        backgroundColor: '#0d6efd', color: 'white', fontSize: '16px',
                        fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(13, 110, 253, 0.4)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0b5ed7'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                >
                    {loadingLead ? 'Processando envio...' : 'Receber Dicas Gratuitas'}
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