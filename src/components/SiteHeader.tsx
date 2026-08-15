import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { LogOut, Menu, Search, X } from "lucide-react";
import { toast } from "sonner";
import { logoutUser, useStore } from "@/lib/store";

const links = [
  { to: "/", label: "Home" },
  { to: "/items", label: "Items" },
  { to: "/search", label: "Search" },
  { to: "/report-lost", label: "Report Lost" },
  { to: "/report-found", label: "Report Found" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { session } = useStore();
  const [open, setOpen] = useState(false);

  const linkCls =
    "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-accent hover:text-primary";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Search className="h-5 w-5" aria-hidden />
          </span>
          <span className="text-base font-bold leading-tight">
            Campus <span className="text-primary">Lost &amp; Found</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={linkCls}
              activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-semibold text-primary bg-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {session ? (
            <>
              {session.role === "admin" && (
                <Link
                  to="/admin"
                  className="rounded-lg border border-input px-3 py-2 text-sm font-medium transition hover:bg-accent"
                >
                  Admin
                </Link>
              )}
              <span className="text-sm text-muted-foreground">Hi, {session.name.split(" ")[0]}</span>
              <button
                type="button"
                onClick={() => {
                  logoutUser();
                  toast.success("You have been logged out.");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                <LogOut className="h-4 w-4" aria-hidden /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border border-input px-4 py-2 text-sm font-medium transition hover:bg-accent"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-input p-2 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-card px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className={linkCls} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            {session?.role === "admin" && (
              <Link to="/admin" className={linkCls} onClick={() => setOpen(false)}>
                Admin Dashboard
              </Link>
            )}
            <div className="mt-2 flex gap-2">
              {session ? (
                <button
                  type="button"
                  onClick={() => {
                    logoutUser();
                    setOpen(false);
                    toast.success("You have been logged out.");
                  }}
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-input px-4 py-2 text-center text-sm font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-semibold text-primary-foreground"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
