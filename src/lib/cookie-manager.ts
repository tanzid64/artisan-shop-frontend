import Cookies, { CookieSetOptions } from "universal-cookie";
import { config } from "./config";

class CookieManager {
  private cookies: Cookies;
  public cookiePrefix = config.env.COOKIE_PREFIX;

  constructor() {
    this.cookies = new Cookies();
  }

  // ** Set Cookie
  setCookie(name: string, value: string, options: CookieSetOptions) {
    this.cookies.set(this.cookiePrefix + name, value, options);
  }

  // ** Get Cookie
  getCookie(name: string): string | undefined {
    return this.cookies.get(this.cookiePrefix + name);
  }

  // ** Remove Cookie
  removeCookie(name: string) {
    this.cookies.remove(this.cookiePrefix + name, { path: "/" });
  }

  // ** Set Authentication Token -> Time to live unlimited
  setAuthToken({ token, role }: { token: string; role: string }) {
    this.setCookie("token", token, {
      path: "/",
    });
    this.setCookie("role", role, {
      path: "/",
    });
  }

  // ** Get Authentication Token
  getAuthToken(): string | undefined {
    return this.cookies.get("token");
  }

  // ** Get Role
  getRole(): string | undefined {
    return this.cookies.get("role");
  }

  // ** Set Refreshed Access Token
  setRefreshedAccessToken(token: string) {
    const role = this.getRole();
    if (role) {
      this.setAuthToken({ token, role });
    }
  }

  // ** Remove Authentication Token
  removeAuthToken() {
    this.cookies.remove("auth_token", { path: "/" });
    this.cookies.remove("role", { path: "/" });
  }
}

export const cookieManager = new CookieManager();
