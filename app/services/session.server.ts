import { createCookieSessionStorage } from "@remix-run/node";

// Simple user type for hardcoded authentication
export interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

// Create session storage
export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET || "fallback-secret-for-dev"],
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;

// Get user from session
export async function getUserFromSession(request: Request): Promise<User | null> {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");
  return user || null;
}

// Require authenticated user (redirect to login if not authenticated)
export async function requireAuth(request: Request): Promise<User> {
  const user = await getUserFromSession(request);
  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return user;
}
