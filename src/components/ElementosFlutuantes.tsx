'use client';

import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function ElementosFlutuantes() {
    const [mostrarSeta, setMostrarSeta] = useState(false);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const gerenciarScroll = () => {
            // Se o usuário rolou mais de 50px para baixo
            if (window.scrollY > 50) {
                // Cancela timers anteriores para evitar múltiplos disparos gatilhados
                clearTimeout(timeoutId);
                
                // Aguarda exatamente 5 segundos (5000ms) de rolagem ativa/permanência antes de mostrar
                timeoutId = setTimeout(() => {
                    setMostrarSeta(true);
                }, 100);
            } else {
                // Se voltou para o topo, esconde imediatamente e limpa o timer
                clearTimeout(timeoutId);
                setMostrarSeta(false);
            }
        };

        window.addEventListener('scroll', gerenciarScroll);
        
        // Limpeza de listener e timeout ao desmontar o componente
        return () => {
            window.removeEventListener('scroll', gerenciarScroll);
            clearTimeout(timeoutId);
        };
    }, []);

    // Função suave para rolar de volta ao topo da página
    const rolarParaTopo = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {/* ==========================================================
                1. BOTÃO FLUTUANTE: VOLTAR AO TOPO (Aparece após 5s abaixo)
                ========================================================== */}
            <button
                onClick={rolarParaTopo}
                style={{
                    position: 'fixed',
                    bottom: '95px', // Posicionado acima do botão do WhatsApp para não sobrepor
                    right: '25px',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#111113',
                    border: '1px solid #27272a',
                    color: '#ffffff',
                    fontSize: '1.2rem',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                    zIndex: 9999,
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    // Controle de visibilidade com transição suave de opacidade e movimento Y
                    opacity: mostrarSeta ? 1 : 0,
                    transform: mostrarSeta ? 'translateY(0)' : 'translateY(20px)',
                    pointerEvents: mostrarSeta ? 'all' : 'none',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#0d6efd';
                    e.currentTarget.style.borderColor = '#0d6efd';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#111113';
                    e.currentTarget.style.borderColor = '#27272a';
                }}
                title="Voltar ao Topo"
            >
                <i className="bi bi-arrow-up"></i>
            </button>

            {/* ==========================================================
                2. BOTÃO FIXO: WHATSAPP COMERCIAL (Sempre Visível)
                ========================================================== */}
            <a
                href="https://wa.me/5561981885715"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    position: 'fixed',
                    bottom: '25px',
                    right: '25px',
                    width: '54px',
                    height: '54px',
                    borderRadius: '50%',
                    backgroundColor: '#25d366', // Verde oficial do WhatsApp
                    color: '#ffffff',
                    fontSize: '1.8rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 6px 16px rgba(37, 211, 102, 0.35)',
                    zIndex: 9999,
                    textDecoration: 'none',
                    transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                }}
                title="Fale com o Comercial"
            >
                <i className="bi bi-whatsapp"></i>
            </a>
        </>
    );
}