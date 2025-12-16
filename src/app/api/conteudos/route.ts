// src/app/api/conteudos/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // Por enquanto, retornamos um array vazio ou os dados iniciais
  // para que o TypeScript reconheça o arquivo como um módulo válido.
  return NextResponse.json({ 
    message: "API de conteúdos ativa",
    data: [] 
  });
}