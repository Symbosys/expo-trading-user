import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const plans = [
  {
    name: "Bronze Plan",
    term: "3 Months",
    roi: "10% Monthly",
    min: "100",
    max: "1,000",
    features: [
      "Guaranteed 10% Monthly ROI",
      "Flexible withdrawal options",
      "24/7 Customer support",
      "Referral bonus eligibility",
      "Investment tracking dashboard"
    ],
    color: "from-orange-500 to-yellow-600",
  },
  {
    name: "Silver Plan",
    term: "6 Months",
    roi: "10% Monthly",
    min: "1,000",
    max: "5,000",
    features: [
      "Guaranteed 10% Monthly ROI",
      "Priority customer support",
      "Bonus reward programs",
      "VIP referral bonuses",
      "Advanced analytics tools",
      "Early access to new features"
    ],
    popular: true,
    color: "from-gray-400 to-gray-600",
  },
  {
    name: "Gold Plan",
    term: "12 Months",
    roi: "10% Monthly",
    min: "5,000",
    max: "50,000",
    features: [
      "Guaranteed 10% Monthly ROI",
      "Dedicated account manager",
      "Exclusive investment perks",
      "Premium reward programs",
      "Priority withdrawal processing",
      "VIP community access",
      "Personalized investment advice"
    ],
    color: "from-yellow-400 to-yellow-600",
  },
  {
    name: "Platinum Plan",
    term: "24 Months",
    roi: "10% Monthly",
    min: "50,000",
    max: "Unlimited",
    features: [
      "Guaranteed 10% Monthly ROI",
      "Executive account manager",
      "White-glove concierge service",
      "Maximum referral rewards",
      "Instant withdrawal processing",
      "Exclusive networking events",
      "Custom investment strategies",
      "Premium insurance coverage"
    ],
    color: "from-cyan-400 to-blue-600",
  },
];

export default function Subscriptions() {
  const handleInvest = (planName: string) => {
    toast.success(`${planName} selected! Redirecting to payment...`);
  };

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
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`glass-card p-6 relative transition-all hover:scale-[1.02] ${
                plan.popular ? "border-primary glow" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium text-foreground glow">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${plan.color} flex items-center justify-center glow`}>
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground">{plan.term} Term</p>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-1">
                      {plan.roi}
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
                    <p className="text-lg font-bold text-foreground">${plan.min}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Max Investment</p>
                    <p className="text-lg font-bold text-foreground">${plan.max}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-gradient-primary glow"
                    : "bg-primary/20 hover:bg-primary/30"
                }`}
                onClick={() => handleInvest(plan.name)}
              >
                Invest Now
              </Button>
            </Card>
          ))}
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
                Earn 10% monthly ROI. Withdraw anytime after the term ends with full principal.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
