// src/components/InteractiveCard.tsx

// 🚨 CORREÇÃO 1: Importar useState do 'react'
import React, { CSSProperties, useState, AnchorHTMLAttributes, HTMLAttributes } from 'react';
import Link, { LinkProps } from 'next/link';

// =======================================================================
// INTERFACE DE PROPRIEDADES
// =======================================================================

export interface InteractiveCardProps {
    title: string;
    description: string;
    image: string; // URL para o background-image (miniatura do vídeo)
    baseStyle: CSSProperties;
    
    // Propriedades Opcionais:
    href?: string;         // Usado se o card deve ser um link (ex: para páginas externas)
    onClick?: () => void;  // Usado se o card deve acionar um modal ou função
}

// =======================================================================
// COMPONENTE INTERACTIVE CARD
// =======================================================================

const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
    title, 
    description, 
    image, 
    baseStyle, 
    href, 
    onClick 
}) => {
    
    // Estado para o efeito visual de hover
    const [isHovered, setIsHovered] = useState(false);

    // 🚨 CORREÇÃO 2: Lógica de renderização mais segura para o TypeScript
    // Se href for fornecido, renderizamos o Link do Next.js
    if (href) {
        return (
            <Link 
                href={href}
                onClick={onClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                // Define o target="_blank" para links externos, se necessário
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                
                style={{
                    ...baseStyle, 
                    backgroundImage: image,
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                    transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.2)',
                    textDecoration: 'none',
                    color: 'white', 
                }}
            >
                {/* Overlay e Conteúdo */}
                <div style={{ 
                    position: 'absolute', 
                    top: 0, left: 0, right: 0, bottom: 0, 
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' 
                }} />
                
                <div style={{ position: 'relative', zIndex: 2, padding: '15px' }}>
                    <h4 style={{ margin: 0, fontSize: '1.4em' }}>{title}</h4>
                    <p style={{ fontSize: '0.9em', margin: '5px 0 0' }}>{description}</p>
                </div>
            </Link>
        );
    }

    // Se NÃO houver href (mas provavelmente há onClick para o modal), renderizamos um <div>
    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}

            style={{
                ...baseStyle, 
                backgroundImage: image,
                cursor: onClick ? 'pointer' : 'default',
                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                boxShadow: isHovered ? '0 10px 20px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.2)',
                color: 'white', 
            }}
        >
            {/* Overlay e Conteúdo */}
            <div style={{ 
                position: 'absolute', 
                top: 0, left: 0, right: 0, bottom: 0, 
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)' 
            }} />
            
            <div style={{ position: 'relative', zIndex: 2, padding: '15px' }}>
                <h4 style={{ margin: 0, fontSize: '1.4em' }}>{title}</h4>
                <p style={{ fontSize: '0.9em', margin: '5px 0 0' }}>{description}</p>
            </div>
        </div>
    );
};

export default InteractiveCard;