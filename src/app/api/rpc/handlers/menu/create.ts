import { createMenuSchema } from "@/app/api/rpc/schemas/menu/create";
import { prisma } from "@/lib/db";
import slugify from "slugify";
import { DishType } from "@/generated/prisma";

export const createMenuHandler = async (params: unknown) => {
  const parsed = createMenuSchema.parse(params);

  const slug = slugify(parsed.name, { lower: true });

  const typeMap: Record<"veg" | "non-veg", DishType> = {
    veg: DishType.VEG,
    "non-veg": DishType.NON_VEG,
  };

  const dishType = typeMap[parsed.type];

  const menu = await prisma.menu.create({
    data: {
      name: parsed.name,
      image: parsed.image,
      price: parsed.price,
      deliveryTime: parsed.deliveryTime,
      category: parsed.category,
      kitchenId: parsed.kitchenId,
      type: dishType,
      slug,
      rating: parsed.rating,
      discount: parsed.discount,
    },
  });

  return menu;
};
