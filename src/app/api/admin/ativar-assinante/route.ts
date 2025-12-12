// src/app/api/admin/ativar-assinante/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; 

// Nota: A proteção de autenticação de ADMIN não está aqui. VOCÊ deve implementá-la.
export async function POST(request: Request) {
    try {
        const { email, plano } = await request.json(); 

        if (!email || !plano) {
            return NextResponse.json({ message: 'Email e Plano são obrigatórios para ativação.' }, { status: 400 });
        }
        
        // 1. Determinar a ROLE Final
        let roleFinal = (plano === 'mensal') ? 'assinante_mensal' : 'assinante_anual';

        // 2. Conexão ao MongoDB
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users'); 

        // 3. Atualizar o Usuário
        const updateResult = await usersCollection.updateOne(
            { email: email, statusPagamento: 'pendente_pagamento' }, // Condição: Apenas usuários PENDENTES
            { $set: { 
                ativo: true, 
                role: roleFinal, 
                statusPagamento: 'confirmado' 
            }}
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json({ message: 'Usuário não encontrado ou já ativado.' }, { status: 404 });
        }

        // 4. Sucesso
        console.log(`✅ Usuário ${email} ativado com sucesso. Role: ${roleFinal}`);
        return NextResponse.json({ message: `Usuário ${email} ativado com sucesso como ${roleFinal}.` }, { status: 200 });

    } catch (error) {
        console.error('❌ Erro na ativação do assinante:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor.' }, 
            { status: 500 }
        );
    }
}