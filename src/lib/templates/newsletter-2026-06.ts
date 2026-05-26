// Template de E-mail Dinâmico para a SjrPovoaS
export const newsletterSeguranca = (nome: string, linkDescadastrar: string) => {
    return `
    <!DOCTYPE html>
    <html lang="pt-BR" prefix="og: https://ogp.me/ns#">
    
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
      <meta name="format-detection" content="telephone=no">
      <meta name="title" content="SjrPovoaS - Soluções Digitais">
      <meta name="author" content="SjrPovoaS">
      <meta name="description" content="Dicas de Segurança Digital SjrPovoaS">
      <meta name="Keywords" content="Dicas de Segurança Digital SjrPovoaS">
      <meta name="skype_toolbar" content="skype_toolbar_parser_compatible">
      <meta name="robots" content="follow, index">
      <meta name="googlebot" content="all">
      <meta name="google-site-verification" content="">
      <link rel="icon" sizes="32x32" href="/public/assets/img/favicon.ico">
      <link rel="icon" sizes="192x192" href="/public/assets/img/favicon.ico">
      <link rel="apple-touch-icon" type="image/x-icon" href="/public/assets/img/favicon.ico">
      <link rel="shortcut icon" type="image/x-icon" href="/public/assets/img/favicon.ico">
      <link rel="mask-icon" href="/public/assets/img/favicon.ico">
      <link rel="canonical" href="https://sjrpovoas.vercel.app/dashboard/dicas-de-seguranca.html/">
      <!-- Open Graph tags are also recommended -->
      <meta property="og:locale" content="pt_BR">
      <meta property="og:type" content="website">
      <meta property="og:site_name" content="SjrPovoaS - Soluções Digitais">
      <meta property="og:url"
          content="https://sjrpovoas.vercel.app/dashboard/dicas-de-seguranca.html/">
      <meta property="og:image" content="https://sjrpovoas.vercel.app/assets/img/logo-SjrPovoaS.png">
      <meta name="og:image:width" content="1200">
      <meta name="og:image:height" content="630">
      <meta property="og:title" content="SjrPovoaS - Soluções Digitais">
      <meta property="og:description" content="Dicas de Segurança Digital SjrPovoaS">
      <title>Dicas de Segurança Digital SjrPovoaS</title>
      </head>
      
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f4;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.15);">
              <tr>
                  <td align="center" style="padding: 40px 0; background-color: #0070f3;">
                      <img src="https://sjrpovoas.vercel.app/assets/img/logo-SjrPovoaS.png" alt="SjrPovoaS" width="80" height="80" style="display: block; border-radius: 50%; border: 3px solid #ffffff;">
                      <h1 style="color: #ffffff; margin-top: 15px; font-size: 26px; letter-spacing: 1px;">SjrPovoaS</h1>
                      <p style="color: #d1e7ff; margin: 5px 0 0; font-size: 14px;">Criamos a solução que você procura</p>
                  </td>
              </tr>
              
              <tr>
                  <td style="padding: 40px 35px; color: #333333; line-height: 1.8;">
                      <h2 style="color: #0070f3; margin-top: 0; font-size: 22px;">📱 Seu celular está seguro?</h2>
                      <p style="font-size: 16px;">Olá, <strong>${nome}</strong>!</p>
                      <p>Por que estou te enviando isso?</p>
                      <p>Na <strong>SjrPovoaS</strong>, nossa missão é garantir que você use a tecnologia sem riscos. Separamos 3 dicas essenciais para hoje:</p>
                      <p>Meu nome é <strong>Silvio Povoas (SjrPovoaS)</strong>. Eu ajudo empreendedores a transformarem sua presença na internet em autoridade real.</p>
                      <p>Sites lentos ou sem identidade afastam clientes. Eu desenvolvo soluções digitais, como as que criei para a Almeida Gomes Paisagismo, a Serralheria e Soldagens e o Pão de Queijo da Irá.</p>

                      <p>Como prometido, aqui estão as 3 Dicas de Ouro para você blindar seu dispositivo agora mesmo:</p>
                      
                      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                          <ul style="padding-left: 5px; list-style: none; margin: 0;">
                              <li style="margin-bottom: 12px;"><strong>🔐 CHIP:</strong> Proteja seu Chip (PIN do SIM): Se alguém roubar seu celular e colocar seu chip em outro aparelho, eles podem receber seus SMS de recuperação de banco. Ação: Vá em Configurações > Segurança > Bloqueio do cartão SIM e ative o PIN.</li>
                              <li style="margin-bottom: 12px;"><strong>🛡️ NOTIFICAÇÕES:</strong> Esconda as Notificações: Não deixe que códigos de segurança apareçam na tela bloqueada. Ação: Nas configurações de tela/notificações, marque para "Ocultar conteúdo sensível" na tela de bloqueio.</li>
                              <li style="margin-bottom: 0;"><strong>🌐 E-MAIL:</strong> O E-mail "Cofre": Nunca use como e-mail de recuperação uma conta que está logada no próprio celular. Ação: Crie um e-mail apenas para emergências e mantenha-o logado apenas em um dispositivo seguro em sua casa.</li>
                          </ul>
                      </div>
    
                      <p>Quer profissionalizar sua presença digital hoje?</p>
                      <p>Responda a este e-mail ou clique no botão abaixo para conversarmos no WhatsApp.</p>
                       
                      <p>Forte abraço,</p>
                      
                      <p>Silvio Povoas</p>
                      <p>SjrPovoaS - Soluções Digitais</p>

                      <p style="margin-top: 35px; text-align: center;">
                          <a href="https://sjrpovoas.vercel.app/minha-area" style="background-color: #0070f3; color: #ffffff; padding: 16px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 6px rgba(0,112,243,0.3);">Proteger Meus Dados Agora</a>
                      </p>
                  </td>
              </tr>
    
              <tr>
                <td align="center" style="padding: 20px; background-color: #444; color: white; font-size: 0.8rem;">
                    <p style="color: white; font-size: 1rem; margin: 10px 0;">Siga-nos nas redes sociais:</p>
                      <p style="margin: 10px auto 20px;">
                        <a href="https://instagram.com/silviopovoasjunior" style="color: #aaa; text-decoration: none;">Instagram</a> | 
                        <a href="https://facebook.com/sjrpovoas" style="color: #aaa; text-decoration: none;" target="_blank" title="Facebook">Facebook</a> |
                        <a href="https://x.com/sjrpovoas" style="color: #aaa; text-decoration: none;" target="_blank" title="Twitter / X">Twitter / X</a> |
                        <a href="https://www.linkedin.com/in/sjrpovoas" style="color: #aaa; text-decoration: none;" target="_blank" title="Linkedin">Linkedin</a> |
                        <a href="https://discord.com/invite/8QKN7R5dt5" style="color: #aaa; text-decoration: none;" target="_blank" title="Discord">Discord</a> |
                        <a href="https://linktr.ee/sjrpovoas" style="color: #aaa; text-decoration: none;" target="_blank" title="Linktr.ee">Linktr.ee</a>
                      </p>
                      <p style="border-top: 1px solid #eeeeee; padding-top: 15px;"><a href="https://sjrpovoas.vercel.app" style="color: #888; text-decoration: none;" target="_blank">&copy; 2025-${new Date().getFullYear()} SjrPovoaS. Todos os direitos reservados.</a></p>
                      <p style="color: #888; margin-top: 10px;">
                          Recebeu por engano? <a href="${linkDescadastrar}" style="color: #888; text-decoration: underline;">Remover meu e-mail</a>
                    </p>
                </td>
              </tr>
          </table>
      </body>
      </html>
    `;
};