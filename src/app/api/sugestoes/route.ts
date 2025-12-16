import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
    try {
        const { termo, emailUsuario } = await request.json();

        if (!termo) {
            return NextResponse.json({ message: 'Termo é obrigatório.' }, { status: 400 });
        }

        const { db } = await connectToDatabase();
        
        await db.collection('search_suggestions').insertOne({
            termo: termo.toLowerCase(),
            emailUsuario: emailUsuario || 'anônimo',
            data: new Date(),
            resolvido: false // Para você marcar como "visto" no admin
        });

        return NextResponse.json({ message: 'Sugestão enviada com sucesso!' });
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao salvar sugestão.' }, { status: 500 });
    }
}