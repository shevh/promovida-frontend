// src/components/layout/AppSidebar.tsx
"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
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
} from "lucide-react";
import Link from "next/link";
import { useLogout } from "@/features/auth/hooks/useLogout";

export function AppSidebar() {
  const { mutate: logoutMutation, isPending } = useLogout();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">NL</span>
          </div>
          <div className="font-bold text-xl tracking-tight">Promovida</div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/private/manager">
                  <Home className="w-5 h-5" />
                  <span>Visão Geral</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/private/manager/actions">
                  <Calendar className="w-5 h-5" />
                  <span>Ações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/private/manager/reports">
                  <Users className="w-5 h-5" />
                  <span>Relatórios</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/private/manager/gamification">
                  <Trophy className="w-5 h-5" />
                  <span>Gamificação</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* Perfil no rodapé com dropdown */}
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-3 hover:bg-accent rounded-xl cursor-pointer">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>GM</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-medium text-sm">Gestor Municipal</p>
                <p className="text-xs text-muted-foreground">
                  gestor@pnl.mg.gov.br
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Meu Perfil
            </DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>

            {/* Logout com loading */}
            <DropdownMenuItem
              className="text-red-600 cursor-pointer focus:bg-red-100"
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
