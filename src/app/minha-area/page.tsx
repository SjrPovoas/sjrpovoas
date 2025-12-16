// src/app/minha-area/page.tsx

'use client';

import Link from 'next/link';
import React, { useState } from 'react';

// Certifique-se de que esses arquivos existem em src/components/
import InteractiveCard from '@/components/InteractiveCard'; 
import Carousel from '@/components/Carousel';
import 'bootstrap-icons/font/bootstrap-icons.css';


// =======================================================================
// INTERFACES E TIPOS
// =======================================================================

interface ContentItem {
    id?: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    categoria?: string;
}

interface VideoModalProps {
    url: string;
    onClose: () => void;
    title: string;
}

interface SocialIconProps {
    href: string;
    label: string;
    iconClass: string;
}

// =======================================================================
// COMPONENTES AUXILIARES
// =======================================================================

const VideoModal: React.FC<VideoModalProps> = ({ url, onClose, title }) => {
    const iframeUrl = url.includes('?') ? `${url}&enablejsapi=1` : `${url}?enablejsapi=1`;

    return (
        <div
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.9)', zIndex: 1000,
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
            onClick={onClose}
        >
            <div
                style={{
                    position: 'relative', width: '90%', maxWidth: '800px',
                    backgroundColor: '#000', borderRadius: '8px', padding: '20px'
                }}
                onClick={e => e.stopPropagation()}
            >
                <button onClick={onClose} style={{
                    position: 'absolute', top: '10px', right: '10px',
                    background: 'none', border: 'none', color: 'white',
                    fontSize: '1.5em', cursor: 'pointer', zIndex: 10
                }}>
                    &times;
                </button>
                <h3 style={{ color: 'white', marginBottom: '15px' }}>{title}</h3>
                <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
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

const SocialIcon: React.FC<SocialIconProps> = ({ href, label, iconClass }) => (
    <Link href={href} target="_blank" style={{
        color: '#aaa', fontSize: '1.5em', textDecoration: 'none', transition: 'color 0.3s'
    }} title={label}>
        <i className={`bi ${iconClass}`}></i>
    </Link>
);

// =======================================================================
// COMPONENTE PRINCIPAL
// =======================================================================

export default function MinhaAreaPage() {
    // ESTADOS
    const [busca, setBusca] = useState('');
    const [loadingSugestao, setLoadingSugestao] = useState(false);
    const [sugestaoEnviada, setSugestaoEnviada] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState('');
    const [currentVideoTitle, setCurrentVideoTitle] = useState('');

    // DADOS
    const trainingAreas: ContentItem[] = [
        { 
            title: 'Treinamento Rápido', 
            description: 'Como agem os ladrões e o que fazer se celular for roubado.', 
            videoUrl: 'https://www.youtube.com/embed/H573VW6kCDw?autoplay=1', // Exemplo do vídeo que pesquisamos
            thumbnail: 'url("https://img.youtube.com/vi/H573VW6kCDw/hqdefault.jpg")', // Miniatura do vídeo
            categoria: 'Treinamento Rápido - Como agem os ladrões e o que fazer se celular for roubado'
        },
        { 
            title: 'Treinamento Rápido', 
            description: 'Como usar NFC para fazer pagamanetos sem cartão de banco físico.', 
            videoUrl: 'https://www.youtube.com/embed/7xIpeCTtSf8?autoplay=1', 
            thumbnail: 'url("https://img.youtube.com/vi/7xIpeCTtSf8/hqdefault.jpg")',
            categoria: 'Treinamento Rápido - Como usar NFC para fazer pagamanetos sem cartão de banco físico'
        },
        { 
            title: 'Treinamento Rápido', 
            description: 'Como usar navegação por gestos no celular.', 
            videoUrl: 'https://www.youtube.com/embed/Rpc14w5wtpQ?autoplay=1', 
            thumbnail: 'url("https://img.youtube.com/vi/Rpc14w5wtpQ/hqdefault.jpg")',
            categoria: 'Treinamento Rápido - Como usar navegação por gestos no celular'
        },
        { 
            title: 'Treinamento Rápido', 
            description: 'Como calibrar o touch de qualquer celular.', 
            videoUrl: 'https://www.youtube.com/embed/aiOpl2TyS0M?autoplay=1', 
            thumbnail: 'url("https://img.youtube.com/vi/aiOpl2TyS0M/hqdefault.jpg")',
            categoria: 'Treinamento Rápido - Como calibrar o touch de qualquer celular'
        },
        { 
            title: 'Treinamento Rápido', 
            description: 'Como trocar película de celular.', 
            videoUrl: 'https://www.youtube.com/embed/81woWp9Bvm4?autoplay=1', 
            thumbnail: 'url("https://img.youtube.com/vi/81woWp9Bvm4/hqdefault.jpg")',
            categoria: 'Treinamento Rápido - Como trocar película de celular', 
        },
    ];

    const vipContentAreas: ContentItem[] = [
        { 
            title: 'Conteúdo VIP 1', 
            description: 'Episódio completo - Largados e Pelados 2025: Brasil A Tribo - S1 Eisódio 1.', 
            videoUrl: 'https://www.youtube.com/embed/QXRDjxL5yJU?autoplay=1', // URL do usuário ajustada para embed
            thumbnail: 'url("https://img.youtube.com/vi/QXRDjxL5yJU/hqdefault.jpg")',
            categoria: 'Conteúdo VIP - Episódio completo - Largados e Pelados 2025: Brasil A Tribo - S1 Eisódio 1'
        },
        { 
            title: 'Conteúdo VIP 2', 
            description: 'Episódio completo - Largados e Pelados 2025: Brasil Desafio Extremo - Episódio 6.', 
            videoUrl: 'https://www.youtube.com/embed/MPtawaiTXsg?autoplay=1', // URL do usuário ajustada para embed
            thumbnail: 'url("https://img.youtube.com/vi/MPtawaiTXsg/hqdefault.jpg")',
            categoria: 'Conteúdo VIP - Episódio completo - Largados e Pelados 2025: Brasil Desafio Extremo - Episódio 6'
        },
        { 
            title: 'Conteúdo VIP 3', 
            description: 'Episódio completo - Largados e Pelados 2025: Brasil Desafio Extremo - Episódio 7.', 
            videoUrl: 'https://www.youtube.com/embed/vqShbm2m6Ic?autoplay=1', // URL do usuário ajustada para embed
            thumbnail: 'url("https://img.youtube.com/vi/vqShbm2m6Ic/hqdefault.jpg")',
            categoria: 'Conteúdo VIP - Episódio completo - Largados e Pelados 2025: Brasil Desafio Extremo - Episódio 7'
        },
        { 
            title: 'Conteúdo VIP 4', 
            description: 'Episódio completo - Largados e Pelados 2023: Brasil APAIXONADOS - 4 em 1.', 
            videoUrl: 'https://www.youtube.com/embed/MW1Xj1WkP_I?autoplay=1', // URL do usuário ajustada para embed
            thumbnail: 'url("https://img.youtube.com/vi/MW1Xj1WkP_I/hqdefault.jpg")',
            categoria: 'Conteúdo VIP - Episódio completo - Largados e Pelados 2023: Brasil APAIXONADOS - 4 em 1'
        },
        { 
            title: 'Conteúdo VIP 5', 
            description: 'Episódio completo - Largados e Pelados 2025: Brasil Episódio 1 e 2.', 
            videoUrl: 'https://www.youtube.com/embed/FZe9az4U9vc?autoplay=1', // URL do usuário ajustada para embed
            thumbnail: 'url("https://img.youtube.com/vi/FZe9az4U9vc/hqdefault.jpg")',
            categoria: 'Conteúdo VIP - Episódio completo - Largados e Pelados 2025: Brasil Episódio 1 e 2'
        }
    ];

    const socialMediaLinks = {
        instagram: 'https://www.instagram.com/silviopovoasjunior',
        facebook: 'https://www.facebook.com/sjrpovoas',
        twitter: 'https://www.twitter.com/sjrpovoas',
        linkedin: 'https://www.linkedin.com/in/sjrpovoas',
        discord: 'https://discord.com/invite/8QKN7R5dt5',
        linktree: 'https://linktr.ee/sjrpovoas',
    };

    const cardStyle: React.CSSProperties = {
        flexShrink: 0, width: '300px', height: '350px', backgroundColor: '#444',
        borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', display: 'flex',
        flexDirection: 'column', justifyContent: 'flex-end', position: 'relative',
        padding: '10px', textAlign: 'left', color: 'white', backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    // FUNÇÕES
    const handleCardClick = (item: ContentItem) => {
        if (item.videoUrl) {
            setCurrentVideoUrl(item.videoUrl);
            setCurrentVideoTitle(item.title);
            setModalOpen(true);
        }
    };

    const enviarSugestao = async () => {
        setLoadingSugestao(true);
        try {
            await fetch('/api/sugestoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ termo: busca }),
            });
            setSugestaoEnviada(true);
        } catch (err) {
            console.error("Erro ao enviar sugestão");
        } finally {
            setLoadingSugestao(false);
        }
    };

    const resultados = [...trainingAreas, ...vipContentAreas].filter(item =>
        item.title.toLowerCase().includes(busca.toLowerCase()) ||
        item.description.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <main style={{ backgroundColor: '#000', minHeight: '100vh', padding: '20px', color: 'white' }}>
            
            {/* HEADER */}
            <header style={{
                maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #333'
            }}>
                <Link href="/">
                    <img src="/assets/img/marca-SjrPovoaS.png" alt="Marca SjrPovoaS"
                        style={{ height: '60px', objectFit: 'contain', borderRadius: '48px' }} />
                </Link>
                <Link href="/logout" style={{
                    padding: '10px 20px', backgroundColor: '#dc3545', color: 'white',
                    textDecoration: 'none', borderRadius: '5px'
                }}>
                    Sair (Logout)
                </Link>
            </header>

            {/* BUSCA */}
            <div style={{ maxWidth: '800px', margin: '40px auto', textAlign: 'center' }}>
                <input
                    type="text"
                    placeholder="Pesquise aqui o conteúdo desejado ..."
                    value={busca}
                    onChange={(e) => { setBusca(e.target.value); setSugestaoEnviada(false); }}
                    style={{
                        width: '100%', padding: '15px', borderRadius: '10px',
                        border: 'none', fontSize: '16px', color: '#333'
                    }}
                />

                {busca !== '' && (
                    <div style={{ marginTop: '20px', textAlign: 'left', background: '#111', padding: '20px', borderRadius: '10px' }}>
                        {resultados.length > 0 ? (
                            resultados.map((item, idx) => (
                                <div key={idx} onClick={() => handleCardClick(item)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #333' }}>
                                    <strong>{item.title}</strong> {item.categoria && `- ${item.categoria}`}
                                </div>
                            ))
                        ) : (
                            <div>
                                <p>Não encontramos nada sobre "{busca}".</p>
                                {!sugestaoEnviada ? (
                                    <button onClick={enviarSugestao} disabled={loadingSugestao} style={{ background: 'green', color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
                                        {loadingSugestao ? 'Enviando...' : 'Adicionar sugestão de pesquisa +'}
                                    </button>
                                ) : (
                                    <p style={{ color: 'lightgreen' }}>✅ Sugestão enviada!</p>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h1 style={{ color: 'green' }}>✅ ACESSO EXCLUSIVO CONCEDIDO!</h1>
                <p>Bem-vindo(a) à área exclusiva dos assinantes.</p>
            </div>

            {/* CARROSSEIS */}
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Carousel title="🎓 Treinamento Rápido">
                    {trainingAreas.map((area, index) => (
                        <InteractiveCard
                            key={index}
                            title={area.title}
                            description={area.description}
                            image={area.thumbnail}
                            baseStyle={cardStyle}
                            onClick={() => handleCardClick(area)}
                        />
                    ))}
                </Carousel>

                <Carousel title="🌟 Conteúdo VIP">
                    {vipContentAreas.map((area, index) => (
                        <InteractiveCard
                            key={index}
                            title={area.title}
                            description={area.description}
                            image={area.thumbnail}
                            baseStyle={cardStyle}
                            onClick={() => handleCardClick(area)}
                        />
                    ))}
                </Carousel>
            </div>

            {/* RODAPÉ */}
            <footer style={{
                maxWidth: '1200px', backgroundColor: '#111', margin: '80px auto 0', padding: '30px', 
                borderTop: '1px solid #333', color: '#888', textAlign: 'center'
            }}>
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ margin: '0 0 10px 0', color: 'white' }}>Siga-nos nas Redes Sociais:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <SocialIcon href={socialMediaLinks.instagram} label="Instagram" iconClass="bi-instagram" />
                        <SocialIcon href={socialMediaLinks.facebook} label="Facebook" iconClass="bi-facebook" />
                        <SocialIcon href={socialMediaLinks.twitter} label="Twitter / X" iconClass="bi-twitter-x" />
                        <SocialIcon href={socialMediaLinks.linkedin} label="Linkedin" iconClass="bi-linkedin" />
                        <SocialIcon href={socialMediaLinks.discord} label="Discord" iconClass="bi-discord" />
                        <SocialIcon href={socialMediaLinks.linktree} label="Linktree" iconClass="bi-tree-fill" />
                    </div>
                </div>
                <p>&copy; {new Date().getFullYear()} SjrPovoaS. Todos os direitos reservados.</p>
            </footer>

            {/* MODAL DE VÍDEO */}
            {modalOpen && (
                <VideoModal
                    url={currentVideoUrl}
                    title={currentVideoTitle}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </main>
    );
}