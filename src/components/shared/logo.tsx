import Link from "next/link";
import { SEO_CONFIG } from "@/lib/config";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-lg">E</span>
      </div>
      {showText && (
        <span className="font-semibold text-lg">{SEO_CONFIG.appName}</span>
      )}
    </Link>
  );
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`h-8 w-8 rounded-lg bg-primary flex items-center justify-center ${className}`}>
      <span className="text-primary-foreground font-bold text-lg">E</span>
    </div>
  );
}