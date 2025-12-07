import { api } from "@/api/apiClient";
import { useQrCode } from "@/api/hooks/useQrCode";
import { useSubscriptionPlans } from "@/api/hooks/useSubscription";
import { useUser } from "@/api/hooks/useUser";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

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
  const { data: user } = useUser();
  const { data: qrData, isLoading: isQrLoading } = useQrCode();
  const { data: plans = [], isLoading, error } = useSubscriptionPlans(user?.id);

  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState(0);

  const handleInvest = (planName: string, plan: any) => {
    setSelectedPlan({ name: planName, ...plan });
    setIsModalOpen(true);
    setTransactionId("");
    setInvestmentAmount(Number(plan.minimumInvestment));
  };

  const handleSubmit = async () => {
    if (!transactionId.trim()) {
      toast.error("Please enter a transaction ID.");
      return;
    }

    try {
      if (investmentAmount < Number(selectedPlan.minimumInvestment)) {
        toast.error(`Investment amount must be at least ${selectedPlan.minimumInvestment} USDT.`);
        return;
      }

      // Get userId from localStorage (set during login)
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("User not found. Please login again.");
        return;
      }

      const startDate = new Date().toISOString();
      const endDate = new Date(Date.now() + selectedPlan.durationInMonths * 30 * 24 * 60 * 60 * 1000).toISOString();

      // Calculate ROI based on what's available in the plan
      let roiPercentage;
      if (selectedPlan.roiPerMonth) {
        roiPercentage = Number(selectedPlan.roiPerMonth) * 100;
      } else if (selectedPlan.roiPerDay) {
        roiPercentage = Number(selectedPlan.roiPerDay) * 100;
      } else {
        roiPercentage = 0;
      }

      const response = await api.post('/investment/create', {
        userId,
        planId: selectedPlan.id,
        amountInvested: investmentAmount,
        roiPercentage,
        startDate,
        endDate,
        transactionId,
      });

      if (response.status === 201) {
        toast.success(`Investment for ${selectedPlan?.name} created successfully! Transaction ID: ${transactionId}`);
        setIsModalOpen(false);
        setTransactionId("");
        setInvestmentAmount(0);
      }
    } catch (err: any) {
      console.error('Investment creation failed:', err);
      toast.error(`Failed to create investment: ${err.response?.data?.error || 'Please try again.'}`);
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
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Investment <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-muted-foreground">
            Choose the perfect investment plan for your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan, index) => {
            const isPopular = index === 1;
            const color = planColors[index % planColors.length];
            const features = staticFeatures[index % staticFeatures.length];
            const term = `${plan.durationInMonths} Months`;
            const isSubscribed = plan.isSubscribed || false;

            // Display ROI based on what's available
            let roiDisplay;
            if (plan.roiPerMonth) {
              roiDisplay = `${(Number(plan.roiPerMonth) * 100).toFixed(2)}% Monthly`;
            } else if (plan.roiPerDay) {
              roiDisplay = `${(Number(plan.roiPerDay) * 100).toFixed(2)}% Daily`;
            } else {
              roiDisplay = "Contact for ROI";
            }

            const min = Number(plan.minimumInvestment).toLocaleString();

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
                {isSubscribed && (
                  <div className="absolute -top-4 right-4">
                    <span className="bg-success/20 text-success px-3 py-1 rounded-full text-xs font-medium">
                      Subscribed
                    </span>
                  </div>
                )}

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
                        {roiDisplay}
                      </div>
                      <p className="text-sm text-muted-foreground">Guaranteed Returns</p>
                    </div>
                  </div>
                </div>

                <div className="glass p-4 rounded-lg mb-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Min Investment</p>
                      <p className="text-lg font-bold text-foreground">${min}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Max Investment</p>
                      <p className="text-lg font-bold text-foreground">${plan?.maximumInvestment || "Unlimited"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full ${isSubscribed
                    ? "bg-success/50 cursor-not-allowed"
                    : isPopular
                      ? "bg-gradient-primary glow"
                      : "bg-primary/20 hover:bg-primary/30"
                    }`}
                  onClick={() => !isSubscribed && handleInvest(plan.name, plan)}
                  disabled={isSubscribed}
                >
                  {isSubscribed ? "Subscribed" : "Invest Now"}
                </Button>
              </Card>
            );
          })}
        </div>

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
                <div className="bg-black/20 p-2 rounded-lg inline-block w-full">
                  {isQrLoading ? (
                    <div className="h-4 w-3/4 mx-auto bg-gray-700/50 animate-pulse rounded"></div>
                  ) : (
                    <code className="text-xs font-mono break-all text-foreground">
                      {/* Note: Interface has typo 'wallentaddress', using exactly as specified */}
                      {qrData?.wallentaddress || "Address not available"}
                    </code>
                  )}
                </div>
              </div>

              <div className="flex justify-center items-center min-h-[200px]">
                {isQrLoading ? (
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">Loading QR...</span>
                  </div>
                ) : qrData?.qrCodeUrl?.secure_url ? (
                  <img
                    src={qrData.qrCodeUrl.secure_url}
                    alt="Payment QR Code"
                    className="w-[200px] h-[200px] object-contain rounded-lg bg-white"
                  />
                ) : (
                  <div className="w-[200px] h-[200px] bg-gray-800 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                    QR Code Unavailable
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Investment Amount (USDT)
                </label>
                <Input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  placeholder={`${selectedPlan?.minimumInvestment} or more`}
                  className="w-full"
                  min={selectedPlan?.minimumInvestment}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Enter Order Id
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