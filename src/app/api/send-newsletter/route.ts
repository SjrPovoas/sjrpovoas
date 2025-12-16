// src/app/api/send-newsletter/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { newsletterSeguranca } from '@/lib/templates/newsletter';

export async function POST(request: Request) {
    try {
        const { email, nome } = await request.json();
        console.log("USUARIO:", process.env.EMAIL_USER);
        console.log("SENHA DEFINIDA?:", !!process.env.EMAIL_PASS);
        // Configuração do Transportador (Ajuste com seu SMTP)
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use 'service' para facilitar a configuração
            auth: {
                user: process.env.EMAIL_USER, // Deve bater com o .env.local
                pass: process.env.EMAIL_PASS, // Deve bater com o .env.local
            },
        });

        // Gerando o HTML através da função que criamos no arquivo anterior
        // Isso resolve o erro "Cannot find name templateHtml"
        const htmlFinal = newsletterSeguranca(nome, "https://sjrpovoas.vercel.app/descadastrar");

        const info = await transporter.sendMail({
            from: '"SjrPovoaS" <0xsjrpovoas@gmail.com>',
            to: email, // Usando o email recebido no corpo do POST
            subject: "📱 Seu celular está seguro? 3 dicas que ninguém te conta",
            html: htmlFinal,
        });

        return NextResponse.json({ message: "Newsletter enviada com sucesso!", id: info.messageId });
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        return NextResponse.json({ message: "Falha ao enviar e-mail" }, { status: 500 });
    }
}