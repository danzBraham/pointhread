"use server";

import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function deleteSummary(_prevState, formData) {
  const summaryId = formData.get("summary-id");
  await prisma.summary.delete({ where: { id: summaryId } });
  redirect("/all-summaries");
}
