// src/app/(public)/events/page.tsx
"use client";;
import { useState } from "react";
import { useActions } from "@/features/actions/hooks/useActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Users, Search } from "lucide-react";
import Link from "next/link";

export default function EventsPage() {
  const { data: actionsData, isLoading, error } = useActions();
  const [searchTerm, setSearchTerm] = useState("");

  const actions = actionsData?.data || [];

  const filteredActions = actions.filter(
    action =>
      action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      action.targetAudience.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg">Carregando ações...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-500">
        Erro ao carregar as ações. Tente novamente mais tarde.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight mb-4">
            Ações e Eventos
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Encontre todas as atividades gratuitas de promoção à saúde em Nova
            Lima
          </p>
        </div>

        {/* Barra de busca */}
        <div className="max-w-md mx-auto mb-10 relative">
          <Search className="absolute left-4 top-3.5 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou público-alvo..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-11 h-12 text-lg"
          />
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActions.map(action => (
            <Card
              key={action.id}
              className="hover:shadow-xl transition-all duration-300 group"
            >
              <CardHeader>
                <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                  {action.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {action.objective}
                </p>

                <div className="flex flex-wrap gap-y-3 text-sm">
                  <div className="flex items-center gap-2 w-full">
                    <Users className="w-4 h-4 text-secondary" />
                    <span>{action.targetAudience}</span>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span>{action.time || "Horário a definir"}</span>
                  </div>
                  <div className="flex items-center gap-2 w-full">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="line-clamp-1">
                      Vários locais • {action.frequency}
                    </span>
                  </div>
                </div>

                <div className="pt-4">
                  <Link href={`/events/${action.slug}`} className="block">
                    <Button className="w-full btn-primary">
                      Quero participar
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActions.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              Nenhuma ação encontrada com esse termo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
