# LiveSell 1.0

Base SaaS para transformar o protótipo de gerenciamento de vendas em live em um produto comercial multiempresa.

## O que já existe nesta base

- Landing page comercial com os planos Essencial, Pro e Business.
- Dashboard de operação de live com busca de produtos e registro rápido de pedidos.
- Estrutura PostgreSQL multiempresa para empresas, membros, planos, assinaturas, produtos, clientes, lives, vendas e itens.
- Rotas server-side preparadas para Neon Postgres.
- Modo demonstração funcional sem banco, para validar UI/fluxo antes do provisionamento.

## Próxima ligação: Vercel + Neon

A organização Neon atual é gerenciada pela Vercel. Por isso, crie o recurso Neon pelo Marketplace da Vercel e conecte-o ao novo projeto LiveSell. A integração deve injetar `DATABASE_URL`.

Depois rode o conteúdo de `db/schema.sql` no banco LiveSell. Para testar antes do login real, rode também `db/dev-seed.sql` e configure `DEMO_COMPANY_ID` apenas na etapa de desenvolvimento. Antes do lançamento, substitua o tenant de demonstração por autenticação real e resolução de empresa por usuário.

## Rodar localmente

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
