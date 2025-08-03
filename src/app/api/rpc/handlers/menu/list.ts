import { prisma } from "@/lib/db";

export const listMenuHandler = async () => {
  const menuItems = await prisma.menu.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return menuItems;
};
