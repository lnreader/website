import type { ReactElement } from "react";

export const previewImageSize = {
  width: 1200,
  height: 630,
};

export const previewImageAlt =
  "LNReader, an open source light novel reader for Android";

export function PreviewImage(): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: "#f7f9fc",
        color: "#172331",
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(16, 110, 129, 0.14), rgba(255, 255, 255, 0) 46%), linear-gradient(180deg, #ffffff 0%, #f7f9fc 100%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 10,
          background: "#106e81",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "82px 96px",
          gap: 42,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div
            style={{
              width: 70,
              height: 70,
              borderRadius: 10,
              background: "#e3f1f4",
              color: "#106e81",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            読
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                display: "flex",
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: 0,
              }}
            >
              LNReader
            </div>
            <div
              style={{
                color: "#4f6276",
                display: "flex",
                fontSize: 19,
                fontWeight: 500,
              }}
            >
              Open source light novel reader for Android
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 20,
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#172331",
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: 0,
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            A thoughtful reader for light novels
          </div>
          <div
            style={{
              color: "#4f6276",
              display: "flex",
              fontSize: 25,
              lineHeight: 1.4,
              maxWidth: 780,
            }}
          >
            Read online or offline, customize your experience, and stay in
            control of your library.
          </div>
        </div>
      </div>
    </div>
  );
}
