import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CollectionMenu } from "./collection-menu";

export function SidebarButton({ id, slug, name, folderIcon, isActive }) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className="w-full justify-between gap-2 px-3 capitalize"
    >
      {slug === "all-summaries" ? (
        <Link href={`/${slug}`} className="flex items-center gap-2">
          {folderIcon}
          {name}
        </Link>
      ) : (
        <>
          <Link href={`/${slug}`} className="flex items-center gap-2">
            {folderIcon}
            {name.length > 11 ? `${name.substring(0, 11)}...` : name}
          </Link>
          <CollectionMenu id={id} isActive={isActive} />
        </>
      )}
    </Button>
  );
}
