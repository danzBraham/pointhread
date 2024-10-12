import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Input } from "@/components/ui/input";
export default function Profile() {
    return (
        <div className="px-10 py-6 w-96">
            <section>
                <h1 className="text-2xl font-bold">Edit Profile</h1>
            </section>
            <section className="flex flex-row items-center gap-10 mt-4">
                <Avatar>
                    <AvatarImage className="rounded-full w-20 h-20" src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Button className="w-32 text-sm">Change Avatar</Button>
            </section >
            <section>
                <form action={"#"} className="flex flex-col gap-4 mt-4">
                    <Input type="text" name="username" placeholder="Username" />
                    <Input type="mail" name="email" placeholder="devscale@gmail.com" />
                    <Button className="w-16">Save</Button>
                </form>
            </section>
        </div >
    )
}