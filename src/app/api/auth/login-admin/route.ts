// src/app/api/auth/login-admin/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb'; 

// Nome da coleção que contém o registro de usuários
const COLLECTION_NAME = 'users';

// Variáveis de ambiente
// ⚠️ ATENÇÃO: Use uma chave secreta forte no seu .env.local
const JWT_SECRET = process.env.JWT_SECRET || 'chave_muito_secreta_padrao_admin'; 
const ADMIN_AUTH_COOKIE = 'adminToken'; 

export async function POST(request: Request) {
    try {
        const { email, senha } = await request.json();

        if (!email || !senha) {
            return NextResponse.json({ message: 'Email e senha são obrigatórios.' }, { status: 400 });
        }

        // 1. Conexão ao DB
        const { db } = await connectToDatabase();
        const usersCollection = db.collection(COLLECTION_NAME);

        // 2. Encontrar o Usuário E verificar se é Admin
        const adminUser = await usersCollection.findOne({ 
            email, 
            role: 'admin' // 🚨 Filtra apenas por usuários que tenham explicitamente a role 'admin'
        });

        if (!adminUser) {
            console.log(`❌ Tentativa de login negada para ${email}: Usuário não encontrado ou não é Admin.`);
            return NextResponse.json({ message: 'Credenciais inválidas ou acesso não autorizado.' }, { status: 401 });
        }
        
        // 3. Comparar a Senha Criptografada
        const isMatch = await bcrypt.compare(senha, adminUser.senha);

        if (!isMatch) {
            console.log(`❌ Tentativa de login negada para ${email}: Senha incorreta.`);
            return NextResponse.json({ message: 'Credenciais inválidas.' }, { status: 401 });
        }

        // 4. Gerar JWT para o Admin
        const tokenPayload = {
            userId: adminUser._id.toString(), // Converter ObjectId para string
            email: adminUser.email,
            role: adminUser.role, 
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' }); 

        // 5. Configurar o Cookie 'adminToken'
        const response = new NextResponse(JSON.stringify({ 
            message: 'Login de Admin bem-sucedido.', 
            success: true,
            // Não enviar o token no corpo, apenas no cookie!
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

        const cookieOptions = [
            `Max-Age=${60 * 60}`, // 1 hora em segundos
            'Path=/',
            'HttpOnly', 
            'SameSite=Lax',
            process.env.NODE_ENV === 'production' ? 'Secure' : ''
        ].join('; ');

        response.headers.set(
            'Set-Cookie',
            `${ADMIN_AUTH_COOKIE}=${token}; ${cookieOptions}`
        );

        console.log(`✅ Login de Admin bem-sucedido. Cookie NOME: ${ADMIN_AUTH_COOKIE}`);
        return response;

    } catch (error) {
        console.error('❌ Erro no processamento do login de Admin:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao tentar logar Admin.' }, 
            { status: 500 }
        );
    }
}