import { LoginFormSchemaType } from "@/hooks/auth/use-login";
import { config } from "@/lib/config";
import { ILoginResponse } from "@/types/auth/login";
import { IApiResponse } from "@/types/generic/api-response";
import axios, { AxiosError } from "axios";

export async function login(
  payload: LoginFormSchemaType
): Promise<IApiResponse<ILoginResponse | null>> {
  try {
    const response = await axios.post(
      `${config.env.SERVER_URL}/login`,
      payload
    );
    return response.data;
  } catch (error) {
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
}
