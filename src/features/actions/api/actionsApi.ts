import { api } from "@/lib/apiClient";
import type { ActionsListResponse } from "../types/response.types";
import { Action } from "../schemas/action.schema";

export const actionsApi = {
  list: () => api.get<ActionsListResponse>("/api/actions"),
  getById: (id: string) => api.get<Action>(`/api/actions/${id}`),
};
