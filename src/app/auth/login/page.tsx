"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const isAdmin = searchParams.get("admin") === "true";

  // Get the correct login methods from auth store
  const login = useAuthStore((state) => state.login);
  const loginKitchenAdmin = useAuthStore((state) => state.loginKitchenAdmin);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");
      return;
    }

    setIsLoading(true);
    try {
      // Use the auth store methods directly
      if (isAdmin) {
        await loginKitchenAdmin({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        });
        toast.success("Logged in successfully!");
        router.push("/kitchen/dashboard");
      } else {
        await login({
          email: email.trim().toLowerCase(),
          password: password.trim(),
        });
        toast.success("Logged in successfully!");
        router.push("/menu");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      toast.error(error?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md px-6 py-8 space-y-6 my-20">
      <h2 className="text-2xl font-bold text-center">
        {isAdmin ? "Kitchen Admin Login" : "Login to Foodie"}
      </h2>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <Input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
      </div>

      <Button
        className="w-full bg-red-500 hover:bg-red-600 text-white"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <div className="flex items-center gap-2">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">or</span>
        <Separator className="flex-1" />
      </div>

      <Button
        variant="outline"
        className="w-full flex items-center gap-2"
        onClick={() => toast.info("Google Sign In coming soon")}
        disabled={isLoading}
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </Button>

      <p className="text-sm text-center mt-4">
        New to Foodie?{" "}
        <Link href="/auth/signup" className="text-red-500 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
