// src/app/termos-de-servico/page.tsx

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

export default function TermosDeServicoPage() {
    // ⚠️ Importante: O texto que você forneceu já está formatado
    // com tags HTML (h2, p, ol, li, strong, span style, etc.).
    // Para renderizar este HTML puro com segurança no React,
    // precisamos usar a propriedade 'dangerouslySetInnerHTML'.

    // O texto foi limpo das tags <h2> e <p> HTML que já estavam
    // no começo/fim para evitar duplicidade, mas o restante foi mantido.
    const termosHtmlContent = `
        <h2><span style="color: rgb(68, 68, 68);">1. Termos</span></h2>
        <p><span style="color: rgb(68, 68, 68);">Ao acessar ao site <a href="https://sjrpovoas.vercel.app">SjrPovoaS | Criamos a solução que você procura</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</span></p>
        
        <h2><span style="color: rgb(68, 68, 68);">2. Uso de Licença</span></h2>
        <p><span style="color: rgb(68, 68, 68);">É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site SjrPovoaS | Criamos a solução que você procura , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:&nbsp;</span></p>
        <ol>
            <li><span style="color: rgb(68, 68, 68);">modificar ou copiar os materiais;&nbsp;</span></li>
            <li><span style="color: rgb(68, 68, 68);">usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);&nbsp;</span></li>
            <li><span style="color: rgb(68, 68, 68);">tentar descompilar ou fazer engenharia reversa de qualquer software contido no site SjrPovoaS | Criamos a solução que você procura;&nbsp;</span></li>
            <li><span style="color: rgb(68, 68, 68);">remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou&nbsp;</span></li>
            <li><span style="color: rgb(68, 68, 68);">transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</span></li>
        </ol>
        <p><span style="color: rgb(68, 68, 68);">Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por SjrPovoaS | Criamos a solução que você procura a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</span></p>
        
        <h2><span style="color: rgb(68, 68, 68);">3. Isenção de responsabilidade</span></h2>
        <ol>
            <li><span style="color: rgb(68, 68, 68);">Os materiais no site da SjrPovoaS | Criamos a solução que você procura são fornecidos 'como estão'. SjrPovoaS | Criamos a solução que você procura não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</span></li>
            <li><span style="color: rgb(68, 68, 68);">Além disso, o SjrPovoaS | Criamos a solução que você procura não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</span></li>
        </ol>
        
        <h2><span style="color: rgb(68, 68, 68);">4. Limitações</span></h2>
        <p><span style="color: rgb(68, 68, 68);">Em nenhum caso o SjrPovoaS | Criamos a solução que você procura ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em SjrPovoaS | Criamos a solução que você procura, mesmo que SjrPovoaS | Criamos a solução que você procura ou um representante autorizado da SjrPovoaS | Criamos a solução que você procura tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</span></p>
        
        <h2><span style="color: rgb(68, 68, 68);">5. Precisão dos materiais</span></h2>
        <p><span style="color: rgb(68, 68, 68);">Os materiais exibidos no site da SjrPovoaS | Criamos a solução que você procura podem incluir erros técnicos, tipográficos ou fotográficos. SjrPovoaS | Criamos a solução que você procura não garante que qualquer material em seu site seja preciso, completo ou atual. SjrPovoaS | Criamos a solução que você procura pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, SjrPovoaS | Criamos a solução que você procura não se compromete a atualizar os materiais.</span></p>
        
        <h2><span style="color: rgb(68, 68, 68);">6. Links</span></h2>
        <p><span style="color: rgb(68, 68, 68);">O SjrPovoaS | Criamos a solução que você procura não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por SjrPovoaS | Criamos a solução que você procura do site. O uso de qualquer site vinculado é por conta e risco do usuário.</span></p>
        
        <p><br></p>
        
        <h3><span style="color: rgb(68, 68, 68);">Modificações</span></h3>
        <p><span style="color: rgb(68, 68, 68);">O SjrPovoaS | Criamos a solução que você procura pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</span></p>
        
        <h3><span style="color: rgb(68, 68, 68);">Lei aplicável</span></h3>
        <p><span style="color: rgb(68, 68, 68);">Estes termos e condições são regidos e interpretados de acordo com as leis do SjrPovoaS | Criamos a solução que você procura e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</span></p>
    `;

    // Estilos básicos para o container
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
            <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '30px' }}>Termos de Serviço</h1>
            {/* Renderiza o conteúdo HTML, incluindo estilos e links */}
            <div dangerouslySetInnerHTML={{ __html: termosHtmlContent }} />
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