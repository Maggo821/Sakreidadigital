import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, isAdmin } from "@/lib/admin-auth";
import AdminNav from "./AdminNav";
import "../admin.css";

export const metadata: Metadata = {
  title: "Backoffice",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }

  async function logout() {
    "use server";
    const store = await cookies();
    store.delete(COOKIE_NAME);
    redirect("/admin/login");
  }

  return (
    <div className="adm">
      <header className="adm-top">
        <a className="adm-brand" href="/admin">
          <span className="adm-logo">S</span>
          <span>
            SAKEIDA DIGITAL <em>BACKOFFICE</em>
          </span>
        </a>
        <div className="adm-nav">
          <AdminNav />
          <form action={logout}>
            <button type="submit">Abmelden</button>
          </form>
        </div>
      </header>
      <main className="adm-main">{children}</main>
    </div>
  );
}
