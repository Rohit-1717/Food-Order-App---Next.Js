"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

const countryCodes = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
];

export default function KitchenSignupForm() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");

  const handleSendOtp = () => {
    if (!phone || !name || !restaurantName) {
      toast.error("All fields are required before sending OTP");
      return;
    }
    setOtpSent(true);
    toast.success("OTP sent successfully");
  };

  const handleSubmit = () => {
    if (!otp) {
      toast.error("Enter OTP to continue");
      return;
    }
    toast.success("Signed up as kitchen successfully!");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">Kitchen Sign Up</h2>

      {!otpSent ? (
        <>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />

          <div className="flex gap-2 items-center">
            <select
              value={countryCode.code}
              onChange={(e) =>
                setCountryCode(
                  countryCodes.find((c) => c.code === e.target.value) ||
                    countryCodes[0]
                )
              }
              className="border px-2 py-2 rounded-md text-sm bg-muted text-foreground"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>

            <Input
              placeholder="Phone number"
              type="tel"
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
            onClick={() => toast.info("Google Sign Up coming soon")}
          >
            <FcGoogle className="w-5 h-5" />
            Sign up with Google
          </Button>

          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <a
              href="/kitchen/login"
              className="text-red-500 font-medium hover:underline"
            >
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
          <Button className="w-full" onClick={handleSubmit}>
            Verify OTP & Sign Up
          </Button>
        </>
      )}
    </div>
  );
}
