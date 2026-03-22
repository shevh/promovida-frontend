// src/app/(private)/professional/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react";
import { useState } from "react";

const kpis = [
  {
    title: "Eventos Vinculados",
    value: "5",
    icon: Calendar,
    color: "from-primary to-secondary text-white",
  },
  { title: "Profissionais Alocados", value: "6", icon: Users },
  { title: "Feedbacks Recebidos", value: "3", icon: Star },
];

const bairros = [
  "Todos",
  "Centro",
  "Vila da Serra",
  "Jardim Canadá",
  "Alphaville",
  "Honório Bicalho",
];

const eventos = [
  {
    id: 1,
    title: "Corrida pela Saúde 2026",
    type: "Esporte e Lazer",
    date: "14/04/2026",
    time: "07:00",
    location: "Centro",
    inscritos: "342/500",
    professionals: ["Dra. Mariana Costa", "Dr. Pedro Alves"],
    status: "Ativo",
    description:
      "Corrida de 10km aberta à população. Inclui avaliação física gratuita e orientação nutricional.",
  },
  {
    id: 2,
    title: "Campanha de Vacinação - Gripe 2026",
    type: "Saúde",
    date: "31/03/2026",
    time: "08:00",
    location: "Jardim Canadá",
    inscritos: "0",
    professionals: ["Dr. Carlos Santos", "Dra. Lucas Ferreira"],
    status: "Ativo",
    description:
      "Vacinação contra gripe para toda a população. Postos de vacinação em todos os bairros.",
  },
  {
    id: 3,
    title: "Yoga no Parque",
    type: "Esporte e Lazer",
    date: "19/04/2026",
    time: "06:30",
    location: "Vila da Serra",
    inscritos: "67/80",
    professionals: [],
    status: "Ativo",
    description:
      "Aulas gratuitas de yoga ao ar livre para promoção de saúde mental e bem-estar.",
  },
  {
    id: 4,
    title: "Feira de Saúde e Nutrição",
    type: "Educação",
    date: "09/05/2026",
    time: "09:00",
    location: "Alphaville",
    inscritos: "89/200",
    professionals: ["Nutricionista Maria Helena"],
    status: "Em breve",
    description:
      "Feira com orientação nutricional, aferição de pressão e glicemia, e distribuição de alimentos saudáveis.",
  },
];

export default function ProfessionalDashboard() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isRegisterCitizenModalOpen, setIsRegisterCitizenModalOpen] =
    useState(false);
  const [selectedBairro, setSelectedBairro] = useState("Todos");

  const openAssignModal = (event: any) => {
    setSelectedEvent(event);
    setIsAssignModalOpen(true);
  };

  const openRegisterCitizenModal = (event: any) => {
    setSelectedEvent(event);
    setIsRegisterCitizenModalOpen(true);
  };

  const filteredEventos =
    selectedBairro === "Todos"
      ? eventos
      : eventos.filter(e => e.location === selectedBairro);

  return (
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Eventos de Saúde</h1>
            <p className="text-muted-foreground">
              Visualize e gerencie profissionais nos eventos
            </p>
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {kpis.map((kpi, i) => (
            <Card
              key={i}
              className={
                i === 0
                  ? "bg-gradient-to-br from-primary to-secondary text-white"
                  : ""
              }
            >
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">{kpi.title}</p>
                  <p className="text-5xl font-bold mt-3">{kpi.value}</p>
                </div>
                <kpi.icon className="w-10 h-10 opacity-90" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filtro por Bairro */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {bairros.map(bairro => (
            <Badge
              key={bairro}
              variant={selectedBairro === bairro ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedBairro(bairro)}
            >
              {bairro}
            </Badge>
          ))}
        </div>

        {/* Grid de Eventos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEventos.map(event => (
            <Card
              key={event.id}
              className="overflow-hidden hover:shadow-xl transition-all"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge>{event.type}</Badge>
                  <Badge variant="secondary">{event.status}</Badge>
                </div>
                <CardTitle className="text-xl mt-2">{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {event.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {event.date} • {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>

                {event.professionals.length > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Profissionais alocados:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {event.professionals.map((prof, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {prof}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <Button
                    className="flex-1 bg-gradient-to-r from-primary to-secondary text-white"
                    onClick={() => openAssignModal(event)}
                  >
                    Direcionar Profissional
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => openRegisterCitizenModal(event)}
                  >
                    Cadastrar Cidadão
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      {/* Modal: Direcionar Profissional */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Direcionar Profissional</DialogTitle>
            <DialogDescription>
              Evento: <strong>{selectedEvent?.title}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {selectedEvent?.professionals?.length > 0 && (
              <div>
                <Label className="text-sm">Profissionais já alocados:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedEvent.professionals.map(
                    (prof: string, idx: number) => (
                      <Badge key={idx} variant="outline">
                        {prof}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            <div>
              <Label>Nome do profissional</Label>
              <Input placeholder="Ex: Dra. Ana Silva" />
            </div>
            <div>
              <Label>Especialidade</Label>
              <Input placeholder="Ex: Fisioterapeuta, Nutricionista" />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button className="bg-gradient-to-r from-primary to-secondary">
              Confirmar Direcionamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal: Cadastrar Cidadão */}
      <Dialog
        open={isRegisterCitizenModalOpen}
        onOpenChange={setIsRegisterCitizenModalOpen}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Cadastrar Cidadão na Atividade</DialogTitle>
            <DialogDescription>
              Evento: <strong>{selectedEvent?.title}</strong>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div>
              <Label>Nome completo</Label>
              <Input placeholder="João Silva" />
            </div>
            <div>
              <Label>CPF</Label>
              <Input placeholder="000.000.000-00" />
            </div>
            <div>
              <Label>Data de Nascimento</Label>
              <Input type="date" />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRegisterCitizenModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button>Confirmar Cadastro</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </div>
  );
}
