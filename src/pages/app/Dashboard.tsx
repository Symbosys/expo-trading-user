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

const balanceData = [
  { month: "Jan", balance: 10000 },
  { month: "Feb", balance: 11000 },
  { month: "Mar", balance: 12100 },
  { month: "Apr", balance: 13310 },
  { month: "May", balance: 14641 },
  { month: "Jun", balance: 16105 },
];

const referralData = [
  { month: "Jan", earnings: 250 },
  { month: "Feb", earnings: 380 },
  { month: "Mar", earnings: 520 },
  { month: "Apr", earnings: 650 },
  { month: "May", earnings: 890 },
  { month: "Jun", earnings: 1200 },
];

export default function Dashboard() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://cryptoinvest.io/ref/JD12345";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="glass-card p-6 rounded-xl glow">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, <span className="gradient-text">John!</span>
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
              <div className="glass px-4 py-2 rounded-lg flex-1 sm:flex-none">
                <code className="text-sm text-foreground">{referralLink}</code>
              </div>
              <Button
                size="sm"
                onClick={handleCopyLink}
                className="bg-primary/20 hover:bg-primary/30"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <p className="text-2xl font-bold text-foreground">$10,000</p>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center glow">
                <Wallet className="w-6 h-6 text-success" />
              </div>
              <div className="flex items-center gap-1 text-success text-sm">
                <ArrowUpRight className="w-4 h-4" />
                <span>+61%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
              <p className="text-2xl font-bold text-foreground">$16,105</p>
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
              <p className="text-2xl font-bold text-foreground">$1,000</p>
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
              <p className="text-2xl font-bold text-foreground">$1,200</p>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Balance Over Time */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Balance Growth
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={balanceData}>
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
              Referral Earnings
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={referralData}>
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
              <p className="text-2xl font-bold text-foreground">$10,000</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Profit Earned</p>
              <p className="text-2xl font-bold text-success">$6,105</p>
            </div>
            <div className="glass p-4 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">ROI Percentage</p>
              <p className="text-2xl font-bold gradient-text">+61%</p>
            </div>
          </div>
        </Card>

        {/* Active Subscriptions */}
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Active Subscriptions
            </h3>
            <span className="text-sm text-muted-foreground">2 active plans</span>
          </div>
          <div className="space-y-3">
            <div className="glass p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Silver Plan</p>
                <p className="text-sm text-muted-foreground">6 Months • $5,000 invested</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">+10% Monthly</p>
                <p className="text-xs text-muted-foreground">3 months remaining</p>
              </div>
            </div>
            <div className="glass p-4 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Bronze Plan</p>
                <p className="text-sm text-muted-foreground">3 Months • $5,000 invested</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">+10% Monthly</p>
                <p className="text-xs text-muted-foreground">1 month remaining</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
