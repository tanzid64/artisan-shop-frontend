import { NextResponse, type NextRequest } from "next/server";
import { config as appConfig } from "./lib/config";

const COOKIE_PREFIX = appConfig.env.COOKIE_PREFIX;
const PUBLIC_ROUTE = appConfig.routes.PUBLIC_ROUTE;
const AUTH_ROUTE = appConfig.routes.AUTH_ROUTE;

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isPublicRoute = PUBLIC_ROUTE.find((route) =>
    nextUrl.pathname.startsWith(route)
  );
  const isAuthRoute = AUTH_ROUTE.find((route) =>
    nextUrl.pathname.startsWith(route)
  );

  // GET user token & role from cookies to check user is authenticated or not
  const token = request.cookies.get(COOKIE_PREFIX + "token");
  const role = request.cookies.get(COOKIE_PREFIX + "role");
  const isAuthenticated = token && role;

  // Redirect unauthenticated user from protected route to login route
  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", nextUrl.origin));
  }

  // Prevent authenticated users from accessing auth (login, register) routes
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", nextUrl.origin));
  }

  // TODO: Role based access control
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
