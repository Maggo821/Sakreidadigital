import { isAdmin } from "@/lib/admin-auth";
import {
  DATA_SOURCES,
  getDate,
  getRelation,
  getSelect,
  getTitle,
  queryDataSource,
} from "@/lib/notion";
import { redirect } from "next/navigation";
import { createProjekt, setProjektStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUS = ["Idee", "Geplant", "Laufend", "Wartet auf Kunde", "Abgeschlossen", "Abgebrochen"];

function formatDate(value: string): string {
  if (!value) return "–";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "–";
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function ProjektePage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [projekte, kunden] = await Promise.all([
    queryDataSource(DATA_SOURCES.projekte, {
      sorts: [{ timestamp: "created_time", direction: "descending" }],
    }),
    queryDataSource(DATA_SOURCES.kunden, {
      sorts: [{ property: "Name", direction: "ascending" }],
    }),
  ]);

  const kundenName = new Map(
    kunden.map((k) => [k.id, getTitle(k.properties["Name"])] as const),
  );

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Projekte & Aufträge</h1>
          <p>{projekte.length} Projekte in Notion</p>
        </div>
      </div>

      <details className="adm-new">
        <summary>+ Neues Projekt anlegen</summary>
        <form className="adm-form" action={createProjekt}>
          <div className="adm-form-grid">
            <label>
              <span>Projektname *</span>
              <input name="name" required />
            </label>
            <label>
              <span>Kunde</span>
              <select name="kundeId" defaultValue="">
                <option value="">–</option>
                {kunden.map((k) => (
                  <option key={k.id} value={k.id}>
                    {getTitle(k.properties["Name"])}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Status</span>
              <select name="status" defaultValue="Geplant">
                {STATUS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Start</span>
              <input name="start" type="date" />
            </label>
            <label>
              <span>Ende</span>
              <input name="ende" type="date" />
            </label>
          </div>
          <label>
            <span>Beschreibung</span>
            <textarea name="beschreibung" />
          </label>
          <button type="submit">Projekt speichern</button>
        </form>
      </details>

      <div className="adm-panel">
        <h2>Alle Projekte</h2>
        {projekte.length === 0 ? (
          <p className="adm-empty">Noch keine Projekte vorhanden.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Projekt</th>
                <th>Kunde</th>
                <th>Status</th>
                <th>Start</th>
                <th>Ende</th>
              </tr>
            </thead>
            <tbody>
              {projekte.map((p) => {
                const status = getSelect(p.properties["Status"]);
                const relation = getRelation(p.properties["Kunde"]);
                return (
                  <tr key={p.id}>
                    <td>
                      <strong>{getTitle(p.properties["Name"])}</strong>
                    </td>
                    <td>{relation.length ? kundenName.get(relation[0]) ?? "–" : "–"}</td>
                    <td>
                      <form action={setProjektStatus} className="adm-inline">
                        <input type="hidden" name="id" value={p.id} />
                        <select name="status" defaultValue={status || "Geplant"}>
                          {STATUS.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        <button type="submit">OK</button>
                      </form>
                    </td>
                    <td>{formatDate(getDate(p.properties["Start"]))}</td>
                    <td>{formatDate(getDate(p.properties["Ende"]))}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
