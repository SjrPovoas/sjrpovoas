import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// --- CONFIGURAÇÃO DE ROTAS E COOKIES ---
const ADMIN_LOGIN_ROUTE = '/admin/login';
const USER_LOGIN_ROUTE = '/login'; // Rota de login do assinante

const ADMIN_AUTH_COOKIE = 'adminToken'; // Cookie para administradores
const USER_AUTH_COOKIE = 'userToken'; // Cookie para assinantes

// Rotas protegidas (Admin)
const adminProtectedRoutes = ['/admin/dashboard', '/admin/pagamentos']; 

// Rotas protegidas (Assinantes)
const userProtectedRoutes = ['/minha-area', '/aulas', '/conteudo-exclusivo']; 
// ----------------------------------------

export function proxy(request: NextRequest) { 
    const pathname = request.nextUrl.pathname;
    
    // 1. Coletar Tokens
    const adminToken = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
    const userToken = request.cookies.get(USER_AUTH_COOKIE)?.value;

    const isAdminRoute = adminProtectedRoutes.some(route => 
        pathname.startsWith(route)
    );
    const isUserRoute = userProtectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // --- A. LÓGICA DE ADMIN (PRIORIDADE) ---
    if (isAdminRoute) {
        if (!adminToken) {
            const url = request.nextUrl.clone();
            url.pathname = ADMIN_LOGIN_ROUTE;
            console.log(`[PROXY ADMIN] Acesso negado. Token ${ADMIN_AUTH_COOKIE} ausente. Redirecionando para ${ADMIN_LOGIN_ROUTE}`);
            return NextResponse.redirect(url);
        }
        console.log(`[PROXY ADMIN] Token OK. Acesso permitido a ${pathname}`);
        return NextResponse.next();
    }

    // --- B. LÓGICA DE ASSINANTE ---
    if (isUserRoute) {
        if (!userToken) {
            const url = request.nextUrl.clone();
            url.pathname = USER_LOGIN_ROUTE;
            console.log(`[PROXY USER] Acesso negado. Token ${USER_AUTH_COOKIE} ausente. Redirecionando para ${USER_LOGIN_ROUTE}`);
            return NextResponse.redirect(url);
        }
        console.log(`[PROXY USER] Token OK. Acesso permitido a ${pathname}`);
        return NextResponse.next();
    }
    
    // --- C. LÓGICA DE LOGIN (Prevenção de loop infinito) ---
    // Se o usuário já tem o token, redireciona da página de login.
    if (pathname === ADMIN_LOGIN_ROUTE && adminToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/dashboard';
        return NextResponse.redirect(url);
    }

    if (pathname === USER_LOGIN_ROUTE && userToken) {
        const url = request.nextUrl.clone();
        url.pathname = '/minha-area'; // Redireciona para a área exclusiva
        return NextResponse.redirect(url);
    }


    // --- D. Rota Pública/Padrão ---
    return NextResponse.next();
}

// ⚠️ IMPORTANTE: O matcher deve cobrir todas as rotas que você deseja proteger
export const config = {
    matcher: ['/admin/:path*', '/minha-area/:path*', '/aulas/:path*', '/conteudo-exclusivo/:path*', '/login'],
};