"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/auth";

export default function KitchenSignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    restaurantName: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signupKitchenAdmin = useAuthStore((state) => state.signupKitchenAdmin);

  const handleInputChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const handleSubmit = async () => {
    const { name, restaurantName, email, password } = formData;

    if (!name.trim() || !restaurantName.trim() || !email.trim() || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      // Use the auth store method which handles everything
      await signupKitchenAdmin({
        ownerName: name.trim(),
        kitchenName: restaurantName.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      });

      toast.success("Kitchen registered successfully! 🎉");

      // Navigate to login page after successful signup
      setTimeout(() => {
        router.push("/kitchen/login");
      }, 1000);
    } catch (error: any) {
      console.error("Kitchen signup error:", error);
      toast.error(error?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Kitchen Sign Up</h2>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange("name")}
          disabled={isLoading}
        />
        <Input
          placeholder="Restaurant Name"
          value={formData.restaurantName}
          onChange={handleInputChange("restaurantName")}
          disabled={isLoading}
        />
        <Input
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          disabled={isLoading}
        />
        <Input
          placeholder="Password (min 6 characters)"
          type="password"
          value={formData.password}
          onChange={handleInputChange("password")}
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

      <p className="text-sm text-center mt-2">
        Already have an account?{" "}
        <a
          href="/kitchen/login"
          className="text-red-500 font-medium hover:underline"
        >
          Sign in
        </a>
      </p>
    </div>
  );
}
