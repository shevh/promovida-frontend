// src/components/layout/AppShell.tsx
"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950">
          <div className="sticky top-0 z-50 border-b bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md px-6 py-4 flex items-center">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-4">
              {/* Aqui você pode colocar notificações, etc. */}
            </div>
          </div>
          <div className="p-8">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
