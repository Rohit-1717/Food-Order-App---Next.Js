"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth";

export default function UserSignupForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signup = useAuthStore((state) => state.signup);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const { fullName, email, password } = formData;

    if (!fullName.trim() || !email.trim() || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      // Use the auth store method which handles everything
      await signup({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      toast.success("User registered successfully! 🎉");

      // Navigate based on whether auto-login happened
      setTimeout(() => {
        router.push("/menu");
      }, 1000);
    } catch (error: any) {
      console.error("User signup error:", error);
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-xl shadow-md px-6 py-8 space-y-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Sign Up On Foodie</h2>
          </div>

          <div className="space-y-4">
            <Input
              placeholder="Your Name"
              value={formData.fullName}
              onChange={handleInputChange("fullName")}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Input
              placeholder="Email Address"
              type="email"
              value={formData.email}
              onChange={handleInputChange("email")}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Input
              placeholder="Password (min 6 characters)"
              type="password"
              value={formData.password}
              onChange={handleInputChange("password")}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
          </div>

          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-red-500 font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
