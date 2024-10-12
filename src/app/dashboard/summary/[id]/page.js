import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { ConfirmDelete } from "@/components/confirm/alert-confirm";

export default async function PageSummary({ params }) {
    const id = params.id;
    const summary = prisma.summary.findUnique({
        where: {
            id: id
        }
    });
    if (!summary) {
        return (<div>
            Summary not found!
        </div>)
        redirect("/dashboard");
    }
    return (
        <div>
            <header className="h-15 flex flex-row justify-between bg-slate-50 items-center p-2">
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/dashboard">All Collections</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${`summary.id`}`}>{summary.id}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div>
                    <ConfirmDelete />
                </div>
            </header>
            <main>
                <div className="container flex flex-col mt-3 justify-center items-center text-left">
                    <section className="bg-white max-w-[430px]">
                        <h1 className="text-3xl text-left font-bold">{summary.title}</h1>
                        <h2 className="text-md text-slate-500">{summary.description}</h2>
                    </section>
                    <section className="mt-4 ">
                        <ol>
                            {summary.summary.map((summary) => (
                                <li key={summary.id}>{summary.summary}</li>
                            ))}
                        </ol>
                    </section>
                </div>
            </main>
        </div>
    )
}