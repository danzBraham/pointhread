import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
export const ConfirmDelete = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button size="icon" className="bg-red-500">
                    <TrashIcon className="w-4 h-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure want to delete this summary?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this summary from your collection.
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </AlertDialogContent>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialog>
    )
}