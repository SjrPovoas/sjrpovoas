// src/app/api/admin/listar-pendentes/route.ts

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; 

const COLLECTION_NAME = 'users';

export async function GET(request: Request) {
    try {
        // 🚨 1. VERIFICAÇÃO DE ADMIN (MOCK)
        // Você deve implementar sua lógica de verificação de token/cookie de admin aqui.
        // Se o usuário não for admin, retorne:
        // return NextResponse.json({ message: 'Acesso negado. Requer role de administrador.' }, { status: 403 });

        // 2. Conexão ao MongoDB
        const { db } = await connectToDatabase();
        const usersCollection = db.collection(COLLECTION_NAME); 

        // 3. Consultar Usuários Pendentes
        // Busca por usuários que ainda estão em análise/pendentes de pagamento.
        const query = { 
            $or: [
                { role: 'pendente' }, 
                { statusPagamento: 'pendente_pagamento' }
            ]
        };

        const projection = { 
            // 🚨 EXCLUI A SENHA! NUNCA envie a senha, mesmo que criptografada.
            senha: 0 
        };

        const usuariosPendentes = await usersCollection
            .find(query)
            .project(projection)
            .toArray();

        console.log(`✅ Listados ${usuariosPendentes.length} usuários pendentes de ativação.`);

        if (usuariosPendentes.length === 0) {
            return NextResponse.json(
                { message: 'Não há usuários pendentes de ativação no momento.', data: [] }, 
                { status: 200 }
            );
        }

        // 4. Retornar a Lista
        return NextResponse.json(
            { 
                message: 'Lista de usuários pendentes carregada.', 
                data: usuariosPendentes 
            }, 
            { status: 200 }
        );

    } catch (error) {
        console.error('❌ Erro ao listar usuários pendentes:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao buscar dados.' }, 
            { status: 500 }
        );
    }
}