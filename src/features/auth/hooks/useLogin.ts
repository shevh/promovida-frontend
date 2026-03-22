// src/features/auth/hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "../api/authApi";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: data => {
      // Salva os tokens nos cookies (o backend já envia, mas reforçamos)
      document.cookie = `access_token=${data.accessToken}; path=/; max-age=900`;
      document.cookie = `refresh_token=${data.refreshToken}; path=/; max-age=604800`;

      // Pega o role do usuário (vem do backend)
      const role = data.user.role || "CITIZEN";

      toast.success("Login realizado com sucesso!");

      // Redirecionamento correto por role
      if (role === "MANAGER" || role === "ADMIN") {
        router.push("/private/manager");
      } else if (role === "HEALTH_PROFESSIONAL") {
        router.push("/private/professional");
      } else {
        router.push("/private/citizen");
      }
    },
    onError: (error: any) => {
      toast.error(error.message || "Email ou senha incorretos");
    },
  });
};
