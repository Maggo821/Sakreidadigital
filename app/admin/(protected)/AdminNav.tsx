"use client";

import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/kunden", label: "Kunden" },
  { href: "/admin/projekte", label: "Projekte" },
  { href: "/admin/aufgaben", label: "Aufgaben" },
];

export default function AdminNav() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <a key={link.href} href={link.href} className={active ? "active" : undefined}>
            {link.label}
          </a>
        );
      })}
      <a href="/" target="_blank" rel="noreferrer">
        Website ↗
      </a>
    </>
  );
}
