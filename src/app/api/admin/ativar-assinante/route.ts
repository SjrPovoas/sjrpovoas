// src/app/api/admin/ativar-assinante/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; 
// ⚠️ Nota: Recomenda-se adicionar a autenticação de Admin (verificação de cookie/token) 
// aqui antes de prosseguir com a ativação.

export async function POST(request: NextRequest) {
    try {
        // --- INÍCIO DA ROTA ---
        
        // 1. Desestrutura o email e o plano (que vem como a role completa do frontend Admin)
        const { email, plano } = await request.json(); 

        if (!email || !plano) {
            return NextResponse.json({ message: 'Email e Plano são obrigatórios para ativação.' }, { status: 400 });
        }
        
        // 2. Determinar a ROLE e o VALOR FINAL
        // Usamos as strings completas (assinante_mensal/anual) para a comparação,
        // que é o formato que está chegando do banco de dados via frontend.
        let roleFinal: string;
        let valorPlano: number;

        if (plano === 'assinante_mensal') {
            roleFinal = 'assinante_mensal'; 
            valorPlano = 4.90;
        } else if (plano === 'assinante_anual') {
            roleFinal = 'assinante_anual';
            valorPlano = 49.00;
        } else {
             // Retorna 400 se o plano não for reconhecido
             console.log(`[ERRO PLANO] Valor de 'plano' recebido inválido: ${plano}`);
             return NextResponse.json({ message: 'Plano fornecido é inválido.' }, { status: 400 });
        }
        
        // 3. Conexão ao MongoDB
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users'); 

        // 4. Atualizar o Usuário
        const updateResult = await usersCollection.updateOne(
            // Condição: Apenas usuários PENDENTES (statusPagamento) com o email fornecido
            { email: email, statusPagamento: 'pendente_pagamento' }, 
            { $set: { 
                ativo: true, 
                role: roleFinal, // A role (mensal ou anual) é atribuída corretamente
                valorPlano: valorPlano, // O valor é salvo no registro
                statusPagamento: 'confirmado' // Status alterado para ativado
            }}
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { message: 'Usuário não encontrado, já ativado ou o status de pagamento não é pendente.' }, 
                { status: 404 }
            );
        }

        // 5. Sucesso
        console.log(`✅ Usuário ${email} ativado com sucesso. Role: ${roleFinal}, Valor: R$${valorPlano.toFixed(2)}`);
        return NextResponse.json({ message: `Sucesso: Usuário ${email} ativado com sucesso como ${roleFinal}.` }, { status: 200 });

    } catch (error) {
        console.error('❌ Erro na ativação do assinante:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor.' }, 
            { status: 500 }
        );
    }
}