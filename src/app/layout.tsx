// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], });

// =======================================================================
// CONFIGURAÇÃO CENTRALIZADA DE SEO (METADATA)
// =======================================================================
export const metadata: Metadata = {
    title: "SjrPovoaS - Soluções Digitais em Cidade Ocidental",
    description: "Criamos a solução que você procura. Planos de assinatura e conteúdo exclusivo. SjrPovoaS - Soluções Digitais em Cidade Ocidental",
    keywords: ["SjrPovoaS - Soluções Digitais em Cidade Ocidental"],
    authors: [{ name: "SjrPovoaS" }],
    alternates: {
        canonical: "https://sjrpovoas.vercel.app",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-snippet': -1,
            'max-video-preview': -1,
            'max-image-preview': 'large',
        },
    },
    icons: {
        icon: [
            { url: '/assets/img/favicon.ico', sizes: '32x32' },
            { url: '/assets/img/favicon.ico', sizes: '192x192' },
        ],
        apple: '/assets/img/favicon.ico',
        shortcut: '/assets/img/favicon.ico',
    },
    // Meta Tags para WhatsApp / Facebook (Open Graph)
    openGraph: {
        locale: "pt_BR",
        type: "website",
        siteName: "SjrPovoaS - Soluções Digitais",
        url: "https://sjrpovoas.vercel.app",
        title: "SjrPovoaS - Soluções Digitais",
        description: "SjrPovoaS - Soluções Digitais em Cidade Ocidental",
        images: [
            {
                url: "https://sjrpovoas.vercel.app/assets/img/favicon.png",
                width: 1200,
                height: 630,
                alt: "SjrPovoaS Logo",
            }
        ],
    },
    other: {
        "http-equiv": "x-ua-compatible",
        "content": "ie=edge",
        "format-detection": "telephone=no",
        "skype_toolbar": "skype_toolbar_parser_compatible",
    }
};

// =======================================================================
// COMPONENTE ROOT LAYOUT
// =======================================================================
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="pt-BR" prefix="og: https://ogp.me/ns#" suppressHydrationWarning>
            <head>
                {/* Fontes do Google que usam parâmetros complexos são carregadas de forma segura aqui.
                  O Next.js injetará automaticamente as tags de viewport e charset do objeto metadata acima.
                */}
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Lobster&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
                <link rel="profile" href="https://gmpg.org/xfn/11" />
            </head>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}