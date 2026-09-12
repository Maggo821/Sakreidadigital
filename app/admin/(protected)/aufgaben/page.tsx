import { isAdmin } from "@/lib/admin-auth";
import {
  DATA_SOURCES,
  getDate,
  getRelation,
  getSelect,
  getTitle,
  queryDataSource,
  type NotionPage,
} from "@/lib/notion";
import { redirect } from "next/navigation";
import { createAufgabe, setAufgabeStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUS = ["Offen", "In Arbeit", "Erledigt"];
const PRIORITAET = ["Hoch", "Mittel", "Niedrig"];

function formatDate(value: string): string {
  if (!value) return "–";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "–";
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function TaskTable({
  tasks,
  kundenName,
  projekteName,
}: {
  tasks: NotionPage[];
  kundenName: Map<string, string>;
  projekteName: Map<string, string>;
}) {
  return (
    <table className="adm-table">
      <thead>
        <tr>
          <th>Aufgabe</th>
          <th>Priorität</th>
          <th>Fällig</th>
          <th>Kunde / Projekt</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((a) => {
          const status = getSelect(a.properties["Status"]);
          const due = getDate(a.properties["Fällig am"]);
          const kundeId = getRelation(a.properties["Kunde"])[0];
          const projektId = getRelation(a.properties["Projekt"])[0];
          return (
            <tr key={a.id}>
              <td>
                <strong>{getTitle(a.properties["Aufgabe"])}</strong>
              </td>
              <td>
                <span className="adm-badge">{getSelect(a.properties["Priorität"]) || "–"}</span>
              </td>
              <td className={due && due <= today() && status !== "Erledigt" ? "adm-overdue" : undefined}>
                {formatDate(due)}
              </td>
              <td className="adm-note">
                {kundeId ? kundenName.get(kundeId) ?? "–" : "–"}
                {projektId ? ` · ${projekteName.get(projektId) ?? "–"}` : ""}
              </td>
              <td>
                <form action={setAufgabeStatus} className="adm-inline">
                  <input type="hidden" name="id" value={a.id} />
                  <select name="status" defaultValue={status || "Offen"}>
                    {STATUS.map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                  <button type="submit">OK</button>
                </form>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default async function AufgabenPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const [aufgaben, kunden, projekte] = await Promise.all([
    queryDataSource(DATA_SOURCES.aufgaben, {
      sorts: [{ property: "Fällig am", direction: "ascending" }],
    }),
    queryDataSource(DATA_SOURCES.kunden),
    queryDataSource(DATA_SOURCES.projekte),
  ]);

  const kundenName = new Map(kunden.map((k) => [k.id, getTitle(k.properties["Name"])] as const));
  const projekteName = new Map(projekte.map((p) => [p.id, getTitle(p.properties["Name"])] as const));

  const offen = aufgaben.filter((a) => getSelect(a.properties["Status"]) !== "Erledigt");
  const erledigt = aufgaben.filter((a) => getSelect(a.properties["Status"]) === "Erledigt");

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Aufgaben & To-dos</h1>
          <p>
            {offen.length} offen · {erledigt.length} erledigt
          </p>
        </div>
      </div>

      <details className="adm-new">
        <summary>+ Neue Aufgabe anlegen</summary>
        <form className="adm-form" action={createAufgabe}>
          <div className="adm-form-grid">
            <label>
              <span>Aufgabe *</span>
              <input name="aufgabe" required />
            </label>
            <label>
              <span>Priorität</span>
              <select name="prioritaet" defaultValue="Mittel">
                {PRIORITAET.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Fällig am</span>
              <input name="faellig" type="date" />
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
              <span>Projekt</span>
              <select name="projektId" defaultValue="">
                <option value="">–</option>
                {projekte.map((p) => (
                  <option key={p.id} value={p.id}>
                    {getTitle(p.properties["Name"])}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span>Notizen</span>
            <textarea name="notizen" />
          </label>
          <button type="submit">Aufgabe speichern</button>
        </form>
      </details>

      <div className="adm-panel" style={{ marginBottom: 16 }}>
        <h2>Offen ({offen.length})</h2>
        {offen.length === 0 ? (
          <p className="adm-empty">Keine offenen Aufgaben.</p>
        ) : (
          <TaskTable tasks={offen} kundenName={kundenName} projekteName={projekteName} />
        )}
      </div>

      <div className="adm-panel">
        <h2>Erledigt ({erledigt.length})</h2>
        {erledigt.length === 0 ? (
          <p className="adm-empty">Noch nichts erledigt.</p>
        ) : (
          <TaskTable tasks={erledigt} kundenName={kundenName} projekteName={projekteName} />
        )}
      </div>
    </>
  );
}
