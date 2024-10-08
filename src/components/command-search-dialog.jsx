"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

export function CommandSearchDialog() {
  const [open, setOpen] = useState(false);

  function handleSearchButtonClick() {
    setOpen((open) => !open);
  }

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        className="h-full w-[350px] justify-between p-2"
        onClick={handleSearchButtonClick}
      >
        <div className="flex items-center gap-2 opacity-50">
          <MagnifyingGlassIcon className="h-4 w-4" />
          Quick search summary...
        </div>

        <p className="text-sm text-muted-foreground">
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
          {" or "}
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">Ctrl</span>K
          </kbd>
        </p>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Coding">
            <CommandItem>How to implement Auth</CommandItem>
            <CommandItem>React Best Prsactices</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Health">
            <CommandItem>How to Sleep Well</CommandItem>
            <CommandItem>Healthy Morning Routine</CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Work">
            <CommandItem>Productive at Work</CommandItem>
            <CommandItem>SWE Career Development</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
