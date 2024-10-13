"use client";

import { SlashIcon } from "@radix-ui/react-icons";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

function processBreadcrumbPath(path) {
  // Split the path into segments
  const segments = path.split("/");

  // Process each segment
  return segments.map((segment, index) => {
    // Create the slug (accumulate all segments up to this point)
    const slug = "/" + segments.slice(1, index + 1).join("/");

    // Create the display text (without leading slash)
    const displayText = segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return { slug, displayText };
  });
}

export default function BreadcrumbNav() {
  const pathname = usePathname();
  const breadcrumbs = processBreadcrumbPath(pathname);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => (
          <Fragment key={crumb.slug}>
            {index > 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{crumb.displayText}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={crumb.slug}>{crumb.displayText}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
