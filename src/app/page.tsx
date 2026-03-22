import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Trophy, Menu} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-zinc-950 dark:to-zinc-900">
       <header className="border-b bg-white dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
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
              <Button className="bn-primary">Cadastrar-se</Button>
            </Link>

            {/* Menu Mobile */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      {/* Hero - Degradê */}
     <section className="h-[80vh] conection-gradient text-white flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Você quer <span className="text-white/90">salvar vidas</span>?
          </h1>
          <p className="text-2xl text-white/90 mb-8">
            Conexão Saúde é a plataforma oficial de Nova Lima que transforma
            prevenção em ação.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg"  className="text-lg h-[8vh] px-10 border-white text-white bg-white/10 hover:bg-white hover:text-primary">
                Entrar agora
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
               className="text-lg h-[8vh] px-10 border-white text-white bg-white/10 hover:bg-white hover:text-primary"
              >
                Ver ações gratuitas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Estatística - Verde */}
      <section className="bg-zinc-100 dark:bg-zinc-900 text-white py-12 h-[40vh] flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center px-6">
          <div className="text-6xl font-bold mb-4 text-conection-gradient text-destructive">59%</div>
          <p className="text-2xl text-black text-medium">
            das mortes em Nova Lima (2023-2025) foram causadas por doenças
            crônicas não transmissíveis.
          </p>
          <p className="mt-4 text-black">
            A maioria poderia ser evitada com hábitos simples.
          </p>
        </div>
      </section>

      {/* Ícones da solução */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">O problema era simples:</h2>
            {/* lista mantida igual */}
          </div>

          <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl">
            <h2 className="text-4xl font-bold mb-8 text-center">
              A solução chegou.
            </h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                  🗺️
                </div>
                <div>
                  <strong>Mapa inteligente</strong>
                  <p className="text-muted-foreground">
                    Encontre ações perto da sua casa em 3 segundos.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                  🤖
                </div>
                <div>
                  <strong>Coach de IA</strong>
                  <p className="text-muted-foreground">
                    Recomendações personalizadas de atividades.
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <strong>Gamificação</strong>
                  <p className="text-muted-foreground">
                    Badges, streaks e conquistas para manter você motivado.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="bg-zinc-100 dark:bg-zinc-900 py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-center text-4xl font-bold mb-12">
            Promovida foi feita para 3 pessoas:
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <h3 className="text-2xl font-semibold mb-3">Cidadão</h3>
                <p className="text-muted-foreground">
                  Descubra atividades perto de casa, faça check-in, ganhe badges
                  e melhore sua saúde.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <Heart className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-2xl font-semibold mb-3">
                  Profissional de Saúde
                </h3>
                <p className="text-muted-foreground">
                  Prescreva ações reais como se fossem remédios.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 text-center">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-2xl font-semibold mb-3">Gestor Público</h3>
                <p className="text-muted-foreground">
                  Veja em tempo real onde tem mais adesão.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center conection-gradient text-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">Pronto para começar?</h2>
          <p className="text-xl text-white/90 mb-10">
            Junte-se a milhares de novalimenses que já estão mudando seus
            hábitos.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="text-lg px-10 h-[8vh]">
                Entrar no Conexão Saúde
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="outline"
                className="h-[8vh] text-lg px-10 border-white text-primary hover:bg-white hover:text-primary"
              >
                Ver ações agora
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
