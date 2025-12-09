// src/components/auth/LogoutButton.tsx

'use client'; 

import React from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react'; 

/**
 * Função placeholder que simula a limpeza de sessão no servidor e cliente.
 * ⚠️ SUBSTITUA ESTA FUNÇÃO PELA SUA LÓGICA DE AUTENTICAÇÃO REAL.
 */
async function performLogout() {
    console.log("Iniciando o processo de logout real...");
    
    // TENTE CHAMAR O API ROUTE DE LOGOUT
    try {
        // Altere o caminho se sua API de logout for diferente
        const response = await fetch('/api/auth/logout', { 
            method: 'POST',
        });

        if (!response.ok) {
            console.warn("Aviso: Falha na limpeza de sessão no servidor. O cliente continuará a limpeza.");
        }
    } catch (e) {
        console.error("Erro de rede ao tentar deslogar no servidor:", e);
    }
    
    // LIMPEZA LOCAL (Tokens e Estados)
    localStorage.removeItem('userToken'); 
    localStorage.removeItem('isAdmin'); 

    console.log("Logout concluído. Sessão limpa localmente.");
    return true; 
}

export default function LogoutButton() {
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        
        try {
            await performLogout();
            
            // ✅ Redirecionamento após o logout para a página de pagamentos
            router.push('/admin/pagamentos');

        } catch (error) {
            console.error("Falha crítica no logout:", error);
            setIsLoggingOut(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 15px',
                backgroundColor: isLoggingOut ? '#666' : '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, opacity 0.3s',
                fontWeight: 'bold',
                opacity: isLoggingOut ? 0.7 : 1,
            }}
            title="Sair da sessão atual"
        >
            <LogOut size={18} />
            {isLoggingOut ? 'Saindo...' : 'Logout'}
        </button>
    );
}