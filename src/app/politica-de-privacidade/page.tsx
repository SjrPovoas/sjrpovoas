// src/app/politica-de-privacidade/page.tsx

import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
    <Link href={href} target="_blank" style={{ color: '#aaa', fontSize: '1.5em', textDecoration: 'none', transition: 'color 0.3s' }} title={label}>
        <i className={`bi ${iconClass}`}></i>
    </Link>
);

export default function PoliticaDePrivacidadePage() {
    // Conteúdo HTML da Política de Privacidade fornecido pelo usuário
    const politicaHtmlContent = `
        <h2><span style="color: rgb(68, 68, 68);">Política Privacidade</span></h2>
        <p><span style="color: rgb(68, 68, 68);">A sua privacidade é importante para nós. É política do SjrPovoaS | Criamos a solução que você procura respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a href="https://sjrpovoas.vercel.app">SjrPovoaS | Criamos a solução que você procura</a>, e outros sites que possuímos e operamos.</span></p>
        <p><span style="color: rgb(68, 68, 68);">Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.</span></p>
        <p><span style="color: rgb(68, 68, 68);">Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</span></p>
        <p><span style="color: rgb(68, 68, 68);">Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.</span></p>
        <p><span style="color: rgb(68, 68, 68);">O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas&nbsp;</span><a href="https://politicaprivacidade.com/" rel="noopener noreferrer" target="_blank" style="background-color: transparent; color: rgb(68, 68, 68);">políticas de privacidade</a><span style="color: rgb(68, 68, 68);">.</span></p>
        <p><span style="color: rgb(68, 68, 68);">Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.</span></p>
        <p><span style="color: rgb(68, 68, 68);">O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.</span></p>
        <p><span style="color: rgb(68, 68, 68);"><ul><li><span style="color: rgb(68, 68, 68);">O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.</span></li><li><span style="color: rgb(68, 68, 68);">Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.</span></li><li><span style="color: rgb(68, 68, 68);">Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.</span></li><li><span style="color: rgb(68, 68, 68);">Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.</span></li></ul><p><br></p></span></p>
        
        <h3><span style="color: rgb(68, 68, 68);">Compromisso do Usuário</span></h3>
        <p><span style="color: rgb(68, 68, 68);">O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o SjrPovoaS | Criamos a solução que você procura oferece no site e com caráter enunciativo, mas não limitativo:</span></p>
        <ul>
            <li><span style="color: rgb(68, 68, 68);">A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;</span></li>
            <li><span style="color: rgb(68, 68, 68);">B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;</span></li>
            <li><span style="color: rgb(68, 68, 68);">C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do SjrPovoaS | Criamos a solução que você procura, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.</span></li>
        </ul>
        
        <h3><span style="color: rgb(68, 68, 68);">Mais informações</span></h3>
        <p><span style="color: rgb(68, 68, 68);">Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.</span></p>
        
        <p><span style="color: rgb(68, 68, 68);">Esta política é efetiva a partir de&nbsp;12 December 2025 18:33</span></p>
    `;

    // Estilos básicos para o container (mantendo a consistência com os Termos)
    const containerStyle: React.CSSProperties = {
        maxWidth: '800px',
        margin: '40px auto',
        padding: '30px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#fff',
        lineHeight: '1.6'
    };

    return (
        <div style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '30px' }}>Política de Privacidade</h1>
            {/* Renderiza o conteúdo HTML */}
            <div dangerouslySetInnerHTML={{ __html: politicaHtmlContent }} />
            {/* --- RODAPÉ COM MÍDIAS SOCIAIS --- */}
            <footer
                style={{
                    maxWidth: '1200px', backgroundColor: 'white', margin: '80px auto 0', padding: '30px',
                    color: '#888', fontSize: '0.9em', textAlign: 'center'
                }}
            >
                <div style={{ marginBottom: '20px' }}>
                    <p style={{ margin: '0 0 10px 0', fontSize: '1em', color: '#888' }}>Siga-nos nas Redes Sociais:</p>
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
                    <Link href="/termos-de-uso" style={{ color: '#888', textDecoration: 'none' }}>
                        Termos de Uso
                    </Link>
                    <Link href="/politica-de-privacidade" style={{ color: '#888', textDecoration: 'none' }}>
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
        </div>
    );
}