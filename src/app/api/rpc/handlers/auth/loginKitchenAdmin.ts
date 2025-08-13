import { prisma as db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createJwtToken } from "@/lib/jwt";

// Validation schema
const loginKitchenAdminSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function loginKitchenAdmin(input: any) {
  try {
    const { email, password } = loginKitchenAdminSchema.parse(input);

    // 🔍 Look up the kitchen admin by email
    const admin = await db.kitchenAdmin.findUnique({
      where: { email },
    });

    if (!admin || !admin.hashedPassword) {
      throw new Error("Invalid email or password");
    }

    // 🔐 Compare passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      admin.hashedPassword
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    // 🔑 Create a secure JWT token
    const token = createJwtToken({
      id: admin.id,
      role: "kitchen", // use "user" for user login
    });

    // 🎉 Return token and admin data
    return {
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
        ownerName: admin.ownerName,
        kitchenName: admin.kitchenName,
        createdAt: admin.createdAt,
      },
    };
  } catch (error: any) {
    console.error("Login error:", error);

    if (error.name === "ZodError") {
      throw new Error(
        `Validation error: ${error.issues
          .map((i: any) => i.message)
          .join(", ")}`
      );
    }

    throw new Error(error.message || "Login failed");
  }
}
