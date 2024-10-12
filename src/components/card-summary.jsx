import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConfirmDelete } from "../confirm/alert-confirm";
import { prisma } from "@/utils/prisma";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export const CardSummary = async () => {
  const summaries = await prisma.summary.findMany({
    orderBy: {
      createdAt,
    },
  });
  return (
    <div>
      {summaries &&
        summaries.map((summary) => (
          <Card key={summary.id} className="mx-4 w-80 gap-4 bg-slate-50">
            <CardHeader className="flex flex-row items-center justify-between">
              <section className="flex flex-row items-center gap-4">
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="h-10 w-10 rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <section>
                  <CardTitle className="text-lg">Nickname</CardTitle>
                  <CardDescription>@Nickname</CardDescription>
                </section>
              </section>
              <Link href={`https://x.com/${summary.thread_link}`} target="_blank">
                <FaXTwitter className="h-6 w-6" />
              </Link>
            </CardHeader>
            <CardContent>
              <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-xl">
                {summary.summary}
              </CardTitle>
              <CardDescription className="overflow-hidden text-ellipsis whitespace-nowrap">
                Learn the best practices for React
              </CardDescription>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <CardDescription>{summary.createdAt} </CardDescription>
              <ConfirmDelete />
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};
