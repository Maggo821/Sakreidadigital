import { isAdmin } from "@/lib/admin-auth";
import {
  DATA_SOURCES,
  getEmail,
  getPhone,
  getRich,
  getSelect,
  getTitle,
  queryDataSource,
} from "@/lib/notion";
import { redirect } from "next/navigation";
import { createKunde, setKundeStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUS = ["Interessent", "Kontaktiert", "Erstgespräch", "Angebot offen", "Kunde", "Inaktiv"];
const BRANCHE = ["Handwerk", "Gastronomie", "Handel", "Immobilien", "Dienstleistung", "Sonstiges"];
const QUELLE = ["Empfehlung", "Website", "LinkedIn", "Netzwerk", "Kaltakquise", "Sonstiges"];

function formatDate(value: string): string {
  if (!value) return "–";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "–";
  return date.toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default async function KundenPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  if (!(await isAdmin())) redirect("/admin/login");
  const params = await searchParams;
  const statusFilter = params.status ?? "";
  const query = (params.q ?? "").toLowerCase();

  const kunden = await queryDataSource(DATA_SOURCES.kunden, {
    sorts: [{ timestamp: "created_time", direction: "descending" }],
  });

  const filtered = kunden.filter((k) => {
    const status = getSelect(k.properties["Status"]);
    if (statusFilter && status !== statusFilter) return false;
    if (query) {
      const haystack = [
        getTitle(k.properties["Name"]),
        getRich(k.properties["Unternehmen"]),
        getEmail(k.properties["E-Mail"]),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Kunden & Kontakte</h1>
          <p>{kunden.length} Kontakte in Notion · {filtered.length} angezeigt</p>
        </div>
      </div>

      <details className="adm-new">
        <summary>+ Neuen Kontakt anlegen</summary>
        <form className="adm-form" action={createKunde}>
          <div className="adm-form-grid">
            <label>
              <span>Name *</span>
              <input name="name" required />
            </label>
            <label>
              <span>E-Mail</span>
              <input name="email" type="email" />
            </label>
            <label>
              <span>Telefon</span>
              <input name="phone" />
            </label>
            <label>
              <span>Unternehmen</span>
              <input name="company" />
            </label>
            <label>
              <span>Branche</span>
              <select name="branche" defaultValue="">
                <option value="">–</option>
                {BRANCHE.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Quelle</span>
              <select name="quelle" defaultValue="Website">
                {QUELLE.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Status</span>
              <select name="status" defaultValue="Interessent">
                {STATUS.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span>Notizen</span>
            <textarea name="notes" />
          </label>
          <button type="submit">Kontakt speichern</button>
        </form>
      </details>

      <div className="adm-panel">
        <h2>Kontakte</h2>
        <form method="get" className="adm-inline" style={{ marginBottom: 16 }}>
          <input
            name="q"
            placeholder="Suchen (Name, Firma, E-Mail)"
            defaultValue={params.q ?? ""}
            style={{ border: "1px solid var(--adm-line)", borderRadius: 8, padding: "7px 10px", fontSize: 13 }}
          />
          <select name="status" defaultValue={statusFilter}>
            <option value="">Alle Status</option>
            {STATUS.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <button type="submit">Filtern</button>
        </form>

        {filtered.length === 0 ? (
          <p className="adm-empty">Keine Kontakte gefunden.</p>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>E-Mail</th>
                <th>Telefon</th>
                <th>Quelle</th>
                <th>Erstellt</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((k) => {
                const status = getSelect(k.properties["Status"]);
                return (
                  <tr key={k.id}>
                    <td>
                      <strong>{getTitle(k.properties["Name"])}</strong>
                      {getRich(k.properties["Unternehmen"]) && (
                        <div className="adm-note">{getRich(k.properties["Unternehmen"])}</div>
                      )}
                    </td>
                    <td>
                      <form action={setKundeStatus} className="adm-inline">
                        <input type="hidden" name="id" value={k.id} />
                        <select name="status" defaultValue={status || "Interessent"}>
                          {STATUS.map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                        <button type="submit">OK</button>
                      </form>
                    </td>
                    <td>
                      {getEmail(k.properties["E-Mail"]) ? (
                        <a href={`mailto:${getEmail(k.properties["E-Mail"])}`}>
                          {getEmail(k.properties["E-Mail"])}
                        </a>
                      ) : (
                        "–"
                      )}
                    </td>
                    <td>{getPhone(k.properties["Telefon"]) || "–"}</td>
                    <td>{getSelect(k.properties["Quelle"]) || "–"}</td>
                    <td>{formatDate(k.created_time)}</td>
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
