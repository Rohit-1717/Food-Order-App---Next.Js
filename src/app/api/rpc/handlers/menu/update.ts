import { prisma } from "@/lib/db";
import { updateMenuSchema } from "@/app/api/rpc/schemas/menu/update";
import slugify from "slugify";
import { DishType } from "@/generated/prisma";

export const updateMenuHandler = async (params: unknown) => {
  console.log("Raw params received:", JSON.stringify(params, null, 2));
  console.log("Params keys:", Object.keys(params as any));
  
  try {
    const parsed = updateMenuSchema.parse(params);
    console.log("Parsed successfully:", JSON.stringify(parsed, null, 2));
    
    const { id, name, type, discount, ...rest } = parsed;

  const typeMap: Record<string, DishType> = {
    veg: DishType.VEG,
    "non-veg": DishType.NON_VEG,
  };

  // Build update data object
  const updateData: any = {
    ...rest,
  };

  // Add name and slug if name is provided
  if (name) {
    updateData.name = name;
    updateData.slug = slugify(name, { lower: true });
  }

  // Add type only if provided and valid
  if (type !== undefined && typeMap[type]) {
    updateData.type = typeMap[type];
  }

  // Add discount only if provided (convert to string as database expects String)
  if (discount !== undefined) {
    updateData.discount = String(discount);
  }

  console.log("Final update payload:", updateData);

  const updated = await prisma.menu.update({
    where: { id },
    data: updateData,
  });

  return updated;
  } catch (error) {
    console.error("Handler error:", error);
    throw error;
  }
};