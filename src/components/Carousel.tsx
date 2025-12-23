'use client';

import React, { useRef } from 'react';

interface CarouselProps {
  title: string;
  children: React.ReactNode;
}

// Largura de visualização para 3.5 cards (240px/card + 20px gap)
const CAROUSEL_VIEWPORT_WIDTH = '1200px'; 
const CARD_WIDTH_WITH_GAP = 260; // 240px (card) + 20px (gap)

// Estilo para os botões de navegação: MAIS FINO E MAIS TRANSPARENTE
const buttonStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0, 
  height: '100%', // Mantém esticado para cobrir toda a altura
  width: '24px', // Mais fino
  backgroundColor: 'rgba(0, 0, 0, 0.1)', // Maior transparência
  color: 'white', // COR DA SETA
  border: 'none',
  cursor: 'pointer',
  zIndex: 10, 
  fontSize: '3em', // TAMANHO DA SETA
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background-color 0.3s',
};

// Estilo para o título da seção
const titleStyle: React.CSSProperties = {
  color: 'white',
  fontSize: '1.4em',
  fontWeight: '700',
  marginBottom: '5px',
  marginTop: '20px',
};


export default function Carousel({ title, children }: CarouselProps) {
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // Rola um card inteiro + o gap
      container.scrollBy({
        left: direction === 'right' ? CARD_WIDTH_WITH_GAP : -CARD_WIDTH_WITH_GAP,
        behavior: 'smooth', 
      });
    }
  };

  // Estilo do container de cards (ÁREA DE ROLAGEM)
  const cardsWrapperStyle: React.CSSProperties = {
    position: 'relative',
    padding: '0 0',
    overflowX: 'scroll', // Permite rolagem com hack para ocultar barra
    display: 'flex',
    gap: '10px',
    scrollBehavior: 'smooth',
    // Propriedades para ocultar a barra de rolagem em navegadores não-WebKit
    scrollbarWidth: 'none', // Firefox
    msOverflowStyle: 'none', // IE and Edge
  };
  
  // Hack para WebKit (Chrome/Safari)
  const cardsWrapperStyleWithHacks = cardsWrapperStyle as any;
  cardsWrapperStyleWithHacks.WebkitOverflowScrolling = 'touch';


  // Estilo da ÁREA GERAL que contém a rolagem e os botões
  const buttonAreaStyle: React.CSSProperties = {
    position: 'relative', 
    maxWidth: CAROUSEL_VIEWPORT_WIDTH, // CHAVE: Limita a visualização a 3.5 cards
    margin: '0', // Centraliza o carrossel no container de 1200px
  };


  return (
    <section>
      <h2 style={{...titleStyle, maxWidth: CAROUSEL_VIEWPORT_WIDTH, margin: '35px auto 15px'}}>{title}</h2>
      
      <div style={buttonAreaStyle}>
        
        {/* Container de Cards com a Ref para rolagem */}
        <div 
          ref={scrollContainerRef} 
          style={cardsWrapperStyleWithHacks}
        >
          {children}
        </div>

        {/* Botão de Recuar (Posicionado sobre os cards) */}
        <button 
          onClick={() => scroll('left')}
          style={{ 
              ...buttonStyle, 
              left: 0,
              // Hover ajustado para maior discrição
              ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' } 
          } as React.CSSProperties}
          title="Recuar"
        >
          &#8249; {/* Seta para a esquerda */}
        </button>
        
        {/* Botão de Avançar (Posicionado sobre os cards) */}
        <button 
          onClick={() => scroll('right')}
          style={{ 
              ...buttonStyle, 
              right: 0,
              // Hover ajustado para maior discrição
              ':hover': { backgroundColor: 'rgba(0, 0, 0, 0.4)' } 
          } as React.CSSProperties}
          title="Avançar"
        >
          &#8250; {/* Seta para a direita */}
        </button>

      </div>
    </section>
  );
}