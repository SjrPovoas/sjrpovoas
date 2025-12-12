// src/app/api/auth/cadastro/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongodb'; 

const SALT_ROUNDS = 12; 
const COLLECTION_NAME = 'users';

// 🎯 Chave PIX fornecida
const PIX_KEY = '61981885715'; 

export async function POST(request: Request) {
    try {
        const { 
            nomeCompleto, 
            email, 
            senha, 
            cpf, 
            dataNascimento, 
            telefone, 
            plano 
        } = await request.json();

        // 1. Validação Completa (Omitida para brevidade, assumindo que está completa)
        if (!nomeCompleto || !email || !senha || senha.length < 6 || !cpf || !dataNascimento || !telefone || !plano) {
            return NextResponse.json({ message: 'Dados inválidos. Todos os campos são obrigatórios.' }, { status: 400 });
        }
        
        // 2. Conexão ao MongoDB
        const { db } = await connectToDatabase();
        const usersCollection = db.collection(COLLECTION_NAME); 

        // 3. Verificar Duplicidade de Email
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Este email já está registrado.' }, { status: 409 });
        }

        // 4. Criptografar a Senha
        const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

        // 5. Salvar Novo Assinante no MongoDB com status PENDENTE
        const novoAssinante = {
            nomeCompleto,
            email,
            senha: hashedPassword, 
            cpf,
            dataNascimento,
            telefone,
            plano,
            // 🚨 CRÍTICO: Role e Status iniciais PENDENTES
            role: 'pendente', 
            ativo: false, 
            statusPagamento: 'pendente_pagamento', 
            dataRegistro: new Date(), 
        };

        const resultado = await usersCollection.insertOne(novoAssinante);
        
        console.log(`✅ Novo assinante (pendente) registrado com ID: ${resultado.insertedId} na coleção 'users'.`);

        // 6. Mensagem de Sucesso com Instrução de Pagamento
        const successMessage = `
            Registro recebido! Para a ativação do seu plano (${plano.toUpperCase()}), siga as instruções de pagamento:
            
            CHAVE PIX (Celular): ${PIX_KEY}
            Instituição: Banco de Pagamentos Nubank
            
            🚨 ALERTA: A liberação do seu cadastro ficará em análise para confirmação do pagamento. Sua conta será ativada em até 24h após a confirmação.
            
            Aguarde o nosso e-mail de confirmação de ativação.
        `;

        return NextResponse.json(
            { message: successMessage },
            { status: 201 }
        );

    } catch (error) {
        console.error('❌ Erro no registro do assinante:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor ao registrar.' }, 
            { status: 500 }
        );
    }
}