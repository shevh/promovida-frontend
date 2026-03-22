// src/app/(private)/citizen/tickets/page.tsx
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, MapPin, Download, Share2, Users } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

// Mock de tickets (depois vem da API)
const mockTickets = {
  active: [
    {
      id: 1,
      eventTitle: "Corrida pela Saúde 2026",
      date: "14/04/2026",
      time: "07:00",
      location: "Centro - Nova Lima",
      status: "Confirmado",
      category: "Esporte e Lazer",
      qrCodeData: "TICKET-1234567890", // UUID ou código real
      participants: "Você + 1 acompanhante",
    },
    {
      id: 2,
      eventTitle: "Yoga no Parque",
      date: "19/04/2026",
      time: "06:30",
      location: "Vila da Serra",
      status: "Confirmado",
      category: "Saúde Mental",
      qrCodeData: "TICKET-9876543210",
      participants: "Você",
    },
  ],
  ended: [
    {
      id: 3,
      eventTitle: "Feira de Saúde e Nutrição",
      date: "09/03/2026",
      time: "09:00",
      location: "Alphaville",
      status: "Encerrado",
      category: "Nutrição",
      qrCodeData: "TICKET-OLD-001",
      participants: "Você",
    },
  ],
};

export default function CitizenTicketsPage() {
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-50 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Meus Ingressos</h1>
        <p className="text-muted-foreground mt-2">
          Veja seus ingressos ativos e eventos que você já participou
        </p>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="w-full justify-start rounded-none h-14 bg-transparent border-b">
              <TabsTrigger
                value="active"
                className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:shadow-none"
              >
                Ativos
              </TabsTrigger>
              <TabsTrigger
                value="ended"
                className="data-[state=active]:border-b-2 data-[state=active]:border-teal-600 data-[state=active]:shadow-none"
              >
                Encerrados
              </TabsTrigger>
            </TabsList>

            {/* Aba Ativos */}
            <TabsContent value="active" className="mt-6 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTickets.active.map(ticket => (
                  <Dialog key={ticket.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-all cursor-pointer">
                        <CardHeader className="bg-gradient-to-r from-teal-50 to-teal-100 pb-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <Badge
                                variant="outline"
                                className="mb-2 bg-white"
                              >
                                {ticket.category}
                              </Badge>
                              <CardTitle className="text-lg">
                                {ticket.eventTitle}
                              </CardTitle>
                            </div>
                            <Badge variant="default" className="bg-green-600">
                              {ticket.status}
                            </Badge>
                          </div>
                        </CardHeader>

                        <CardContent className="pt-4 space-y-3">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            {ticket.date} • {ticket.time}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            {ticket.location}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4" />
                            {ticket.participants}
                          </div>
                        </CardContent>

                        <CardFooter className="border-t pt-4 flex justify-end">
                          <Button variant="outline" size="sm">
                            Ver QR Code
                          </Button>
                        </CardFooter>
                      </Card>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>{ticket.eventTitle}</DialogTitle>
                      </DialogHeader>

                      <div className="space-y-6 py-4">
                        <div className="flex justify-center">
                          <div className="bg-white p-4 rounded-xl shadow-md border">
                            <QRCodeSVG
                              value={ticket.qrCodeData}
                              size={200}
                              level="H"
                              fgColor="#0f766e" // teal escuro
                            />
                          </div>
                        </div>

                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {ticket.date} • {ticket.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{ticket.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{ticket.participants}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{ticket.category}</Badge>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 bg-teal-600 hover:bg-teal-700">
                            <Download className="mr-2 h-4 w-4" />
                            Baixar Voucher
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Share2 className="mr-2 h-4 w-4" />
                            Compartilhar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>

              {mockTickets.active.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg font-medium">
                    Nenhum ingresso ativo no momento
                  </p>
                  <p className="mt-2">Confira os eventos disponíveis!</p>
                </div>
              )}
            </TabsContent>

            {/* Aba Encerrados */}
            <TabsContent value="ended" className="mt-6 px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockTickets.ended.map(ticket => (
                  <Card key={ticket.id} className="overflow-hidden opacity-90">
                    <CardHeader className="bg-slate-100 pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {ticket.category}
                          </Badge>
                          <CardTitle className="text-lg">
                            {ticket.eventTitle}
                          </CardTitle>
                        </div>
                        <Badge variant="outline">{ticket.status}</Badge>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {ticket.date} • {ticket.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {ticket.location}
                      </div>
                    </CardContent>

                    <CardFooter className="border-t pt-4 flex justify-end">
                      <Button variant="outline" size="sm">
                        Ver detalhes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {mockTickets.ended.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg font-medium">
                    Nenhum evento encerrado ainda
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
