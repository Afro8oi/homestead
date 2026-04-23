// Auth hook — Step 10 populates this with Supabase session handling.
// For now: exposes a null user so guards/Nav render cleanly.
export function useAuth() {
  return { user: null, loading: false, signIn: null, signUp: null, signOut: null };
}
