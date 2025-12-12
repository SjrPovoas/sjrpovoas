// src/app/minha-area/page.tsx

'use client'; // 🚨 CRÍTICO: Necessário para usar useState e criar o modal interativo.

import Link from 'next/link';
import React, { useState } from 'react';
// Assumindo que estes componentes existem
import AssinaturaForm from '@/components/AssinaturaForm';
import InteractiveCard from '@/components/InteractiveCard';
import Carousel from '@/components/Carousel';
import { Target } from 'lucide-react';


// =======================================================================
// INTERFACES E TIPOS
// =======================================================================

// Interface para os dados dos Carrosseis
interface ContentItem {
    title: string;
    description: string;
    videoUrl: string; // URL de embed do YouTube (ou similar)
    thumbnail: string; // URL da miniatura para o fundo do card
    target?: string;
}

// =======================================================================
// DADOS DOS CARROSSEIS (Atualizados com URLs de Vídeo)
// =======================================================================

const cardStyle: React.CSSProperties = {
    // ... (Estilos originais do Card)
    flexShrink: 0,
    width: '300px',
    height: '350px',
    minWidth: '200px',
    backgroundColor: '#444',
    borderRadius: '8px',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'relative',
    padding: '10px',
    textAlign: 'left',
    color: 'white',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

// 💡 Exemplo de URLs de Vídeos: Use URLs de embed (com /embed/) do YouTube para pop-up
const trainingAreas: ContentItem[] = [
    { 
        title: 'Treinamento Rápido', 
        description: 'Como agem os ladrões e o que fazer se celular for roubado.', 
        videoUrl: 'https://www.youtube.com/embed/H573VW6kCDw?autoplay=1', // Exemplo do vídeo que pesquisamos
        thumbnail: 'url("https://img.youtube.com/vi/H573VW6kCDw/hqdefault.jpg")', // Miniatura do vídeo
    },
    { 
        title: 'Treinamento Rápido', 
        description: 'Como usar NFC para fazer pagamanetos sem cartão de banco físico.', 
        videoUrl: 'https://www.youtube.com/embed/7xIpeCTtSf8?autoplay=1', 
        thumbnail: 'url("https://img.youtube.com/vi/7xIpeCTtSf8/hqdefault.jpg")',
    },
    { 
        title: 'Treinamento Rápido', 
        description: 'Como usar navegação por gestos no celular.', 
        videoUrl: 'https://www.youtube.com/embed/Rpc14w5wtpQ?autoplay=1', 
        thumbnail: 'url("https://img.youtube.com/vi/Rpc14w5wtpQ/hqdefault.jpg")',
    },
    { 
        title: 'Treinamento Rápido', 
        description: 'Como calibrar o touch de qualquer celular.', 
        videoUrl: 'https://www.youtube.com/embed/aiOpl2TyS0M?autoplay=1', 
        thumbnail: 'url("https://img.youtube.com/vi/aiOpl2TyS0M/hqdefault.jpg")',
    },
    { 
        title: 'Treinamento Rápido', 
        description: 'Como trocar película de celular', 
        videoUrl: 'https://www.youtube.com/embed/81woWp9Bvm4?autoplay=1', 
        thumbnail: 'url("https://img.youtube.com/vi/81woWp9Bvm4/hqdefault.jpg")',
    },
    // Adicione mais vídeos aqui...
];

const vipContentAreas: ContentItem[] = [
    { 
        title: 'Conteúdo VIP 1', 
        description: 'Conteúdo exclusivo Avançado.', 
        videoUrl: 'https://www.youtube.com/embed/QXRDjxL5yJU?autoplay=1', // URL do usuário ajustada para embed
        thumbnail: 'url("https://img.youtube.com/vi/QXRDjxL5yJU/hqdefault.jpg")', 
    },
    { 
        title: 'Conteúdo VIP 2', 
        description: 'Conteúdo exclusivo Avançado.', 
        videoUrl: 'https://www.youtube.com/embed/MPtawaiTXsg?autoplay=1', // URL do usuário ajustada para embed
        thumbnail: 'url("https://img.youtube.com/vi/MPtawaiTXsg/hqdefault.jpg")', 
    },
    { 
        title: 'Conteúdo VIP 3', 
        description: 'Conteúdo exclusivo Avançado.', 
        videoUrl: 'https://www.youtube.com/embed/vqShbm2m6Ic?autoplay=1', // URL do usuário ajustada para embed
        thumbnail: 'url("https://img.youtube.com/vi/vqShbm2m6Ic/hqdefault.jpg")', 
    },
    { 
        title: 'Conteúdo VIP 4', 
        description: 'Conteúdo exclusivo Avançado.', 
        videoUrl: 'https://www.youtube.com/embed/MW1Xj1WkP_I?autoplay=1', // URL do usuário ajustada para embed
        thumbnail: 'url("https://img.youtube.com/vi/MW1Xj1WkP_I/hqdefault.jpg")', 
    },
    { 
        title: 'Conteúdo VIP 5', 
        description: 'Conteúdo exclusivo Avançado.', 
        videoUrl: 'https://www.youtube.com/embed/FZe9az4U9vc?autoplay=1', // URL do usuário ajustada para embed
        thumbnail: 'url("https://img.youtube.com/vi/FZe9az4U9vc/hqdefault.jpg")', 
    },
    // Adicione mais vídeos aqui...
];

const socialMediaLinks = {
    // ... (Links originais)
    instagram: 'https://www.instagram.com/silviopovoasjunior/',
    facebook: 'https://www.facebook.com/sjrpovoas',
    twitter: 'https://www.twitter.com/sjrpovaoas',
    linkedin: 'https://www.linkedin.com/in/sjrpovoas',
    discord: 'https://discord.com/invite/8QKN7R5dt5',
    linktree: 'https://linktr.ee/sjrpovoas',
};

// ... (Componente SocialIconProps e SocialIcon)
interface SocialIconProps {
    href: string;
    label: string;
    iconClass: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, label, iconClass }) => (
    <Link href={href} target="_blank" style={{
        color: '#aaa', fontSize: '1.5em', textDecoration: 'none', transition: 'color 0.3s'
    }} title={label}><i className={`bi ${iconClass}`}></i>
    </Link>
);


// =======================================================================
// COMPONENTE MODAL DE VÍDEO (POP-UP)
// =======================================================================

interface VideoModalProps {
    url: string;
    onClose: () => void;
    title: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ url, onClose, title }) => {
    // Para ter controles de áudio (play/pause) em um iframe do YouTube, 
    // a melhor prática é usar o parâmetro 'autoplay=1' na URL e o usuário 
    // usará os controles nativos do player do YouTube.

    const iframeUrl = url.includes('?') ? `${url}&enablejsapi=1` : `${url}?enablejsapi=1`;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }} onClick={onClose}>
            <div style={{
                position: 'relative', width: '90%', maxWidth: '800px',
                backgroundColor: '#000', borderRadius: '8px', padding: '20px'
            }} onClick={e => e.stopPropagation()}>
                
                <button onClick={onClose} style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: 'none', border: 'none', color: 'white',
                    fontSize: '1.5em', cursor: 'pointer', zIndex: 10
                }}>
                    &times;
                </button>

                <h3 style={{ color: 'white', marginBottom: '15px' }}>{title}</h3>

                {/* Iframe do YouTube com o vídeo incorporado */}
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}>
                    <iframe
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                        src={iframeUrl}
                        title={title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};


// =======================================================================
// COMPONENTE PRINCIPAL HOME/MINHA ÁREA
// =======================================================================

export default function MinhaAreaPage() {
    // 🚨 ESTADOS PARA O MODAL
    const [modalOpen, setModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [currentVideoTitle, setCurrentVideoTitle] = useState('');

    const handleCardClick = (item: ContentItem) => {
        // Verifica se é um item de vídeo antes de abrir o modal
        if (item.videoUrl) {
            setCurrentVideoUrl(item.videoUrl);
            setCurrentVideoTitle(item.title);
            setModalOpen(true);
        }
    };

    return (
        <main style={{ backgroundColor: '#000', minHeight: '100vh', padding: '30px 10px 10px 10px' }}>

            {/* HEADER: LOGOMARCA E BOTÃO DE LOGOUT */}
            <header style={{
                maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #333'
            }}>
                <Link href="/">
                    <img src="/assets/img/marca-SjrPovoaS.png" alt="Marca SjrPovoaS"
                        style={{ height: '60px', objectFit: 'contain', borderRadius: '48px' }} />
                </Link>
                <div style={{ marginTop: '30px' }}>
                    {/* link de Logout */}
                    <Link href="/logout" style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '5px'
                    }}>
                        Sair (Logout)
                    </Link>
                </div>
            </header>

            <div style={{ padding: '40px', textAlign: 'center', color: 'white' }}>
                <h1 style={{ color: 'green' }}>✅ ACESSO EXCLUSIVO CONCEDIDO!</h1>
                <p>Bem-vindo(a) à área exclusiva dos assinantes.</p>


            </div>

            {/* ÁREA DOS CARROSSEIS */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                {/* CARROSSEL 1: TREINAMENTO RÁPIDO */}
                <Carousel title="🎓 Treinamento Rápido">
                    {trainingAreas.map((area, index) => (
                        <InteractiveCard
                            key={index}
                            // Não usa href, usa onClick para modal
                            title={area.title}
                            description={area.description}
                            // 🚨 CORREÇÃO: Usar 'thumbnail' em vez de 'image' para miniatura
                            image={area.thumbnail} 
                            baseStyle={cardStyle}
                            // 🚨 Ação ao clicar: Abre o modal
                            onClick={() => handleCardClick(area)}
                        />
                    ))}
                </Carousel>

                {/* CARROSSEL 2: CONTEÚDO VIP */}
                <Carousel title="🌟 Conteúdo VIP">
                    {vipContentAreas.map((area, index) => (
                        <InteractiveCard
                            key={index}
                            // Não usa href, usa onClick para modal
                            title={area.title}
                            description={area.description}
                            // 🚨 CORREÇÃO: Usar 'thumbnail' em vez de 'image' para miniatura
                            image={area.thumbnail}
                            baseStyle={cardStyle}
                            // 🚨 Ação ao clicar: Abre o modal
                            onClick={() => handleCardClick(area)}
                        />
                    ))}
                </Carousel>

            </div>
            {/* Fim da Área dos Carrosseis */}

            {/* --- RODAPÉ COM MÍDIAS SOCIAIS --- */}
            <footer
                style={{
                    maxWidth: '1200px', backgroundColor: '#444', margin: '80px auto 0', padding: '30px', borderTop: '1px solid #333',
                    color: '#888', fontSize: '0.9em', textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '1em', color: 'white' }}>Siga-nos nas Redes Sociais:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <SocialIcon href={socialMediaLinks.instagram} label="Instagram" iconClass="bi-instagram" />
                        <SocialIcon href={socialMediaLinks.facebook} label="Facebook" iconClass="bi-facebook" />
                        <SocialIcon href={socialMediaLinks.twitter} label="Twitter / X" iconClass="bi-twitter-x" />
                        <SocialIcon href={socialMediaLinks.linkedin} label="Linkedin" iconClass="bi-linkedin" />
                        <SocialIcon href={socialMediaLinks.discord} label="Discord" iconClass="bi-discord" />
                        <SocialIcon href={socialMediaLinks.linktree} label="Linktree" iconClass="bi-tree-fill" />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '15px' }}>
                    <Link href="mailto:sjrpovoas@gmail.com" target="_blank" style={{ color: '#888', textDecoration: 'none' }}>
                        Contato
                    </Link>
                    <Link href="#" style={{ color: '#888', textDecoration: 'none' }}>
                        Termos de Uso
                    </Link>
                    <Link href="#" style={{ color: '#888', textDecoration: 'none' }}>
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
            
            {/* 🚨 MODAL DE VÍDEO RENDERIZADO AQUI */}
            {modalOpen && currentVideoUrl && (
                <VideoModal 
                    url={currentVideoUrl} 
                    title={currentVideoTitle}
                    onClose={() => setModalOpen(false)} 
                />
            )}

        </main>
    );
}