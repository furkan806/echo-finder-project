import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <h2 className="text-base font-bold">
            Campus <span className="text-primary">Lost &amp; Found</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Lost Something? Find It Here. A BCA 1st semester group project built to help students
            recover their belongings.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick links
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { to: "/items", label: "All Items" },
              { to: "/search", label: "Search Items" },
              { to: "/report-lost", label: "Report Lost Item" },
              { to: "/report-found", label: "Report Found Item" },
              { to: "/contact", label: "Contact & Help" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground transition hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Help desk
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
              Admin Desk, Rungta International Skills University
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" aria-hidden />
              <a href="tel:9229641044" className="hover:text-primary">
                9229641044
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" aria-hidden />
              <a href="mailto:furkanbokaro@gmail.com" className="hover:text-primary">
                furkanbokaro@gmail.com /
                mf1207955@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Campus Lost &amp; Found · BCA 1st Semester Project
      </div>
    </footer>
  );
}
