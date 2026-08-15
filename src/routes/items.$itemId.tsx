import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, CalendarDays, MapPin, Package, Phone, User } from "lucide-react";
import { toast } from "sonner";
import { formatDate, useStore } from "@/lib/store";
import { StatusBadge } from "@/components/ItemCard";

export const Route = createFileRoute("/items/$itemId")({
  head: () => ({
    meta: [
      { title: "Item Details — Campus Lost & Found" },
      {
        name: "description",
        content:
          "See the full description, photo, location and contact details of a reported campus item and claim it.",
      },
      { property: "og:title", content: "Item Details — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Full details and contact information for a reported campus item.",
      },
    ],
  }),
  component: ItemDetails,
});

function ItemDetails() {
  const { itemId } = useParams({ from: "/items/$itemId" });
  const { items } = useStore();
  const item = items.find((i) => i.id === itemId);

  if (!item) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Item not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This report may have been removed by the admin.
        </p>
        <Link
          to="/items"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Back to all items
        </Link>
      </div>
    );
  }

  const contactIsEmail = item.contact.includes("@");
  const contactHref = contactIsEmail ? `mailto:${item.contact}` : `tel:${item.contact}`;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link
        to="/items"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to items
      </Link>

      <div className="mt-6 grid gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card md:grid-cols-2">
        <div className="h-72 overflow-hidden rounded-xl bg-secondary">
          {item.photo ? (
            <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-soft">
              <Package className="h-16 w-16 text-primary/40" aria-hidden />
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center gap-3">
            <StatusBadge item={item} />
            {item.reportStatus === "pending" && (
              <span className="rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-foreground">
                Waiting for admin approval
              </span>
            )}
          </div>
          <h1 className="mt-3 text-2xl font-bold">{item.name}</h1>
          <p className="mt-1 text-sm font-medium text-primary">{item.category}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.description}</p>

          <dl className="mt-6 space-y-3 text-sm">
            <Row icon={<MapPin className="h-4 w-4" />} label="Location" value={item.location} />
            <Row
              icon={<CalendarDays className="h-4 w-4" />}
              label={item.status === "lost" ? "Lost on" : "Found on"}
              value={formatDate(item.date)}
            />
            <Row
              icon={<User className="h-4 w-4" />}
              label={item.status === "lost" ? "Reported by" : "Found by"}
              value={item.personName}
            />
            <Row icon={<Phone className="h-4 w-4" />} label="Contact" value={item.contact} />
          </dl>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={contactHref}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
            >
              {item.status === "lost" ? "Contact Owner" : "Claim Item"}
            </a>
            <button
              type="button"
              onClick={() =>
                toast.success(
                  "Claim request noted. Please visit the help desk with your ID card to collect the item.",
                )
              }
              className="rounded-lg border border-input px-5 py-2.5 text-sm font-semibold transition hover:bg-accent"
            >
              Notify Help Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-primary">{icon}</span>
      <div>
        <dt className="text-xs uppercase tracking-wide text-muted-foreground">{label}</dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  );
}
