// src/app/(public)/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Promovida - Você quer salvar vidas?",
  description:
    "Plataforma oficial de promoção da saúde e qualidade de vida de Nova Lima",
  icons: {
    icon: "/favicon.png",
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <header className="border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo - Usando secondary */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logoConexao.png" alt="Logo" width={200} height={200} />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">
              Início
            </Link>
            <Link
              href="/events"
              className="hover:text-primary transition-colors"
            >
              Ações
            </Link>
          </nav>

          {/* Botões */}
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" className="font-medium">
                Entrar
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="btn-primary">Cadastrar-se</Button>
            </Link>

            {/* Menu Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Conteúdo das páginas públicas */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t py-12 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>
            © 2026 Prefeitura de Nova Lima • Promovida - Plataforma de Promoção
            à Saúde
          </p>
          <p className="mt-2">Feito com ❤️ para quem quer viver melhor</p>
        </div>
      </footer>
    </div>
  );
}
