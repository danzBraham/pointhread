"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { createSummary } from "@/actions/summaries/create-summary";
import { useActionState } from "react";

export function CreateSummary() {
  const [_state, action, pending] = useActionState(createSummary, null);

  return pending ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[9999] bg-slate-900/70 backdrop-blur-md">
      <div className="flex min-h-screen items-center justify-center">
        <h3 className="animate-pulse text-5xl font-semibold tracking-tight text-slate-50">
          Summarizing
        </h3>
      </div>
    </div>
  ) : (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full gap-2">
          <PlusIcon className="h-5 w-5 stroke-1" />
          New Summary
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Summary</DialogTitle>
          <DialogDescription>Summarize a twitter thread</DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-3" autoComplete="off">
          <Input type="text" name="thread-link" placeholder="Paste link" />

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose>
              <Button type="submit">Create</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
