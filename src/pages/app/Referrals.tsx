import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Copy, CheckCircle2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const referrals = [
  { name: "Alice Johnson", email: "alice@example.com", level: 1, invested: "5,000", earned: "250", date: "2024-06-15" },
  { name: "Bob Smith", email: "bob@example.com", level: 1, invested: "3,000", earned: "150", date: "2024-06-10" },
  { name: "Charlie Brown", email: "charlie@example.com", level: 2, invested: "2,000", earned: "60", date: "2024-06-08" },
  { name: "Diana Prince", email: "diana@example.com", level: 1, invested: "10,000", earned: "500", date: "2024-06-05" },
  { name: "Eve Wilson", email: "eve@example.com", level: 2, invested: "1,500", earned: "45", date: "2024-06-01" },
];

export default function Referrals() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://cryptoinvest.io/ref/JD12345";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My <span className="gradient-text">Referrals</span>
          </h1>
          <p className="text-muted-foreground">Track your referrals and earnings</p>
        </div>

        <Card className="glass-card p-6">
          <h3 className="font-semibold text-foreground mb-4">Your Referral Link</h3>
          <div className="flex gap-2">
            <div className="glass px-4 py-3 rounded-lg flex-1">
              <code className="text-sm text-foreground">{referralLink}</code>
            </div>
            <Button onClick={handleCopy} className="bg-gradient-primary glow">
              {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center glow">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-sm text-muted-foreground">Total Referrals</p>
            </div>
            <p className="text-3xl font-bold gradient-text">{referrals.length}</p>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center glow">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">Total Earnings</p>
            </div>
            <p className="text-3xl font-bold text-success">$1,005</p>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center glow">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground">Level 1 Referrals</p>
            </div>
            <p className="text-3xl font-bold text-foreground">3</p>
          </Card>
        </div>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Referral List</h3>
          <div className="space-y-3">
            {referrals.map((ref, idx) => (
              <div key={idx} className="glass p-4 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">{ref.name}</p>
                  <p className="text-sm text-muted-foreground">{ref.email} • Level {ref.level}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-success">+${ref.earned}</p>
                  <p className="text-xs text-muted-foreground">{ref.date}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
