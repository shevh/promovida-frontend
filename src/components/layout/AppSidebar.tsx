// src/components/layout/AppSidebar.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar, // ← Importe isso! (disponível no shadcn sidebar)
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Calendar,
  Users,
  Trophy,
  LogOut,
  User,
  Loader2,
  Heart,
  Settings,
  MapPinned,
  Ticket,
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { cn } from "@/lib/utils"; // ← Importe cn do shadcn (para classes condicionais)

type Role = "CITIZEN" | "HEALTH_PROFESSIONAL" | "MANAGER" | "ADMIN";

interface UserData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: Role;
}

export function AppSidebar() {
  const { mutate: logoutMutation, isPending } = useLogout();
  const { state } = useSidebar(); // "expanded" | "collapsed"
  const isCollapsed = state === "collapsed";

  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as UserData;
          if (parsed && parsed.id && parsed.role) {
            setUser(parsed);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error("Erro ao parsear user do localStorage:", error);
        }
      }

      // Fallback role do cookie
      const cookies = document.cookie.split(";");
      const roleCookie = cookies.find(c => c.trim().startsWith("role="));
      let fallbackRole: Role = "CITIZEN";
      if (roleCookie) {
        const value = roleCookie.split("=")[1]?.trim() as Role;
        if (
          value &&
          ["CITIZEN", "HEALTH_PROFESSIONAL", "MANAGER", "ADMIN"].includes(value)
        ) {
          fallbackRole = value;
        }
      }

      setUser({
        id: "",
        name: "Usuário",
        email: "Não autenticado",
        avatarUrl: null,
        role: fallbackRole,
      });
      setIsLoading(false);
    };

    loadUser();

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "user") loadUser();
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const displayName = user?.name ?? "Usuário";
  const displayEmail =
    user?.email ?? (isLoading ? "carregando..." : "Não autenticado");
  const avatarSrc = user?.avatarUrl ?? "/default-avatar.png";
  const role = user?.role ?? "CITIZEN";

  // Menus por role
  const menuItems: Record<Role, { href: string; icon: any; label: string }[]> =
    {
      CITIZEN: [
        { href: "/citizen", icon: Home, label: "Início" },
        { href: "/citizen/actions", icon: Calendar, label: "Ações" },
        { href: "/citizen/coach", icon: Heart, label: "IA Coach" },
        { href: "/citizen/map", icon: MapPinned, label: "Mapa" },
        { href: "/citizen/tickets", icon: Ticket, label: "Ingressos" },
      ],
      HEALTH_PROFESSIONAL: [
        { href: "/professional", icon: Home, label: "Eventos de Saúde" },
        { href: "/professional/direcionar", icon: Users, label: "Direcionar" },
        { href: "/professional/relatorios", icon: Trophy, label: "Relatórios" },
      ],
      MANAGER: [
        { href: "/manager", icon: Home, label: "Visão Geral" },
        { href: "/manager/actions", icon: Calendar, label: "Ações" },
        { href: "/manager/reports", icon: Users, label: "Relatórios" },
        { href: "/manager/gamification", icon: Trophy, label: "Gamificação" },
      ],
      ADMIN: [
        { href: "/manager", icon: Home, label: "Visão Geral" },
        { href: "/manager/actions", icon: Calendar, label: "Ações" },
        { href: "/manager/reports", icon: Users, label: "Relatórios" },
        { href: "/manager/gamification", icon: Trophy, label: "Gamificação" },
      ],
    };

  const currentMenu = menuItems[role] || menuItems.CITIZEN;

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className={cn("transition-all", isCollapsed && "p-2")}>
        <div
          className={cn(
            "flex items-center gap-3 py-3",
            isCollapsed ? "justify-center px-0" : "px-4"
          )}
        >
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xl">NL</span>
          </div>
          {!isCollapsed && (
            <div className="font-bold text-xl tracking-tight">Promovida</div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {currentMenu.map((item, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton
                  asChild
                  tooltip={isCollapsed ? item.label : undefined}
                >
                  <Link href={item.href}>
                    <item.icon className="w-5 h-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={cn("transition-all", isCollapsed && "p-2")}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={cn(
                "flex items-center p-3 hover:bg-accent rounded-xl cursor-pointer transition-colors",
                isCollapsed ? "justify-center flex-col gap-1" : "gap-3"
              )}
            >
              <Avatar className={cn("w-8 h-8", isCollapsed && "w-10 h-10")}>
                <AvatarImage src={avatarSrc} alt={displayName} />
                <AvatarFallback className="text-xs">
                  {displayName
                    .split(" ")
                    .map(n => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase() || "US"}
                </AvatarFallback>
              </Avatar>

              {!isCollapsed && (
                <div className="text-left min-w-0">
                  <p className="font-medium text-sm truncate">{displayName}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {displayEmail}
                  </p>
                </div>
              )}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Meu Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600 cursor-pointer focus:bg-red-100 focus:text-red-700"
              onClick={() => logoutMutation()}
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogOut className="mr-2 h-4 w-4" />
              )}
              {isPending ? "Saindo..." : "Sair"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
