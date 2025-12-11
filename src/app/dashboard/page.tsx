// src/app/admin/dashboard/page.tsx

'use client';

import React, { CSSProperties } from 'react';
import LogoutButton from '@/components/auth/LogoutButton'; // Caminho CORRIGIDO
import Link from 'next/link';

// Estilo Base para o Container de Conteúdo
const mainContainerStyle: CSSProperties = {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '20px',
};

// Estilo Base para o Card
const cardBaseStyle: CSSProperties = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    flex: 1,
    minWidth: '250px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
};

// Estilo para o Container dos Cards (garante responsividade)
const cardsWrapperStyle: CSSProperties = {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '30px',
};


export default function AdminDashboardPage() {

    return (
        <>
            {/* 1. HEADER E LOGOUT BUTTON */}
            <header style={{
                ...mainContainerStyle,
                paddingBottom: 0,
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: '20px',
            }}>
                {/* O BOTÃO DE LOGOUT ESTÁ AQUI */}
                <LogoutButton />
            </header>

            {/* 2. ÁREA PRINCIPAL DO DASHBOARD */}
            <div style={{ ...mainContainerStyle, padding: '30px 20px', textAlign: 'center' }}>

                {/* Título e Boas-vindas */}
                <h1 style={{ color: '#333' }}>🔑 Dashboard de Administração</h1>
                <p style={{ fontSize: '1.1em', color: '#555', marginBottom: '40px' }}>
                    Bem-vindo(a)! Utilize o menu abaixo para gerenciar usuários, pagamentos e configurações.
                </p>

                {/* CONTAINER DOS CARDS */}
                <div style={cardsWrapperStyle}>

                    {/* Card 1: Pagamentos Pendentes */}
                    <div style={cardBaseStyle}>
                        <h2 style={{ color: '#0056b3' }}>Pagamentos</h2>
                        <p>Acesse a lista de comprovantes pendentes para confirmar novas assinaturas.</p>
                        <Link href="/admin/pagamentos" style={{
                            display: 'inline-block',
                            marginTop: '15px',
                            color: '#fff',
                            backgroundColor: '#007bff',
                            padding: '8px 15px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                        }}>
                            Ver Pendências
                        </Link>
                    </div>

                    {/* Card 2: Gerenciamento de Usuários */}
                    <div style={cardBaseStyle}>
                        <h2 style={{ color: '#333' }}>Usuários</h2>
                        <p>Visualize e gerencie todos os usuários cadastrados e seus planos.</p>
                        <Link href="/admin/users" style={{
                            display: 'inline-block',
                            marginTop: '15px',
                            color: '#fff',
                            backgroundColor: '#6c757d',
                            padding: '8px 15px',
                            borderRadius: '4px',
                            textDecoration: 'none',
                        }}>
                            Gerenciamento de Usuários
                        </Link>
                    </div>

                    {/* Card de Gerador de Documentos Online */}
                    <div style={cardBaseStyle}>
                        <h2 style={{ color: '#333' }}>Gerar Documento Online</h2>
                        <p>Gere Contrato, Recibo e/ou Orçamento Online.</p>
                        <a href="/dashboard/gerador-de-contrato-servico-orcamento.html" target='_blank' rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '15px', color: '#fff', backgroundColor: '#007bff', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none' }}>
                            Gerar Documento Online
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}