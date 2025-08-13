// rpc/handlers/auth/logout.ts
import { z } from "zod";
import { verifyJwtToken } from "@/lib/jwt";

const schema = z.object({
  token: z.string().optional(),
  mode: z.enum(["user", "kitchen"]),
});

export const logoutHandler = async (params: any) => {
  const input = schema.parse(params);

  if (input.token) {
    try {
      const decoded = verifyJwtToken(input.token);
      if (decoded.role !== input.mode) {
        throw new Error("Role mismatch");
      }
    } catch (err) {
      // 🔐 Even if token is invalid/expired, allow logout for safety
      console.warn("Invalid token on logout:", err);
    }
  }

  return {
    success: true,
    message: `Logged out successfully (${input.mode})`,
  };
};
