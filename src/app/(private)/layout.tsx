// src/app/(private)/layout.tsx
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/layout/AppShell";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <AppShell>{children}</AppShell>
    </TooltipProvider>
  );
}
