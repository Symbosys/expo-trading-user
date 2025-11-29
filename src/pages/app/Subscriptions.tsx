import { api } from "@/api/apiClient"; // Assuming this is your API client; adjust path if needed
import { useSubscriptionPlans } from "@/api/hooks/useSubscription";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { QRCode } from "react-qrcode-logo"; // Assuming this library is installed; fallback to static image if not
import { toast } from "sonner";


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
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  const handleInvest = (planName: string, plan) => {
    setSelectedPlan({ name: planName, ...plan });
    setIsModalOpen(true);
    setTransactionId("");
  };

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID.");
      return;
    }

    try {
      // Assume userId is obtained from authentication context (e.g., useAuth hook)
      const userId = "d0f80b8c-2d23-4bea-bf50-f64e2003c556"; // TODO: Replace with actual user ID from auth (e.g., useAuth().user.id)

      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + selectedPlan.durationInMonths * 30 * 24 * 60 * 60 * 1000).toISOString(); // Approximate months as 30 days

      const response = await api.post('/investment/create', { // Matches the route: investmentRoutes.post('/create', ...)
        userId,
        planId: selectedPlan.id,
        amountInvested: selectedPlan.minimumInvestment,
        roiPercentage: selectedPlan.roiPerMonth * 100, // Convert to percentage if backend expects it
        startDate,
        endDate,
        transactionId, // Include TX ID; backend can ignore or store if schema updated
      });

      if (response.status === 201) { // StatusCodes.CREATED
        toast.success(`Investment for ${selectedPlan?.name} created successfully with TX ID: ${transactionId}. We'll verify shortly.`);
      }
    } catch (err) {
      console.error('Investment creation failed:', err);
      toast.error(`Failed to create investment: ${err.response?.data?.error || 'Please try again.'}`);
    } finally {
      setIsModalOpen(false);
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

  const walletAddress = "0x742d35Cc6b0eA849c6cD3aD5a793cF9C8b6f2d5e"; // Example USDT wallet address
  const qrValue = `USDT:${walletAddress}?amount=${selectedPlan?.minimumInvestment || 100}`; // QR data for USDT payment

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

        {/* Payment Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="glass-card max-w-sm p-0">
            <DialogHeader className="p-6 border-b">
              <DialogTitle className="text-2xl font-bold text-foreground">
                Invest in {selectedPlan?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Send USDT to:</p>
                <div className="bg-bla-100 p-2 rounded-lg inline-block">
                  <code className="text-xs font-mono break-all text-foreground">{walletAddress}</code>
                </div>
              </div>
              <div className="flex justify-center">
                <QRCode value={qrValue} size={200} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Enter Transaction ID
                </label>
                <Input
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g., 0x123..."
                  className="w-full"
                />
              </div>
              <Button onClick={handleSubmit} className="w-full bg-gradient-primary glow">
                Submit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}