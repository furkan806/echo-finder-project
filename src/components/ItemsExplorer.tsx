import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { CATEGORIES, useStore } from "@/lib/store";
import { ItemCard } from "@/components/ItemCard";

export function ItemsExplorer({ initialStatus = "all" }: { initialStatus?: string }) {
  const { items } = useStore();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(initialStatus);

  const visible = useMemo(
    () =>
      items
        .filter((i) => i.reportStatus === "approved" || i.reportStatus === "returned")
        .filter((i) => (q ? i.name.toLowerCase().includes(q.toLowerCase()) : true))
        .filter((i) => (category === "all" ? true : i.category === category))
        .filter((i) =>
          location ? i.location.toLowerCase().includes(location.toLowerCase()) : true,
        )
        .filter((i) => (date ? i.date === date : true))
        .filter((i) => {
          if (status === "all") return true;
          if (status === "returned") return i.reportStatus === "returned";
          return i.status === status && i.reportStatus !== "returned";
        }),
    [items, q, category, location, date, status],
  );

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";
  const label = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground";

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <label className={label} htmlFor="q">
              Item name
            </label>
            <input
              id="q"
              className={field}
              placeholder="Search by name"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="f-category">
              Category
            </label>
            <select
              id="f-category"
              className={field}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="f-location">
              Location
            </label>
            <input
              id="f-location"
              className={field}
              placeholder="e.g. Library"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="f-date">
              Date
            </label>
            <input
              id="f-date"
              type="date"
              className={field}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label className={label} htmlFor="f-status">
              Status
            </label>
            <select
              id="f-status"
              className={field}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">Lost &amp; Found</option>
              <option value="lost">Lost only</option>
              <option value="found">Found only</option>
              <option value="returned">Returned</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{visible.length}</span> item(s)
          </p>
          <button
            type="button"
            onClick={() => {
              setQ("");
              setCategory("all");
              setLocation("");
              setDate("");
              setStatus("all");
            }}
            className="rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            Reset filters
          </button>
        </div>
      </div>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <SearchX className="h-10 w-10 text-muted-foreground" aria-hidden />
          <p className="font-semibold">No items match your search</p>
          <p className="text-sm text-muted-foreground">
            Try clearing the filters or reporting the item yourself.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
