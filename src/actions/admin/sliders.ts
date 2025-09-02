import api from "@/lib/axios";
import { handleError } from "@/lib/error-handler";
import { ISliders } from "@/types/auth/dashboard/admin/sliders";
import { IPaginatedApiResponse } from "@/types/generic/api-response";

export async function getAllSliders(): Promise<
  IPaginatedApiResponse<ISliders>
> {
  try {
    const response = await api.get(`/admin/sliders`);
    return response.data;
  } catch (error) {
    return handleError(error) as IPaginatedApiResponse<ISliders>;
  }
}
