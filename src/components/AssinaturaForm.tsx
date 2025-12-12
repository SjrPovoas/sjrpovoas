// src/app/components/AssinaturaForm.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react'; 

/**
 * Componente que exibe os dois cards de planos (Mensal e Anual)
 * usando SOMENTE CSS Inline (CSS-in-JS) e o tema na cor CINZA/ESCURO.
 */
function AssinaturaForm() {

    // --- ESTILOS BASE ---
    const cardBaseStyle: React.CSSProperties = {
        flex: 1, 
        padding: '1.5rem', 
        border: '2px solid',
        borderRadius: '0.5rem', 
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out', 
        textDecoration: 'none', 
        display: 'block', 
    };

    // --- ESTILO CARD 1: PLANO MENSAL (Padrão) ---
    const mensalStyle: React.CSSProperties = {
        ...cardBaseStyle,
        backgroundColor: '#4a4a4a', // Cinza mais escuro para destaque
        borderColor: '#8c92a6', // Cinza azulado na borda
        color: '#ffffff', 
    };

    // --- ESTILO CARD 2: PLANO ANUAL (DESTAQUE em Cinza Escuro) ---
    const anualStyle: React.CSSProperties = {
        ...cardBaseStyle,
        backgroundColor: '#4a4a4a', // Cinza mais escuro para destaque
        borderColor: '#8c92a6', // Cinza azulado na borda
        color: '#ffffff', 
    };
    
    // --- ESTILOS DE TEXTO ---
    const highlightPriceStyle: React.CSSProperties = {
        fontWeight: '600', 
        fontSize: '1.875rem', 
        color: '#8c92a6', // Cinza Azulado (destaque suave)
    };
    const whitePriceStyle: React.CSSProperties = {
        ...highlightPriceStyle,
        color: '#ffffff', 
    };
    const savingsTextStyle: React.CSSProperties = {
        fontWeight: 'bold',
        color: '#199619FF', // Mantendo o vermelho para a economia (pois é um alerta/benefício)
        fontSize: '0.875rem', 
    };
    const lightGrayTextStyle: React.CSSProperties = {
        color: '#d1d5db', // Cinza claro
        fontSize: '0.75rem', 
    };


    return (
        <div style={{ width: '100%', maxWidth: '500px', margin: 'auto', padding: '2rem 0' }}>
            {/* Bloco principal */}
            <div style={{ padding: '2rem', backgroundColor: '#000', borderRadius: '0.75rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #4a4a4a', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Cabeçalho */}
                <div style={{ textAlign: 'center' }}>
                    {/* Ícone em Cinza Azulado para combinar com o destaque */}
                    <ShoppingCart style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 0.75rem', color: '#8c92a6' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                        Escolha seu Plano Ideal
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>

                    {/* Layout de Duas Colunas Horizontal */}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>

                        {/* 💳 CARD 1: PLANO MENSAL */}
                        <Link 
                            href="/login?plano=mensal" 
                            style={mensalStyle}
                            className="card-hover-effect-dark" // Classe customizada para hover (em gray)
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Plano Mensal</span>
                                    <span style={whitePriceStyle}>R$ 4,90</span>
                                    <span style={savingsTextStyle}>Acesso Flexível!</span>
                                    <span style={{ ...lightGrayTextStyle, color: '#e5e7eb' }}> ( sem fidelidade )</span>
                                </div>
                            </div>
                        </Link>

                        {/* 🌟 CARD 2: PLANO ANUAL (DESTAQUE) */}
                        <Link 
                            href="/login?plano=anual" 
                            style={anualStyle}
                            className="card-hover-effect-dark" // Classe customizada para hover (em dark gray)
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>Plano Anual</span>
                                    <span style={whitePriceStyle}>R$ 49,00</span>
                                    <span style={savingsTextStyle}>Economize R$ 9,80!</span>
                                    <span style={{ ...lightGrayTextStyle, color: '#e5e7eb' }}> ( Economize 2 meses! )</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssinaturaForm;