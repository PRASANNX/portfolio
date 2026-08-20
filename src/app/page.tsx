import { HeroSection } from "@/components/ui/hero-section";
import { AboutSection } from "@/components/ui/about-section";
import { CuttingMatSection } from "@/components/ui/cutting-mat-section";
import { RetroComputerSection } from "@/components/ui/retro-computer-section";
import { FolderSection } from "@/components/ui/folder-section";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full">
      {/* Hero Section (Client Component with WebGL) */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Cutting Mat Section */}
      <CuttingMatSection />

      {/* Retro Computer Section */}
      <RetroComputerSection />

      {/* Stacked Folders Section */}
      <FolderSection />
    </main>
  );
}