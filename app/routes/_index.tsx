import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUserFromSession } from "~/services/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserFromSession(request);
  
  // Redirect to dashboard if logged in, otherwise to login
  if (user) {
    return redirect("/dashboard");
  } else {
    return redirect("/login");
  }
}
