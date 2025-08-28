export const config = {
  env: {
    SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    COOKIE_PREFIX: process.env.NEXT_PUBLIC_COOKIE_PREFIX || "artisan_shop_",
  },
  routes: {
    PUBLIC_ROUTE: ["/login", "/register", "/api/*", "/_next/*"],
    AUTH_ROUTE: ["/login", "/register"],
  },
};
