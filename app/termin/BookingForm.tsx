"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Slot } from "@/lib/booking";

type Props = {
  slots: Slot[];
  error?: string;
};

export default function BookingForm({ slots, error }: Props) {
  const [selected, setSelected] = useState<Slot | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ when: string; icsUrl: string } | null>(null);

  const days = useMemo<Array<[string, Slot[]]>>(() => {
    const map = new Map<string, Slot[]>();
    for (const slot of slots) {
      const list = map.get(slot.date) ?? [];
      list.push(slot);
      map.set(slot.date, list);
    }
    return Array.from(map.entries());
  }, [slots]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setState("sending");
    setMessage("");

    const form = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/termin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selected.date,
          time: selected.time,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          topic: form.get("topic"),
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setState("error");
        setMessage(json.error ?? "Buchung fehlgeschlagen.");
        return;
      }
      setResult({ when: json.when, icsUrl: json.icsUrl });
      setState("success");
    } catch {
      setState("error");
      setMessage("Buchung fehlgeschlagen. Bitte versuche es erneut.");
    }
  }

  if (error) {
    return (
      <div className="form-success">
        <h2>Termine gerade nicht verfügbar.</h2>
        <p>
          {error} Schreib uns solange über das Kontaktformular – wir melden uns persönlich und finden einen
          Termin.
        </p>
        <a className="back-link" href="/kontakt">
          → Zum Kontaktformular
        </a>
      </div>
    );
  }

  if (state === "success" && result) {
    return (
      <div className="form-success">
        <h2>Termin gebucht.</h2>
        <p>
          Dein Erstgespräch ist reserviert: <strong>{result.when}</strong>. Du erhältst eine Bestätigung – hier
          kannst du den Termin direkt in deinen Kalender übernehmen:
        </p>
        <a className="booking-slot" href={result.icsUrl}>
          Kalender-Datei herunterladen (.ics)
        </a>
        <p className="contact-note" style={{ display: "block", marginLeft: 0, marginTop: 20 }}>
          Falls etwas dazwischenkommt, antworte einfach auf die Bestätigungs-E-Mail.
        </p>
      </div>
    );
  }

  return (
    <>
      {days.length === 0 ? (
        <p className="adm-empty">
          Aktuell sind keine freien Termine verfügbar. Schreib uns gerne über das{" "}
          <a href="/kontakt">Kontaktformular</a>.
        </p>
      ) : (
        <div className="booking-days">
          {days.map(([date, daySlots]) => (
            <div className="booking-day" key={date}>
              <h3>{daySlots[0].label.split(" · ")[0]}</h3>
              <div className="booking-slots">
                {daySlots.map((slot) => (
                  <button
                    key={slot.key}
                    type="button"
                    className={`booking-slot${selected?.key === slot.key ? " selected" : ""}`}
                    onClick={() => {
                      setSelected(slot);
                      setState("idle");
                      setMessage("");
                    }}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <div className="booking-form-card">
          <h3>Erstgespräch am {selected.label}</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Name *</span>
              <input name="name" required placeholder="Wie dürfen wir dich nennen?" />
            </label>
            <label>
              <span>E-Mail *</span>
              <input name="email" type="email" required placeholder="du@unternehmen.de" />
            </label>
            <label>
              <span>Telefon</span>
              <input name="phone" placeholder="Optional" />
            </label>
            <label>
              <span>Worum geht es? *</span>
              <textarea name="topic" required rows={4} placeholder="Erzähl uns kurz von deiner Herausforderung ..." />
            </label>
            <div className="form-bottom">
              <p>
                30 Minuten, unverbindlich. Details in der <a href="/datenschutz">Datenschutzerklärung</a>.
              </p>
              <button type="submit" disabled={state === "sending"}>
                {state === "sending" ? "Wird gebucht …" : "Termin buchen"} <span>↗</span>
              </button>
            </div>
            {state === "error" && (
              <p className="form-status form-status-error" role="alert">
                {message}
              </p>
            )}
          </form>
        </div>
      )}
    </>
  );
}
