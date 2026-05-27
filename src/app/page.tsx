'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AssinaturaForm from '@/components/AssinaturaForm';
import InteractiveCard from '@/components/InteractiveCard';
import Carousel from '@/components/Carousel';
import NewsletterForm from '@/components/NewsletterForm';
import "./globals.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ElementosFlutuantes from '@/components/ElementosFlutuantes';

// =======================================================================
// INTERFACES (Contratos de Dados para o Portfólio)
// =======================================================================
interface ProjectItem {
    title: string;
    description: string;
    tag: string;
    result: string;
    iconClass: string;
    targetUrl: string;
    previewImage: string;
}

export default function LandingPagePrincipal() {
    // -------------------------------------------------------------------
    // ESTADOS (Menu Hambúrguer, Modo Escuro e Responsividade)
    // -------------------------------------------------------------------
    const [menuAberto, setMenuAberto] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // Detecta o tamanho da tela dinamicamente no lado do cliente
    useEffect(() => {
        const checarTamanhoTela = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setMenuAberto(false); // Fecha o menu lateral se a tela crescer
            }
        };

        checarTamanhoTela();
        window.addEventListener('resize', checarTamanhoTela);
        return () => window.removeEventListener('resize', checarTamanhoTela);
    }, []);

    const alternarMenu = () => setMenuAberto(!menuAberto);
    const alternarTema = () => setIsDarkMode(!isDarkMode);

    // -------------------------------------------------------------------
    // PALETA DE CORES DINÂMICA (Dark / Light Mode)
    // -------------------------------------------------------------------
    const cores = {
        bgPrincipal: isDarkMode ? '#000000' : '#f8f9fa',
        bgHeader: isDarkMode ? '#0a0a0a' : '#ffffff',
        bgCard: isDarkMode ? '#111113' : '#ffffff',
        bgPortfolio: isDarkMode ? '#16161a' : '#e9ecef',
        textoPrincipal: isDarkMode ? '#ffffff' : '#212529', 
        textoSecundario: isDarkMode ? '#a0a0aa' : '#495057',
        borda: isDarkMode ? '#1e1e22' : '#dee2e6',
        destaque: '#0d6efd',
    };

    // -------------------------------------------------------------------
    // DADOS DO PORTFÓLIO
    // -------------------------------------------------------------------
    const projetos: ProjectItem[] = [
        {
            title: 'Almeida Gomes Paisagismo',
            tag: 'Web Design & Sistema Integrado',
            description: 'Desenvolvimento de portal corporativo robusto com transição completa do amadorismo para uma plataforma de alta autoridade.',
            result: 'Sistema exclusivo de geração de orçamentos e recibos em PDF.',
            iconClass: 'bi-tree',
            targetUrl: 'https://almeidagomespaisagismo.com.br',
            previewImage: '/assets/img/preview-almeida.png'
        },
        {
            title: 'Serralheria e Soldagens',
            tag: 'SEO Local & Landing Page',
            description: 'Criação de página de conversão otimizada para os motores de busca do Google (SEO) com foco em captação geográfica.',
            result: 'Direcionamento estratégico e imediato para o WhatsApp comercial.',
            iconClass: 'bi-nut',
            targetUrl: 'https://serralheriaesoldagens.com.br',
            previewImage: '/assets/img/preview-serralheria.png'
        },
        {
            title: 'Pão de Queijo da Irá',
            tag: 'E-commerce & Automação de Marketing',
            description: 'Arquitetura de funil completo para infoproduto e vendas físicas da tradicional receita de família.',
            result: 'Checkout inteligente integrado com automação de listas no Brevo.',
            iconClass: 'bi-shop',
            targetUrl: 'https://paodequeijodaira.vercel.app',
            previewImage: '/assets/img/preview-pqi.png'
        }
    ];

    const cardStyle: React.CSSProperties = {
        flexShrink: 0,
        width: '250px',
        height: '250px',
        minWidth: '200px',
        backgroundColor: 'cores.bgCard',
        borderRadius: '8px',
        overflow: 'hidden',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        position: 'relative',
        padding: '15px',
        textAlign: 'left',
        color: 'cores.textoPrincipal',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: `1px solid ${cores.borda}`
    };

    const trainingAreas = [
        { title: 'Treinamento Nível 1', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento1.png")' },
        { title: 'Treinamento Nível 1', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento2.png")' },
        { title: 'Treinamento Nível 1', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento3.png")' },
        { title: 'Treinamento Nível 1', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento4.png")' },
        { title: 'Treinamento Nível 1', description: 'Uso de Tecnologia para Celulares.', href: '/login', image: 'url("/assets/img/card-treinamento5.png")' },
    ];

    const vipContentAreas = [
        { title: 'Conteúdo Bônus', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP1.png")' },
        { title: 'Conteúdo Bônus', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP2.png")' },
        { title: 'Conteúdo Bônus', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP3.png")' },
        { title: 'Conteúdo Bônus', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP4.png")' },
        { title: 'Conteúdo Bônus', description: 'Conteúdo exclusivo.', href: '/login', image: 'url("/assets/img/card-suporteVIP5.png")' },
    ];

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
        <Link href={href} target="_blank" style={{
            color: cores.textoPrincipal, opacity: 0.6, fontSize: '1.4em', textDecoration: 'none', transition: 'all 0.2s ease'
        }}
            title={label}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
        >
            <i className={`bi ${iconClass}`}></i>
        </Link>
    );

    return (
        <main style={{ backgroundColor: cores.bgPrincipal, minHeight: '100vh', color: cores.textoPrincipal, fontFamily: 'Arial, sans-serif', transition: 'background-color 0.3s ease, color 0.3s ease' }}>

            {/* ==========================================================
                1. HEADER RESPONSIVO COM SELETOR DE TEMA
                ========================================================== */}
            <div style={{ backgroundColor: cores.bgHeader, borderBottom: `1px solid ${cores.borda}`, position: 'relative', zIndex: 10000 }}>
                <header style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                    
                    {/* BRANDING */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#000000', display: 'flex', justifyContent: 'center', alignItems: 'center', border: `1px solid ${cores.borda}`, overflow: 'hidden' }}>
                            <Link href="/" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src="/assets/img/logo-SjrPovoaS.png" alt="Marca SjrPovoaS" style={{ height: '40px', width: '40px', objectFit: 'contain', borderRadius: '50%' }} />
                            </Link>
                        </div>
                        <span style={{ fontSize: '1.3rem', color: cores.textoPrincipal, fontWeight: 'bold', letterSpacing: '0.5px' }}>
                            SjrPovoaS
                        </span>
                    </div>

                    {/* CONTROLES DIREITOS (DESKTOP NAVEGAÇÃO + CORES) */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        
                        {/* LINKS DE NAVEGAÇÃO DESKTOP */}
                        {!isMobile && (
                            <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                <a href="#portfolio" style={{ color: cores.textoSecundario, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Projetos</a>
                                <a href="#newsletter" style={{ color: cores.textoSecundario, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Newsletter</a>
                                <a href="#treinamentos" style={{ color: cores.textoSecundario, textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>Treinamentos</a>
                                <Link href="/minha-area" style={{ padding: '10px 20px', backgroundColor: cores.destaque, color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(13, 110, 253, 0.25)' }}>
                                    Área Exclusiva
                                </Link>
                            </nav>
                        )}

                        {/* BOTÃO INTERRUPTOR DE TEMA (DARK/LIGHT) */}
                        <button 
                            onClick={alternarTema}
                            style={{ background: 'none', border: 'none', color: cores.textoPrincipal, fontSize: '1.3rem', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s' }}
                            title={isDarkMode ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon-stars'}`}></i>
                        </button>

                        {/* BOTÃO DO MENU HAMBÚRGUER (Apenas visível no mobile) */}
                        {isMobile && (
                            <button
                                onClick={alternarMenu}
                                style={{ background: 'none', border: 'none', color: cores.textoPrincipal, fontSize: '1.8rem', cursor: 'pointer', zIndex: 10002 }}
                                aria-label={menuAberto ? "Fechar Menu" : "Abrir Menu"}
                            >
                                <i className={`bi ${menuAberto ? 'bi-x' : 'bi-list'}`}></i>
                            </button>
                        )}
                    </div>
                </header>

                {/* MENU MÓVEL LATERAL RETRÁTIL */}
                <div style={{
                    position: 'fixed', top: 0, right: 0, width: '280px', height: '100vh',
                    backgroundColor: cores.bgCard, borderLeft: `1px solid ${cores.borda}`,
                    boxShadow: '-10px 0 30px rgba(0,0,0,0.2)', padding: '80px 30px 30px 30px',
                    display: 'flex', flexDirection: 'column', gap: '25px', zIndex: 10001,
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: menuAberto ? 'translateX(0)' : 'translateX(100%)',
                }}>
                    <a href="#portfolio" onClick={() => setMenuAberto(false)} style={{ color: cores.textoPrincipal, textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>
                        <i className="bi bi-folder" style={{ marginRight: '10px', color: cores.destaque }}></i> Projetos
                    </a>
                    <a href="#newsletter" onClick={() => setMenuAberto(false)} style={{ color: cores.textoPrincipal, textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>
                        <i className="bi bi-envelope" style={{ marginRight: '10px', color: cores.destaque }}></i> Newsletter
                    </a>
                    <a href="#treinamentos" onClick={() => setMenuAberto(false)} style={{ color: cores.textoPrincipal, textDecoration: 'none', fontSize: '1.1rem', fontWeight: '500' }}>
                        <i className="bi bi-mortarboard" style={{ marginRight: '10px', color: cores.destaque }}></i> Treinamentos
                    </a>
                    <hr style={{ borderColor: cores.borda, margin: '10px 0' }} />
                    <Link href="/minha-area" onClick={() => setMenuAberto(false)} style={{ padding: '12px', backgroundColor: cores.destaque, color: 'white', textDecoration: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                        Área Exclusiva
                    </Link>
                </div>

                {/* BACKDROP FOSCO DO MENU MOBILE */}
                {menuAberto && (
                    <div onClick={() => setMenuAberto(false)} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)', zIndex: 10000 }} />
                )}
            </div>

            {/* ==========================================================
                2. HERO SECTION
                ========================================================== */}
            <section style={{ maxWidth: '900px', padding: '100px 20px 80px 20px', margin: '0 auto', textAlign: 'center' }}>
                <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '24px', lineHeight: '1.2', color: cores.textoPrincipal, letterSpacing: '-0.5px' }}>
                    Transforme sua presença digital em <span style={{ color: cores.destaque }}>autoridade real</span>.
                </h1>
                <p style={{ fontSize: '1.2rem', color: cores.textoSecundario, maxWidth: '720px', margin: '0 auto 35px', lineHeight: '1.6' }}>
                    Criamos sites profissionais de alta performance, e-mails personalizados e estratégias de conversão cirúrgicas projetadas para o crescimento do seu negócio.
                </p>
                <a href="#portfolio" style={{ padding: '14px 32px', backgroundColor: cores.bgCard, color: cores.destaque, borderRadius: '6px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', border: `1px solid ${cores.borda}`, transition: 'all 0.2s ease', display: 'inline-block' }}>
                    Conhecer Projetos de Sucesso
                </a>
            </section>

            {/* ==========================================================
                3. VITRINE DE PORTFÓLIO
                ========================================================== */}
            <section id="portfolio" style={{ backgroundColor: cores.bgPortfolio, borderTop: `1px solid ${cores.borda}`, borderBottom: `1px solid ${cores.borda}`, padding: '80px 20px', transition: 'background-color 0.3s' }}>
                <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 12px 0', color: cores.textoPrincipal }}>Projetos de Sucesso</h2>
                        <p style={{ color: cores.textoSecundario, fontSize: '1.1rem', margin: 0 }}>Resultados reais desenvolvidos para marcas consolidadas</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '30px' }}>
                        {projetos.map((proj, idx) => (
                            <a
                                key={idx} href={proj.targetUrl} target="_blank" rel="noopener noreferrer"
                                style={{ backgroundColor: cores.bgCard, border: `1px solid ${cores.borda}`, borderRadius: '12px', padding: '20px', transition: 'all 0.3s ease', textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '15px', overflow: 'hidden' }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.borderColor = cores.destaque;
                                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
                                    const img = e.currentTarget.querySelector('.preview-screen') as HTMLElement;
                                    if (img) img.style.transform = 'scale(1.04)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = cores.borda;
                                    e.currentTarget.style.boxShadow = 'none';
                                    const img = e.currentTarget.querySelector('.preview-screen') as HTMLElement;
                                    if (img) img.style.transform = 'scale(1)';
                                }}
                            >
                                {/* SIMULAÇÃO NAVEGADOR */}
                                <div style={{ width: '100%', height: '160px', backgroundColor: isDarkMode ? '#1a1a1e' : '#f1f3f5', borderRadius: '8px', overflow: 'hidden', border: `1px solid ${cores.borda}`, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ height: '24px', backgroundColor: isDarkMode ? '#16161a' : '#e9ecef', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '6px', borderBottom: `1px solid ${cores.borda}` }}>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></span>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></span>
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#27c93f' }}></span>
                                        <span style={{ fontSize: '9px', color: cores.textoSecundario, marginLeft: '10px', fontFamily: 'monospace' }}>{proj.targetUrl.replace('https://', '')}</span>
                                    </div>
                                    <div className="preview-screen" style={{ flex: 1, backgroundImage: `url(${proj.previewImage})`, backgroundColor: isDarkMode ? '#27272a' : '#dee2e6', backgroundSize: 'cover', backgroundPosition: 'top center', transition: 'transform 0.3s ease' }} />
                                </div>

                                {/* TEXTOS CARD */}
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                            <i className={`bi ${proj.iconClass}`} style={{ color: cores.destaque, fontSize: '1.2rem' }}></i>
                                            <span style={{ fontSize: '10px', textTransform: 'uppercase', color: cores.destaque, fontWeight: 'bold', letterSpacing: '1px' }}>{proj.tag}</span>
                                        </div>
                                        <h3 style={{ fontSize: '1.3rem', fontWeight: '700', margin: '0 0 8px 0', color: cores.textoPrincipal }}>{proj.title}</h3>
                                        <p style={{ color: cores.textoSecundario, fontSize: '13.5px', lineHeight: '1.5', margin: '0' }}>{proj.description}</p>
                                    </div>
                                    <div style={{ backgroundColor: isDarkMode ? '#050505' : '#f1f3f5', padding: '12px', borderRadius: '6px', borderLeft: '3px solid #198754', marginTop: '15px' }}>
                                        <span style={{ display: 'block', fontSize: '10px', color: '#198754', fontWeight: 'bold', marginBottom: '2px' }}>RESULTADO:</span>
                                        <p style={{ color: cores.textoPrincipal, fontSize: '12.5px', margin: 0, fontWeight: '500' }}>{proj.result}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================================
                4. NEWSLETTER
                ========================================================== */}
            <section id="newsletter" style={{ backgroundColor: cores.bgPrincipal, padding: '80px 20px', borderBottom: `1px solid ${cores.borda}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 12px 0', color: cores.destaque }}>Newsletter</h2>
                        <p style={{ fontSize: '1.1rem', color: cores.textoSecundario, maxWidth: '650px', margin: '0 auto' }}>Ao baixar seu Guia 3 Dicas de Ouro, você começará a receber mensalmente conteúdo do nosso produto Blindagem Digital gratuitamente.</p>
                    </div>
                </div>
                <NewsletterForm />
            </section>

            {/* ==========================================================
                5. ÁREA EXCLUSIVA (CARROSSEIS)
                ========================================================== */}
            <section id="treinamentos" style={{ padding: '80px 20px' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: '700', margin: '0 0 12px 0', color: cores.textoPrincipal }}>Área Exclusiva</h2>
                        <p style={{ fontSize: '1.1rem', color: cores.textoSecundario }}>Assinantes exclusivos recebem conteúdos sobre proteção de dispositivos móveis.</p>
                    </div>

                    <div style={{ marginBottom: '50px' }}>
                        <Carousel title="🎓 TREINAMENTO NÍVEL 1">
                            {trainingAreas.map((area, index) => (
                                <InteractiveCard key={index} href={area.href} title={area.title} description={area.description} image={area.image} baseStyle={cardStyle} />
                            ))}
                        </Carousel>
                    </div>

                    <div>
                        <Carousel title="🌟 CONTEÚDO BÔNUS">
                            {vipContentAreas.map((area, index) => (
                                <InteractiveCard key={index} href={area.href} title={area.title} description={area.description} image={area.image} baseStyle={cardStyle} />
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>

            {/* ==========================================================
                6. RODAPÉ
                ========================================================== */}
            <footer style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 30px 20px', borderTop: `1px solid ${cores.borda}`, color: cores.textoSecundario, fontSize: '0.85em', textAlign: 'center' }}>
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ margin: '0 0 15px 0', fontSize: '0.95em', color: cores.textoPrincipal, fontWeight: '500' }}>Siga-nos nas Redes Sociais:</p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
                        <SocialIcon href={socialMediaLinks.instagram} label="Instagram" iconClass="bi-instagram" />
                        <SocialIcon href={socialMediaLinks.facebook} label="Facebook" iconClass="bi-facebook" />
                        <SocialIcon href={socialMediaLinks.twitter} label="Twitter / X" iconClass="bi-twitter-x" />
                        <SocialIcon href={socialMediaLinks.linkedin} label="Linkedin" iconClass="bi-linkedin" />
                        <SocialIcon href={socialMediaLinks.discord} label="Discord" iconClass="bi-discord" />
                        <SocialIcon href={socialMediaLinks.linktree} label="Linktree" iconClass="bi-tree-fill" />
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px', fontSize: '12px' }}>
                    <Link href="/termos-de-uso" target="_blank" style={{ color: cores.textoSecundario, textDecoration: 'none' }}>Termos de Uso</Link>
                    <span style={{ color: cores.borda }}>|</span>
                    <Link href="/politica-de-privacidade" target="_blank" style={{ color: cores.textoSecundario, textDecoration: 'none' }}>Política de Privacidade</Link>
                </div>

                <p style={{ margin: '0', fontSize: '11px', color: cores.textoSecundario }}>
                    &copy; 2025-{new Date().getFullYear()} SjrPovoaS. Todos os direitos reservados.
                </p>
            </footer>

            {/* ELEMENTOS FLUTUANTES (Seta para o Topo e WhatsApp) */}
            <ElementosFlutuantes />
        </main>
    );
}