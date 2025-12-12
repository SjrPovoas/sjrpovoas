// src/app/logout/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
    const router = useRouter();

    useEffect(() => {
        const performLogout = async () => {
            // Chama a rota de API de Logout para limpar o cookie
            const response = await fetch('/api/auth/logout', { method: 'GET' });
            
            // Não precisamos verificar se response.ok, pois o cookie é limpo 
            // no cabeçalho Set-Cookie, independentemente do corpo.
            
            console.log('Cliente: Cookie de sessão limpo. Redirecionando...');
            
            // 🚀 Redireciona o usuário para a página de login
            router.push('/login'); 
            
            // Força o Next.js a revalidar as rotas
            router.refresh(); 
        };

        performLogout();
    }, [router]);

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            <h1>Saindo da sua conta...</h1>
            <p>Se você não for redirecionado em alguns segundos, clique <a href="/login">aqui</a>.</p>
        </div>
    );
}