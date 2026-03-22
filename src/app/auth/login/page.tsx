"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginForm,
} from "@/features/auth/schemas/login.schema";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const { mutate: login, isPending } = useLogin();
  const [showForm, setShowForm] = useState(false); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginForm) => login(data);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-zinc-950">
      <div
        className={`w-full md:w-1/2 h-screen hero-gradient flex flex-col items-center justify-center gap-6 ${
          showForm ? "hidden md:flex" : "flex"
        }`}
      >
        <Image src="/logo.png" alt="Logo" width={300} height={300} />

        <button
          onClick={() => setShowForm(true)}
          className="w-[60%] h-[6vh] bg-white rounded-[8px] text-primary font-semibold cursor-pointer hover:bg-gray-100 transition"
        >
          Entrar
        </button>

        <button className="w-[60%] h-[6vh] rounded-[8px] text-white/50 border border-white/50 font-semibold cursor-pointer hover:text-white transition">
          Cadastrar
        </button>
      </div>

      <div
        className={`w-full md:w-1/2 h-screen flex items-center justify-center ${
          showForm ? "flex" : "hidden md:flex"
        }`}
      >
        <div className="w-full max-w-md flex flex-col gap-6 px-6">
          
          <CardHeader className="w-[100%] text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl whitespace-nowrap">
              Bem-vindo ao Promovida
            </CardTitle>
            <CardDescription className="text-base">
              Faça login para continuar
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="h-12 text-base"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-12 text-base"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-12 hero-gradient text-white text-base font-semibold"
                disabled={isPending}
              >
                {isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Entrar
              </Button>
            </form>

            <button
              onClick={() => setShowForm(false)}
              className="md:hidden text-sm text-muted-foreground"
            >
              ← Voltar
            </button>

            <div className="text-center text-sm">
              Não tem conta?{" "}
              <Link
                href="/auth/register"
                className="text-primary font-medium hover:underline"
              >
                Cadastre-se
              </Link>
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}