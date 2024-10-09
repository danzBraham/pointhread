import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { ConfirmDelete } from "../confirm/alert-confirm"

import { prisma } from "@/utils/prisma"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link"



export const CardSummary = () => {
    return (
        <Card className="w-80 mx-4 gap-4 bg-slate-50">
            <CardHeader className="flex flex-row justify-between items-center">
                <section className="flex flex-row items-center gap-4">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" className="rounded-full w-10 h-10" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <section>
                        <CardTitle className="text-lg ">Nickname</CardTitle>
                        <CardDescription>@Nickname</CardDescription>
                    </section>
                </section>
                <Link href={`https://x.com/${prisma.user.username}`} target="_blank">
                    <FaXTwitter className="w-6 h-6" />
                </Link>
            </CardHeader>
            <CardContent>
                <CardTitle className="text-xl">React Best Practices</CardTitle>
                <CardDescription>Learn the best practices for React</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <CardDescription>08 Oct 2024 </CardDescription>
                <ConfirmDelete />
            </CardFooter>
        </Card >
    )
}