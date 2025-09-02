import { Processo } from "./Processo";

export interface ProcessoParams {
    movimento?: string;
    page?: number;
    per_page?: number;
}

export interface ProcessoResponse {
  // Em caso do backend ser responsável pela paginação.
  data: Processo[];
  totalCases: number;
  perPage: number;
  currentPage: number;
}
