import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "PRX OS";
  const accent = searchParams.get("accent") || "#FF5F1F";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: "#FFFFFF",
            letterSpacing: "-0.05em",
            marginBottom: 24,
          }}
        >
          {title}
        </div>
        <div
          style={{
            width: 120,
            height: 6,
            backgroundColor: accent,
            borderRadius: 3,
          }}
        />
        <div
          style={{
            fontSize: 20,
            color: "#666666",
            marginTop: 20,
            fontWeight: 500,
          }}
        >
          Powered by PRX Startup OS
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
