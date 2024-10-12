"use client";

import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FolderClosedIcon } from "lucide-react";
import { FolderOpenIcon } from "lucide-react";
import { SidebarButton } from "./sidebar-button";

export function SidebarLink({ id, name, slug }) {
  const pathname = usePathname();
  const isActive = pathname === `/${slug}`;

  const folderIcon = isActive ? (
    <FolderOpenIcon className="stroke-slate-50 stroke-1" />
  ) : (
    <FolderClosedIcon className="stroke-slate-900 stroke-1" />
  );

  return name && name.length > 11 ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarButton
            id={id}
            slug={slug}
            name={name}
            folderIcon={folderIcon}
            isActive={isActive}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <SidebarButton id={id} slug={slug} name={name} folderIcon={folderIcon} isActive={isActive} />
  );
}
