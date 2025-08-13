import { prisma as db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { createJwtToken } from "@/lib/jwt";

const signupKitchenAdminSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ownerName: z.string().min(2, "Owner name must be at least 2 characters"),
  kitchenName: z.string().min(2, "Kitchen name must be at least 2 characters"),
});

export async function signupKitchenAdmin(input: any) {
  try {
    const { email, password, ownerName, kitchenName } =
      signupKitchenAdminSchema.parse(input);

    // 🔒 Check if email already exists
    const existing = await db.kitchenAdmin.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      throw new Error("Email already registered");
    }

    // 🔐 Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // ✅ Create the kitchen admin in DB
    const admin = await db.kitchenAdmin.create({
      data: {
        email,
        hashedPassword,
        ownerName,
        kitchenName,
      },
      select: {
        id: true,
        email: true,
        ownerName: true,
        kitchenName: true,
        createdAt: true,
      },
    });

    // 🔑 Create a secure JWT token
    const token = createJwtToken({
      id: admin.id,
      role: "kitchen", // distinguish roles
    });

    // 🎉 Return token and admin data
    return {
      success: true,
      message: "Kitchen admin registered successfully",
      token, // 🔥 include this in frontend
      admin,
    };
  } catch (error: any) {
    console.error("Signup error:", error);

    if (error.name === "ZodError") {
      throw new Error(
        `Validation error: ${error.issues
          .map((i: any) => i.message)
          .join(", ")}`
      );
    }

    if (error.code === "P2002") {
      throw new Error("Email already registered");
    }

    throw new Error(error.message || "Registration failed");
  }
}
