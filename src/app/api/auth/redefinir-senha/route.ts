// src/app/api/auth/redefinir-senha/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; 
import bcrypt from 'bcryptjs'; // Certifique-se de que esta dependência está instalada

export async function POST(request: NextRequest) {
    try {
        const { token, novaSenha } = await request.json();

        if (!token || !novaSenha) {
            return NextResponse.json({ message: 'Token e nova senha são obrigatórios.' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users');
        
        // 1. Procurar o usuário pelo Token e verificar a expiração
        const user = await usersCollection.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: new Date() } // Verifica se o token não expirou
        });

        if (!user) {
            // Retorna erro se o token for inválido ou se já expirou
            return NextResponse.json({ message: 'Token inválido ou expirado.' }, { status: 401 });
        }

        // 2. Hash da Nova Senha
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(novaSenha, salt);

        // 3. Atualizar a Senha e Limpar os Campos do Token
        await usersCollection.updateOne(
            { _id: user._id },
            { $set: { 
                senha: senhaHash,
                // Limpa os campos de recuperação após o uso
                resetPasswordToken: null, 
                resetPasswordExpires: null 
            }}
        );

        return NextResponse.json({ message: 'Senha redefinida com sucesso.' }, { status: 200 });

    } catch (error) {
        console.error('❌ Erro na redefinição de senha:', error);
        return NextResponse.json({ message: 'Erro interno do servidor.' }, { status: 500 });
    }
}