export interface IApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string[]> | string[] | null;
}

export interface PaginatedData<T = unknown> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
  links?: Array<{
    label: string;
    active: boolean;
    page?: number;
  }>;
}

export type IPaginatedApiResponse<T = unknown> =
  IApiResponse<PaginatedData<T> | null>;
