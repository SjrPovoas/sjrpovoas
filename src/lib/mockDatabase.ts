// Definição da interface de Usuário
export interface User {
    id: number;
    nomeCompleto: string;
    email: string;
    passwordHash: string; 
    dataNascimento: string;
    cpf: string;
    telefone: string;
    paymentStatus: 'AWAITING_PAYMENT' | 'PENDING_REVIEW' | 'ACTIVE' | 'COMPLETED' | 'REJECTED';
    plano: string; 
    
    // ⚠️ A interrogação (?) a torna opcional, pois nem todos terão um comprovante inicial
    comprovanteFileName?: string; 
  }
  
  // -----------------------------------------------------------
  // Banco de Dados Simulado (Mock Database)
  // -----------------------------------------------------------
  
  export const usersDB: User[] = [
    {
      id: 101,
      nomeCompleto: 'Gustavo Oliveira Carvalho',
      email: 'tavoliveiracarvalho@gmail.com',
      passwordHash: '123456', 
      dataNascimento: '2010-03-08',
      cpf: '111.111.111-11',
      telefone: '61981943225',
      paymentStatus: 'ACTIVE',
      plano: 'Mensal', 
      // ⚠️ Inicializando a propriedade (opcional)
      comprovanteFileName: 'gustavo_comprovante_01.pdf', 
    },
    {
      id: 102,
      nomeCompleto: 'Gabriel Oliveira Carvalho',
      email: 'gabielocarvalho@gmail.com',
      passwordHash: '123456', 
      dataNascimento: '2014-02-17',
      cpf: '087.915.941-38',
      telefone: '61984293557',
      paymentStatus: 'ACTIVE',
      plano: 'Anual',
      comprovanteFileName: undefined, // Ou simplesmente omitir, por ser opcional
    },
    {
      id: 103,
      nomeCompleto: 'Carlos Ferreira',
      email: 'carlos.ferreira@teste.com',
      passwordHash: 'password123', 
      dataNascimento: '1985-11-30',
      cpf: '333.333.333-33',
      telefone: '977777777',
      paymentStatus: 'AWAITING_PAYMENT',
      plano: 'Mensal',
      comprovanteFileName: undefined,
    },
    {
      id: 104,
      nomeCompleto: 'Antônia Iraleide de Oliveira',
      email: 'iraleide.de.oliveira@gmail.com',
      passwordHash: '123456', 
      dataNascimento: '1980-05-09',
      cpf: '021.652.291-97',
      telefone: '61982777196',
      paymentStatus: 'ACTIVE',
      plano: 'Mensal',
      comprovanteFileName: 'ira_comprovante_01.pdf', 
    },
    {
      id: 105,
      nomeCompleto: 'João da Silva',
      email: 'joao.silva@teste.com',
      passwordHash: 'password123', 
      dataNascimento: '1990-01-01',
      cpf: '111.111.111-11',
      telefone: '999999999',
      paymentStatus: 'PENDING_REVIEW',
      plano: 'Anual', 
      // ⚠️ Inicializando a propriedade (opcional)
      comprovanteFileName: 'joao_comprovante_01.pdf', 
    },
  ];
  
  // Lógica para obter o próximo ID (mantida)
  let currentId = usersDB.reduce((max, user) => (user.id > max ? user.id : max), 100);
  
  export function getNextUserId(): number {
      currentId += 1;
      return currentId;
  }