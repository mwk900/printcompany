import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-data";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "stretch",
          background: "linear-gradient(145deg, #f6f2eb 0%, #e7dbcd 100%)",
          color: "#1f252e",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "space-between",
          padding: "62px 72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            color: "#0f4f82",
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Portfolio Concept
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, lineHeight: 1.05 }}>
            {siteConfig.siteName}
          </div>
          <div style={{ color: "#354151", display: "flex", fontSize: 34, maxWidth: 900 }}>
            Nottingham B2B print and reprographics showcase
          </div>
        </div>
        <div
          style={{
            borderTop: "2px solid rgba(31, 37, 46, 0.2)",
            color: "#1f252e",
            display: "flex",
            fontSize: 24,
            justifyContent: "space-between",
            paddingTop: 18,
          }}
        >
          <span>Lead-focused UX and conversion design</span>
          <span>Fictional brand demo</span>
        </div>
      </div>
    ),
    size,
  );
}
