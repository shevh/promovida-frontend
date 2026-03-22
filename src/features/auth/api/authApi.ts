import { api } from "@/lib/apiClient";
import type { LoginRequest } from "../types/request.types";
import type { AuthResponse } from "../types/response.types";

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<AuthResponse>("/api/auth/login", data),
  logout: () => api.post("/api/auth/logout", {}),
};
