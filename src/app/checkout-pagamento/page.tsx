// src/app/checkout-pagamento/page.tsx

'use client';

import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
    // 💡 NOTA: Em uma aplicação real, você buscará o plano
    // e os dados do usuário (por exemplo, através de cookies, 
    // localStorage ou uma API segura) para exibir aqui.

    return (
        <div style={{ maxWidth: '700px', margin: '50px auto', padding: '30px', border: '1px solid #0070f3', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ textAlign: 'center' }}>
                <Link href="/" passHref style={{ display: 'inline-block', margin: '10px 0' }}>
                    <img src="/assets/img/logo-SjrPovoaS.png" alt="Logo SjrPovoaS"
                        style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: 'none', textDecoration: 'none' }} />
                </Link>
            </div>
            <h1 style={{ color: '#0070f3', textAlign: 'center' }}>
                🎉 Cadastro Quase Concluído!
            </h1>

            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1em' }}>
                Seu cadastro foi concluído com sucesso.
            </p>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1em' }}>
                Para a ativação do seu Plano, realize a transferência do valor para:
            </p>
            <div style={{ textAlign: 'center', border: '1px solid #0070f3', padding: '15px', marginTop: '25px', borderRadius: '4px' }}>
                <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    CHAVE PIX (CELULAR) 61981885715
                </h3>
                <p style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0' }}>
                    <strong>Plano Escolhido:</strong>
                    <span>Plano Anual (R$ 49,00)</span>
                    {/* Substitua por dados dinâmicos */}
                </p>
                <p style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontWeight: 'bold', fontSize: '1.2em', color: '#dc3545' }}>
                    Total a Pagar:
                    <span>R$ 49,00</span>
                </p>
                <h4 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                    Dados para Transferência
                </h4>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1em' }}>
                    Instituição de Pagamento: Nu Pagamentos S.A. Nubank
                </p>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1em' }}>
                    Favorecido: Silvio Póvoas de Carvalho Júnior
                </p>
                <h4 style={{ color: '#dc3545', textAlign: 'center', marginTop: '20px' }}>
                    🚨 ALERTA: A liberação do seu cadastro ficará em análise para confirmação do pagametno. Sua conta será ativada em até 24h após a confirmação.
                </h4>
                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '1.1em' }}>
                    Aguarde o nosso e-mail de confirmação de ativação.
                </p>
            </div>

            {/*<div style={{ marginTop: '30px', textAlign: 'center' }}>
                 // Substitua este botão por um componente de pagamento real (Stripe, etc.) 
                <button onClick={() => alert('Simulação de integração com Gateway de Pagamento.')}
                    style={{ padding: '15px 30px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1.2em' }}>
                    PROSSEGUIR PARA PAGAMENTO SEGURO
                </button>
            </div>*/}

            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Obrigado por se juntar à nossa comunidade!
            </p>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                <Link href="/" style={{ color: '#0070f3', textDecoration: 'none' }}>
                    Voltar para a Página Inicial
                </Link>
            </p>
        </div>
    );
}