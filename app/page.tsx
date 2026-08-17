import Link from "next/link";

const features = [
  ["⚡", "Venda rápida", "Busque o produto e registre o pedido sem travar o ritmo da live."],
  ["📦", "Estoque organizado", "Acompanhe produtos, preços de live e saldo em uma única tela."],
  ["👥", "Cliente por @", "Agrupe pedidos por cliente e acompanhe o status até a entrega."],
];

const plans = [
  { name: "Essencial", price: "49", items: ["1 usuário", "Até 2.000 produtos", "1 loja", "Relatórios básicos"] },
  { name: "Pro", price: "99", featured: true, items: ["3 usuários", "Produtos ilimitados", "Relatórios completos", "Exportação e identidade visual"] },
  { name: "Business", price: "199", items: ["10 usuários", "Permissões e equipe", "Ranking de vendedores", "Múltiplas unidades"] },
];

export default function Home() {
  return <>
    <div className="container">
      <nav className="nav">
        <div className="brand"><span className="brandmark">L</span> LiveSell</div>
        <div className="navlinks"><a href="#recursos">Recursos</a><a href="#planos">Planos</a><Link className="btn btn-soft" href="/dashboard">Ver demonstração</Link></div>
      </nav>
      <main className="hero">
        <div>
          <span className="eyebrow">VENDAS POR LIVE, SEM BAGUNÇA</span>
          <h1>Sua live vende.<br/>O LiveSell organiza.</h1>
          <p>Produtos, clientes, estoque e pedidos organizados em uma única tela enquanto sua live acontece.</p>
          <div className="hero-actions"><Link href="/dashboard" className="btn btn-primary">Abrir demonstração</Link><a href="#planos" className="btn btn-soft">Conhecer os planos</a></div>
        </div>
        <div className="mock"><div className="mock-inner">
          <div className="mock-top"><strong>Live de Domingo 🔴</strong><span className="pill">AO VIVO</span></div>
          <div className="search">🔎 Digite nome, código ou leia o código de barras...</div>
          <div className="product"><div><strong>Kit Hidratação Premium</strong><div className="small">Estoque: 17 un.</div></div><div className="price">R$ 39,90</div></div>
          <div className="product"><div><strong>Protetor Solar FPS 60</strong><div className="small">Estoque: 22 un.</div></div><div className="price">R$ 49,90</div></div>
          <div className="product"><div><strong>Vitamina C Facial</strong><div className="small">Estoque: 9 un.</div></div><div className="price">R$ 32,90</div></div>
          <div className="sale-card"><strong>@maria pediu 2 itens</strong><div className="small">Pedido registrado • aguardando separação</div></div>
        </div></div>
      </main>
    </div>
    <section id="recursos" className="section"><div className="container"><h2>Feito para quem vende ao vivo</h2><p className="section-sub">Menos anotação manual, mais controle durante e depois da live.</p><div className="grid3">{features.map(([i,t,d])=><div className="card" key={t}><div className="icon">{i}</div><h3>{t}</h3><p className="small">{d}</p></div>)}</div></div></section>
    <section id="planos" className="section"><div className="container"><h2>Um plano para cada fase</h2><p className="section-sub">Comece simples e evolua conforme suas lives crescem.</p><div className="pricing">{plans.map(p=><div className={`plan ${p.featured?"featured":""}`} key={p.name}>{p.featured&&<span className="badge">MAIS ESCOLHIDO</span>}<h3>{p.name}</h3><div className="money">R$ {p.price}<span className="small">/mês</span></div><ul>{p.items.map(x=><li key={x}>{x}</li>)}</ul><Link href="/dashboard" className={`btn ${p.featured?"btn-primary":"btn-soft"}`}>Testar agora</Link></div>)}</div></div></section>
    <footer className="footer"><div className="container">LiveSell • Venda na live sem perder pedidos.</div></footer>
  </>;
}
