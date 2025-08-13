"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { useAuthStore } from "@/lib/store/auth";

export default function KitchenLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const loginKitchenAdmin = useAuthStore((state) => state.loginKitchenAdmin);

  const handleSubmit = async () => {
    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginKitchenAdmin({
        email: email.trim().toLowerCase(),
        password,
      });

      toast.success("Login successful! 🎉");
      console.log("Login success, navigating to dashboard...");
      router.push("/kitchen/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      toast.error(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Kitchen Login</h2>

      <Input
        placeholder="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
      />

      <Button
        className="w-full bg-red-500 hover:bg-red-600 text-white"
        onClick={handleSubmit}
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
        onClick={() => toast.info("Google Login coming soon")}
      >
        <FcGoogle className="w-5 h-5" />
        Sign in with Google
      </Button>

      <p className="text-sm text-center mt-2">
        Don&apos;t have an account?{" "}
        <a
          href="/kitchen/signup"
          className="text-red-500 font-medium hover:underline"
        >
          Create account
        </a>
      </p>
    </div>
  );
}
