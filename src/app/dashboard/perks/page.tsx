import { Header } from "@/components/header";
import { ExternalLink } from "lucide-react";

export const metadata = {
  title: "Founder Perks — PRX OS",
  description: "Exclusive discounts and perks for PRX founders.",
};

export default function PerksPage() {
  const perks = [
    {
      name: "Supabase",
      description: "$5,000 in credits for 12 months for new organizations.",
      code: "PRX5K",
      link: "https://supabase.com/startups",
    },
    {
      name: "Razorpay",
      description: "Zero transaction fees for the first ₹5 Lakhs in processing.",
      code: "AUTO-APPLIED",
      link: "https://razorpay.com",
    },
    {
      name: "Resend",
      description: "50,000 free emails per month for 6 months.",
      code: "PRX-RESEND-50",
      link: "https://resend.com",
    },
    {
      name: "Vercel",
      description: "3 months of Pro tier for free.",
      code: "PRX-VERCEL-PRO",
      link: "https://vercel.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="dashboard" title="Founder Perks" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10">
          <h1
            className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Exclusive Perks
          </h1>
          <p className="body text-gray-500">
            Over ₹4,000,000 in software discounts to help you scale your Indian startup without the overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {perks.map((perk) => (
            <div key={perk.name} className="card p-6 flex flex-col h-full">
              <h2
                className="text-lg font-bold text-black mb-2"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {perk.name}
              </h2>
              <p className="text-sm text-gray-600 mb-6 flex-grow">{perk.description}</p>
              
              <div className="mt-auto">
                <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-center mb-4">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">Code</span>
                  <code className="text-sm font-bold text-accent" style={{ color: "var(--accent)" }}>{perk.code}</code>
                </div>
                <a
                  href={perk.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-secondary text-sm flex items-center justify-center gap-2"
                >
                  Redeem Offer
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
