// src/app/(private)/citizen/actions/page.tsx
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import Link from "next/link";

// Mock de dados (substitua depois por fetch da API ou useQuery)
const mockActions = [
  {
    id: 1,
    title: "Corrida pela Saúde 2026",
    description:
      "Corrida de 5km aberta à população. Inclui avaliação física gratuita e orientação nutricional.",
    date: "14/04/2026",
    time: "07:00",
    location: "Centro",
    capacity: "342/500",
    status: "Ativo",
    category: "Saúde + Esporte e Lazer",
    type: "Inscrição",
    feedback: false,
  },
  {
    id: 2,
    title: "Campanha de Vacinação - Gripe 2026",
    description:
      "Vacinação contra gripe para toda a população. Postos de vacinação em todos os bairros.",
    date: "31/03/2026",
    time: "08:00",
    location: "Jardim Canadá",
    capacity: null,
    status: "Ativo",
    category: "Saúde",
    type: "Feedback",
    feedback: true,
  },
  {
    id: 3,
    title: "Yoga no Parque",
    description:
      "Aulas gratuitas de yoga ao ar livre para promoção de saúde mental e bem-estar.",
    date: "19/04/2026",
    time: "06:30",
    location: "Vila da Serra",
    capacity: "67/80",
    status: "Ativo",
    category: "Saúde + Esporte e Lazer",
    type: "Inscrição",
    feedback: false,
  },
  {
    id: 4,
    title: "Feira de Saúde e Nutrição",
    description:
      "Feira com orientação nutricional, aferição de pressão e glicemia, e distribuição de alimentos saudáveis.",
    date: "09/05/2026",
    time: "09:00",
    location: "Alphaville",
    capacity: "89/200",
    status: "Em breve",
    category: "Saúde + Educação e Nutrição",
    type: "Inscrição",
    feedback: false,
  },
  {
    id: 5,
    title: "Mutirão de Limpeza – Dengue Zero",
    description:
      "Ação comunitária de combate à dengue com visitas domiciliares e orientação.",
    date: "27/03/2026",
    time: "08:00",
    location: "Honório Bicalho",
    capacity: null,
    status: "Ativo",
    category: "Saúde + Meio Ambiente",
    type: "Feedback",
    feedback: true,
  },
];

export default function CitizenActionsPage() {
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Ações e Eventos</h1>
        <p className="text-muted-foreground mt-2">
          Participe das ações de promoção da saúde em Nova Lima
        </p>
      </div>

      {/* Filtros / Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="rounded-full">
            Todos
          </Button>
          {[
            "Centro",
            "Vila da Serra",
            "Jardim Canadá",
            "Alphaville",
            "Honório Bicalho",
            "Macacos",
            "São Sebastião",
          ].map(bairro => (
            <Button
              key={bairro}
              variant="ghost"
              size="sm"
              className="rounded-full"
            >
              {bairro}
            </Button>
          ))}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Em breve
          </Button>
          <Button size="sm">Ativos</Button>
        </div>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockActions.map(action => (
          <Card
            key={action.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex gap-2 items-center mb-1">
                    <Badge variant="secondary" className="text-xs">
                      {action.category}
                    </Badge>
                    <Badge
                      variant={
                        action.status === "Ativo" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {action.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-3 pb-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {action.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{action.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{action.time}</span>
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{action.location}</span>
                </div>
                {action.capacity && (
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{action.capacity}</span>
                  </div>
                )}
              </div>
            </CardContent>

            <CardFooter className="pt-2 border-t flex justify-between">
              {action.type === "Inscrição" ? (
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  Inscrever-se
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="w-full border-teal-600 text-teal-700 hover:bg-teal-50"
                >
                  Dar Feedback
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Rodapé ou paginação futura */}
      <div className="mt-10 text-center text-sm text-muted-foreground">
        Mostrando 5 de 12 ações •{" "}
        <Link href="#" className="text-primary hover:underline">
          Ver mais
        </Link>
      </div>
    </div>
  );
}
