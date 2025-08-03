import { z } from "zod";

export const createMenuSchema = z.object({
  name: z.string(),
  image: z.string().url(),
  price: z.number().min(0),
  deliveryTime: z.number().min(1),
  category: z.string(),
  type: z.enum(["veg", "non-veg"]),
  kitchenId: z.string(), // must be included
  rating: z.number().min(0).max(5).optional(),
  discount: z.string().optional(),
});
