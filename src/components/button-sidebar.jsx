import { Button } from "@/components/ui/button";
import { FolderOpenIcon, FolderClosedIcon } from "lucide-react";

export function ButtonSidebar({ label, isOpen = false }) {
  return (
    <Button variant={isOpen ? "default" : "outline"} className="w-full justify-start gap-2 px-3">
      {isOpen ? (
        <FolderOpenIcon className="stroke-slate-50 stroke-1" />
      ) : (
        <FolderClosedIcon className="stroke-slate-900 stroke-1" />
      )}
      {label}
    </Button>
  );
}
