"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/constants";
import type { PlanKey } from "@/lib/types";

const planOrder: PlanKey[] = ["free", "starter", "pro", "enterprise"];

export default function BillingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<PlanKey | null>(null);

  const handleSubscribe = async (plan: PlanKey) => {
    if (plan === "free") return;

    setIsLoading(plan);

    try {
      // Get user's organization
      const response = await fetch("/api/razorpay/create-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan,
          organizationId: "user-organization-id", // Replace with actual org ID
        }),
      });

      const data = await response.json();

      if (data.success && data.data.checkoutUrl) {
        // Redirect to Razorpay checkout
        window.location.href = data.data.checkoutUrl;
      } else {
        throw new Error(data.error || "Failed to create checkout");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      alert(error.message || "Failed to start checkout");
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <DashboardShell title="Billing">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Choose Your Plan</h2>
          <p className="text-muted-foreground">
            Select the plan that best fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {planOrder.map((planKey) => {
            const plan = PLANS[planKey];
            const isPopular = planKey === "pro";

            return (
              <Card
                key={planKey}
                className={isPopular ? "border-primary shadow-lg" : ""}
              >
                {isPopular && (
                  <div className="px-4 py-2 bg-primary text-primary-foreground text-center text-sm font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {planKey === "pro" && (
                      <Badge variant="default">Recommended</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold">
                      ₹{plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isPopular ? "default" : "outline"}
                    onClick={() => handleSubscribe(planKey)}
                    disabled={isLoading !== null}
                  >
                    {isLoading === planKey ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : planKey === "free" ? (
                      "Current Plan"
                    ) : (
                      `Subscribe to ${plan.name}`
                    )}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Can I change plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We accept all major credit cards, debit cards, UPI, and net banking through Razorpay.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Is there a free trial?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, all paid plans come with a 14-day free trial. No credit card required.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yes, you can cancel your subscription anytime. You'll continue to have access until the end of your billing period.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}