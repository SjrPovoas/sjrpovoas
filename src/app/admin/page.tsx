'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface AssinantePendente {
    _id: string;
    nomeCompleto: string;
    email: string;
    plano: 'mensal' | 'anual';
    dataRegisto: string;
    statusPagamento: string;
    cpf: string; // Adicionando CPF para visualização administrativa
    telefone: string; // Adicionando Telefone
}

export default function AdminDashboardPage() {
    const [pendentes, setPendentes] = useState<AssinantePendente[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Função para carregar os usuários pendentes
    const fetchPendentes = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/admin/listar-pendentes', {
                method: 'GET',
                // Envia o cookie 'adminToken' para autenticação
                credentials: 'include',
            });

            if (response.status === 403 || response.status === 401) {
                // Acesso negado: Token ausente ou inválido. Redireciona para o login de Admin.
                console.log('Acesso não autorizado. Redirecionando para login admin.');
                router.push('/login-admin');
                return;
            }

            const result = await response.json();

            if (response.ok) {
                setPendentes(result.data || []);
            } else {
                setError(result.message || 'Erro ao carregar lista de pendentes.');
            }
        } catch (err) {
            console.error('Falha na comunicação com a API de listagem:', err);
            setError('Falha na conexão com o servidor de administração.');
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchPendentes();
    }, [fetchPendentes]);


    // Função para ATIVAR um assinante
    const handleAtivarAssinante = async (assinante: AssinantePendente) => {
        if (!confirm(`Tem certeza que deseja ATIVAR e confirmar o pagamento para o usuário ${assinante.email}?`)) {
            return;
        }

        try {
            const response = await fetch('/api/admin/ativar-assinante', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // Envia email e plano para que o backend defina a role correta ('assinante_mensal' ou 'assinante_anual')
                body: JSON.stringify({ email: assinante.email, plano: assinante.plano }),
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Sucesso: ${result.message}`);
                // Recarrega a lista para remover o usuário ativado
                fetchPendentes();
            } else {
                alert(`Falha na Ativação: ${result.message}`);
            }
        } catch (err) {
            alert('Erro de rede ao tentar ativar o assinante.');
        }
    };

    // --- Estilos para o Painel ---
    const headerStyle = { backgroundColor: '#0070f3', color: 'white', padding: '15px', textAlign: 'center' } as const;
    const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' };
    const tableStyle = { width: '100%', borderCollapse: 'collapse' as const, marginTop: '20px', fontSize: '14px' };
    const thTdStyle = { border: '1px solid #ddd', padding: '10px', textAlign: 'left' as const };
    const buttonStyle = { padding: '8px 12px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };

    return (
        <div>
            <header style={headerStyle}>
                <h2>Painel de Administração</h2>
                <p>Gestão de Usuários e Ativações Pendentes</p>
            </header>
            <div style={containerStyle}>
                {/* Card: Gerador de Documento Online (Mantido inalterado) */}
                <div style={{  textAlign: 'center' }}>
                    <h2 style={{ color: '#0070f3' }}>Gerar Documento Online</h2>
                    <p>Gere contrato, recibo e orçamento online.</p>
                    <a href="/dashboard/gerador-de-contrato-servico-orcamento.html" target='_blank' rel='noopener noreferrer' style={{
                        display: 'inline-block',
                        marginTop: '15px',
                        color: '#fff',
                        backgroundColor: '#0070f3',
                        padding: '8px 15px',
                        borderRadius: '4px',
                        textDecoration: 'none',
                    }}>
                        Gerar Documento Online
                    </a>
                </div>
            </div>
            <div style={containerStyle}>
                {loading && <p style={{ textAlign: 'center' }}>Carregando usuários pendentes...</p>}
                {error && <p style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</p>}

                {!loading && !error && (
                    <>
                        <h3>Usuários Pendentes de Confirmação de Pagamento ({pendentes.length})</h3>

                        {pendentes.length === 0 ? (
                            <p style={{ marginTop: '15px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                                🎉 Não há usuários pendentes de ativação.
                            </p>
                        ) : (
                            <table style={tableStyle}>
                                <thead>
                                    <tr>
                                        <th style={thTdStyle}>Nome Completo</th>
                                        <th style={thTdStyle}>Email</th>
                                        <th style={thTdStyle}>CPF / Telefone</th>
                                        <th style={thTdStyle}>Plano</th>
                                        <th style={thTdStyle}>Registro</th>
                                        <th style={thTdStyle}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendentes.map((assinante) => (
                                        <tr key={assinante._id}>
                                            <td style={thTdStyle}>{assinante.nomeCompleto}</td>
                                            <td style={thTdStyle}>{assinante.email}</td>
                                            <td style={thTdStyle}>{assinante.cpf} / {assinante.telefone}</td>
                                            <td style={thTdStyle}>{assinante.plano.toUpperCase()}</td>
                                            <td style={thTdStyle}>{new Date(assinante.dataRegisto).toLocaleDateString()}</td>
                                            <td style={thTdStyle}>
                                                <button
                                                    style={buttonStyle}
                                                    onClick={() => handleAtivarAssinante(assinante)}
                                                >
                                                    Confirmar e Ativar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}

                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                    {/* Botão de Logout que limpa o cookie 'adminToken' */}
                    <button
                        onClick={() => router.push('/logout-admin')}
                        style={{ ...buttonStyle, backgroundColor: '#0070f3', marginRight: '10px' }}
                    >
                        Sair (Logout Admin)
                    </button>
                    {/* Botão de Recarregar */}
                    <button
                        onClick={fetchPendentes}
                        style={{ ...buttonStyle, backgroundColor: '#0070f3' }}
                    >
                        Recarregar Lista
                    </button>
                </div>
            </div>
        </div>
    );
}