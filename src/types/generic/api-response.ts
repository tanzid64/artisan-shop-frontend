export interface IApiResponse<T = unknown> {
  status: number;
  success: boolean;
  message: string;
  data: T | null;
  errors?: Record<string, string[]> | string[] | null;
}

export interface PaginatedData<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from?: number;
  to?: number;
  links?: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
}