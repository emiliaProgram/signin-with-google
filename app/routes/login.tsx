import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { getUserFromSession } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // If user is already logged in, redirect to dashboard
  const user = await getUserFromSession(request);
  if (user) {
    return redirect("/dashboard");
  }
  return null;
}

export default function Login() {
  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      gap: "20px"
    }}>
      <h1>Welcome to My App</h1>
      <p>Please sign in to continue</p>
      
      <Form action="/auth/google" method="post">
        <button 
          type="submit"
          style={{
            backgroundColor: "#4285f4",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Sign in with Google
        </button>
      </Form>
    </div>
  );
}
