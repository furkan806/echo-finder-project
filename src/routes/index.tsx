import { createFileRoute, Link } from "@tanstack/react-router";
import { FileSearch, HandHeart, PackageSearch, ShieldCheck, Clock, Users } from "lucide-react";
import { useStore } from "@/lib/store";
import { ItemCard } from "@/components/ItemCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Campus Lost & Found — Report and Recover Campus Items" },
      {
        name: "description",
        content:
          "Report lost items, post found items and search the campus database at Rungta International Skills University. Lost something? Find it here.",
      },
      { property: "og:title", content: "Campus Lost & Found" },
      {
        property: "og:description",
        content: "Report lost and found items on campus and reconnect with their owners.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { items } = useStore();
  const recent = items
    .filter((i) => i.reportStatus === "approved" || i.reportStatus === "returned")
    .slice(0, 8);
  const lostCount = items.filter((i) => i.status === "lost").length;
  const foundCount = items.filter((i) => i.status === "found").length;
  const returnedCount = items.filter((i) => i.reportStatus === "returned").length;

  return (
    <div>
      <section className="bg-gradient-hero px-4 py-20 text-primary-foreground">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide">
            <ShieldCheck className="h-4 w-4" aria-hidden /> Rungta International Skills University
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Campus Lost &amp; Found
          </h1>
          <p className="mt-4 text-lg opacity-90">Lost Something? Find It Here.</p>
          <p className="mx-auto mt-3 max-w-2xl text-sm opacity-80">
            A simple place for students to report lost items, hand over found items and get back in
            touch with the right person.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/report-lost"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-primary shadow-card transition hover:opacity-90"
            >
              <PackageSearch className="h-4 w-4" aria-hidden /> Report Lost Item
            </Link>
            <Link
              to="/report-found"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-semibold text-primary shadow-card transition hover:opacity-90"
            >
              <HandHeart className="h-4 w-4" aria-hidden /> Report Found Item
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 rounded-lg border border-primary-foreground/40 px-6 py-3 text-sm font-semibold transition hover:bg-primary-foreground/10"
            >
              <FileSearch className="h-4 w-4" aria-hidden /> Search Items
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 grid max-w-5xl gap-4 px-4 sm:grid-cols-3">
        <Stat icon={<PackageSearch className="h-5 w-5" />} label="Lost reports" value={lostCount} />
        <Stat icon={<HandHeart className="h-5 w-5" />} label="Found reports" value={foundCount} />
        <Stat icon={<Users className="h-5 w-5" />} label="Items returned" value={returnedCount} />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold">
              <Clock className="h-6 w-6 text-primary" aria-hidden /> Recently reported items
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The latest lost and found reports from around the campus.
            </p>
          </div>
          <Link
            to="/items"
            className="rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-accent"
          >
            View all items
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recent.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="bg-secondary px-4 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-bold">How it works</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "1. Report",
                text: "Fill a short form with the item details, place, date and a photo.",
              },
              {
                title: "2. Admin checks",
                text: "The help desk approves genuine reports so the list stays clean.",
              },
              {
                title: "3. Connect",
                text: "Search the list, open an item and contact the student directly.",
              },
            ].map((s) => (
              <div key={s.title} className="rounded-2xl bg-card p-6 shadow-card">
                <h3 className="font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
        {icon}
      </span>
      <div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
