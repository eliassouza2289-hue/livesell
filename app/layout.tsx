import "./globals.css";

export const metadata = {
  title: "LiveSell — Venda na live sem perder pedidos",
  description: "Produtos, clientes, estoque e pedidos organizados enquanto sua live acontece.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
