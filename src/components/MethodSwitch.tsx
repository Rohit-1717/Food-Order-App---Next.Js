"use client";

import { Button } from "@/components/ui/button";

type MethodSwitchProps = {
  method: "mobile" | "gmail";
  setMethod: (value: "mobile" | "gmail") => void;
};

export default function MethodSwitch({ method, setMethod }: MethodSwitchProps) {
  return (
    <div className="flex justify-center gap-4 my-4">
      <Button
        variant={method === "mobile" ? "default" : "outline"}
        size="sm"
        onClick={() => setMethod("mobile")}
      >
        📱 Mobile
      </Button>
      <Button
        variant={method === "gmail" ? "default" : "outline"}
        size="sm"
        onClick={() => setMethod("gmail")}
      >
        📧 Gmail
      </Button>
    </div>
  );
}
