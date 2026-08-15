import { createFileRoute } from "@tanstack/react-router";
import { ItemsExplorer } from "@/components/ItemsExplorer";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search Lost & Found Items — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Search campus lost and found reports by item name, category, location, date and lost or found status.",
      },
      { property: "og:title", content: "Search Lost & Found Items" },
      {
        property: "og:description",
        content: "Filter every reported campus item by name, category, location and date.",
      },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Search Items</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Use the filters below to quickly find a lost or found item.
        </p>
      </header>
      <ItemsExplorer />
    </div>
  );
}
