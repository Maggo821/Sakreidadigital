"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: form.get("password") }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setState("error");
        setError(json.error ?? "Anmeldung fehlgeschlagen.");
        return;
      }
      window.location.href = "/admin";
    } catch {
      setState("error");
      setError("Anmeldung fehlgeschlagen. Bitte erneut versuchen.");
    }
  }

  return (
    <main className="adm-login">
      <form className="adm-login-card" onSubmit={handleSubmit}>
        <div className="adm-login-brand">
          <span className="adm-logo">S</span>
          <div>
            SAKEIDA DIGITAL
            <small>Backoffice</small>
          </div>
        </div>
        <label>
          <span>Passwort</span>
          <input name="password" type="password" required autoFocus autoComplete="current-password" />
        </label>
        <button type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Anmelden …" : "Anmelden"}
        </button>
        {state === "error" && (
          <p className="adm-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </main>
  );
}
