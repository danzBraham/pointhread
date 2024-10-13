import { prisma } from "@/utils/prisma";

export async function POST(req) {
  try {
    const { id, summary } = await req.json();

    await prisma.summary.update({
      where: { id },
      data: { summary },
    });

    return Response.json({ message: "Summary updated successfully" });
  } catch (error) {
    return Response.json({ error: "Error updating summary" }, { status: 500 });
  }
}
