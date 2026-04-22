"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/architecture", label: "Architecture" },
  { href: "/dashboard/trends", label: "Trends" },
  { href: "/dashboard/pins", label: "Pins" },
  { href: "/dashboard/scheduler", label: "Scheduler" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/settings", label: "Settings" }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="app-shell">
      <div className="container layout-grid">
        <aside className="panel side-nav">
          <div className="brand" style={{ marginBottom: 20 }}>
            pin<span>engine</span>.ai
          </div>
          <div className="stack">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link key={item.href} href={item.href} className={`nav-link ${active ? "active" : ""}`}>
                  {item.label}
                </Link>
              );
            })}
          </div>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
}
