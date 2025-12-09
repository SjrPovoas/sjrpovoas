// src/app/dashboard/page.tsx

import React from 'react';
import Link from 'next/link';
import InteractiveCard from '@/components/InteractiveCard';
import Carousel from '@/components/Carousel';
import { AlignCenterHorizontal, Target } from 'lucide-react';

// =======================================================================
// ESTILOS E DADOS
// =======================================================================

const cardStyle: React.CSSProperties = {
  // Ajuste de width e minWidth para que o carrossel funcione bem
  flexShrink: 0,
  width: '250px',
  height: '150px',
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

// Dados separados por seção para o carrossel
const trainingAreas = [
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-treinamento1.png")', Target: '_blank' },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-treinamento2.png")', Target: '_blank'  },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-treinamento3.png")', Target: '_blank'  },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-treinamento4.png")', Target: '_blank'  },
  { title: 'Treinamento Rápido', description: 'Uso de Tecnologia para Celulares.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-treinamento5.png")', Target: '_blank'  },
];

const vipContentAreas = [
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-suporteVIP1.png")', Target: '_blank'  },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-suporteVIP2.png")', Target: '_blank'  },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-suporteVIP3.png")', Target: '_blank'  },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-suporteVIP4.png")', Target: '_blank'  },
  { title: 'Conteúdo VIP', description: 'Conteúdo exclusivo.', href: 'https://youtube.com/@sjrpovoas', image: 'url("/assets/img/card-suporteVIP5.png")', Target: '_blank'  },
];

// URLs para mídias sociais
const socialMediaLinks = {
  instagram: 'https://www.instagram.com/silviopovoasjunior/',
  facebook: 'https://www.facebook.com/sjrpovoas',
  twitter: 'https://www.twitter.com/sjrpovaoas',
  linkedin: 'https://www.linkedin.com/in/sjrpovoas',
  discord: 'https://discord.com/invite/8QKN7R5dt5',
  linktree: 'https://linktr.ee/sjrpovoas',
};

// =======================================================================
// NOVO COMPONENTE SOCIALICON USANDO CLASSES DO BOOTSTRAP ICONS
// =======================================================================
interface SocialIconProps {
  href: string;
  label: string;
  iconClass: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ href, label, iconClass }) => (
  <Link
    href={href}
    target="_blank"
    style={{
      color: '#aaa', // Cor dos ícones
      fontSize: '1.5em',
      textDecoration: 'none',
      transition: 'color 0.3s' // Efeito de transição
    }}
    title={label}>
      <i className={`bi ${iconClass}`}></i>
  </Link>
);

// =======================================================================
// COMPONENTE PRINCIPAL
// =======================================================================


export default function UserDashboardPage() {
  return (
    <main style={{ backgroundColor: '#000', minHeight: '100vh', padding: '30px 10px 10px 10px' }}>
    <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>🛠️ Painel de Controle Exclusivo 🔒</h2>
            <hr style={{ borderColor: '#555', margin: '15px 0' }} />
            
            <p>Bem-vindo à área exclusiva, assinante!</p>
            <p>Aqui você encontrará informações e conteúdos restritos.</p>
            
            <h3 style={{ marginTop: '20px', fontSize: '1.1em' }}>Geradores e Documentos:</h3>
    </div>

// FAZENDO A INCLUSÃO DA ÁREA DO ASSINANTE

      {/* HEADER: LOGOMARCA E BOTÃO DE LOGIN */}
      <header style={{
        maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', paddingBottom: '20px', borderBottom: '1px solid #333'
      }}>
        <Link href="/">
          <img src="/assets/img/marca-SjrPovoaS.png" alt="Marca SjrPovoaS"
            style={{ height: '60px', objectFit: 'contain' }} />
        </Link>

        {/* 🚀 CALL TO ACTION (CTA) */}
        <div style={{
          marginTop: '20px', padding: '10px', backgroundColor: '#333', borderRadius: '8px', textAlign: 'center' }}>
          {/* Botão Área Exclusiva STATUS LOGADO */}
          <Link href="/"
            style={{
              display: 'inline-block',
              padding: '10px 15px',
              backgroundColor: '#0070f3',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: 'bold',
            }}
          >
            Logado!
          </Link>
        </div>
      </header>


      {/* TÍTULO, INTRODUÇÃO E CTA - Seção Principal */}
      <div style={{ maxWidth: '1200px', margin: '60px auto 30px', color: 'white', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Criamos a solução que você procura</h1>

        {/* CTA Block Principal */}
        <div style={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#333',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 style={{ fontSize: '1.2em', fontWeight: '400', color: '#aaa', margin: 0 }}>
            Acesso a conteúdos explicativos, interessantes e divertidos para usuários exclusivos.
          </h2>
        </div>
      </div>


      {/* ÁREA DOS CARROSSEIS */}
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* CARROSSEL 1: TREINAMENTO RÁPIDO */}
        <Carousel title="🎓 Treinamento Rápido">
          {trainingAreas.map((area, index) => (
            <InteractiveCard
              key={index}
              href={area.href}
              title={area.title}
              description={area.description}
              image={area.image}
              baseStyle={cardStyle}
            />
          ))}
        </Carousel>

        {/* CARROSSEL 2: CONTEÚDO VIP */}
        <Carousel title="🌟 Conteúdo VIP">
          {vipContentAreas.map((area, index) => (
            <InteractiveCard
              key={index}
              href={area.href}
              title={area.title}
              description={area.description}
              image={area.image}
              baseStyle={cardStyle}
            />
          ))}
        </Carousel>

      </div>
      {/* Fim da Área dos Carrosseis */}

      {/* --- RODAPÉ COM MÍDIAS SOCIAIS --- */}
      <footer
        style={{
          maxWidth: '1200px', backgroundColor: '#444', margin: '80px auto 0', padding: '30px auto 0', borderTop: '1px solid #333',
          color: '#888', fontSize: '0.9em', textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '20px' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '1em', color: 'white' }}>Siga-nos nas Redes Sociais:</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {/* Ícones do Bootstrap Icons */}
            <SocialIcon href={socialMediaLinks.instagram} label="Instagram" iconClass="bi-instagram" />
            <SocialIcon href={socialMediaLinks.facebook} label="Facebook" iconClass="bi-facebook" />
            <SocialIcon href={socialMediaLinks.twitter} label="Twitter / X" iconClass="bi-twitter-x" /> {/* Ícone atualizado para 'X' */}
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

    </main>
  );
}