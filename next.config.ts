import { NextConfig } from 'next';

const nextConfig: NextConfig = {
    
    // 1. Configuração do Compilador (Turbopack/App Router)
    experimental: {
        // A chave 'appDir' foi removida porque o App Router é o padrão.
        // Mantenha esta seção se você precisar de outras flags experimentais.
    },

    // 2. Opções Gerais de Next.js
    reactStrictMode: true, 
    
    // 3. Otimizações de Imagens 
    images: {
        // Se você estiver carregando imagens de domínios externos:
        // domains: ['example.com', 'yourcdn.com'], 
    },

    // 4. Configuração de Variáveis de Ambiente
    env: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_HASH: process.env.ADMIN_HASH,
        MONGODB_URI: process.env.MONGODB_URI,
    },

    // 5. Configuração de Headers de Segurança (Recomendado)
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;