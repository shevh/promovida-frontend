// src/app/(private)/citizen/coach/page.tsx
"use client";

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
  level?: number;
  points?: number;
  badges?: number;
  location?: string;
}

// Mock de inscrições (para simular o que o usuário já "inscreveu")
interface Inscription {
  event: string;
  date: string;
  status: "confirmado" | "pendente";
}

export default function CitizenCoachPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Olá! 👋 Sou o assistente de saúde da Prefeitura de Nova Lima. Posso ajudar com informações sobre corridas, artesanato, lazer, apoio psicológico, suporte, endereços de UBS, vacinação, nutrição, dengue, eventos e muito mais. Como posso ajudar você hoje?",
      time: "agora",
    },
  ]);

  const [user, setUser] = useState<UserData | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inscriptions, setInscriptions] = useState<Inscription[]>([]); // Simula inscrições do usuário

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Carrega usuário do localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser) as UserData;
        setUser(parsed);
      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
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

    const userMessage = message.trim();
    const msgLower = userMessage.toLowerCase();

    // Adiciona mensagem do usuário
    setMessages(prev => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "user",
        text: userMessage,
        time: "agora",
      },
    ]);

    setIsTyping(true);

    setTimeout(
      () => {
        const response = getAssistantResponse(msgLower, userMessage);
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "assistant",
            text: response.text,
            time: "agora",
          },
        ]);

        // Se for confirmação de inscrição
        if (response.isInscriptionConfirmation) {
          setInscriptions(prev => [
            ...prev,
            {
              event: response.event || "Evento sugerido",
              date: response.date || "Data não informada",
              status: "confirmado",
            },
          ]);
        }

        setIsTyping(false);
      },
      1200 + Math.random() * 800
    );

    setMessage("");
  };

  const getAssistantResponse = (msgLower: string, originalMsg: string) => {
    // Verifica se é uma confirmação após sugestão anterior
    const lastAssistantMsg = messages[messages.length - 1]?.text || "";
    const isConfirmation =
      msgLower.includes("sim") ||
      msgLower.includes("quero") ||
      msgLower.includes("inscreva") ||
      msgLower.includes("confirma") ||
      msgLower.includes("confirmar") ||
      msgLower.includes("ok") ||
      msgLower.includes("pode");

    if (isConfirmation && lastAssistantMsg.includes("Quer se inscrever")) {
      return {
        text: `Perfeito, ${user?.name ?? "amigo"}! 🎉 Sua inscrição para a Corrida pela Saúde 2026 foi confirmada. Você recebeu +50 pontos por participar! O QR Code do ingresso será enviado para seu e-mail e aparece na aba "Meus Ingressos". Qualquer dúvida, é só chamar!`,
        isInscriptionConfirmation: true,
        event: "Corrida pela Saúde 2026",
        date: "14/04/2026",
      };
    }

    if (isConfirmation && lastAssistantMsg.includes("Quer o cronograma")) {
      return {
        text: `Ótimo! Sua inscrição na aula de Yoga no Parque foi confirmada. +30 pontos adicionados ao seu saldo! O local é Vila da Serra, dia 19/04 às 06:30. Veja os detalhes na aba "Meus Ingressos".`,
        isInscriptionConfirmation: true,
        event: "Yoga no Parque",
        date: "19/04/2026",
      };
    }

    // Detecção de temas
    if (
      msgLower.includes("corrida") ||
      msgLower.includes("correr") ||
      msgLower.includes("maratona") ||
      msgLower.includes("caminhada")
    ) {
      return {
        text: "Temos várias corridas e caminhadas de promoção da saúde! A próxima é a Corrida pela Saúde 2026 no dia 14/04 às 07h no Centro. Inclui avaliação física gratuita e orientação nutricional. Quer se inscrever ou saber mais detalhes?",
        isInscriptionConfirmation: false,
      };
    }

    if (
      msgLower.includes("artesanato") ||
      msgLower.includes("artesanal") ||
      msgLower.includes("manual") ||
      (msgLower.includes("feira") && msgLower.includes("artesanato"))
    ) {
      return {
        text: "As feiras de artesanato são ótimas para lazer e terapia! Tem várias acontecendo em Nova Lima, principalmente nos fins de semana no Centro e em Jardim Canadá. Posso te enviar a lista de eventos de artesanato desse mês?",
        isInscriptionConfirmation: false,
      };
    }

    if (
      msgLower.includes("lazer") ||
      msgLower.includes("parque") ||
      msgLower.includes("diversão") ||
      msgLower.includes("recreação") ||
      msgLower.includes("yoga")
    ) {
      return {
        text: "Para momentos de lazer, temos Yoga no Parque, caminhadas guiadas e eventos no Parque Municipal. A próxima aula de yoga é dia 19/04 às 06:30 na Vila da Serra. Quer se inscrever ou o cronograma completo de lazer?",
        isInscriptionConfirmation: false,
      };
    }

    if (
      msgLower.includes("psicológico") ||
      msgLower.includes("psicologia") ||
      msgLower.includes("terapia") ||
      msgLower.includes("depressão") ||
      msgLower.includes("ansiedade") ||
      msgLower.includes("saúde mental")
    ) {
      return {
        text: "A Prefeitura oferece apoio psicológico gratuito em várias UBS e no Centro de Atenção Psicossocial (CAPS). Podemos agendar uma conversa ou te indicar o endereço mais próximo? Você está precisando de ajuda urgente?",
        isInscriptionConfirmation: false,
      };
    }

    if (
      msgLower.includes("suporte") ||
      msgLower.includes("ajuda") ||
      msgLower.includes("orientação")
    ) {
      return {
        text: "Claro! Estou aqui para ajudar. Pode falar sobre saúde física, mental, nutrição, eventos, endereços ou qualquer dúvida. O que está precisando hoje? 😊",
        isInscriptionConfirmation: false,
      };
    }

    if (
      msgLower.includes("endereço") ||
      msgLower.includes("onde fica") ||
      msgLower.includes("localização") ||
      msgLower.includes("ubs") ||
      msgLower.includes("posto") ||
      msgLower.includes("centro de saúde")
    ) {
      return {
        text: "Temos várias unidades de saúde em Nova Lima! Qual tipo de serviço você precisa? Ex: UBS Centro (Rua Principal, 123 - Centro), CAPS Jardim Canadá (Av. das Flores, 456), etc. Me diz o bairro que te indico o mais próximo!",
        isInscriptionConfirmation: false,
      };
    }

    // Fallback
    return {
      text: "Entendi! 😊 Pode falar mais sobre o que você precisa? Estou aqui para ajudar com corridas, artesanato, lazer, apoio psicológico, suporte, endereços de unidades, eventos, nutrição ou qualquer outra dúvida sobre os serviços da Prefeitura de Nova Lima.",
      isInscriptionConfirmation: false,
    };
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
              className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto justify-end" : ""}`}
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

          {/* Animação de "digitando..." */}
          {isTyping && (
            <div className="flex gap-3">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-teal-500 to-teal-600 text-white">
                  IA
                </AvatarFallback>
              </Avatar>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-sm animate-pulse">
                Digitando...
              </div>
            </div>
          )}

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
              placeholder="Pergunte sobre corridas, artesanato, lazer, apoio psicológico, endereços, eventos..."
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
