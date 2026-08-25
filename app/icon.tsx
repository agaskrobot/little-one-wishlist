import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "18px",
          background: "#f7c9d4",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4a2c39"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="8" y="9" width="8" height="12" rx="2.5" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
          <path d="M8 13h8" />
          <path d="M10 3h4" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
