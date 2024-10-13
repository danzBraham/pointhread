import { prisma } from "@/utils/prisma";
import { SidebarLink } from "./sidebar-link";
import CreateCollectionForm from "./form/create-collection-form";

// Reusable EmptyState component for empty collections
function EmptyState({ message }) {
  return (
    <p className="rounded-lg border border-dashed px-3 py-1.5 text-sm text-slate-500">{message}</p>
  );
}

export default async function CollectionNav({ userId }) {
  const collections = await prisma.collection.findMany({ where: { userId } });

  return (
    <nav className="space-y-4">
      <SidebarLink name="All Summaries" slug="all-summaries" />

      {/* <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p>Collections</p>
          <CreateCollectionForm />
        </div>

        <div className="space-y-2">
          {collections.length > 0 ? (
            collections.map(({ id, name, slug, ...rest }) => (
              <SidebarLink key={id} id={id} name={name} slug={`collections/${slug}`} {...rest} />
            ))
          ) : (
            <EmptyState message="Don't have collection" />
          )}
        </div>
      </div> */}
    </nav>
  );
}
