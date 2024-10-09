import useAuthStore from "../stores/useAuthStore";

export function useAuth() {
  const { supabase } = useAuthStore();
  async function registerUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  }

  async function loginUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  }

  return { registerUser, loginUser };
}
