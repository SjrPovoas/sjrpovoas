// src/app/logout-admin/page.tsx

'use client'; // 🚨 CRÍTICO: Deve ser um Client Component por causa do useRouter e useEffect

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 🚨 CORREÇÃO: Certifique-se de que a função é exportada como padrão e é um componente síncrono.
export default function LogoutAdminPage() { 
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        // Define a função assíncrona para a chamada da API
        const performLogout = async () => {
            try {
                // Chama a rota de API de Logout para limpar o cookie de admin
                await fetch('/api/auth/logout-admin', { method: 'GET' });
            } catch (error) {
                console.error('Erro ao chamar a API de logout:', error);
            } finally {
                // Não importa se a API falhou, a ação do frontend é sempre tentar redirecionar
                setIsLoggingOut(false);
                
                // Redireciona o usuário para a página de login de Admin
                router.push('/login-admin'); 
                router.refresh(); 
            }
        };

        performLogout();
        
    }, [router]); 

    return (
        <div style={{ padding: '50px', textAlign: 'center' }}>
            {isLoggingOut ? (
                <>
                    <h1>Saindo do Painel de Administração...</h1>
                    <p>Por favor, aguarde.</p>
                </>
            ) : (
                <>
                    <h1>Logout Concluído.</h1>
                    <p>Você foi desconectado. Clique <a href="/login-admin">aqui</a> para voltar ao login.</p>
                </>
            )}
        </div>
    );
}