"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import CountryCodeSelector from "@/components/CountryCodeSelector";
import Link from "next/link";


export default function LoginForm() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  const handleSendOtp = () => {
    if (!phone.trim()) {
      toast.error("Enter a valid phone number");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent successfully");
  };

  const handleLogin = () => {
    if (!otp.trim()) {
      toast.error("Enter the OTP to continue");
      return;
    }
    toast.success("Logged in successfully!");
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow-md px-6 py-8 space-y-6 my-20">
      <h2 className="text-2xl font-bold text-center">Login to Foodie</h2>

      {!otpSent ? (
        <>
          <div className="flex gap-2 items-center">
            <CountryCodeSelector value={countryCode} setValue={setCountryCode} />
            <Input
              type="tel"
              placeholder="Enter phone number"
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

          <div className="flex items-center gap-2">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">or</span>
            <Separator className="flex-1" />
          </div>

          <Button
            variant="outline"
            className="w-full flex items-center gap-2"
            onClick={() => toast.info("Google Sign In coming soon")}
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
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            className="w-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleLogin}
          >
            Login
          </Button>
        </>
      )}
    </div>
  );
}
