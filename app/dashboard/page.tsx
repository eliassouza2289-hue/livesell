"use client";

import { useMemo, useState } from "react";

const demoProducts = [
  { id: "1", code: "1001", name: "Kit Hidratação Premium", stock: 17, price: 39.9 },
  { id: "2", code: "1002", name: "Protetor Solar FPS 60", stock: 22, price: 49.9 },
  { id: "3", code: "1003", name: "Vitamina C Facial", stock: 9, price: 32.9 },
  { id: "4", code: "1004", name: "Shampoo Fortalecedor", stock: 31, price: 29.9 },
];

type Sale = { customer: string; product: string; qty: number; total: number; status: string };

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [customer, setCustomer] = useState("");
  const [sales, setSales] = useState<Sale[]>([
    { customer: "@maria", product: "Kit Hidratação Premium", qty: 2, total: 79.8, status: "Aguardando" },
    { customer: "@ana", product: "Vitamina C Facial", qty: 1, total: 32.9, status: "Separado" },
  ]);
  const products = useMemo(() => demoProducts.filter(p => !query || `${p.code} ${p.name}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const revenue = sales.reduce((a,s)=>a+s.total,0);

  function sell(product: typeof demoProducts[number]) {
    const handle = customer.trim() ? (customer.startsWith("@") ? customer : `@${customer}`) : "@cliente";
    setSales(prev => [{ customer: handle, product: product.name, qty: 1, total: product.price, status: "Aguardando" }, ...prev]);
  }

  return <div className="app-shell">
    <aside className="sidebar"><div className="side-brand">LiveSell</div><a className="side-link active">⚡ Operação da Live</a><a className="side-link">📦 Produtos</a><a className="side-link">👥 Clientes</a><a className="side-link">📊 Relatórios</a><a className="side-link">💳 Meu plano</a></aside>
    <main className="main">
      <div className="topbar"><div><h1 style={{margin:0}}>Live de Domingo 🔴</h1><div className="small">Demonstração da base LiveSell 1.0</div></div><span className="pill">PRO • TESTE</span></div>
      <div className="notice">Esta tela já simula o fluxo do produto. Quando o Neon for conectado, produtos e vendas passam a ser persistidos no banco e compartilhados entre dispositivos.</div>
      <div className="stats" style={{marginTop:16}}><div className="stat"><span className="small">Vendas</span><strong>{sales.length}</strong></div><div className="stat"><span className="small">Faturamento</span><strong>R$ {revenue.toFixed(2).replace('.',',')}</strong></div><div className="stat"><span className="small">Clientes</span><strong>{new Set(sales.map(s=>s.customer)).size}</strong></div><div className="stat"><span className="small">Produtos</span><strong>{demoProducts.length}</strong></div></div>
      <div className="workspace">
        <section className="panel"><h2>Registrar venda</h2><div className="stack"><input className="field" placeholder="@Instagram do cliente" value={customer} onChange={e=>setCustomer(e.target.value)}/><input className="field" placeholder="Buscar produto por nome ou código..." value={query} onChange={e=>setQuery(e.target.value)}/></div><div style={{marginTop:12}}>{products.map(p=><div className="product-row" key={p.id}><div><strong>{p.name}</strong><div className="small">Cód. {p.code} • estoque {p.stock}</div></div><strong>R$ {p.price.toFixed(2).replace('.',',')}</strong><button className="btn btn-primary" onClick={()=>sell(p)}>Vender</button></div>)}</div></section>
        <section className="panel"><h2>Pedidos recentes</h2><table className="table"><thead><tr><th>Cliente</th><th>Pedido</th><th>Status</th></tr></thead><tbody>{sales.map((s,i)=><tr key={`${s.customer}-${i}`}><td><strong>{s.customer}</strong></td><td><div>{s.product}</div><div className="small">R$ {s.total.toFixed(2).replace('.',',')}</div></td><td><span className="pill">{s.status}</span></td></tr>)}</tbody></table></section>
      </div>
    </main>
  </div>;
}
