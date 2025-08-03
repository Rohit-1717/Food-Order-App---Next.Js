import { z } from "zod";

export const updateMenuSchema = z.object({
  id: z.string().min(1, "Menu ID is required"),
  name: z.string().optional(),
  image: z.string().optional().or(z.literal("")), 
  price: z.number().min(1).optional(),
  type: z.enum(["veg", "non-veg", "VEG", "NON_VEG"]).optional(), 
  rating: z.number().min(0).max(5).optional(),
  deliveryTime: z.number().min(1).optional(),
  category: z.string().optional(),
  discount: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      return typeof val === "string" ? parseFloat(val) : val;
    }, z.number().optional()),
  isAvailable: z.boolean().optional(),
}).passthrough();

export type UpdateMenuInput = z.infer<typeof updateMenuSchema>;