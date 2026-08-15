import { Link } from "@tanstack/react-router";
import { CalendarDays, MapPin, Package } from "lucide-react";
import { formatDate, type Item } from "@/lib/store";

export function StatusBadge({ item }: { item: Item }) {
  if (item.reportStatus === "returned") {
    return (
      <span className="rounded-full bg-card/95 px-3 py-1 text-xs font-semibold text-success shadow-card backdrop-blur">
        Returned
      </span>
    );
  }
  return (
    <span
      className={
        "rounded-full bg-card/95 px-3 py-1 text-xs font-semibold shadow-card backdrop-blur " +
        (item.status === "lost" ? "text-destructive" : "text-success")
      }
    >
      {item.status === "lost" ? "Lost" : "Found"}
    </span>
  );
}

export function ItemCard({ item }: { item: Item }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:-translate-y-1 hover:shadow-hover">
      <div className="relative h-44 w-full overflow-hidden bg-secondary">
        {item.photo ? (
          <img
            src={item.photo}
            alt={item.name}
            loading="lazy"
            className="h-full w-full object-cover transition group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-soft">
            <Package className="h-12 w-12 text-primary/40" aria-hidden />
          </div>
        )}
        <div className="absolute left-3 top-3">
          <StatusBadge item={item} />
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-foreground">{item.name}</h3>
        <p className="text-xs font-medium text-primary">{item.category}</p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden />
          <span className="line-clamp-1">{item.location}</span>
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <CalendarDays className="h-4 w-4 shrink-0" aria-hidden />
          {formatDate(item.date)}
        </p>
        <Link
          to="/items/$itemId"
          params={{ itemId: item.id }}
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
