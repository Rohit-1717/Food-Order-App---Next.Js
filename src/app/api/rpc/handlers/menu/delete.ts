import { prisma } from "@/lib/db";
import { deleteMenuSchema } from "@/app/api/rpc/schemas/menu/delete";

export const deleteMenuHandler = async (params: unknown) => {
const parsed = deleteMenuSchema.parse(params);

await prisma.menu.delete({
where: { id: parsed.id },
});

return { success: true };
};