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
  const [screen, setScreen] = useState<"login" | "register">("login");
  const [isRegistering, setIsRegistering] = useState(false);

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
      <div className="w-full md:w-1/2 h-screen hero-gradient flex flex-col items-center justify-center gap-6">
        <Image src="/logo.png" alt="Logo" width={300} height={300} />

        <button
          onClick={() => setScreen("login")}
          className={`w-[60%] h-[6vh] rounded-[8px] font-semibold transition cursor-pointer ${
            screen === "login"
              ? "bg-white text-primary"
              : "border border-white text-white/50 hover:text-white"
          }`}
        >
          Entrar
        </button>

        <button
          onClick={() => setScreen("register")}
          className={`w-[60%] h-[6vh] rounded-[8px] font-semibold transition cursor-pointer ${
            screen === "register"
              ? "bg-white text-primary"
              : "border border-white text-white/50 hover:text-white"
          }`}
        >
          Cadastrar
        </button>
      </div>

      <div className="w-full md:w-1/2 h-screen flex items-center justify-center">
        <div className="w-full max-w-md flex flex-col gap-6 px-6">
          <CardHeader className="w-full text-center space-y-2">
            <CardTitle className="text-2xl md:text-3xl whitespace-nowrap">
              Bem-vindo ao Conexão Saúde
            </CardTitle>
            <CardDescription className="text-base">
              {screen === "login" && "Faça login para continuar"}
              {screen === "register" && "Crie sua conta para começar"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {screen === "login" && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
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
                  <Label>Senha</Label>
                  <Input
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
            )}

            {screen === "register" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setIsRegistering(true);
                  setTimeout(() => {
                    setIsRegistering(false);
                    setScreen("login");
                  }, 1500);
                }}
                className="space-y-5"
              >
                <div className="space-y-2">
                  <Label>Nome</Label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Senha</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-12 text-base"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 hero-gradient text-white text-base font-semibold"
                  disabled={isRegistering}
                >
                  {isRegistering && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Criar conta
                </Button>
              </form>
            )}

            <div className="text-center text-sm">
              {screen === "login" ? (
                <>
                  Não tem conta?{" "}
                  <button
                    onClick={() => setScreen("register")}
                    className="text-primary font-medium hover:underline"
                  >
                    Cadastre-se
                  </button>
                </>
              ) : (
                <>
                  Já tem conta?{" "}
                  <button
                    onClick={() => setScreen("login")}
                    className="text-primary font-medium hover:underline"
                  >
                    Entrar
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
}