import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Users,
  Wallet,
  Copy,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/api/hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/apiClient";

const useDashboard = (userId: string) => {
  return useQuery({
    queryKey: ["dashboard", userId],
    queryFn: async () => {
      const { data } = await api.get(`/user-dashboard/${userId}`);
      if (!data.success) {
        throw new Error("Failed to fetch dashboard data");
      }
      return data.data;
    },
    enabled: !!userId,
  });
};

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const { data: user } = useUser();
  const { data: dashboard, isLoading } = useDashboard(user?.id || "");

  const handleCopyLink = () => {
    if (!dashboard?.referralLink) return;
    navigator.clipboard.writeText(dashboard.referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl glow">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!dashboard) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-xl glow">
            <p className="text-muted-foreground">Loading dashboard...</p>
          </div>
        </div>
      </AppLayout>
    );
  }

  const hasBalanceGrowth = dashboard.charts.balanceData.some((d: any) => d.balance > 0);
  const hasReferralEarnings = dashboard.charts.referralData.some((d: any) => d.earnings > 0);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="glass-card p-6 rounded-xl glow">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, <span className="gradient-text">{dashboard.userName}</span>
          </h1>
          <p className="text-muted-foreground">
            Here's your investment overview for today
          </p>
        </div>

        {/* Referral Link */}
        <Card className="glass-card p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Your Referral Link</h3>
              <p className="text-sm text-muted-foreground">
                Share this link to earn referral rewards
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="glass px-4 py-2 rounded-lg flex-1 sm:flex-none min-w-0">
                <code className="text-sm text-foreground truncate block">{dashboard.referralLink}</code>
              </div>
              <Button
                size="sm"
                onClick={handleCopyLink}
                className="bg-primary/20 hover:bg-primary/30 shrink-0"
                disabled={!dashboard.referralLink}
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center glow">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+10%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Invested</p>
              <p className="text-2xl font-bold text-foreground">${dashboard.kpis.totalInvested}</p>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center glow">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>{dashboard.summary.roiPercentage}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-foreground">${dashboard.kpis.currentBalance}</p>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center glow">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+10%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Daily ROI</p>
              <p className="text-2xl font-bold text-foreground">${dashboard.kpis.dailyROI}</p>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center glow">
                <TrendingUp className="w-6 h-6 text-secondary" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+10%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Monthly ROI</p>
              <p className="text-2xl font-bold text-foreground">${dashboard.kpis.monthlyROI}</p>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center glow">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+35%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Referral Earnings</p>
              <p className="text-2xl font-bold text-foreground">${dashboard.kpis.referralEarnings}</p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Over Time */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Balance Growth{!hasBalanceGrowth && " - No earnings yet"}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboard.charts.balanceData}>
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Referral Earnings */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Referral Earnings{!hasReferralEarnings && " - No earnings yet"}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboard.charts.referralData}>
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                  }}
                />
                <Bar
                  dataKey="earnings"
                  fill="hsl(var(--success))"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Summary Section */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Income Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Total Invested</p>
              <p className="text-2xl font-bold text-foreground">${dashboard.summary.totalInvested}</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Profit Earned</p>
              <p className="text-2xl font-bold text-success">${dashboard.summary.profitEarned}</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">ROI Percentage</p>
              <p className="text-2xl font-bold gradient-text">{dashboard.summary.roiPercentage}</p>
            </div>
          </div>
        </Card>

        {/* Active Subscriptions */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Active Subscriptions
            </h3>
            <span className="text-sm text-muted-foreground">{dashboard.activeSubscriptions.count} active plans</span>
          </div>
          <div className="space-y-3">
            {dashboard.activeSubscriptions.plans.map((plan: any, index: number) => (
              <div key={index} className="glass p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{plan.planName}</p>
                  <p className="text-sm text-muted-foreground">{plan.duration} • ${plan.amountInvested} invested</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">{plan.roiMonthly}</p>
                  <p className="text-xs text-muted-foreground">{plan.remaining}</p>
                </div>
              </div>
            ))}
            {dashboard.activeSubscriptions.plans.length === 0 && (
              <p className="text-muted-foreground text-center">No active subscriptions</p>
            )}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}