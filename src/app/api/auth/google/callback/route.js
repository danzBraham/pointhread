import { google } from "@/utils/arctic";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const codeVerifier = await cookies().get("codeVerifier")?.value;

  const tokens = await google.validateAuthorizationCode(code, codeVerifier);
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
  const userData = await response.json();
  const { email } = userData;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user) {
    const session = await prisma.session.create({ data: { userId: user.id } });
    await cookies().set("sessionId", session.id);
    redirect("/all-summaries");
  }

  const { name, picture } = userData;
  const newUser = await prisma.user.create({
    data: {
      username: name,
      email,
      avatarUrl: picture,
    },
  });
  const session = await prisma.session.create({ data: { userId: newUser.id } });
  await cookies().set("sessionId", session.id);
  redirect("/all-summaries");
}
