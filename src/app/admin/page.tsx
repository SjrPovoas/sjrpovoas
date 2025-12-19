// src/app/admin/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface AssinantePendente {
    _id: string;
    nomeCompleto: string;
    email: string;
    plano: 'mensal' | 'anual';
    valorPlano: number; // Campo para exibir o valor escolhido
    dataRegistro: string;
    statusPagamento: string; // Teoricamente 'pendente'
    cpf: string; 
    telefone: string; 
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
                credentials: 'include',
            });

            if (response.status === 403 || response.status === 401) {
                console.log('Acesso não autorizado. Redirecionando para login admin.');
                router.push('/login-admin');
                return;
            }

            const result = await response.json();

            if (response.ok) {
                // Mapeia os dados, garantindo que o valorPlano esteja presente 
                // (padrão assumido se o backend não retornar explicitamente).
                const mappedData = (result.data || []).map((p: any) => ({
                    ...p,
                    // Garante que o valor do plano seja exibido.
                    valorPlano: p.plano.includes('anual') ? 49.00 : 4.90, 
                })) as AssinantePendente[];
                setPendentes(mappedData);
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

    const socialMediaLinks = {
        instagram: 'https://www.instagram.com/silviopovoasjunior',
        facebook: 'https://www.facebook.com/sjrpovoas',
        twitter: 'https://www.twitter.com/sjrpovoas',
        linkedin: 'https://www.linkedin.com/in/sjrpovoas',
        discord: 'https://discord.com/invite/8QKN7R5dt5',
        linktree: 'https://linktr.ee/sjrpovoas',
    };

    interface SocialIconProps {
        href: string;
        label: string;
        iconClass: string;
    }

    const SocialIcon: React.FC<SocialIconProps> = ({ href, label, iconClass }) => (
        <Link href={href} target="_blank" style={{ color: '#aaa', fontSize: '1.5em', textDecoration: 'none', transition: 'color 0.3s' }} title={label}>
            <i className={`bi ${iconClass}`}></i>
        </Link>
    );

    // Função para ATIVAR um assinante
    const handleAtivarAssinante = async (assinante: AssinantePendente) => {
        if (!confirm(`Tem certeza que deseja ATIVAR e confirmar o pagamento de R$ ${assinante.valorPlano.toFixed(2).replace('.', ',')} para o usuário ${assinante.email}?`)) {
            return;
        }

        try {
            const response = await fetch('/api/admin/ativar-assinante', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: assinante.email, plano: assinante.plano }),
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Sucesso: ${result.message}`);
                fetchPendentes();
            } else {
                alert(`Falha na Ativação: ${result.message}`);
            }
        } catch (err) {
            alert('Erro de rede ao tentar ativar o assinante.');
        }
    };
    
    // Função para REJEITAR um assinante
    const handleRejeitarAssinante = async (assinante: AssinantePendente) => {
        if (!confirm(`Tem certeza que deseja REJEITAR o cadastro (e remover o usuário) para ${assinante.email}? Esta ação é irreversível.`)) {
            return;
        }

        try {
            const response = await fetch('/api/admin/rejeitar-assinante', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: assinante.email }), // Apenas email é suficiente para exclusão
                credentials: 'include',
            });

            const result = await response.json();

            if (response.ok) {
                alert(`Rejeição bem-sucedida: ${result.message}`);
                fetchPendentes(); // Recarrega a lista para remover o usuário rejeitado
            } else {
                alert(`Falha na Rejeição: ${result.message}`);
            }
        } catch (err) {
            alert('Erro de rede ao tentar rejeitar o assinante.');
        }
    };

    // --- Estilos para o Painel ---
    // Usando 'as const' para garantir tipos literais onde apropriado
    const headerStyle = { backgroundColor: '#0070f3', color: 'white', padding: '15px', textAlign: 'center' } as const;
    const containerStyle = { maxWidth: '1200px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' };
    
    // CORREÇÃO TypeScript: Usando React.CSSProperties para overflowX
    const tableContainerStyle: React.CSSProperties = { 
        overflowX: 'auto', 
        marginTop: '20px' 
    };
    
    // MinWidth para forçar scroll em telas pequenas (responsividade da tabela)
    const tableStyle = { width: '100%', minWidth: '700px', borderCollapse: 'collapse' as const, fontSize: '14px' };
    const thTdStyle = { border: '1px solid #ddd', padding: '10px', textAlign: 'left' as const, verticalAlign: 'middle' as const };
    const buttonAtivarStyle = { padding: '8px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap' as const };
    const buttonRejeitarStyle = { padding: '8px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', whiteSpace: 'nowrap' as const, marginLeft: '5px' };


    return (
        <div>
            <header style={headerStyle}>
                <div style={{ textAlign: 'center' }}>
                    <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                        <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                    </Link>
                </div>
                <h2>Painel de Administração SjrPovoaS</h2>
                <p>Gestão de Usuários e Ativações Pendentes</p>
            </header>
            <div style={containerStyle}>
                {/* Card: Gerador de Documento Online (Mantido) */}
                <div style={{ textAlign: 'center' }}>
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
                        <h3><i className="bi bi-clock-history"></i> Usuários Pendentes de Confirmação de Pagamento ({pendentes.length})</h3>

                        {pendentes.length === 0 ? (
                            <p style={{ marginTop: '15px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '4px' }}>
                                <i className="bi bi-exclamation-triangle"></i> 🎉 Não há <i className="bi bi-people"></i> usuários pendentes de ativação.
                            </p>
                        ) : (
                            <div style={tableContainerStyle}> {/* Container para scroll horizontal em telas pequenas */}
                                <table style={tableStyle}>
                                    <thead>
                                        <tr>
                                            <th style={thTdStyle}>Nome Completo</th>
                                            <th style={thTdStyle}>Email</th>
                                            <th style={thTdStyle}>CPF / Telefone</th>
                                            <th style={thTdStyle}>Plano (Valor)</th> 
                                            <th style={thTdStyle}>Registro</th>
                                            <th style={thTdStyle}>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pendentes.map((assinante) => (
                                            <tr key={assinante._id}>
                                                <td style={thTdStyle}>{assinante.nomeCompleto}</td>
                                                <td style={thTdStyle}>{assinante.email}</td>
                                                <td style={thTdStyle}>
                                                    {assinante.cpf}
                                                    <br />
                                                    {assinante.telefone}
                                                </td>
                                                <td style={thTdStyle}>
                                                    {assinante.plano.toUpperCase()}
                                                    <br />
                                                    <strong style={{ color: '#0070f3' }}>R$ {assinante.valorPlano.toFixed(2).replace('.', ',')}</strong>
                                                </td>
                                                <td style={thTdStyle}>{new Date(assinante.dataRegistro).toLocaleDateString()}</td>
                                                <td style={thTdStyle}>
                                                    <div style={{ display: 'flex', gap: '5px' }}>
                                                        <button
                                                            style={buttonAtivarStyle}
                                                            onClick={() => handleAtivarAssinante(assinante)}
                                                        >
                                                            <i className="bi bi-check-circle-fill"></i> Ativar
                                                        </button>
                                                        {/* Botão Rejeitar */}
                                                        <button
                                                            style={buttonRejeitarStyle}
                                                            onClick={() => handleRejeitarAssinante(assinante)}
                                                        >
                                                            <i className="bi bi-x-octagon-fill"></i> Rejeitar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}

                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                    {/* Botão de Logout */}
                    <button
                        onClick={() => router.push('/logout-admin')}
                        style={{ ...buttonAtivarStyle, backgroundColor: '#0070f3', marginRight: '10px' }}
                    >
                        <i className="bi bi-box-arrow-right"></i> Sair (Logout Admin)
                    </button>
                    {/* Botão de Recarregar */}
                    <button
                        onClick={fetchPendentes}
                        style={{ ...buttonAtivarStyle, backgroundColor: '#0070f3' }}
                        disabled={loading}
                    >
                        <i className={`bi bi-arrow-clockwise ${loading ? 'spinner-border spinner-border-sm' : ''}`}></i>
                        {' '}Recarregar Lista
                    </button>
                </div>
            </div>
            {/* --- RODAPÉ COM MÍDIAS SOCIAIS --- */}
            <footer
                style={{
                    maxWidth: '1200px', backgroundColor: 'white', margin: '80px auto 0', padding: '30px',
                    color: '#888', fontSize: '0.9em', textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '1em', color: '#888' }}>Siga-nos nas Redes Sociais:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <SocialIcon href={socialMediaLinks.instagram} label="Instagram" iconClass="bi-instagram" />
                        <SocialIcon href={socialMediaLinks.facebook} label="Facebook" iconClass="bi-facebook" />
                        <SocialIcon href={socialMediaLinks.twitter} label="Twitter / X" iconClass="bi-twitter-x" />
                        <SocialIcon href={socialMediaLinks.linkedin} label="Linkedin" iconClass="bi-linkedin" />
                        <SocialIcon href={socialMediaLinks.discord} label="Discord" iconClass="bi-discord" />
                        <SocialIcon href={socialMediaLinks.linktree} label="Linktr.ee" iconClass="bi-tree-fill" />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
                    <Link href="/termos-de-uso" target="_blank" style={{ color: '#888', textDecoration: 'none' }}>
                        Termos de Uso
                    </Link>
                    <Link href="/politica-de-privacidade" target="_blank" style={{ color: '#888', textDecoration: 'none' }}>
                        Política de Privacidade
                    </Link>
                </div>

                <p style={{ margin: '10px 0 0' }}>
                    &copy; {new Date().getFullYear()} SjrPovoaS. Todos os direitos reservados.
                </p>
                <p style={{ margin: '5px 0 0', fontSize: '0.8em', color: '#777' }}>
                    Plataforma de acesso exclusivo.
                </p>

            </footer>
            {/* --- FIM DO RODAPÉ --- */}
        </div>
    );
}