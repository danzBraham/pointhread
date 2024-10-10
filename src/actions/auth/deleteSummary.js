"use server"

import { prisma } from "@/utils/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteSummary({ id }) {
    try {
        const summaryId = await prisma.summary.findUnique({
            where: {
                id: id
            },
        });

        if (!summaryId) {
            return { errors: "summary not found" };
        }
        await prisma.summary.delete({
            where: {
                id: summaryId
            }
        })

        console.log("successfully delete summary");
        return { success: "successfully delete summary" };
    } catch (error) {
        console.log("failed to delete summary");
        return { errors: "failed to delete summary" };
    }

    revalidatePath("/dashboard");
    redirect("/dashboard");
}