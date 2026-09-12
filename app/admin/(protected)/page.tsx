import { isAdmin } from "@/lib/admin-auth";
import { DATA_SOURCES, getDate, getSelect, getTitle, queryDataSource, type NotionPage } from "@/lib/notion";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

function formatDate(value: string): string {
  if (!value) return "–";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "–";
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

const LEAD_STATUS = ["Interessent", "Kontaktiert", "Erstgespräch", "Angebot offen"];

export default async function AdminDashboard() {
  if (!(await isAdmin())) redirect("/admin/login");

  let kunden: NotionPage[] = [];
  let projekte: NotionPage[] = [];
  let aufgaben: NotionPage[] = [];
  let error = "";

  try {
    [kunden, projekte, aufgaben] = await Promise.all([
      queryDataSource(DATA_SOURCES.kunden, {
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      }),
      queryDataSource(DATA_SOURCES.projekte, {
        sorts: [{ timestamp: "created_time", direction: "descending" }],
      }),
      queryDataSource(DATA_SOURCES.aufgaben, {
        sorts: [{ property: "Fällig am", direction: "ascending" }],
      }),
    ]);
  } catch (err) {
    error = err instanceof Error ? err.message : "Notion ist nicht erreichbar.";
  }

  const leads = kunden.filter((k) => LEAD_STATUS.includes(getSelect(k.properties["Status"])));
  const aktiveKunden = kunden.filter((k) => getSelect(k.properties["Status"]) === "Kunde");
  const aktiveProjekte = projekte.filter((p) =>
    ["Geplant", "Laufend", "Wartet auf Kunde"].includes(getSelect(p.properties["Status"])),
  );
  const offeneAufgaben = aufgaben.filter((a) => getSelect(a.properties["Status"]) !== "Erledigt");
  const faellig = offeneAufgaben.filter((a) => {
    const due = getDate(a.properties["Fällig am"]);
    return due && due <= today();
  });

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Dashboard</h1>
          <p>Dein Backoffice – Kunden, Projekte und Aufgaben aus Notion.</p>
        </div>
      </div>

      {error ? (
        <div className="adm-cards">
          <div className="adm-card hint">
            <b>⚠️</b>
            <span>Verbindung prüfen</span>
            <p>
              Notion ist nicht erreichbar: {error}
              <br />
              Prüfe die Umgebungsvariable <code>NOTION_TOKEN</code> und ob die Datenbanken für die
              Integration freigegeben sind.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="adm-cards">
            <div className="adm-card">
              <b>{leads.length}</b>
              <span>Offene Leads</span>
            </div>
            <div className="adm-card">
              <b>{aktiveKunden.length}</b>
              <span>Kunden</span>
            </div>
            <div className="adm-card">
              <b>{aktiveProjekte.length}</b>
              <span>Aktive Projekte</span>
            </div>
            <div className="adm-card">
              <b>{offeneAufgaben.length}</b>
              <span>Offene Aufgaben</span>
            </div>
          </div>

          <div className="adm-grid">
            <div className="adm-panel">
              <h2>
                Neueste Leads <a href="/admin/kunden">Alle ansehen →</a>
              </h2>
              {kunden.length === 0 ? (
                <p className="adm-empty">Noch keine Kontakte vorhanden.</p>
              ) : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Quelle</th>
                      <th>Erstellt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kunden.slice(0, 6).map((k) => (
                      <tr key={k.id}>
                        <td>
                          <strong>{getTitle(k.properties["Name"])}</strong>
                          {getRichCompany(k) && <div className="adm-note">{getRichCompany(k)}</div>}
                        </td>
                        <td>
                          <span className="adm-badge">{getSelect(k.properties["Status"]) || "–"}</span>
                        </td>
                        <td>{getSelect(k.properties["Quelle"]) || "–"}</td>
                        <td>{formatDate(k.created_time)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="adm-panel">
              <h2>
                Nächste Aufgaben <a href="/admin/aufgaben">Alle ansehen →</a>
              </h2>
              {offeneAufgaben.length === 0 ? (
                <p className="adm-empty">Keine offenen Aufgaben.</p>
              ) : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Aufgabe</th>
                      <th>Priorität</th>
                      <th>Fällig</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offeneAufgaben.slice(0, 6).map((a) => {
                      const due = getDate(a.properties["Fällig am"]);
                      return (
                        <tr key={a.id}>
                          <td>
                            <strong>{getTitle(a.properties["Aufgabe"])}</strong>
                          </td>
                          <td>
                            <span className="adm-badge">{getSelect(a.properties["Priorität"]) || "–"}</span>
                          </td>
                          <td className={due && due <= today() ? "adm-overdue" : undefined}>
                            {formatDate(due)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <div className="adm-panel">
              <h2>
                Aktive Projekte <a href="/admin/projekte">Alle ansehen →</a>
              </h2>
              {aktiveProjekte.length === 0 ? (
                <p className="adm-empty">Keine aktiven Projekte.</p>
              ) : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Projekt</th>
                      <th>Status</th>
                      <th>Start</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aktiveProjekte.slice(0, 6).map((p) => (
                      <tr key={p.id}>
                        <td>
                          <strong>{getTitle(p.properties["Name"])}</strong>
                        </td>
                        <td>
                          <span className="adm-badge">{getSelect(p.properties["Status"]) || "–"}</span>
                        </td>
                        <td>{formatDate(getDate(p.properties["Start"]))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="adm-panel">
              <h2>Überfällig</h2>
              {faellig.length === 0 ? (
                <p className="adm-empty">Nichts überfällig – stark.</p>
              ) : (
                <table className="adm-table">
                  <thead>
                    <tr>
                      <th>Aufgabe</th>
                      <th>Fällig</th>
                    </tr>
                  </thead>
                  <tbody>
                    {faellig.map((a) => (
                      <tr key={a.id}>
                        <td>
                          <strong>{getTitle(a.properties["Aufgabe"])}</strong>
                        </td>
                        <td className="adm-overdue">{formatDate(getDate(a.properties["Fällig am"]))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

function getRichCompany(page: NotionPage): string {
  const value = page.properties["Unternehmen"] as { rich_text?: Array<{ plain_text?: string }> } | undefined;
  return value?.rich_text?.map((t) => t.plain_text ?? "").join("") ?? "";
}
