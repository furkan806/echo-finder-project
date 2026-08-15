import { createFileRoute } from "@tanstack/react-router";
import { ItemsExplorer } from "@/components/ItemsExplorer";

export const Route = createFileRoute("/items/")({
  head: () => ({
    meta: [
      { title: "All Reported Items — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Browse every approved lost and found item reported on campus, shown as easy-to-read cards.",
      },
      { property: "og:title", content: "All Reported Items — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Browse all lost and found items reported by students on campus.",
      },
    ],
  }),
  component: ItemsPage,
});

function ItemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">All Items</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Every approved report from students and staff across the campus.
        </p>
      </header>
      <ItemsExplorer />
    </div>
  );
}
