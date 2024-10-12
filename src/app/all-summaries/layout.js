import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PlusIcon, LogOutIcon } from "lucide-react";
import { CommandSearchDialog } from "@/components/command-search-dialog";
import { logout } from "@/actions/auth/logout";
import CollectionNav from "@/components/collection-nav";
import Link from "next/link";

export default async function AllSummariesLayout({ children }) {
  const sessionId = await cookies().get("sessionId")?.value;
  if (!sessionId) {
    redirect("/login");
  }

  const session = await prisma.session.findUnique({
    where: {
      id: sessionId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatarUrl: true,
        },
      },
    },
  });

  if (!session) {
    redirect("/register");
  }

  return (
    <main className="flex min-h-screen">
      <aside className="flex w-[250px] flex-col justify-between border-r border-slate-200 p-5">
        <div className="space-y-6">
          <section className="flex items-center justify-between">
            <Link href="/all-summaries">
              <h3 className="text-xl font-bold tracking-tight">
                Poin<span className="text-rose-500">thread</span>
              </h3>
            </Link>
            <Avatar>
              <AvatarImage src={session.user.avatarUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>{session.user.username.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </section>

          <CollectionNav userId={session.userId} />
        </div>

        <form action={logout}>
          <Button className="w-full cursor-pointer gap-2 bg-rose-500 hover:bg-rose-400">
            <LogOutIcon className="stroke-slate-50 stroke-1" />
            Log Out
          </Button>
        </form>
      </aside>

      <div className="w-full">
        <section className="flex w-full items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold capitalize">Hello {session.user.username} 👋</h2>

          <div className="flex items-center gap-2">
            <CommandSearchDialog />

            <Button className="h-full gap-2">
              <PlusIcon className="h-5 w-5 stroke-1" />
              New Summary
            </Button>
          </div>
        </section>

        <section>{children}</section>
      </div>
    </main>
  );
}
