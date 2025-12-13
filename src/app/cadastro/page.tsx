// src/app/cadastro/page.tsx

'use client';

import React, { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Definição da interface para os planos
interface Plano {
    tipo: 'mensal' | 'anual';
    valor: number;
    detalhes: string;
}

export default function CadastroPage() {
    const router = useRouter();

    // --- 1. ESTADOS DO FORMULÁRIO ---
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [planoSelecionado, setPlanoSelecionado] = useState<'mensal' | 'anual' | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // --- 2. DADOS DOS PLANOS ---
    const planos: Plano[] = [
        { tipo: 'mensal', valor: 4.90, detalhes: 'Sem Fidelidade' },
        { tipo: 'anual', valor: 49.00, detalhes: 'Economize 2 meses' },
    ];

    // --- 3. FUNÇÃO DE CADASTRO ---
    const handleCadastro = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        // ⚠️ VALIDAÇÃO CRÍTICA: Verifica se o plano foi selecionado
        if (!planoSelecionado) {
            setError('Por favor, selecione um plano.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nomeCompleto,
                    email,
                    senha,
                    cpf,
                    dataNascimento,
                    telefone,
                    // ✅ AQUI GARANTIMOS QUE O CAMPO 'plano' ESTÁ SENDO ENVIADO
                    plano: planoSelecionado,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Cadastro concluído! Redirecionando para pagamento...');
                // Simulação de redirecionamento para pagamento
                setTimeout(() => {
                    // Substitua pelo seu link de pagamento real ou rota de checkout
                    router.push('/checkout-pagamento');
                }, 2000);
            } else {
                // Captura o erro 400 ou 409 (Email já cadastrado)
                setError(data.message || 'Falha no cadastro. Tente novamente.');
            }

        } catch (err) {
            console.error('Erro de conexão:', err);
            setError('Erro ao se conectar com o servidor.');
        } finally {
            setLoading(false);
        }
    };

    // --- 4. FUNÇÕES DE FORMATAÇÃO (Opcional, mas útil) ---
    const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove não-dígitos
        setCpf(value);
    };

    const handleTelefoneChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setTelefone(value);
    };

    // --- 5. ESTILOS (Ajustados para melhor visualização) ---
    const containerStyle: React.CSSProperties = {
        maxWidth: '600px', // '400px',
        margin: '50px auto',
        padding: '30px', // '20px',
        border: '1px solid #0070f3',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    };
    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px',
        margin: '5px 0 15px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box'
    };
    const labelStyle: React.CSSProperties = {
        fontWeight: 'bold',
        display: 'block',
        marginBottom: '5px'
    };
    const buttonStyle: React.CSSProperties = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '18px',
        opacity: loading ? 0.7 : 1,
        marginTop: '20px'
    };
    const planoCardStyle = (isSelected: boolean): React.CSSProperties => ({
        border: `3px solid ${isSelected ? '#0070f3' : '#ddd'}`,
        borderRadius: '8px',
        padding: '15px',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        flex: 1,
        backgroundColor: isSelected ? '#e6f0ff' : 'white',
    });


    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '30px' }}>
                Criar Conta
            </h1>

            {/* Mensagens de feedback */}
            {error && <div style={{ color: 'red', padding: '10px', border: '1px solid red', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}
            {successMessage && <div style={{ color: 'green', padding: '10px', border: '1px solid green', borderRadius: '4px', marginBottom: '15px' }}>{successMessage}</div>}

            <form onSubmit={handleCadastro}>
                {/* 6. SELEÇÃO DE PLANO */}
                <h3 style={{ marginBottom: '15px', color: '#333' }}>Selecione o Plano:</h3>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    {planos.map((plano) => (
                        <div
                            key={plano.tipo}
                            style={planoCardStyle(planoSelecionado === plano.tipo)}
                            onClick={() => setPlanoSelecionado(plano.tipo)}
                        >
                            <h4 style={{ color: plano.tipo === 'anual' ? '#28a745' : '#0070f3' }}>
                                {plano.tipo.toUpperCase()} 
                            </h4>
                            <p style={{ fontSize: '2em', fontWeight: 'bold', margin: '10px 0' }}>
                                R$ {plano.valor.toFixed(2).replace('.', ',')}
                            </p>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>{plano.detalhes}</p>
                        </div>
                    ))}
                </div>

                {/* 7. DADOS PESSOAIS */}
                <h3 style={{ marginBottom: '15px', color: '#333' }}>Dados Pessoais:</h3>

                <div>
                    <label style={labelStyle}>Nome Completo:</label>
                    <input type="text" value={nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)} required style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>CPF (apenas números):</label>
                        <input type="text" value={cpf} onChange={handleCpfChange} maxLength={11} required style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Telefone (apenas números):</label>
                        <input type="tel" value={telefone} onChange={handleTelefoneChange} maxLength={11} required style={inputStyle} />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Data de Nascimento:</label>
                        <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required style={inputStyle} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Senha:</label>
                        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required style={inputStyle} />
                    </div>
                </div>

                <button type="submit" disabled={loading || !planoSelecionado} style={buttonStyle}>
                    {loading ? 'Processando...' : 'Cadastrar e Ir para o Pagamento'}
                </button>
                <p style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.9em' }}>Ao se cadastrar, você concorda com nossos
                    <a href="/termos-de-uso" target="_blank" rel="noopener noreferrer" style={{ color: '#0070f3', textDecoration: 'none' }}> Termos de Uso </a>  
                    e nossa <a href="/politica-de-privacidade" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#0070f3', textDecoration: 'none' }}> Política de Privacidade </a>.
                </p>
                
            </form>

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Já tem conta? <Link href="/login" style={{ color: '#0070f3', textDecoration: 'none', fontWeight: 'bold' }}>Faça Login</Link>
            </p>
        </div>
    );
}