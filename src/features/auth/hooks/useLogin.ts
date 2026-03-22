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
      // Salva tokens
      document.cookie = `access_token=${data.accessToken}; path=/; max-age=900; samesite=strict`;
      document.cookie = `refresh_token=${data.refreshToken}; path=/; max-age=604800; samesite=strict`;

      const userRoles = data.user?.roles || [];
      const mainRole = userRoles.length > 0 ? userRoles[0].role : "CITIZEN";

      document.cookie = `role=${mainRole}; path=/; max-age=604800; samesite=strict`;

      // ── NOVO: Salva dados do usuário no localStorage ──
      const userData = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        avatarUrl: data.user.avatarUrl || null,
        role: mainRole,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      console.log("Login response completa:", data);
      console.log("Role principal usado:", mainRole);

      toast.success("Login realizado com sucesso!");

      // redirecionamento...
      if (mainRole === "MANAGER" || mainRole === "ADMIN") {
        router.push("/manager");
      } else if (mainRole === "HEALTH_PROFESSIONAL") {
        router.push("/professional");
      } else {
        router.push("/citizen");
      }
    },
    onError: (error: any) => {
      console.error("Erro no login:", error);
      toast.error(error.message || "Email ou senha incorretos");
    },
  });
};
