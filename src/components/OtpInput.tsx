"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Props {
  value: string;
  setValue: (val: string) => void;
}

export default function OtpInput({ value, setValue }: Props) {
  const handleSubmit = () => {
    if (value === "1234") {
      toast.success("OTP verified successfully!");
    } else {
      toast.error("Invalid OTP");
    }
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder="Enter OTP (Hint: 1234)"
        maxLength={4}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit} className="w-full">
        Verify OTP
      </Button>
    </div>
  );
}
