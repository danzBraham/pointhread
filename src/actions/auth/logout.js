"use server";

import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function logout(_prevState, _formData) {
  const sessionId = cookies().get("sessionId")?.value;
  await prisma.session.delete({ where: { id: sessionId } });
  cookies().delete("session");
  redirect("/login");
}
