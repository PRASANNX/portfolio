import { Header } from "@/components/header";
import { BookOpen, Key, Mail, Database, CreditCard } from "lucide-react";

export const metadata = {
  title: "Documentation — PRX OS",
  description: "Setup guides and documentation for PRX Startup OS.",
};

export default function DocsPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: BookOpen,
      links: ["Installation Guide", "Environment Variables", "Project Structure"],
    },
    {
      title: "Authentication",
      icon: Key,
      links: ["Supabase Auth Setup", "Google OAuth Config", "Magic Links Setup"],
    },
    {
      title: "Payments & GST",
      icon: CreditCard,
      links: ["Razorpay Keys", "Testing UPI Payments", "GST Calculator Logic", "Webhook Verification"],
    },
    {
      title: "Database & Models",
      icon: Database,
      links: ["Running Migrations", "Row Level Security (RLS)", "Multi-tenant Architecture"],
    },
    {
      title: "Email & WhatsApp",
      icon: Mail,
      links: ["Resend API Setup", "Meta Cloud API (WhatsApp)", "DNS Records (DKIM/DMARC)"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <h1
            className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-4"
            style={{ fontFamily: "Montserrat, sans-serif", letterSpacing: "-0.03em" }}
          >
            Documentation
          </h1>
          <p className="text-lg text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
            Everything you need to configure and deploy your OS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.title} className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <h2 className="text-sm font-bold text-black uppercase tracking-widest" style={{ fontFamily: "Montserrat, sans-serif" }}>
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-sm text-gray-500 hover:text-black hover:underline transition-colors">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
