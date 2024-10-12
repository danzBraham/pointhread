import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateCollection } from "@/actions/collections/update-collection";
import { deleteCollection } from "@/actions/collections/delete-collection";

export async function CollectionMenu({ id, isActive }) {
  const dotColor = isActive ? "bg-slate-50" : "bg-slate-900";

  return (
    <Dialog>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div
              className={`flex flex-col gap-0.5 rounded-full p-1.5 transition duration-150 ${isActive ? "hover:bg-slate-600" : "hover:bg-slate-300"}`}
            >
              {Array(3)
                .fill()
                .map((_, idx) => (
                  <div key={idx} className={`h-[3px] w-[3px] rounded-full ${dotColor}`} />
                ))}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-28">
            <DropdownMenuItem>
              {/* Trigger the Rename Dialog */}
              <DialogTrigger asChild>
                <div className="flex items-center">
                  <Edit3Icon className="stroke-1" />
                  Rename
                </div>
              </DialogTrigger>
            </DropdownMenuItem>

            <DropdownMenuItem className="focus:bg-red-500">
              {/* Trigger the Delete Alert Dialog */}
              <AlertDialogTrigger asChild>
                <div className="flex items-center">
                  <Trash2Icon className="stroke-1" /> Delete
                </div>
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>

          {/* Rename Dialog */}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Collection</DialogTitle>
            </DialogHeader>
            <form action={updateCollection} className="space-y-3" autoComplete="off">
              <Input type="hidden" name="collection-id" value={id} />
              <Input type="text" name="name" placeholder="Rename" />
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose>
                  <Button type="submit">Save</Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </DialogContent>
        </DropdownMenu>

        {/* Delete Alert Dialog */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your collection.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <form action={deleteCollection}>
              <Input type="hidden" name="collection-id" value={id} />
              <AlertDialogAction className="bg-red-500 hover:bg-red-400">Delete</AlertDialogAction>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
