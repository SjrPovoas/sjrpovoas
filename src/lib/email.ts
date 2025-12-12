// src/lib/email.ts

import nodemailer from 'nodemailer';

// ⚠️ SUBSTITUA PELAS SUAS CREDENCIAIS SMTP
// Exemplo: Usando o serviço Brevo, SendGrid ou um servidor SMTP configurado.
const transporter = nodemailer.createTransport({
    // Se for usar um serviço como Brevo, a URL ou host e porta serão fornecidos por eles
    host: process.env.SMTP_HOST, // Ex: 'smtp-relay.sendinblue.com' ou 'smtp.gmail.com'
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true para 465, false para outras portas (como 587)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

/**
 * Envia o e-mail de recuperação de senha.
 * @param targetEmail - O e-mail do destinatário.
 * @param resetLink - O link único para redefinição de senha.
 */
export async function sendPasswordResetEmail(targetEmail: string, resetLink: string) {
    const companyName = "SjrPovoaS | Criamos a solução que você procura";
    const logoUrl = "https://sjrpovoas.vercel.app/assets/img/logo-SjrPovoaS.png"; 

    // O HTML que contém o logo e o link (já havíamos definido)
    const emailHtml = `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; max-width: 600px; margin: auto;">
            <div style="text-align: center; margin-bottom: 20px;">
                <img src="${logoUrl}" alt="Logo ${companyName}" style="width: 80px; height: 80px; border-radius: 50%;">
            </div>
            <h2 style="color: #0070f3;">Redefinição de Senha</h2>
            <p>Olá,</p>
            <p>Você solicitou a redefinição da sua senha. Clique no link abaixo para criar uma nova senha:</p>
            <p style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" style="background-color: #f39c12; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Redefinir Minha Senha
                </a>
            </p>
            <p>Este link expirará em 1 hora por motivos de segurança.</p>
            <p>Se você não solicitou esta alteração, ignore este email.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="font-size: 0.8em; color: #777;">Atenciosamente, <br>${companyName}</p>
        </div>
    `;

    // Opções de e-mail
    const mailOptions = {
        from: `"${companyName}" <${process.env.EMAIL_FROM}>`, // ⚠️ Configurar EMAIL_FROM no .env
        to: targetEmail,
        subject: "Redefinição de Senha - SjrPovoaS",
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ E-mail de redefinição enviado com sucesso para: ${targetEmail}`);
    } catch (error) {
        console.error('❌ ERRO REAL AO ENVIAR E-MAIL:', error);
        throw new Error('Falha ao enviar e-mail de recuperação.');
    }
}