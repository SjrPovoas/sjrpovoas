// src/app/api/cadastro/page.tsx

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserRegisterPage() {
    // Estados para todos os campos
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [plano, setPlano] = useState('mensal');

    // Novo estado para controlar a visualização de pagamento após o envio
    const [isRegistered, setIsRegistered] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        if (senha.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nomeCompleto,
                    email,
                    senha,
                    cpf,
                    dataNascimento,
                    telefone,
                    plano
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 🚀 CAPTURA A MENSAGEM DO SERVIDOR (com PIX e aviso)
                setSuccessMessage(data.message);
                setIsRegistered(true); // Exibe a tela de pagamento

            } else {
                setError(data.message || 'Erro ao processar o registro.');
            }

        } catch (err) {
            console.error('Erro de rede ou cliente no registro:', err);
            setError('Não foi possível conectar ao servidor. Verifique a conexão.');
        } finally {
            setLoading(false);
        }
    };

    // --- Estilos básicos ---
    const inputStyle = { width: '100%', padding: '10px', margin: '5px 0 15px 0', border: '1px solid #ccc', borderRadius: '4px' };
    const selectStyle = { ...inputStyle, appearance: 'none' as const };
    const boxStyle = { padding: '20px', maxWidth: '450px', margin: '50px auto', border: '1px solid #0070f3', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
    const buttonStyle = { width: '100%', padding: '12px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' };
    const pixBoxStyle = { backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px dashed #0070f3', marginTop: '20px' };


    if (isRegistered && successMessage) {
        // 🚀 TELA DE PAGAMENTO/AVISO
        return (
            <div style={boxStyle}>
                <h1 style={{ textAlign: 'center', color: 'green' }}>Registro Quase Concluído!</h1>
                <div style={pixBoxStyle}>
                    {/* Renderiza a mensagem do servidor, substituindo quebras de linha por <br> */}
                    {successMessage.split('\n').map((line, index) => {
                        const isPixKey = line.includes('PIX (Celular)');
                        const isAlert = line.includes('ALERTA');

                        // Formatação customizada para a chave PIX e o Alerta
                        if (isPixKey) {
                            return <p key={index} style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#0070f3', marginTop: '15px' }}>{line.trim()}</p>;
                        }
                        if (isAlert) {
                            return <p key={index} style={{ color: '#dc3545', fontWeight: 'bold', marginTop: '10px' }}>{line.trim()}</p>;
                        }

                        return <p key={index} style={{ margin: '5px 0' }}>{line.trim()}</p>;
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <p style={{ marginBottom: '10px' }}>Obrigado por se juntar à nossa comunidade!</p>
                    <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>
                        Ir para a página de Login (Aguardando Ativação)
                    </Link>
                </div>
            </div>
        );
    }


    // 🚀 TELA DE FORMULÁRIO (Inicial)
    return (
        <div style={boxStyle}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ textAlign: 'center', color: '#0070f3' }}>Registro de Assinante</h1>

            <form onSubmit={handleRegisterSubmit}>
                {/* Campos do Formulário */}
                <div><label htmlFor="nomeCompleto" style={{ display: 'block', marginBottom: '5px' }}>Nome Completo:</label><input type="text" id="nomeCompleto" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required disabled={loading} style={inputStyle} /></div>
                <div><label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label><input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} style={inputStyle} /></div>
                <div><label htmlFor="senha" style={{ display: 'block', marginBottom: '5px' }}>Senha:</label><input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} required disabled={loading} style={inputStyle} minLength={6} /></div>
                <div><label htmlFor="cpf" style={{ display: 'block', marginBottom: '5px' }}>CPF:</label><input type="text" id="cpf" value={cpf} onChange={(e) => setCpf(e.target.value)} required disabled={loading} style={inputStyle} placeholder="Ex: 000.000.000-00" /></div>
                <div><label htmlFor="dataNascimento" style={{ display: 'block', marginBottom: '5px' }}>Data de Nascimento:</label><input type="date" id="dataNascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required disabled={loading} style={inputStyle} /></div>
                <div><label htmlFor="telefone" style={{ display: 'block', marginBottom: '5px' }}>Telefone (com DDD):</label><input type="text" id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} required disabled={loading} style={inputStyle} placeholder="Ex: (99) 99999-9999" /></div>

                <div>
                    <label htmlFor="plano" style={{ display: 'block', marginBottom: '5px' }}>Plano:</label>
                    <select id="plano" value={plano} onChange={(e) => setPlano(e.target.value)} required disabled={loading} style={selectStyle}>
                        <option value="mensal">Mensal</option>
                        <option value="anual">Anual</option>
                    </select>
                </div>

                {error && (
                    <p style={{ color: 'red', marginBottom: '15px', padding: '10px', border: '1px solid red', backgroundColor: '#fee' }}>{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    style={{ ...buttonStyle, marginTop: '20px' }}
                >
                    {loading ? 'A processar...' : 'Registrar e Pagar'}
                </button>
            </form>

            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
                <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none' }}>
                    Já sou assinante. Fazer Login
                </Link>
            </div>
        </div>
    );
}