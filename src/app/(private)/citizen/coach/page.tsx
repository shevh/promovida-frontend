// src/app/(private)/citizen/coach/page.tsx
"use client";;
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, SmilePlus } from "lucide-react";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  // Adicione aqui outros campos que você salva no login, ex: level, points, badges, location
  level?: number;
  points?: number;
  badges?: number;
  location?: string;
}

export default function CitizenCoachPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Olá! 👋 Sou o assistente de saúde da Prefeitura de Nova Lima. Posso ajudar com informações sobre saúde, nutrição, eventos e muito mais. Como posso ajudar você hoje?",
      time: "agora",
    },
  ]);

  const [user, setUser] = useState<UserData | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carrega usuário do localStorage (igual à sidebar)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as UserData;
        setUser(parsed);
      } catch (error) {
        console.error("Erro ao carregar usuário do localStorage:", error);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;

    // Adiciona mensagem do usuário
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: message,
        time: "agora",
      },
    ]);

    // Simulação de resposta da IA (substitua por fetch real ao backend)
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          sender: "assistant",
          text: "Entendi! Você quer saber sobre eventos de yoga? Essa semana temos aula no Parque Municipal às 07h. Quer mais detalhes ou inscrição?",
          time: "agora",
        },
      ]);
    }, 1200);

    setMessage("");
  };

  // Valores com fallback
  const displayName = user?.name ?? "Usuário";
  const displayLocation = user?.location ?? "Localização";
  const displayLevel = user?.level ?? "?";
  const displayPoints = user?.points ?? 0;
  const displayBadges = user?.badges ?? 0;
  const avatarSrc = user?.avatarUrl ?? "/default-avatar.png";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-slate-50">
      {/* Header com degrade */}
      <header className="bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 border-2 border-white/80 shadow-sm">
                <AvatarImage src={avatarSrc} alt={displayName} />
                <AvatarFallback className="bg-white text-teal-600 font-semibold text-xl">
                  {displayName
                    .split(" ")
                    .map(n => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div>
                <h1 className="text-2xl font-bold">Olá, {displayName}!</h1>
                <p className="text-teal-100/90 text-sm">
                  {displayLocation} • Nível {displayLevel}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold">{displayPoints}</div>
                <div className="text-xs text-teal-100/80">PONTOS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{displayBadges}</div>
                <div className="text-xs text-teal-100/80">BADGES</div>
              </div>
            </div>
          </div>

          {/* Dica de atalho */}
          <p className="text-center text-sm text-teal-100/80 mt-4 opacity-90">
            Para sair do modo tela cheia, toque em{" "}
            <kbd className="bg-teal-700/80 px-2 py-1 rounded text-xs">Esc</kbd>
          </p>
        </div>
      </header>

      {/* Área do chat */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Cabeçalho do assistente */}
        <div className="bg-white border-b shadow-sm px-6 py-4 flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/logo-ia.png" alt="Assistente IA" />
            <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white font-bold">
              IA
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="font-semibold text-lg">Assistente de Saúde IA</h2>
            <div className="flex items-center gap-2 text-sm text-green-600">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              Online • Responde instantaneamente
            </div>
          </div>
        </div>

        {/* Mensagens */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50/50 to-white">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === "user" ? "ml-auto justify-end" : ""
              }`}
            >
              {msg.sender === "assistant" && (
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                    IA
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`rounded-2xl px-4 py-3 shadow-sm ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-tr-none"
                    : "bg-white border border-slate-200 rounded-tl-none"
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
                <span className="text-xs opacity-70 mt-1 block text-right">
                  {msg.time}
                </span>
              </div>

              {msg.sender === "user" && (
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarImage src={avatarSrc} alt={displayName} />
                  <AvatarFallback className="bg-teal-600 text-white">
                    {displayName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t bg-white p-4 sticky bottom-0 shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Paperclip className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <SmilePlus className="h-5 w-5 text-muted-foreground" />
            </Button>

            <Input
              placeholder="Pergunte sobre saúde, nutrição, eventos..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e =>
                e.key === "Enter" &&
                !e.shiftKey &&
                (e.preventDefault(), handleSend())
              }
              className="flex-1 rounded-full border-slate-300 focus-visible:ring-teal-600 focus-visible:ring-offset-0 py-6 px-5 text-base"
            />

            <Button
              size="icon"
              className="rounded-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 h-12 w-12"
              onClick={handleSend}
              disabled={!message.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground mt-3">
            Respostas geradas por IA • Consulte um profissional para orientações
            médicas
          </p>
        </div>
      </main>
    </div>
  );
}
