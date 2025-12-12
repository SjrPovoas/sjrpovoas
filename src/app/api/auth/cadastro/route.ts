// src/app/api/auth/cadastro/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; 
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { 
            nomeCompleto, 
            email, 
            senha, 
            cpf, 
            dataNascimento, 
            telefone, 
            plano // Esperamos 'mensal' ou 'anual'
        } = body; 

// const PIX_KEY = '61981885715'; 
// return NextResponse.json( { message: 'Registro recebido! Para a ativação do seu plano (${plano.toUpperCase()}), transfira o valor do Plano Escolhido acima para a chave PIX abaixo. Confira os dados antes de confirmar o pagamento: CHAVE PIX (Celular): ${PIX_KEY} Instituição: Banco de Pagamentos Nubank e Nome: Silvio Póvoas de Carvalho Júnior 🚨 ALERTA: A liberação do seu cadastro ficará em análise para confirmação do pagamento. Sua conta será ativada em até 24h após a confirmação. Aguarde o nosso e-mail de confirmação de ativação.'});

        // 1. Validação Básica
        if (!email || !senha || !plano || !nomeCompleto || !cpf) {
            return NextResponse.json(
                { message: 'Campos obrigatórios (email, senha, plano, nome, cpf) estão faltando.' }, 
                { status: 400 }
            );
        }

        // 2. Determinar a ROLE Final
        let roleFinal = '';
        if (plano === 'mensal') {
            roleFinal = 'assinante_mensal'; // ✅ CORRETO para plano mensal
        } else if (plano === 'anual') {
            roleFinal = 'assinante_anual';   // ✅ CORRETO para plano anual
        } else {
            return NextResponse.json({ message: 'Plano selecionado inválido.' }, { status: 400 });
        }
        
        // 3. Conexão e Verificação de Usuário Existente
        const { db } = await connectToDatabase();
        const usersCollection = db.collection('users'); 

        const userExists = await usersCollection.findOne({ email });

        if (userExists) {
            return NextResponse.json({ message: 'Este email já está cadastrado.' }, { status: 409 });
        }

        // 4. Hash da Senha
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);
        
        // 5. Criar o Objeto do Novo Usuário
        const novoAssinante = {
            nomeCompleto,
            email,
            senha: senhaHash,
            cpf,
            dataNascimento,
            telefone,
            plano: roleFinal, // ⚠️ SALVAMOS A ROLE COMPLETA AQUI (assinante_mensal/anual)
            role: roleFinal, // ⚠️ CORRIGIDO: A ROLE AGORA É ATRIBUÍDA CORRETAMENTE
            ativo: false,
            statusPagamento: 'pendente_pagamento',
            dataRegistro: new Date(),
        };

        // 6. Inserir no Banco de Dados
        const result = await usersCollection.insertOne(novoAssinante);

        if (result.acknowledged) {
            console.log(`✅ Novo assinante pendente registrado: ${email} como ${roleFinal}`);
            return NextResponse.json(
                { message: 'Cadastro realizado com sucesso. Pagamento pendente de confirmação.' }, 
                { status: 201 }
            );
        } else {
            throw new Error('Falha ao inserir usuário no banco.');
        }

    } catch (error) {
        console.error('❌ Erro no processamento do cadastro:', error);
        return NextResponse.json(
            { message: 'Erro interno do servidor durante o cadastro.' }, 
            { status: 500 }
        );
    }
}