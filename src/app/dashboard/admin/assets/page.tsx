import { ImageIcon } from "lucide-react";

export default function AssetsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <ImageIcon className="w-6 h-6 text-[#FF5F1F]" />
          <h1
            className="text-2xl font-black text-black tracking-tight"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Executive Asset Generator
          </h1>
        </div>
        <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
          Generate branded OG images, social covers, and pitch deck slides dynamically from your org's brand archetype.
        </p>
        <div className="mt-4 h-px bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "OG Image", desc: "Auto-generated social share card. Matches your accent color and typography." },
          { label: "LinkedIn Cover", desc: "1584×396px professional banner with your org name and tagline." },
          { label: "Pitch Slide", desc: "Single-slide summary card for investor decks. B&W + accent color." },
        ].map((asset) => (
          <div
            key={asset.label}
            className="border border-gray-200 rounded-xl p-5 bg-white hover:border-black transition-colors duration-200"
          >
            <div className="aspect-video mb-3 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <ImageIcon className="w-8 h-8 text-gray-300" />
            </div>
            <h3
              className="text-sm font-bold text-black mb-1"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {asset.label}
            </h3>
            <p className="text-xs text-gray-500 mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              {asset.desc}
            </p>
            <button
              className="w-full py-2 text-xs font-bold text-white bg-black rounded-lg hover:bg-[#FF5F1F] transition-colors duration-200"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              Generate Asset
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
