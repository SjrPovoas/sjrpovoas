// src/app/api/admin/rejeitar-assinante/route.ts

import { NextRequest, NextResponse } from 'next/server';

// ... (Simulações de funções e imports)

// FUNÇÃO DE AUTENTICAÇÃO TEMPORARIAMENTE MODIFICADA PARA SEMPRE RETORNAR TRUE
async function isAdmin(req: NextRequest): Promise<boolean> {
    // ⚠️ ATENÇÃO: ISSO DESABILITA A SEGURANÇA.
    // REMOVA ESTA LINHA EM PRODUÇÃO E IMPLEMENTE A VALIDAÇÃO CORRETA.
    console.log("[AUTH - DEBUG] VERIFICAÇÃO DE ADMIN TEMPORARIAMENTE DESABILITADA.");
    return true; 
}

// ... (Restante do código da API)

export async function POST(req: NextRequest) {
    try {
        // O CÓDIGO AQUI NÃO CAIRÁ MAIS NO 403 ENQUANTO isAdmin for true
        if (!(await isAdmin(req))) {
            return NextResponse.json({ message: 'Acesso negado. Token de Admin inválido ou ausente.' }, { status: 403 }); 
        }

        const { email } = await req.json();

        // ... (Lógica para Deletar o Usuário Pendente)
        // ...
        
    } catch (error) {
        // ...
    }
}