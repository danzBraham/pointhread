import { CardTweet } from "@/components/card-tweet";
import { prisma } from "@/utils/prisma";
import { cookies } from "next/headers";

export default async function Dashboard() {
  const sessionId = await cookies().get("sessionId")?.value;
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  const summaries = await prisma.summary.findMany({ where: { userId: session.userId } });

  return (
    <div className="light columns-3 gap-4">
      {summaries.map((summary) => (
        <CardTweet key={summary.id} id={summary.thread_starter_link_id} summaryId={summary.id} />
      ))}
    </div>
  );
}
