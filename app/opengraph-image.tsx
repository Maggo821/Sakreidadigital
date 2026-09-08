import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Sakeida Digital – Digitalisierung für den Mittelstand";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#141512",
          padding: "70px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              background: "#c9f45a",
              color: "#141512",
              fontSize: 32,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            S
          </div>
          <div style={{ color: "#e9e9e1", fontSize: 22, letterSpacing: 4 }}>SAKEIDA DIGITAL</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#e9e9e1", fontSize: 84, lineHeight: 1, letterSpacing: -3 }}>
            Arbeit einfacher
          </div>
          <div style={{ color: "#c9f45a", fontSize: 84, lineHeight: 1.1, letterSpacing: -3 }}>
            machen.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", color: "#9b9d94", fontSize: 24 }}>
          <div>Digitalisierung · Prozesse · Automatisierung</div>
          <div>Dreieich · Rhein-Main</div>
        </div>
      </div>
    ),
    size,
  );
}
