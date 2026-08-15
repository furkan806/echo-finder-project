import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, PackageCheck, ShieldAlert, Trash2, XCircle } from "lucide-react";
import { toast } from "sonner";
import {
  deleteItem,
  deleteUser,
  formatDate,
  updateReportStatus,
  useStore,
  type ReportStatus,
} from "@/lib/store";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Campus Lost & Found" },
      {
        name: "description",
        content:
          "Admin tools to approve, reject or delete reports, mark items as returned and manage registered students.",
      },
      { property: "og:title", content: "Admin Dashboard — Campus Lost & Found" },
      {
        property: "og:description",
        content: "Manage campus lost and found reports and student accounts.",
      },
    ],
  }),
  component: AdminPage,
});

const statusStyles: Record<ReportStatus, string> = {
  pending: "bg-warning/15 text-foreground",
  approved: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  returned: "bg-primary/10 text-primary",
};

function AdminPage() {
  const { items, users, session } = useStore();

  if (!session || session.role !== "admin") {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <h1 className="mt-4 text-2xl font-bold">Admin access only</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please log in with the admin account (admin@campus.edu / admin123) to open the dashboard.
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const pending = items.filter((i) => i.reportStatus === "pending").length;

  function act(id: string, status: ReportStatus, message: string) {
    updateReportStatus(id, status);
    toast.success(message);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {items.length} total reports · {pending} waiting for approval · {users.length} registered
          users
        </p>
      </header>

      <section className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Item</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link
                    to="/items/$itemId"
                    params={{ itemId: item.id }}
                    className="font-medium text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                </td>
                <td className="px-4 py-3 capitalize">{item.status}</td>
                <td className="px-4 py-3">{item.location}</td>
                <td className="px-4 py-3">{formatDate(item.date)}</td>
                <td className="px-4 py-3">
                  <span
                    className={
                      "rounded-full px-2.5 py-1 text-xs font-semibold capitalize " +
                      statusStyles[item.reportStatus]
                    }
                  >
                    {item.reportStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <IconBtn
                      label="Approve"
                      onClick={() => act(item.id, "approved", "Report approved.")}
                      icon={<CheckCircle2 className="h-4 w-4" />}
                    />
                    <IconBtn
                      label="Reject"
                      onClick={() => act(item.id, "rejected", "Report rejected.")}
                      icon={<XCircle className="h-4 w-4" />}
                    />
                    <IconBtn
                      label="Returned"
                      onClick={() => act(item.id, "returned", "Item marked as returned.")}
                      icon={<PackageCheck className="h-4 w-4" />}
                    />
                    <IconBtn
                      label="Delete"
                      danger
                      onClick={() => {
                        deleteItem(item.id);
                        toast.success("Report deleted.");
                      }}
                      icon={<Trash2 className="h-4 w-4" />}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-xl font-bold">Manage Users</h2>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-secondary text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                  <td className="px-4 py-3 capitalize">{user.role}</td>
                  <td className="px-4 py-3">
                    {user.role === "admin" ? (
                      <span className="text-xs text-muted-foreground">Protected</span>
                    ) : (
                      <IconBtn
                        label="Remove"
                        danger
                        onClick={() => {
                          deleteUser(user.id);
                          toast.success("User removed.");
                        }}
                        icon={<Trash2 className="h-4 w-4" />}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function IconBtn({
  label,
  icon,
  onClick,
  danger,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition " +
        (danger
          ? "border-destructive/30 text-destructive hover:bg-destructive/10"
          : "border-input hover:bg-accent")
      }
    >
      {icon}
      {label}
    </button>
  );
}
