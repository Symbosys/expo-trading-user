import { useSubscriptionPlans } from "@/api/hooks/useSubscription";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "../../api/apiClient"; // Use path alias to resolve the client module


// Static mappings for colors and features (since backend doesn't provide them)
const planColors = [
  "from-orange-500 to-yellow-600",
  "from-gray-400 to-gray-600",
  "from-yellow-400 to-yellow-600",
  "from-cyan-400 to-blue-600",
];

const staticFeatures = [
  [
    "Guaranteed ROI Monthly",
    "Flexible withdrawal options",
    "24/7 Customer support",
    "Referral bonus eligibility",
    "Investment tracking dashboard"
  ],
  [
    "Guaranteed ROI Monthly",
    "Priority customer support",
    "Bonus reward programs",
    "VIP referral bonuses",
    "Advanced analytics tools",
    "Early access to new features"
  ],
  [
    "Guaranteed ROI Monthly",
    "Dedicated account manager",
    "Exclusive investment perks",
    "Premium reward programs",
    "Priority withdrawal processing",
    "VIP community access",
    "Personalized investment advice"
  ],
  [
    "Guaranteed ROI Monthly",
    "Executive account manager",
    "White-glove concierge service",
    "Maximum referral rewards",
    "Instant withdrawal processing",
    "Exclusive networking events",
    "Custom investment strategies",
    "Premium insurance coverage"
  ],
];

export default function Subscriptions() {
  const { data: plans = [], isLoading, error } = useSubscriptionPlans();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handleInvest = async (planName: string, plan: any) => {
    try {
      setSelectedPlan(planName);
      // Use minimum investment as default amount; in a real app, prompt user for custom amount
      const response = await api.post('/payment/checkout', {
        amount: plan.minimumInvestment,
        currency: 'USD', // Adjust to 'USDT' if backend supports it; Coinbase defaults to supported fiat/crypto
      });
      const charge = response.data.charge;
      // Redirect to Coinbase hosted checkout page
      window.open(charge.hosted_url, '_blank');
      toast.success(`${planName} selected! Payment initiated via Coinbase.`);
      // TODO: Poll or use webhook to confirm and activate subscription
    } catch (err: any) {
      console.error('Payment initiation failed:', err);
      toast.error(`Failed to initiate ${planName} investment. Please try again.`);
    }
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="text-center">Loading investment plans...</div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <Card className="glass-card p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Plans</h3>
              <p className="text-muted-foreground mb-4">
                {error.message || "Failed to load investment plans."}
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Investment <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-muted-foreground">
            Choose the perfect investment plan for your goals
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => {
            const isPopular = index === 1; // Example: Second plan is popular
            const color = planColors[index % planColors.length];
            const features = staticFeatures[index % staticFeatures.length];
            const term = `${plan.durationInMonths} Months`;
            const roi = `${(plan.roiPerMonth * 100).toFixed(0)}% Monthly`;
            const min = plan.minimumInvestment.toLocaleString();

            return (
              <Card
                key={plan.id}
                className={`glass-card p-6 relative transition-all hover:scale-[1.02] ${isPopular ? "border-primary glow" : ""
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium text-foreground glow">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center glow`}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground">{term} Term</p>
                    </div>
                  </div>

                  <div className="glass p-4 rounded-lg">
                    <div className="text-center">
                      <div className="text-3xl font-bold gradient-text mb-1">
                        {roi}
                      </div>
                      <p className="text-sm text-muted-foreground">Guaranteed Returns</p>
                    </div>
                  </div>
                </div>

                {/* Investment Range */}
                <div className="glass p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                      <p className="text-lg font-bold text-foreground">${min}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Max Investment</p>
                      <p className="text-lg font-bold text-foreground">Unlimited</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full ${isPopular
                      ? "bg-gradient-primary glow"
                      : "bg-primary/20 hover:bg-primary/30"
                    }`}
                  onClick={() => handleInvest(plan.name, plan)}
                >
                  Invest Now
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Info Card */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            How Investment Plans Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-4 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow mb-3">
                <span className="text-lg font-bold text-foreground">1</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Choose a Plan</h4>
              <p className="text-sm text-muted-foreground">
                Select an investment plan that matches your budget and investment duration.
              </p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow mb-3">
                <span className="text-lg font-bold text-foreground">2</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Make Investment</h4>
              <p className="text-sm text-muted-foreground">
                Deposit USDT to start your investment. Your returns begin accumulating immediately.
              </p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow mb-3">
                <span className="text-lg font-bold text-foreground">3</span>
              </div>
              <h4 className="font-semibold text-foreground mb-2">Earn & Withdraw</h4>
              <p className="text-sm text-muted-foreground">
                Earn monthly ROI. Withdraw anytime after the term ends with full principal.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}