// src/lib/mongodb.ts

import { MongoClient, ServerApiVersion } from 'mongodb';

// 1. Pega a URI do .env.local
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('MONGODB_URI não está definida no .env.local');
}

// 2. Cria o Cliente
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  // Adiciona opções de conexão que Next.js e Vercel preferem:
  // Evita que o pool de conexões se esgote (maxPoolSize: 5)
  // Desativa a descoberta de servidor, que pode ser lenta
});

// Variável global para armazenar a conexão (necessário para Next.js/Vercel)
let cachedClient: MongoClient | null = null;
let cachedDb: any = null; // Você pode tipar melhor com mongodb.Db

// 3. Função de Conexão Única (Reutiliza a conexão existente)
export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    console.log('Utilizando conexão MongoDB em cache.');
    return { client: cachedClient, db: cachedDb };
  }

  try {
    console.log('Conectando ao MongoDB...');
    
    await client.connect();
    
    // Opcional: Ping para confirmar
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Conexão bem-sucedida ao MongoDB Atlas!");

    // Você pode definir o nome do seu banco de dados aqui (se não estiver na URI)
    const db = client.db("seu_nome_do_banco_de_dados_aqui"); 

    // Cache a conexão para reutilização
    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("❌ Falha na conexão com o MongoDB:", error);
    throw error;
  }
}

// 4. Fechamento do Cliente (Opcional, mais útil para testes)
export async function closeConnection() {
    if (cachedClient) {
        await cachedClient.close();
        cachedClient = null;
        cachedDb = null;
        console.log("Conexão MongoDB fechada.");
    }
}