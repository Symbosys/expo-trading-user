import { useSubscriptionPlans } from "@/api/hooks/useSubscription";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const staticFeatures = [
    [
        "Guaranteed ROI Daily",
        "Flexible withdrawal options",
        "24/7 Customer support",
        "Referral bonus eligibility",
        "Investment tracking dashboard"
    ],
    [
        "Guaranteed ROI Daily",
        "Priority customer support",
        "Bonus reward programs",
        "VIP referral bonuses",
        "Advanced analytics tools",
        "Early access to new features"
    ],
    [
        "Guaranteed ROI Daily",
        "Dedicated account manager",
        "Exclusive investment perks",
        "Premium reward programs",
        "Priority withdrawal processing",
        "VIP community access",
        "Personalized investment advice"
    ],
    [
        "Guaranteed ROI Daily",
        "Executive account manager",
        "White-glove concierge service",
        "Maximum referral rewards",
        "Instant withdrawal processing",
        "Exclusive networking events",
        "Custom investment strategies",
        "Premium insurance coverage"
    ],
];

export function SubscriptionSection() {
    const { data: plans = [], isLoading, error } = useSubscriptionPlans();

    if (isLoading) {
        return (
            <section id="plans" className="py-20 px-4 bg-gradient-to-b from-background to-card">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold mb-4">
                            Choose Your <span className="gradient-text">Investment Plan</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Select the plan that fits your investment goals. All plans guarantee consistent ROI.
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <Loader2 className="w-10 h-10 animate-spin text-primary" />
                    </div>
                </div>
            </section>
        );
    }

    if (error || !plans || plans.length === 0) {
        return null; // Or handle error appropriately
    }

    return (
        <section id="plans" className="py-20 px-4 bg-gradient-to-b from-background to-card">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        Choose Your <span className="gradient-text">Investment Plan</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Select the plan that fits your investment goals. All plans guarantee consistent ROI.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => {
                        const isPopular = index === 1; // Simplistic logic for popular plan
                        const features = staticFeatures[index % staticFeatures.length];

                        // Calculated Display Values
                        let roiDisplay;
                        if (plan.roiPerMonth) {
                            roiDisplay = `${(Number(plan.roiPerMonth) * 100).toFixed(0)}% Monthly`;
                        } else if (plan.roiPerDay) {
                            roiDisplay = `${(Number(plan.roiPerDay) * 100).toFixed(2)}% Daily`;
                        } else {
                            roiDisplay = "Contact for ROI";
                        }

                        const min = Number(plan.minimumInvestment).toLocaleString() + " USDT";
                        const max = plan.maximumInvestment ? Number(plan.maximumInvestment).toLocaleString() + " USDT" : "Unlimited";
                        const term = `${plan.durationInMonths} Months`;

                        return (
                            <Card
                                key={plan.id}
                                className={`glass-card p-6 relative ${isPopular ? "border-primary glow" : ""
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                        <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium text-foreground">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                                    <p className="text-muted-foreground text-sm mb-4">{term}</p>
                                    <div className="text-3xl font-bold gradient-text">{roiDisplay}</div>
                                </div>

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
                                            <span className="font-semibold text-success">${Number(plan.maximumEarning).toLocaleString()}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6">
                                    {features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link to="/auth/signup">
                                    <Button
                                        className={`w-full ${isPopular
                                            ? "bg-gradient-primary glow"
                                            : "bg-primary/10 hover:bg-primary/20"
                                            }`}
                                    >
                                        Invest Now
                                    </Button>
                                </Link>
                            </Card>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
