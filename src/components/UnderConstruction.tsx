// src/components/UnderConstruction.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function UnderConstruction({
  title = "Em Construção",
  pageName = "esta funcionalidade",
}: {
  title?: string;
  pageName?: string;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-24 h-24 bg-amber-100 dark:bg-amber-900/30 rounded-3xl flex items-center justify-center mb-8">
        <Construction className="w-12 h-12 text-amber-600" />
      </div>

      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-xl text-muted-foreground max-w-md">
        A página{" "}
        <span className="font-medium text-foreground">"{pageName}"</span> ainda
        está em desenvolvimento.
      </p>
      <p className="text-muted-foreground mt-2 mb-10">
        Estamos trabalhando para trazer isso o mais rápido possível!
      </p>

      <Button asChild size="lg">
        <Link href="/private/citizen">
          <ArrowLeft className="mr-2 w-4 h-4" />
          Voltar ao Início
        </Link>
      </Button>
    </div>
  );
}
