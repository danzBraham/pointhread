import { CardTweet } from "@/components/card-tweet";
import { prisma } from "@/utils/prisma";

export default async function Dashboard() {
  const summaries = await prisma.summary.findMany();

  return (
    <div className="light columns-3 gap-4">
      {summaries.map((summary) => (
        <CardTweet key={summary.id} id={summary.thread_starter_link_id} summaryId={summary.id} />
      ))}
    </div>
  );
}
