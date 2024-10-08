"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginUser(_prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return { errors: "Missing required fields" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { errors: "User not found" };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { errors: "Invalid password" };
  }

  const session = await prisma.session.create({ data: { userId: user.id } });
  await cookies().set("sessionId", session.id);

  redirect("/dashboard");
}
