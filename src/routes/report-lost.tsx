import { createFileRoute } from "@tanstack/react-router";
import { PackageSearch } from "lucide-react";
import { ItemForm } from "@/components/ItemForm";

export const Route = createFileRoute("/report-lost")({
  head: () => ({
    meta: [
      { title: "Report a Lost Item — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Lost something on campus? Fill this simple form with the item details, date, location and your contact information.",
      },
      { property: "og:title", content: "Report a Lost Item — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Submit a lost item report to the campus help desk in under a minute.",
      },
    ],
  }),
  component: ReportLost,
});

function ReportLost() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          <PackageSearch className="h-4 w-4" aria-hidden /> Lost item
        </span>
        <h1 className="mt-3 text-3xl font-bold">Report a Lost Item</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Give as much detail as you can. Your report is checked by the help desk before it appears
          publicly.
        </p>
      </header>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <ItemForm status="lost" />
      </div>
    </div>
  );
}
