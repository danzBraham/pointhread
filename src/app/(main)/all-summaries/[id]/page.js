import { prisma } from "@/utils/prisma";
import Editor from "@/components/editor-component";
import BreadcrumbNav from "@/components/breadcrumb-nav";
import DeleteSummaryDialog from "@/components/form/delete-summary-dialog";

export default async function Page({ params: { id } }) {
  const summary = await prisma.summary.findUnique({ where: { id } });

  return <Editor className="prose max-w-4xl" markdown={summary.summary} summaryId={id} />;
}
