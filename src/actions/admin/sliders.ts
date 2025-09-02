import api from "@/lib/axios";
import { handleError } from "@/lib/error-handler";
import { ISliders } from "@/types/auth/dashboard/admin/sliders";
import { IPaginatedApiResponse } from "@/types/generic/api-response";

export async function getAllSliders(params: {
  search: string;
  status: "all" | "active" | "inactive";
  sort_by: string;
  sort_dir: "asc" | "desc";
  per_page: number;
  page: number;
}): Promise<IPaginatedApiResponse<ISliders>> {
  try {
    const response = await api.get(`/admin/sliders`, {
      params,
    });
    return response.data;
  } catch (error) {
    return handleError(error) as IPaginatedApiResponse<ISliders>;
  }
}
