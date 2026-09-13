import { isAdmin } from "@/lib/admin-auth";
import { getDate, getEmail, getPhone, getRich, getSelect, getTitle } from "@/lib/notion";
import { getTermine } from "@/lib/termine";
import { redirect } from "next/navigation";
import { setTerminStatus } from "../actions";

export const dynamic = "force-dynamic";

const STATUS = ["Gebucht", "Bestätigt", "Abgesagt", "Erledigt"];

function formatDateTime(iso: string): string {
  if (!iso) return "–";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "–";
  return date.toLocaleString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function TerminePage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const termine = await getTermine();
  const now = Date.now();

  const upcoming = termine.filter((termin) => {
    const start = getDate(termin.properties["Start"]);
    return start && new Date(start).getTime() >= now - 3600_000 && getSelect(termin.properties["Status"]) !== "Abgesagt";
  });
  const rest = termine.filter((termin) => !upcoming.includes(termin));

  return (
    <>
      <div className="adm-head">
        <div>
          <h1>Termine</h1>
          <p>
            {upcoming.length} anstehend · {rest.length} vergangen oder abgesagt
          </p>
        </div>
      </div>

      <div className="adm-panel" style={{ marginBottom: 16 }}>
        <h2>Anstehend ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <p className="adm-empty">Keine anstehenden Termine.</p>
        ) : (
          <TerminTable termine={upcoming} />
        )}
      </div>

      <div className="adm-panel">
        <h2>Vergangen & abgesagt ({rest.length})</h2>
        {rest.length === 0 ? (
          <p className="adm-empty">Noch keine weiteren Termine.</p>
        ) : (
          <TerminTable termine={rest} />
        )}
      </div>
    </>
  );
}

function TerminTable({ termine }: { termine: Awaited<ReturnType<typeof getTermine>> }) {
  return (
    <table className="adm-table">
      <thead>
        <tr>
          <th>Termin</th>
          <th>Zeitpunkt</th>
          <th>Kontakt</th>
          <th>Thema</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {termine.map((termin) => {
          const status = getSelect(termin.properties["Status"]);
          return (
            <tr key={termin.id}>
              <td>
                <strong>{getTitle(termin.properties["Termin"])}</strong>
              </td>
              <td>{formatDateTime(getDate(termin.properties["Start"]))}</td>
              <td>
                {getRich(termin.properties["Name"])}
                <div className="adm-note">
                  {getEmail(termin.properties["E-Mail"])}
                  {getPhone(termin.properties["Telefon"]) ? ` · ${getPhone(termin.properties["Telefon"])}` : ""}
                </div>
              </td>
              <td className="adm-note">{getRich(termin.properties["Thema"])}</td>
              <td>
                <form action={setTerminStatus} className="adm-inline">
                  <input type="hidden" name="id" value={termin.id} />
                  <select name="status" defaultValue={status || "Gebucht"}>
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
