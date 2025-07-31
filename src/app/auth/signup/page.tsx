"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import CountryCodeSelector from "@/components/CountryCodeSelector";


export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const handleSendOtp = () => {
    if (!fullName.trim()) {
      toast.error("Full name is required");
      return;
    }
    if (!phone.trim()) {
      toast.error("Enter a valid phone number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent successfully");
  };

  const handleSignup = () => {
    if (!otp.trim()) {
      toast.error("Enter the OTP to continue");
      return;
    }
    toast.success("Signed up successfully!");
    // Later: Save to DB, redirect, or store session
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md px-6 py-8 space-y-6 my-10">
      <h2 className="text-2xl font-bold text-center">Create Your Foodie Account</h2>

      {!otpSent ? (
        <>
          {/* Full Name Field */}
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          {/* Phone + Country Code Selector */}
          <div className="flex gap-2 items-center">
            <CountryCodeSelector value={countryCode} setValue={setCountryCode} />
            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1"
            />
          </div>

          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleSendOtp}
          >
            Send One Time Password
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          {/* Google Sign Up */}
          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => toast.info("Google Sign Up coming soon")}
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </Button>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <a href="/auth/login" className="text-red-500 hover:underline">
              Login
            </a>
          </p>
        </>
      ) : (
        <>
          <Input
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
}
