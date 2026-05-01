import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/shared/logo";
import { SEO_CONFIG } from "@/lib/seo/config";

const features = [
  {
    title: "Universal Auth",
    description: "Google and Magic Link authentication out of the box.",
  },
  {
    title: "Modular Database",
    description: "Organizations, teams, and subscriptions schema included.",
  },
  {
    title: "Payments Ready",
    description: "Razorpay integration with webhook handlers for subscriptions.",
  },
  {
    title: "SEO Optimized",
    description: "Update meta tags in one file to change the entire site.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Launch Your SaaS in
            <span className="text-primary"> Under 48 Hours</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A production-ready boilerplate for solo founders. Clone it for every new idea.
            Built with Next.js, Supabase, and Razorpay.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Start Building Free</Button>
            </Link>
            <Link href="https://github.com" target="_blank">
              <Button variant="outline" size="lg">
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need to Ship
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Your Next Product?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Stop reinventing the wheel. Clone this boilerplate, customize it for your industry, and launch.
          </p>
          <Link href="/signup">
            <Button size="lg">Get Started Today</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Built with The Engine boilerplate
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}