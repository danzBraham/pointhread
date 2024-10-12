"use server";

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createCollection(_prevState, formData) {
  const sessionId = await cookies().get("sessionId")?.value;
  const name = formData.get("name");
  const slug = name.toLowerCase().replace(/ /g, "-");
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  await prisma.collection.create({ data: { name, slug, userId: session.userId } });
  revalidatePath("/collections/all-summaries");
}
