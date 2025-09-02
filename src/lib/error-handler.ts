import { IApiResponse } from "@/types/generic/api-response";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => { 
  if (error instanceof AxiosError) {
        return error.response?.data as IApiResponse<null>;
      } else {
        return {
          status: 500,
          success: false,
          message: "Something went wrong",
          data: null,
        };
      }
}