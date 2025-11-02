# Remix Google OAuth2 Example

A simple implementation of Google OAuth2 authentication with sessions in a Remix app.
<img width="2526" height="1318" alt="Screenshot 2025-11-02 at 2 50 17 pm" src="https://github.com/user-attachments/assets/8e9c12a7-49d4-4f45-b73e-95a9ddf3b42a" />

<img width="2531" height="1311" alt="Screenshot 2025-11-02 at 2 50 54 pm" src="https://github.com/user-attachments/assets/18da6caf-5315-466b-a209-4c5111782009" />


<img width="2549" height="1319" alt="Screenshot 2025-11-02 at 2 54 02 pm" src="https://github.com/user-attachments/assets/5b7c0085-0620-406d-9ef8-ec67cfef2e34" />


## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Google OAuth2 Credentials

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Set application type to "Web application"
6. Add authorized origins:
   - `http://localhost:3000`
7. Add authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback`
8. Copy your Client ID and Client Secret

### 3. Environment Variables

Create `.env`:
```
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
SESSION_SECRET=your_session_secret_here_minimum_32_characters
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` and you'll be redirected to login.

## How It Works

1. **Authentication Flow**:
   - User clicks "Sign in with Google" → `/auth/google`
   - Redirects to Google OAuth → User approves
   - Google redirects back → `/auth/google/callback`
   - User is authenticated and redirected to `/dashboard`

2. **Session Management**:
   - User data stored in encrypted HTTP-only cookies
   - Sessions persist across browser sessions
   - Logout destroys the session

3. **Route Protection**:
   - `/dashboard` requires authentication
   - Unauthenticated users redirected to `/login`
   - Authenticated users on `/login` redirected to `/dashboard`

4. **Hardcoded Authentication**:
   - Currently accepts any Google user
   - In production, add database checks in `auth.server.ts`

## Key Files

- `app/services/auth.server.ts` - Google OAuth2 strategy
- `app/services/session.server.ts` - Session management
- `app/routes/login.tsx` - Login page
- `app/routes/dashboard.tsx` - Protected dashboard
- `app/routes/auth.google.tsx` - OAuth initiation
- `app/routes/auth.google.callback.tsx` - OAuth callback
- `app/routes/logout.tsx` - Logout handler

## Next Steps for Production

1. **Database Integration**: Replace hardcoded user acceptance with database checks
2. **Error Handling**: Add proper error pages and handling
3. **HTTPS**: Use HTTPS in production and update Google OAuth settings
4. **Environment**: Update callback URLs for production domain
5. **User Management**: Add user registration, profile management, etc.
