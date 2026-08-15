import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { toast } from "sonner";
import { registerUser } from "@/lib/store";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Student Registration — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Create a free student account to report lost items, post found items and claim belongings on campus.",
      },
      { property: "og:title", content: "Student Registration — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Register as a student to use the Campus Lost & Found system.",
      },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (values.name.trim().length < 3) return setError("Please enter your full name.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))
      return setError("Enter a valid email address.");
    if (values.password.length < 6) return setError("Password must be at least 6 characters.");
    if (values.password !== values.confirm) return setError("Passwords do not match.");
    const result = registerUser(values.name.trim(), values.email.trim(), values.password);
    if (result.error) {
      setError(result.error);
      toast.error(result.error);
      return;
    }
    setError("");
    toast.success("Account created successfully!");
    navigate({ to: "/items" });
  }

  const field =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";

  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
            <UserPlus className="h-6 w-6" aria-hidden />
          </span>
          <h1 className="mt-4 text-2xl font-bold">Student Registration</h1>
          <p className="mt-1 text-sm text-muted-foreground">It takes less than a minute.</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {(
            [
              { id: "name", label: "Full name", type: "text", placeholder: "Your name" },
              { id: "email", label: "Email", type: "email", placeholder: "you@student.edu" },
              { id: "password", label: "Password", type: "password", placeholder: "••••••" },
              { id: "confirm", label: "Confirm password", type: "password", placeholder: "••••••" },
            ] as const
          ).map((f) => (
            <div key={f.id}>
              <label className="mb-1.5 block text-sm font-medium" htmlFor={f.id}>
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                placeholder={f.placeholder}
                className={field}
                value={values[f.id]}
                onChange={(e) => setValues((v) => ({ ...v, [f.id]: e.target.value }))}
              />
            </div>
          ))}
          {error && (
            <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
