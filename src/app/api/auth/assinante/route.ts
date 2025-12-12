// src/app/api/auth/assinante/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb'; 

const COLLECTION_NAME = 'users';

// ⚠️ CHAVE SECRETA: Deve ser a mesma chave usada para assinar o token no sistema
const JWT_SECRET = process.env.JWT_SECRET || 'chave_secreta_padrao_para_usuarios'; 
const USER_AUTH_COOKIE = 'userToken'; 

export async function POST(request: Request) {
    try {
        const { email, senha } = await request.json();

        if (!email || !senha) {
            return NextResponse.json({ message: 'Email e senha são obrigatórios.' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        const usersCollection = db.collection(COLLECTION_NAME);

        // 1. Encontrar o Usuário pelo Email
        const user = await usersCollection.findOne({ email });

        if (!user) {
            console.log(`❌ Login negado para ${email}: Usuário não encontrado.`);
            return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
        }
        
        // 🚨 2. VERIFICAÇÃO CRÍTICA: Status e Role
        // O usuário não pode ser 'pendente' ou 'admin' para logar como assinante comum.
        if (user.role === 'pendente') {
            return NextResponse.json({ message: 'Sua conta está em análise de pagamento. Aguarde a ativação.' }, { status: 403 });
        }
        
        if (user.role === 'admin') {
            return NextResponse.json({ message: 'Use a área de Login de Administrador.' }, { status: 403 });
        }

        if (user.ativo === false) {
             return NextResponse.json({ message: 'Sua conta está inativa. Contate o suporte.' }, { status: 403 });
        }

        // 3. Comparar a Senha Criptografada (Onde o erro 401 geralmente acontece)
        // Certifica-se que a senha do DB não está faltando (o que causaria um crash)
        if (!user.senha) {
             console.error(`Erro: Usuário ${email} não tem campo de senha.`);
             return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
        }
        
        const isMatch = await bcrypt.compare(senha, user.senha);

        if (!isMatch) {
            console.log(`❌ Login negado para ${email}: Senha incorreta.`);
            return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
        }

        // 4. Gerar JWT (userToken)
        const tokenPayload = {
            userId: user._id.toString(),
            email: user.email,
            role: user.role, // 'assinante_mensal' ou 'assinante_anual'
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '12h' });

        // 5. Configurar o Cookie 'userToken'
        const response = new NextResponse(JSON.stringify({ 
            message: 'Login de assinante bem-sucedido.', 
            success: true 
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

        const cookieOptions = [
            `Max-Age=${60 * 60 * 12}`, // 12 horas
            'Path=/',
            'HttpOnly', 
            'SameSite=Lax',
            process.env.NODE_ENV === 'production' ? 'Secure' : ''
        ].join('; ');

        response.headers.set(
            'Set-Cookie',
            `${USER_AUTH_COOKIE}=${token}; ${cookieOptions}`
        );

        console.log(`✅ Login de assinante (${user.role}) bem-sucedido. Cookie NOME: ${USER_AUTH_COOKIE}`);
        return response;

    } catch (error) {
        console.error('❌ Erro no processamento do login de assinante:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao tentar logar.' }, 
            { status: 500 }
        );
    }
}