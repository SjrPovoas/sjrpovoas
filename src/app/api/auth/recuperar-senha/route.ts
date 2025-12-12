// src/app/api/auth/recuperar-senha/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; 
// ✅ IMPORTAÇÃO DA FUNÇÃO REAL DE ENVIO
import { sendPasswordResetEmail } from '@/lib/email'; 

// ⚠️ REMOVA a função async function sendPasswordResetEmail(email: string, resetLink: string)
// que estava aqui, pois ela agora está no '@/lib/email'.

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email é obrigatório.' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users');
        
        const user = await usersCollection.findOne({ email });

        if (!user) {
            // Retorna sucesso por segurança
            return NextResponse.json({ message: 'Solicitação processada.' });
        }

        // ... (Lógica de Geração e Salvamento de Token - Não muda)
        const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const tokenExpiry = new Date(Date.now() + 3600000); 

        await usersCollection.updateOne(
            { email: email },
            { $set: { 
                resetPasswordToken: resetToken, 
                resetPasswordExpires: tokenExpiry 
            }}
        );

        // 4. Construir e ENVIAR O E-MAIL REAL
        const origin = request.headers.get('origin') || 'http://localhost:3000'; 
        const resetLink = `${origin}/redefinir-senha/${resetToken}`;
        
        // ✅ CHAMA A FUNÇÃO REAL DE ENVIO AGORA
        await sendPasswordResetEmail(email, resetLink); 

        // 5. Sucesso
        return NextResponse.json({ message: 'Solicitação processada.' });

    } catch (error) {
        console.error('❌ Erro na recuperação de senha:', error);
        // Retorna 500 se o Nodemailer falhar
        return NextResponse.json({ message: 'Erro interno do servidor ao enviar o e-mail.' }, { status: 500 });
    }
}