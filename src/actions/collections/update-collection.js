"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateCollection(formData) {
  const sessionId = await cookies().get("sessionId")?.value;
  const collectionId = formData.get("collection-id");
  const name = formData.get("name");
  const slug = name.toLowerCase().replace(/ /g, "-");
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  await prisma.collection.update({
    data: { name, slug },
    where: { id: collectionId, userId: session.userId },
  });
  revalidatePath(`/`);
}
