"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function deleteCollection(formData) {
  const sessionId = await cookies().get("sessionId")?.value;
  const collectionId = formData.get("collection-id");
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  await prisma.collection.delete({
    where: { id: collectionId, userId: session.userId },
  });
  revalidatePath("/collections/all-summaries");
}
