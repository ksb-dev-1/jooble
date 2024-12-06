"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getUserById } from "@/lib/user";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

export const selectRoleAction = async (role: UserRole) => {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  await prisma.user.update({
    where: { id: dbUser.id },
    data: {
      role,
    },
  });

  revalidatePath("/pages/server");

  return { success: "Role assigned successfully" };
};
