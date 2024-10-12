"use server";

import { prisma } from "@/utils/prisma";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function register(_prevState, formData) {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!username || !email || !password) {
    return { errors: "Missing required fields" };
  }

  const isEmailExist = await prisma.user.findUnique({ where: { email } });
  if (isEmailExist) {
    return { errors: "Email already exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 13);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const session = await prisma.session.create({ data: { userId: newUser.id } });
  await cookies().set("sessionId", session.id);

  redirect("/all-summaries");
}
