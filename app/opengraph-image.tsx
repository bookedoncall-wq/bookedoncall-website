import { ImageResponse } from "next/og"

export const runtime = "nodejs"
export const alt = "BookedOnCall | AI call answering for trades businesses"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(160deg, rgba(255,247,237,1) 0%, rgba(255,255,255,1) 35%, rgba(15,23,42,1) 100%)",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: 38, fontWeight: 800 }}>
            BookedOn<span style={{ color: "#f59e0b" }}>Call</span>
          </span>
          <span
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "999px",
              backgroundColor: "#f59e0b",
              marginTop: "2px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px", maxWidth: "860px" }}>
          <span style={{ fontSize: 70, fontWeight: 900, lineHeight: 1 }}>
            AI call answering for trades businesses.
          </span>
          <span style={{ fontSize: 28, lineHeight: 1.4, color: "#334155" }}>
            Answer missed calls, capture customer details, and book jobs or callbacks without sending leads to voicemail.
          </span>
        </div>

        <div style={{ display: "flex", gap: "20px", fontSize: 22, color: "#e2e8f0" }}>
          <span>bookedoncall.com</span>
          <span>bookedoncall.com/sign-up</span>
        </div>
      </div>
    ),
    size
  )
}
