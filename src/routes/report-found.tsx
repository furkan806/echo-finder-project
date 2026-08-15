import { createFileRoute } from "@tanstack/react-router";
import { HandHeart } from "lucide-react";
import { ItemForm } from "@/components/ItemForm";

export const Route = createFileRoute("/report-found")({
  head: () => ({
    meta: [
      { title: "Report a Found Item — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Found something on campus? Post the item here so the owner can identify it and contact you.",
      },
      { property: "og:title", content: "Report a Found Item — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Help a classmate get their belongings back by posting a found item.",
      },
    ],
  }),
  component: ReportFound,
});

function ReportFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
          <HandHeart className="h-4 w-4" aria-hidden /> Found item
        </span>
        <h1 className="mt-3 text-3xl font-bold">Report a Found Item</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thank you for helping! Please deposit valuable items at the help desk after submitting
          this form.
        </p>
      </header>
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <ItemForm status="found" />
      </div>
    </div>
  );
}
