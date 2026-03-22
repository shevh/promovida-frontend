// src/features/auth/hooks/useLogout.ts
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Limpeza completa antes de redirecionar
      localStorage.removeItem("user");

      toast.success("Logout realizado com sucesso");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error("Erro no logout:", error);

      // Mesmo com erro no backend, limpa localmente para evitar estado inconsistente
      localStorage.removeItem("user");

      toast.error("Erro ao fazer logout");
      router.push("/auth/login"); // força logout mesmo com erro
    },
  });
};
