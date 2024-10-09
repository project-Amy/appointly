import { create } from 'zustand';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Le variabili d\'ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY devono essere definite.');
}

interface AuthState {
  supabase: SupabaseClient;
  user: User | null;
  loading: boolean;
  error: string | null;
  registerUser: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUser: () => Promise<void>;
  initialized: boolean;
  initialize: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set, get) => ({
  supabase: createClient(supabaseUrl!, supabaseKey!),
  user: null,
  loading: false,
  error: null,
  initialized: false,

  registerUser: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const { data, error } = await get().supabase.auth.signUp({ email, password });
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ user: data.user, loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    const { data, error } = await get().supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ user: data.user, loading: false });
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    const { error } = await get().supabase.auth.signOut();
    if (error) {
      set({ error: error.message, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  getUser: async () => {
    if (get().initialized) return;
    set({ loading: true, error: null });
    await get().initialize();
  },

  initialize: async () => {
    const { data, error } = await get().supabase.auth.getSession();
    if (error) {
      set({ error: error.message, loading: false, initialized: true });
    } else {
      set({ user: data.session?.user || null, loading: false, initialized: true });
    }
  },
}));

export default useAuthStore;