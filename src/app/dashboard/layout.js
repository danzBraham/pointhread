import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({ children }) {
  const sessionId = await cookies().get("sessionId")?.value;
  if (!sessionId) {
    redirect("/login");
  }

  const { user } = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  if (!user) {
    redirect("/register");
  }

  return (
    <main>
      <h1>{user.username}</h1>
      <section>{children}</section>
    </main>
  );
}
