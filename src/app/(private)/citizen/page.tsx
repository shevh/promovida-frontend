// src/app/(private)/citizen/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Trophy, Flame, Award, Heart } from 'lucide-react';
import Link from 'next/link';

const user = {
  name: "João Silva",
  avatar: "https://github.com/shadcn.png",
  points: 1240,
  streak: 7,
  badgesEarned: 5,
};

const proximosEventos = [
  {
    title: "Yoga no Parque",
    date: "19/04/2026",
    time: "06:30",
    location: "Vila da Serra",
    status: "Inscrito",
  },
  {
    title: "Corrida pela Saúde 2026",
    date: "14/04/2026",
    time: "07:00",
    location: "Centro",
    status: "Confirmado",
  },
];

const badges = [
  { name: "Primeiro Passo", icon: "🏅", color: "text-amber-500" },
  { name: "Zero Cigarro", icon: "🚭", color: "text-emerald-500" },
  { name: "Rei do Check-in", icon: "🔥", color: "text-orange-500" },
];

export default function CitizenDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Boas-vindas */}
      <div className="flex items-center gap-4 mb-10">
        <Avatar className="w-16 h-16">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-4xl font-bold">Olá, {user.name.split(' ')[0]}!</h1>
          <p className="text-xl text-muted-foreground">Que bom te ver por aqui hoje ❤️</p>
        </div>
      </div>

      {/* Estatísticas Pessoais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
          <CardContent className="p-8 text-center">
            <Flame className="w-12 h-12 mx-auto mb-4" />
            <p className="text-6xl font-bold">{user.streak}</p>
            <p className="text-xl">dias de sequência</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-500" />
            <p className="text-6xl font-bold">{user.points}</p>
            <p className="text-xl text-muted-foreground">pontos acumulados</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-8 text-center">
            <Award className="w-12 h-12 mx-auto mb-4 text-purple-500" />
            <p className="text-6xl font-bold">{user.badgesEarned}</p>
            <p className="text-xl text-muted-foreground">conquistas</p>
          </CardContent>
        </Card>
      </div>

      {/* Meus Próximos Eventos */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-6 h-6" />
            Meus Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proximosEventos.map((event, i) => (
            <div key={i} className="border rounded-2xl p-6 hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <Badge>{event.status}</Badge>
                <div className="text-right text-sm text-muted-foreground">
                  {event.date} • {event.time}
                </div>
              </div>
              <h3 className="font-semibold text-xl mb-2">{event.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Minhas Conquistas */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Minhas Conquistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 flex-wrap">
            {badges.map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="text-6xl mb-3">{badge.icon}</div>
                <p className="font-medium text-sm">{badge.name}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acesso Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/citizen/actions">
          <Button size="lg" className="w-full h-24 text-lg bg-gradient-to-r from-primary to-secondary text-white">
            Ver Todos os Eventos
          </Button>
        </Link>
        <Link href="/citizen/coach">
          <Button size="lg" variant="outline" className="w-full h-24 text-lg">
            <Heart className="mr-3" /> Falar com IA Coach
          </Button>
        </Link>
        <Button size="lg" variant="outline" className="w-full h-24 text-lg">
          Ver Meu Histórico
        </Button>
      </div>
    </div>
  );
}