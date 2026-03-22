// src/app/(private)/manager/page.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Calendar, Users, Star, Trophy } from "lucide-react";

const kpis = [
  {
    title: "Eventos Totais",
    value: "5",
    icon: Calendar,
    color: "text-primary",
  },
  {
    title: "Total de Inscritos",
    value: "498",
    icon: Users,
    color: "text-secondary",
  },
  {
    title: "Avaliação Média",
    value: "4.7",
    icon: Star,
    color: "text-amber-500",
  },
  {
    title: "Cidadãos Ativos",
    value: "5",
    icon: Trophy,
    color: "text-emerald-500",
  },
];

const inscritosPorBairro = [
  { bairro: "Centro", inscritos: 342 },
  { bairro: "Vila da Serra", inscritos: 67 },
  { bairro: "Jardim Canadá", inscritos: 45 },
  { bairro: "Alphaville", inscritos: 98 },
  { bairro: "Honório Bicalho", inscritos: 23 },
];

const eventosPorSecretaria = [
  { name: "Esporte e Lazer", value: 45, color: "#3ecdf3" },
  { name: "Saúde", value: 30, color: "#35e47d" },
  { name: "Educação", value: 15, color: "#f59e0b" },
  { name: "Meio Ambiente", value: 10, color: "#8b5cf6" },
];

const eventos = [
  {
    evento: "Corrida pela Saúde 2026",
    bairro: "Centro",
    tipo: "Inscrição",
    inscritos: "342/500",
    status: "Ativo",
  },
  {
    evento: "Campanha de Vacinação - Gripe 2026",
    bairro: "Jardim Canadá",
    tipo: "Informativo",
    inscritos: "0",
    status: "Ativo",
  },
  {
    evento: "Yoga no Parque",
    bairro: "Vila da Serra",
    tipo: "Inscrição",
    inscritos: "67/80",
    status: "Ativo",
  },
  {
    evento: "Feira de Saúde e Nutrição",
    bairro: "Alphaville",
    tipo: "Inscrição",
    inscritos: "89/200",
    status: "Em breve",
  },
  {
    evento: "Mutirão de Limpeza - Dengue Zero",
    bairro: "Honório Bicalho",
    tipo: "Informativo",
    inscritos: "0",
    status: "Ativo",
  },
];

export default function ManagerDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard do Gestor</h1>
          <p className="text-muted-foreground">
            Acompanhe os indicadores e resultados
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {kpis.map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-4xl font-bold mt-2">{kpi.value}</p>
                </div>
                <kpi.icon className={`w-10 h-10 ${kpi.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardHeader>
            <CardTitle>Inscritos por Bairro</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inscritosPorBairro}>
                <XAxis dataKey="bairro" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="inscritos" fill="#3ecdf3" radius={8} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eventos por Secretaria</CardTitle>
          </CardHeader>
          <CardContent className="h-[340px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={eventosPorSecretaria}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                >
                  {eventosPorSecretaria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Eventos */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento de Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-muted-foreground">
                <th className="pb-4">Evento</th>
                <th className="pb-4">Bairro</th>
                <th className="pb-4">Tipo</th>
                <th className="pb-4">Inscritos</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {eventos.map((e, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-zinc-50">
                  <td className="py-5 font-medium">{e.evento}</td>
                  <td className="py-5 text-muted-foreground">{e.bairro}</td>
                  <td className="py-5">{e.tipo}</td>
                  <td className="py-5 font-medium">{e.inscritos}</td>
                  <td className="py-5">
                    <Badge variant="default">{e.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
