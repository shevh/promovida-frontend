// src/lib/apiClient.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: any;
  token?: string;
  headers?: Record<string, string>;
};

async function apiClient<T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> {
  const { method = "GET", body, token, headers = {} } = options;

  const config: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  // Adiciona token se existir
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  // Adiciona body se for POST/PUT/PATCH
  if (body && ["POST", "PUT", "PATCH"].includes(method)) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro ${response.status}: ${response.statusText}`,
    );
  }

  return response.json();
}

// Métodos convenientes
export const api = {
  get: <T>(endpoint: string, token?: string) =>
    apiClient<T>(endpoint, { method: "GET", token }),

  post: <T>(endpoint: string, body: any, token?: string) =>
    apiClient<T>(endpoint, { method: "POST", body, token }),

  put: <T>(endpoint: string, body: any, token?: string) =>
    apiClient<T>(endpoint, { method: "PUT", body, token }),

  patch: <T>(endpoint: string, body: any, token?: string) =>
    apiClient<T>(endpoint, { method: "PATCH", body, token }),

  delete: <T>(endpoint: string, token?: string) =>
    apiClient<T>(endpoint, { method: "DELETE", token }),
};
