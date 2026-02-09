import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSubscriptionPlans } from "@/api/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { getAuth } from "@/hooks/auth";

const staticFeatures = [
  [
    "Guaranteed ROI Daily",
    "Flexible withdrawal options",
    "24/7 Customer support",
    "Referral bonus eligibility",
    "Investment tracking dashboard",
  ],
  [
    "Guaranteed ROI Daily",
    "Priority customer support",
    "Bonus reward programs",
    "VIP referral bonuses",
    "Advanced analytics tools",
    "Early access to new features",
  ],
  [
    "Guaranteed ROI Daily",
    "Dedicated account manager",
    "Exclusive investment perks",
    "Premium reward programs",
    "Priority withdrawal processing",
    "VIP community access",
    "Personalized investment advice",
  ],
  [
    "Guaranteed ROI Daily",
    "Executive account manager",
    "White-glove concierge service",
    "Maximum referral rewards",
    "Instant withdrawal processing",
    "Exclusive networking events",
    "Custom investment strategies",
    "Premium insurance coverage",
  ],
];

export default function Plans() {
  const { data: plans = [], isLoading, error } = useSubscriptionPlans();
  const { userId } = getAuth();

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center mt-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">Loading subscription plans...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center mt-20">
          <div className="text-center max-w-md">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <p className="text-muted-foreground text-lg mb-4">
              {error.message || "Unable to load subscription plans"}
            </p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!plans || plans.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center mt-20">
          <div className="text-center">
            <p className="text-muted-foreground text-lg mb-6">No subscription plans available</p>
            <Link to="/contact">
              <Button>Contact Us</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card mt-16">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Investment Plan</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the plan that fits your investment goals. All plans guarantee consistent ROI.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => {
              const isPopular = index === 1;
              const features = staticFeatures[index % staticFeatures.length];

              // Calculate ROI Display
              let roiDisplay;
              if (plan.roiPerMonth) {
                roiDisplay = `${(Number(plan.roiPerMonth) * 100).toFixed(0)}% Monthly`;
              } else if (plan.roiPerDay) {
                roiDisplay = `${(Number(plan.roiPerDay) * 100).toFixed(2)}% Daily`;
              } else {
                roiDisplay = "Contact for ROI";
              }

              const min = Number(plan.minimumInvestment).toLocaleString() + " USDT";
              const max = plan.maximumInvestment
                ? Number(plan.maximumInvestment).toLocaleString() + " USDT"
                : "Unlimited";
              const term = `${plan.durationInMonths} Months`;

              return (
                <Card
                  key={plan.id}
                  className={`glass-card p-6 relative ${isPopular ? "border-primary glow" : ""}`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium text-foreground">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{term}</p>
                    <div className="text-3xl font-bold gradient-text">{roiDisplay}</div>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Min Investment:</span>
                      <span className="font-semibold text-foreground">{min}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Max Investment:</span>
                      <span className="font-semibold text-foreground">{max}</span>
                    </div>
                    {plan.maximumEarning && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Max Earning:</span>
                        <span className="font-semibold text-success">
                          ${Number(plan.maximumEarning).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  {userId ? (
                    <Link to={`/app/subscriptions?planId=${plan.id}`}>
                      <Button
                        className={`w-full ${isPopular
                            ? "bg-gradient-primary glow"
                            : "bg-primary/10 hover:bg-primary/20"
                          }`}
                        disabled={!plan.isActive}
                      >
                        {plan.isActive ? "Invest Now" : "Unavailable"}
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/auth/signup">
                      <Button
                        className={`w-full ${isPopular
                            ? "bg-gradient-primary glow"
                            : "bg-primary/10 hover:bg-primary/20"
                          }`}
                      >
                        Sign Up & Invest
                      </Button>
                    </Link>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
