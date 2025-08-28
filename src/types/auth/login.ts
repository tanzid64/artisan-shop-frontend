export interface ILoginResponse {
  token: string;
  token_type: "Bearer";
  access_token_expires_in: number;
  refresh_token_expires_in: number;
  user: {
    id: number;
    username: string;
    role: "user" | "admin" | "vendor";
  };
}
