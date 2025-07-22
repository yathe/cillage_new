<<<<<<< HEAD
import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { isValidPassword } from "./lib/isValidPassword";

export default clerkMiddleware(async (auth, req) => {
  // Custom auth logic for /admin routes
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    const authenticated = await isAuthenticated(req);
    if (!authenticated) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic" },
      });
    }
  }

  // Otherwise, proceed as normal
  return NextResponse.next();
});

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");

  if (!authHeader) return false;

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(password, process.env.HASHED_ADMIN_PASSWORD!))
  );
}

// Apply middleware to Clerk protected and admin routes
export const config = {
  matcher: [
    "/admin/:path*",
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',

  ],
};
=======
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { isValidPassword } from "./lib/isValidPassword";

// --- Clerk-protected customer routes (EXCLUDE /sign-in and children) ---
const clerkProtectedRoutes = createRouteMatcher([
  // Protect everything except /admin, /api, static, and /sign-in catch-all
  "/((?!admin|api|_next/static|_next/image|favicon.ico|sign-in).*)",
]);

// --- Admin basic auth routes ---
const adminProtectedRoutes = createRouteMatcher([
  "/admin/:path*",
]);

export async function middleware(req: NextRequest) {
  if (clerkProtectedRoutes(req)) {
    return clerkMiddleware()(req);
  }
  if (adminProtectedRoutes(req)) {
    if ((await isAuthenticated(req)) === false) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: { "WWW-Authenticate": "Basic" },
      });
    }
    return NextResponse.next();
  }
  // All other routes (including /sign-in) pass through
  return NextResponse.next();
}

async function isAuthenticated(req: NextRequest) {
  const authHeader =
    req.headers.get("authorization") || req.headers.get("Authorization");
  if (authHeader == null) return false;
  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  return (
    username === process.env.ADMIN_USERNAME &&
    (await isValidPassword(
      password,
      process.env.HASHED_ADMIN_PASSWORD as string
    ))
  );
}

// --- Match all needed routes ---
export const config = {
  matcher: [
    // Customer-facing (Clerk-protected, EXCLUDE /sign-in)
    "/((?!api|_next/static|_next/image|favicon.ico|sign-in).*)",
    // Admin
    "/admin/:path*",
  ],
};
>>>>>>> 44ac3c5 (WIP before pulling)
