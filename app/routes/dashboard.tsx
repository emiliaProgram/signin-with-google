import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { requireAuth } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
  return json({ user });
}

export default function Dashboard() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <header style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "30px",
        paddingBottom: "20px",
        borderBottom: "1px solid #eee"
      }}>
        <h1>Dashboard</h1>
        <Form action="/logout" method="post">
          <button 
            type="submit"
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </Form>
      </header>

      <div style={{ 
        backgroundColor: "#f8f9fa", 
        padding: "20px", 
        borderRadius: "8px",
        marginBottom: "20px"
      }}>
        <h2>Welcome, {user.name}!</h2>
        <div style={{ marginTop: "15px" }}>
          {user.picture && (
            <img 
              src={user.picture} 
              alt={user.name}
              style={{ 
                width: "60px", 
                height: "60px", 
                borderRadius: "50%",
                marginRight: "15px",
                verticalAlign: "middle"
              }}
            />
          )}
          <div style={{ display: "inline-block", verticalAlign: "middle" }}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
        </div>
      </div>

      <div>
        <h3>🎉 Authentication Successful!</h3>
        <p>You are now logged in with Google OAuth2. This is a protected route that requires authentication.</p>
        <p><em>Note: This is using hardcoded user acceptance. In production, you would check the user against your database.</em></p>
      </div>
    </div>
  );
}
