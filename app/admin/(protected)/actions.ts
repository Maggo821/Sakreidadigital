"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { DATA_SOURCES, createPage, props, updatePage } from "@/lib/notion";

async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

export async function createKunde(formData: FormData) {
  await requireAdmin();
  const name = str(formData, "name");
  if (!name) return;

  await createPage(DATA_SOURCES.kunden, {
    Name: props.title(name),
    "E-Mail": props.email(str(formData, "email")),
    Telefon: props.phone(str(formData, "phone")),
    Unternehmen: props.rich(str(formData, "company")),
    Branche: props.select(str(formData, "branche")),
    Quelle: props.select(str(formData, "quelle")),
    Status: props.select(str(formData, "status") || "Interessent"),
    Notizen: props.rich(str(formData, "notes")),
  });

  revalidatePath("/admin/kunden");
  revalidatePath("/admin");
}

export async function setKundeStatus(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !status) return;

  await updatePage(id, { Status: props.select(status) });
  revalidatePath("/admin/kunden");
  revalidatePath("/admin");
}

export async function createProjekt(formData: FormData) {
  await requireAdmin();
  const name = str(formData, "name");
  if (!name) return;

  const kundeId = str(formData, "kundeId");
  await createPage(DATA_SOURCES.projekte, {
    Name: props.title(name),
    Kunde: props.relation(kundeId ? [kundeId] : []),
    Status: props.select(str(formData, "status") || "Geplant"),
    Start: props.date(str(formData, "start")),
    Ende: props.date(str(formData, "ende")),
    Beschreibung: props.rich(str(formData, "beschreibung")),
  });

  revalidatePath("/admin/projekte");
  revalidatePath("/admin");
}

export async function setProjektStatus(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !status) return;

  await updatePage(id, { Status: props.select(status) });
  revalidatePath("/admin/projekte");
  revalidatePath("/admin");
}

export async function createAufgabe(formData: FormData) {
  await requireAdmin();
  const aufgabe = str(formData, "aufgabe");
  if (!aufgabe) return;

  const kundeId = str(formData, "kundeId");
  const projektId = str(formData, "projektId");
  await createPage(DATA_SOURCES.aufgaben, {
    Aufgabe: props.title(aufgabe),
    Status: props.select(str(formData, "status") || "Offen"),
    Priorität: props.select(str(formData, "prioritaet") || "Mittel"),
    "Fällig am": props.date(str(formData, "faellig")),
    Kunde: props.relation(kundeId ? [kundeId] : []),
    Projekt: props.relation(projektId ? [projektId] : []),
    Notizen: props.rich(str(formData, "notizen")),
  });

  revalidatePath("/admin/aufgaben");
  revalidatePath("/admin");
}

export async function setAufgabeStatus(formData: FormData) {
  await requireAdmin();
  const id = str(formData, "id");
  const status = str(formData, "status");
  if (!id || !status) return;

  await updatePage(id, { Status: props.select(status) });
  revalidatePath("/admin/aufgaben");
  revalidatePath("/admin");
}
