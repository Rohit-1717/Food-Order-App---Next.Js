import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  loginUser,
  loginKitchenAdmin,
  logout as logoutRpc,
  signupUser,
  signupKitchenAdmin,
} from "@/lib/jsonRpcClient";

type AuthMode = "user" | "kitchen" | null;

interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string;
  isAuthenticated: boolean;
  mode: AuthMode;

  // Setters
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string) => void;
  setAuth: (auth: boolean) => void;
  setMode: (mode: AuthMode) => void;
  reset: () => void;

  // Auth Actions
  login: (params: { email: string; password: string }) => Promise<void>;
  loginKitchenAdmin: (params: {
    email: string;
    password: string;
  }) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
    fullName: string;
  }) => Promise<void>;
  signupKitchenAdmin: (params: {
    email: string;
    password: string;
    ownerName: string;
    kitchenName: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      isAuthenticated: false,
      mode: null,

      // Setters
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setAuth: (isAuthenticated) => set({ isAuthenticated }),
      setMode: (mode) => set({ mode }),

      // Reset state
      reset: () =>
        set({
          user: null,
          token: "",
          isAuthenticated: false,
          mode: null,
        }),

      // Login for normal user
      login: async ({ email, password }) => {
        try {
          const res = await loginUser({ email, password });

          // Validate response structure
          if (!res || !res.user || !res.token) {
            throw new Error("Invalid response from server");
          }

          set({
            user: {
              id: res.user.id,
              email: res.user.email,
              fullName: res.user.fullName,
              avatar: res.user.avatar,
            },
            token: res.token,
            isAuthenticated: true,
            mode: "user",
          });
        } catch (error) {
          console.error("User login error:", error);
          throw error;
        }
      },

      // Login for kitchen admin
      loginKitchenAdmin: async ({ email, password }) => {
        try {
          const res = await loginKitchenAdmin({ email, password });

          // Validate response structure - using 'admin' from your handler
          if (!res || !res.admin || !res.token) {
            throw new Error("Invalid response from server");
          }

          set({
            user: {
              id: res.admin.id,
              email: res.admin.email,
              fullName: res.admin.ownerName,
              avatar: res.admin.avatar,
            },
            token: res.token,
            isAuthenticated: true,
            mode: "kitchen",
          });
        } catch (error) {
          console.error("Kitchen admin login error:", error);
          throw error;
        }
      },

      // Signup for normal user
      signup: async ({ email, password, fullName }) => {
        try {
          const res = await signupUser({ email, password, fullName });

          // If signup returns user data and token, log them in automatically
          if (res?.user && res?.token) {
            set({
              user: {
                id: res.user.id,
                email: res.user.email,
                fullName: res.user.fullName,
                avatar: res.user.avatar,
              },
              token: res.token,
              isAuthenticated: true,
              mode: "user",
            });
          }

          return res;
        } catch (error) {
          console.error("User signup error:", error);
          throw error;
        }
      },

      // Signup for kitchen admin
      signupKitchenAdmin: async ({
        email,
        password,
        ownerName,
        kitchenName,
      }) => {
        try {
          const res = await signupKitchenAdmin({
            email,
            password,
            ownerName,
            kitchenName,
          });

          // If signup returns admin data and token, log them in automatically
          if (res?.admin && res?.token) {
            set({
              user: {
                id: res.admin.id,
                email: res.admin.email,
                fullName: res.admin.ownerName,
                avatar: res.admin.avatar,
              },
              token: res.token,
              isAuthenticated: true,
              mode: "kitchen",
            });
          }

          return res;
        } catch (error) {
          console.error("Kitchen admin signup error:", error);
          throw error;
        }
      },

      // Logout
      logout: async () => {
        try {
          const { token, mode } = get();
          if (token && mode) {
            await logoutRpc({ token, mode });
          }
        } catch (error) {
          console.error("Logout error:", error);
          // Continue with local logout even if server logout fails
        } finally {
          // Always reset local state
          get().reset();
        }
      },
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        mode: state.mode,
      }),
    }
  )
);
