import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage, type User } from "./session.server";

// Create authenticator instance
export const authenticator = new Authenticator<User>(sessionStorage);

// Google OAuth2 strategy
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:3000/auth/google/callback",
  },
  async ({ profile }) => {
    // Hardcoded authentication - accept any Google user
    // In production, you would check the user against your database here
    const user: User = {
      id: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      picture: profile.photos[0]?.value,
    };

    console.log("Google user authenticated:", user.email);
    return user;
  }
);

authenticator.use(googleStrategy);
