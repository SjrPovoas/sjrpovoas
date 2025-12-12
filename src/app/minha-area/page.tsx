// src/app/minha-area/page.tsx
import React from 'react';
import Link from 'next/link';

// Componente deve ser exportado como default
export default function MinhaAreaPage() {
    return (
        <div style={{ padding: '40px', textAlign: 'center' }}>
            <h1 style={{ color: 'green' }}>✅ ACESSO EXCLUSIVO CONCEDIDO!</h1>
            <p>Bem-vindo à área de assinantes. O cookie 'userToken' funcionou corretamente.</p>

            {/* Card: Gerador de Documento Online */}
            <div>
                <h2 style={{ color: '#333' }}>Gerar Documento Online</h2>
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

            <div style={{ marginTop: '30px' }}>
                {/* Adicione um link de Logout para teste */}
                <Link href="/logout" style={{
                    padding: '10px 20px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                }}>
                    Sair (Logout)
                </Link>
                <p style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
                    (Nota: A rota /api/auth/logout ainda precisa ser criada para limpar o cookie.)
                </p>
            </div>
        </div>
    );
}