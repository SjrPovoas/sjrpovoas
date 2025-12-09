// src/app/components/AssinaturaForm.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react'; 

/**
 * Componente que exibe os dois cards de planos (Mensal e Anual)
 * Usando SOMENTE CSS Inline (CSS-in-JS) para máxima portabilidade
 * e para evitar o uso de Tailwind CSS/PostCSS.
 */
function AssinaturaForm() {

    // --- ESTILOS BASE ---
    const cardBaseStyle: React.CSSProperties = {
        flex: 1, // flex-1
        padding: '1.5rem', // p-6
        border: '2px solid',
        borderRadius: '0.5rem', // rounded-lg
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out', // transition duration-300 transform
        textDecoration: 'none', // no-underline
        display: 'block', // Garante que o Link se comporte como um bloco flexível
    };

    // --- ESTILO CARD 1: PLANO MENSAL (Neutro/Padrão) ---
    const mensalStyle: React.CSSProperties = {
        ...cardBaseStyle,
        backgroundColor: '#000000', // bg-black
        borderColor: '#ffffff', // border-white
        color: '#ffffff', // text-white
    };

    // --- ESTILO CARD 2: PLANO ANUAL (Destaque/Popular - Verde) ---
    const anualStyle: React.CSSProperties = {
        ...cardBaseStyle,
        backgroundColor: '#047857', // bg-green-700
        borderColor: '#10b981', // border-green-500
        color: '#ffffff', // text-white
    };
    
    // --- FUNÇÃO PARA LIDAR COM HOVER (Recomendado: Usar CSS-in-JS ou CSS puro) ---
    // NOTA: Para hover complexo (scale, shadow), o CSS-in-JS puro é limitado.
    // Usaremos classes estáticas ou template string se necessário para o hover.

    const greenPriceStyle: React.CSSProperties = {
        fontWeight: '600', // font-semibold
        fontSize: '1.875rem', // text-3xl
        color: '#4ade80', // text-green-400
    };
    const whitePriceStyle: React.CSSProperties = {
        ...greenPriceStyle,
        color: '#ffffff', 
    };
    const redTextStyle: React.CSSProperties = {
        fontWeight: 'bold',
        color: '#f87171', // text-red-400
        fontSize: '0.875rem', // text-sm
    };
    const grayTextStyle: React.CSSProperties = {
        color: '#d1d5db', // text-gray-300
        fontSize: '0.75rem', // text-xs
    };


    return (
        <div style={{ width: '100%', maxWidth: '500px', margin: 'auto', padding: '2rem 0' }}>
            {/* Bloco principal: Fundo Preto, Borda Branca */}
            <div style={{ padding: '2rem', backgroundColor: '#000', borderRadius: '0.75rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', border: '1px solid #fff', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Cabeçalho */}
                <div style={{ textAlign: 'center' }}>
                    <ShoppingCart style={{ width: '2.5rem', height: '2.5rem', margin: '0 auto 0.75rem', color: '#10b981' }} />
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
                        Escolha seu Plano Ideal
                    </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'center' }}>

                    {/* Layout de Duas Colunas Horizontal */}
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>

                        {/* 💳 CARD 1: PLANO MENSAL */}
                        {/* Usando uma template string para injetar o estilo de hover no className
                            para simular o scale/shadow (limitado, mas funcional)
                        */}
                        <Link 
                            href="/login?plano=mensal" 
                            style={mensalStyle}
                            className="card-hover-effect" // Classe customizada para hover (definida em globals.css)
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Mensal</span>
                                    <span style={greenPriceStyle}>R$ 4,90</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                                    <span style={{ fontSize: '0.875rem', paddingBlockStart: '0.25rem', fontStyle: 'italic', fontWeight: '300' }}>Acesso flexível</span>
                                    <span style={grayTextStyle}>Cancele quando quiser.</span>
                                </div>
                            </div>
                        </Link>

                        {/* 🌟 CARD 2: PLANO ANUAL (DESTAQUE) */}
                        <Link 
                            href="/login?plano=anual" 
                            style={anualStyle}
                            className="card-hover-effect-green" // Classe customizada para hover (definida em globals.css)
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>Anual</span>
                                    <span style={whitePriceStyle}>R$ 49,00</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                                    <span style={redTextStyle}>Economize R$ 9,80!</span>
                                    <span style={{ ...grayTextStyle, color: '#e5e7eb' }}> (2 meses grátis)</span>
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