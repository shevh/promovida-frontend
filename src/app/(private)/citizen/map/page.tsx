// src/app/(private)/citizen/map/page.tsx
"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation, Filter } from "lucide-react";

// Import dinâmico do mapa inteiro (melhor prática com Leaflet)
const MapComponent = dynamic(() => import("./components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-zinc-100">
      Carregando mapa...
    </div>
  ),
});

export default function CitizenMapPage() {
  const [showNearby, setShowNearby] = useState(false);

  return (
    <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden z-0">
      <MapComponent showNearby={showNearby} />

      {/* Controles flutuantes */}
      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-white hover:bg-gray-100"
          onClick={() => setShowNearby(!showNearby)}
        >
          <Filter className="h-6 w-6" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="rounded-full shadow-lg h-12 w-12 bg-white hover:bg-gray-100"
          onClick={() => window.location.reload()} // ou melhor: use uma função que re-centralize na userLocation
        >
          <Navigation className="h-6 w-6" />
        </Button>
      </div>

      {/* Barra inferior */}
      <Card className="absolute bottom-6 left-4 right-4 z-[1000] max-w-md mx-auto shadow-xl">
        <CardContent className="p-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            <span>
              {showNearby
                ? "Mostrando ações próximas (até 10 km)"
                : "Todas as ações visíveis"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
