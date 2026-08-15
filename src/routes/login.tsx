import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "@/lib/store";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Student Login — Campus Lost & Found" },
      {
        name: "description",
        content: "Log in with your student account to report items and manage your reports.",
      },
      { property: "og:title", content: "Student Login — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Access your Campus Lost & Found student account.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    const result = loginUser(email, password);
    if (result.error) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    setError("");
    toast.success(`Welcome back, ${result.user?.name}!`);
    navigate({ to: result.user?.role === "admin" ? "/admin" : "/items" });
  }

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
            <LogIn className="h-6 w-6" aria-hidden />
          </span>
          <h1 className="mt-4 text-2xl font-bold">Student Login</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Log in to report and track your items.
          </p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@student.edu"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
            />
          </div>
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          New student?{" "}
          <Link to="/register" className="font-semibold text-primary hover:underline">
            Create an account
          </Link>
        </p>
        <div className="mt-5 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Demo accounts</p>
          <p>Admin: admin@campus.edu / admin123</p>
          <p>Student: aditya@student.edu / student123</p>
        </div>
      </div>
    </div>
  );
}
