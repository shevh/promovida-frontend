// src/app/(private)/citizen/map/components/MapComponent.tsx
"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

// ==================== FIX PARA ÍCONES ====================
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
});

// Ícone azul padrão para os eventos (igual ao da sua print)
const actionIcon = L.icon({
  iconUrl: "/marker-icon.png",
  iconSize: [28, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

// Ícone bonito para SUA localização (estilo Google Maps)
const userIcon = L.divIcon({
  className: 'custom-user-marker',
  html: `<div style="
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    border: 1px solid white;
    box-shadow: 0 5px 15px rgba(0,0,0,0.4);
  ">📍</div>`,
  iconSize: [46, 46],
  iconAnchor: [23, 23],
});

type Action = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  lat: number;
  lng: number;
  category: string;
  participants?: string;
};

const mockActions: Action[] = [
  {
    id: 1,
    title: "Corrida pela Saúde 2026",
    date: "14/04/2026",
    time: "07:00",
    location: "Centro",
    lat: -19.985,
    lng: -43.935,
    category: "Esporte e Lazer",
    participants: "342/500",
  },
  {
    id: 2,
    title: "Campanha de Vacinação - Gripe 2026",
    date: "31/03/2026",
    time: "08:00",
    location: "Jardim Canadá",
    lat: -19.972,
    lng: -43.948,
    category: "Saúde",
    participants: undefined,
  },
  {
    id: 3,
    title: "Yoga no Parque",
    date: "19/04/2026",
    time: "06:30",
    location: "Vila da Serra",
    lat: -19.99,
    lng: -43.922,
    category: "Bem-estar",
    participants: "67/80",
  },
];

interface MapComponentProps {
  showNearby: boolean;
}

export default function MapComponent({ showNearby }: MapComponentProps) {
  const [userLocation, setUserLocation] = useState<[number, number]>([
    -19.98, -43.94,
  ]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        err => console.error("Erro ao obter localização:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const filteredActions =
    showNearby && userLocation
      ? mockActions.filter(a => {
          const R = 6371;
          const dLat = ((a.lat - userLocation[0]) * Math.PI) / 180;
          const dLon = ((a.lng - userLocation[1]) * Math.PI) / 180;
          const aCalc =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((userLocation[0] * Math.PI) / 180) *
              Math.cos((a.lat * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));
          return R * c <= 10;
        })
      : mockActions;

  return (
    <MapContainer
      center={userLocation}
      zoom={14}
      className="h-full w-full"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* === MARCADORES DOS EVENTOS === */}
      {filteredActions.map(action => (
        <Marker
          key={action.id}
          position={[action.lat, action.lng]}
          icon={actionIcon}
        >
          <Popup>
            <div className="min-w-[240px]">
              <h3 className="font-bold text-base mb-1">{action.title}</h3>
              <div className="text-sm text-muted-foreground mb-2">
                {action.date} • {action.time}
              </div>
              <div className="flex items-center gap-1.5 text-sm mb-3">
                <MapPin className="h-4 w-4" />
                {action.location}
              </div>
              {action.participants && (
                <p className="text-sm text-muted-foreground mb-3">
                  <Users className="inline h-4 w-4 mr-1" />
                  {action.participants}
                </p>
              )}
              <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                Quero me inscrever
              </Button>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* === SUA LOCALIZAÇÃO (ícone bonito azul) === */}
      <Marker position={userLocation} icon={userIcon}>
        <Popup>
          <strong>Você está aqui!</strong>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
