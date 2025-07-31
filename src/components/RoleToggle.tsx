"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type RoleToggleProps = {
  role: "user" | "kitchen";
  setRole: (value: "user" | "kitchen") => void;
};

export default function RoleToggle({ role, setRole }: RoleToggleProps) {
  return (
    <div className="w-full mb-4">
      <p className="text-sm font-medium mb-2 text-muted-foreground">
        Select Role
      </p>
      <ToggleGroup
        type="single"
        value={role}
        onValueChange={(value: string) =>
          value === "user" || value === "kitchen" ? setRole(value) : null
        }
        className="w-full"
      >
        <ToggleGroupItem value="user" className="w-1/2 text-sm">
          👤 User
        </ToggleGroupItem>
        <ToggleGroupItem value="kitchen" className="w-1/2 text-sm">
          🍳 Kitchen
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
