// src/lib/mongodb.ts

import { MongoClient, ServerApiVersion } from 'mongodb';

// 1. Pega a URI do .env.local
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI não está definida no .env.local');
}

// 🎯 O nome do seu banco de dados (DATABASE)
const DB_NAME = "sjrpovoas_db_user"; 

// 2. Cria o Cliente
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Configurações para produção (Next.js/Vercel)
  maxPoolSize: 5,
});

// Variável global para armazenar a conexão (necessário para Next.js/Vercel)
let cachedClient: MongoClient | null = null;
let cachedDb: any = null; // Tipagem básica para o objeto DB

// 3. Função de Conexão Única (Reutiliza a conexão existente)
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Utilizando conexão MongoDB em cache.');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log(`Conectando ao MongoDB e selecionando o DB: ${DB_NAME}...`);
    
    await client.connect();
    
    // 🎯 Seleciona o Banco de Dados correto
    const db = client.db(DB_NAME); 

    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexão bem-sucedida ao MongoDB Atlas!");

    // Cache a conexão para reutilização
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("❌ Falha na conexão com o MongoDB:", error);
    throw error;
  }
}