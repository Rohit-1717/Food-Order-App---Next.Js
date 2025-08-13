import { prisma as db } from "@/lib/db";
import { hash } from "bcryptjs";
import { z } from "zod";

// Validation schema
const signupUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(1),
});

export async function signupUser(params: unknown) {
  const data = signupUserSchema.parse(params);
  const { email, password, fullName } = data;

  // Check for existing user
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("User with this email already exists.");
  }

  const hashedPassword = await hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      fullName,
      hashedPassword,
    },
  });

  return { id: user.id, email: user.email, fullName: user.fullName };
}
