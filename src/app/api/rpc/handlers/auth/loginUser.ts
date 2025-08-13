import { prisma as db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createJwtToken } from "@/lib/jwt";

// ✅ Validation schema
const loginUserSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Login user function
export async function loginUser(input: any) {
  try {
    const { email, password } = loginUserSchema.parse(input);

    // 🔍 Find user by email
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !user.hashedPassword) {
      throw new Error("Invalid email or password");
    }

    // 🔐 Validate password
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // 🔑 Generate JWT
    const token = createJwtToken({
      id: user.id,
      role: "user",
    });

    // 🎉 Return user data
    return {
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
      },
    };
  } catch (error: any) {
    console.error("Login error:", error);

    if (error.name === "ZodError") {
      throw new Error(
        `Validation error: ${error.issues.map((i: any) => i.message).join(", ")}`
      );
    }

    throw new Error(error.message || "Login failed");
  }
}
