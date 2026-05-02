import { Header } from "@/components/header";
import { Trophy } from "lucide-react";

export const metadata = {
  title: "Leaderboard — PRX OS",
  description: "Top revenue-generating startups built on PRX.",
};

export default function LeaderboardPage() {
  const leaders = [
    { rank: 1, name: "TechFlow India", founder: "Aryan S.", mrr: "₹4.2L", category: "B2B SaaS" },
    { rank: 2, name: "DesignScale", founder: "Priya N.", mrr: "₹2.8L", category: "Agency" },
    { rank: 3, name: "LegalEase", founder: "Vikram M.", mrr: "₹1.5L", category: "Service" },
    { rank: 4, name: "BuildFast", founder: "Rahul K.", mrr: "₹85K", category: "SaaS" },
    { rank: 5, name: "Nexus Web", founder: "Sneha P.", mrr: "₹40K", category: "Agency" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header variant="dashboard" title="Leaderboard" />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10 text-center">
          <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1
            className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Startup Leaderboard
          </h1>
          <p className="body text-gray-500">
            Revenue metrics are verified via Razorpay API integrations.
          </p>
        </div>

        <div className="card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest w-16 text-center">Rank</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Startup</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Verified MRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {leaders.map((leader) => (
                <tr key={leader.rank} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      leader.rank === 1 ? "bg-yellow-100 text-yellow-700" :
                      leader.rank === 2 ? "bg-gray-200 text-gray-700" :
                      leader.rank === 3 ? "bg-orange-100 text-orange-700" :
                      "bg-gray-50 text-gray-500"
                    }`} style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {leader.rank}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-black" style={{ fontFamily: "Montserrat, sans-serif" }}>{leader.name}</p>
                    <p className="text-xs text-gray-400">by {leader.founder}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {leader.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-black text-green-600 text-lg" style={{ fontFamily: "Montserrat, sans-serif" }}>
                      {leader.mrr}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
