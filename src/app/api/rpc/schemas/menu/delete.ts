import { z } from "zod";

export const deleteMenuSchema = z.object({
  id: z.string().min(1, "Menu ID is required"),
});

export type DeleteMenuInput = z.infer<typeof deleteMenuSchema>;
