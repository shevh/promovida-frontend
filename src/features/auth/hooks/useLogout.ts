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
      toast.success("Logout realizado com sucesso");
      router.push("/auth/login");
    },
    onError: () => {
      toast.error("Erro ao fazer logout");
      router.push("/auth/login"); // força logout mesmo com erro
    },
  });
};
