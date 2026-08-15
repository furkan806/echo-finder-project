import { createFileRoute } from "@tanstack/react-router";
import { Building2, Clock, Mail, Phone, ClipboardCheck } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Help Desk — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Campus Lost & Found help desk at Rungta International Skills University. Call 9229641044 or email furkanbokaro@gmail.com for assistance.",
      },
      { property: "og:title", content: "Contact & Help Desk — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Help desk details and instructions for returning found items on campus.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Contact &amp; Help</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Our help desk team is happy to assist you with any lost or found item.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Building2 className="h-5 w-5 text-primary" aria-hidden /> Help Desk
          </h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
              <span>
                Admin Desk, Rungta International Skills University
                <br />
                Main Administrative Block, Ground Floor
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
              <a href="tel:9229641044" className="font-medium text-primary hover:underline">
                9229641044
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
              <a
                href="mailto:furkanbokaro@gmail.com"
                className="font-medium text-primary hover:underline"
              >
                furkanbokaro@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
              <span>Monday to Saturday, 9:00 AM – 5:00 PM</span>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ClipboardCheck className="h-5 w-5 text-primary" aria-hidden /> Returning a found item
          </h2>
          <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
            {[
              "Submit the item using the Report Found Item form with a clear photo.",
              "Deposit valuable items (phone, wallet, ID card, laptop) at the admin desk the same day.",
              "Keep small items safely with you until the owner contacts you.",
              "Ask the owner to describe the item before handing it over.",
              "Collect a receipt from the desk when depositing or collecting an item.",
            ].map((step, i) => (
              <li key={step} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-gradient-soft p-6">
        <h2 className="text-lg font-semibold">Claiming an item</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Bring your college ID card to the admin desk and describe the item. Once verified, the
          item is handed over and marked as <strong>Returned</strong> in the system.
        </p>
      </div>
    </div>
  );
}
