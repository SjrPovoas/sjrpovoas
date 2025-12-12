// src/app/api/auth/logout/route.ts

import { NextResponse } from 'next/server';

// 🔑 Cookie para Assinantes (Deve ser o mesmo usado no Login e no Proxy)
const USER_AUTH_COOKIE = 'userToken'; 

export async function GET() {
    try {
        const response = new NextResponse(JSON.stringify({ 
            message: 'Logout bem-sucedido.', 
            success: true
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

        // 🚨 CRÍTICO: Configura o cookie para expirar Imediatamente
        const cookieOptions = [
            'Max-Age=0', // Define a expiração para 0 segundos (expira imediatamente)
            'Path=/',    // Essencial: Deve ser o mesmo Path usado na definição do cookie
            'HttpOnly',  // Mantém a segurança
            'SameSite=Lax',
        ].join('; ');

        // Define o cabeçalho 'Set-Cookie' para limpar o cookie
        response.headers.set(
            'Set-Cookie', 
            `${USER_AUTH_COOKIE}=deleted; ${cookieOptions}`
        );
        
        console.log(`✅ Logout bem-sucedido. Cookie ${USER_AUTH_COOKIE} expirado.`);
        
        return response;

    } catch (error) {
        console.error('❌ Erro no processamento do logout:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao fazer logout.' }, 
            { status: 500 }
        );
    }
}