import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "BookedOnCall | AI Call Answering for Trades Businesses"
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F172A",
          padding: "60px 80px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-0.02em",
            }}
          >
            BookedOn
          </span>
          <span
            style={{
              fontSize: "36px",
              fontWeight: 800,
              color: "#F59E0B",
              letterSpacing: "-0.02em",
            }}
          >
            Call
          </span>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              backgroundColor: "#F59E0B",
              marginLeft: "4px",
              marginBottom: "16px",
            }}
          />
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            marginBottom: "36px",
          }}
        >
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              textAlign: "center",
              letterSpacing: "-0.03em",
            }}
          >
            Answer More Calls.
          </span>
          <span
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#F59E0B",
              lineHeight: 1.1,
              textAlign: "center",
              letterSpacing: "-0.03em",
            }}
          >
            Book More Jobs.
          </span>
        </div>

        {/* Subhead */}
        <span
          style={{
            fontSize: "24px",
            color: "#94A3B8",
            textAlign: "center",
            maxWidth: "700px",
            lineHeight: 1.5,
          }}
        >
          AI-powered call answering built for trades businesses.
        </span>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            gap: "32px",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "18px", color: "#64748B" }}>
            bookedoncall.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
