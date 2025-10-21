import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const investments = [
  {
    id: "INV001",
    plan: "Bronze Plan",
    invested: "1,000",
    roi: "300",
    total: "1,300",
    status: "Matured",
    startDate: "2024-01-15",
    endDate: "2024-04-15",
    canRedeem: true,
  },
  {
    id: "INV002",
    plan: "Silver Plan",
    invested: "5,000",
    roi: "3,000",
    total: "8,000",
    status: "Matured",
    startDate: "2023-12-01",
    endDate: "2024-06-01",
    canRedeem: true,
  },
  {
    id: "INV003",
    plan: "Bronze Plan",
    invested: "500",
    roi: "100",
    total: "600",
    status: "Matured",
    startDate: "2024-02-10",
    endDate: "2024-05-10",
    canRedeem: true,
  },
  {
    id: "INV004",
    plan: "Silver Plan",
    invested: "2,000",
    roi: "800",
    total: "2,800",
    status: "Active",
    startDate: "2024-04-01",
    endDate: "2024-10-01",
    canRedeem: false,
  },
];

export default function Redeem() {
  const handleRedeem = (id: string, amount: string) => {
    toast.success(`Redeemed $${amount} successfully! Funds will be credited to your wallet.`);
  };

  const totalRedeemable = investments
    .filter((inv) => inv.canRedeem)
    .reduce((sum, inv) => sum + parseFloat(inv.total), 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">Redeem</span> Investments
          </h1>
          <p className="text-muted-foreground">
            Claim your matured investments and accumulated returns
          </p>
        </div>

        {/* Summary Card */}
        <Card className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center glow">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">Total Redeemable</p>
              </div>
              <p className="text-3xl font-bold gradient-text">${totalRedeemable.toLocaleString()}</p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Matured Plans</p>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {investments.filter((inv) => inv.canRedeem).length}
              </p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center glow">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {investments.filter((inv) => !inv.canRedeem).length}
              </p>
            </div>
          </div>
        </Card>

        {/* Investments Table */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Investment History
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Invested
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    ROI Earned
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Total Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Period
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {investments.map((investment) => (
                  <tr
                    key={investment.id}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{investment.plan}</p>
                        <p className="text-xs text-muted-foreground">#{investment.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium text-foreground">
                      ${investment.invested}
                    </td>
                    <td className="py-4 px-4 font-medium text-success">
                      +${investment.roi}
                    </td>
                    <td className="py-4 px-4 font-bold text-foreground">
                      ${investment.total}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          investment.canRedeem
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-warning/20 text-warning border-warning/30"
                        }
                      >
                        {investment.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm">
                        <p className="text-muted-foreground">{investment.startDate}</p>
                        <p className="text-muted-foreground">to {investment.endDate}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        size="sm"
                        disabled={!investment.canRedeem}
                        onClick={() => handleRedeem(investment.id, investment.total)}
                        className={
                          investment.canRedeem
                            ? "bg-gradient-primary glow"
                            : "bg-muted text-muted-foreground cursor-not-allowed"
                        }
                      >
                        {investment.canRedeem ? "Redeem" : "Locked"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {investments.map((investment) => (
              <div key={investment.id} className="glass p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">{investment.plan}</p>
                    <p className="text-xs text-muted-foreground">#{investment.id}</p>
                  </div>
                  <Badge
                    className={
                      investment.canRedeem
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }
                  >
                    {investment.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Invested:</span>
                    <span className="font-medium text-foreground">${investment.invested}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ROI Earned:</span>
                    <span className="font-medium text-success">+${investment.roi}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Amount:</span>
                    <span className="font-bold text-foreground">${investment.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Period:</span>
                    <span className="text-muted-foreground text-xs">
                      {investment.startDate} - {investment.endDate}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={!investment.canRedeem}
                  onClick={() => handleRedeem(investment.id, investment.total)}
                >
                  {investment.canRedeem ? "Redeem Now" : "Locked"}
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Info */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Redemption Information
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Redeemed funds are instantly credited to your wallet balance.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              You can redeem investments only after the plan term has completed.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Redemption includes both your principal investment and accumulated ROI.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              No fees are charged for redemption transactions.
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
