// src/app/api/auth/logout-admin/route.ts

import { NextResponse } from 'next/server';

// 🔑 Cookie para Administradores
const ADMIN_AUTH_COOKIE = 'adminToken'; 

export async function GET() {
    try {
        const response = new NextResponse(JSON.stringify({ 
            message: 'Logout de Admin bem-sucedido.', 
            success: true
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

        // 🚨 CRÍTICO: Configura o cookie para expirar Imediatamente
        const cookieOptions = [
            'Max-Age=0', 
            'Path=/',    // Essencial para limpar o cookie em todo o domínio
            'HttpOnly',  
            'SameSite=Lax',
        ].join('; ');

        // Define o cabeçalho 'Set-Cookie' para limpar o cookie 'adminToken'
        response.headers.set(
            'Set-Cookie', 
            `${ADMIN_AUTH_COOKIE}=deleted; ${cookieOptions}`
        );
        
        console.log(`✅ Logout de Admin bem-sucedido. Cookie ${ADMIN_AUTH_COOKIE} expirado.`);
        
        return response;

    } catch (error) {
        console.error('❌ Erro no processamento do logout de admin:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao fazer logout de admin.' }, 
            { status: 500 }
        );
    }
}