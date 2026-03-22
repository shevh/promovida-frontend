// src/app/(public)/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, MapPin, Award } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
            <span className="text-xs font-medium tracking-widest">
              NOVA LIMA • MG
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold tracking-tighter mb-6">
            Você quer
            <br />
            <span className="text-white/90">salvar vidas?</span>
          </h1>

          <p className="text-2xl md:text-3xl text-blue-100 max-w-3xl mx-auto mb-10">
            Promovida conecta você às ações gratuitas de saúde da Prefeitura de
            Nova Lima.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="text-lg px-10 h-14 rounded-xl">
                Entrar agora
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-10 h-14 rounded-xl"
              >
                Ver ações gratuitas
              </Button>
            </Link>
          </div>

          <p className="mt-8 text-blue-200 text-sm">
            +100 atividades • Totalmente gratuito • Para toda a população
          </p>
        </div>
      </section>

      {/* Estatística Impactante */}
      <section className="py-16 bg-white dark:bg-zinc-950 border-b">
        <div className="max-w-4xl mx-auto text-center px-6">
          <div className="text-7xl font-bold text-red-600 mb-3">59%</div>
          <p className="text-2xl font-medium text-zinc-700 dark:text-zinc-300">
            das mortes em Nova Lima são causadas por doenças crônicas não
            transmissíveis.
          </p>
          <p className="text-zinc-500 mt-2">
            A maioria poderia ser evitada com hábitos simples.
          </p>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-4xl font-bold mb-12">
            Tudo que você precisa em um só lugar
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover:shadow-xl transition-all">
              <MapPin className="w-12 h-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Mapa Inteligente</h3>
              <p className="text-muted-foreground">
                Encontre atividades perto da sua casa em segundos. Filtros por
                bairro, tipo e público-alvo.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all">
              <Award className="w-12 h-12 text-amber-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Gamificação</h3>
              <p className="text-muted-foreground">
                Badges, streaks e conquistas. Quanto mais você participa, mais
                motivação ganha.
              </p>
            </Card>

            <Card className="p-8 hover:shadow-xl transition-all">
              <Users className="w-12 h-12 text-emerald-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-3">Coach de IA</h3>
              <p className="text-muted-foreground">
                Recomendações personalizadas de atividades baseadas no seu
                perfil e histórico.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 text-center bg-blue-600 text-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">Comece hoje mesmo</h2>
          <p className="text-xl mb-10">
            Milhares de novalimenses já estão mudando seus hábitos com
            Promovida.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-12 h-14"
              >
                Entrar na plataforma
              </Button>
            </Link>
            <Link href="/events">
              <Button
                size="lg"
                className="text-lg px-12 h-14 border-white text-white hover:bg-white hover:text-blue-600"
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
