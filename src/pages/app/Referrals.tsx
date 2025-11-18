import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Copy, CheckCircle2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useUserReferrals } from "@/api/hooks/useReferrals";
import { useUser } from "@/api/hooks/useUser";
import { AxiosError } from "axios";

export default function Referrals() {
  const [copied, setCopied] = useState(false);
  const { data: referrals = [], isLoading: referralsLoading, error: referralsError } = useUserReferrals();
  const { data: user, isLoading: userLoading, error: userError } = useUser();

  const referralLink = user ? `https://cryptoinvest.io/ref/${user.referralCode}` : '';

  const handleCopy = () => {
    if (!referralLink) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const level1Referrals = referrals.filter(ref => ref.level === 1).length;
  const totalEarnings = user?.totalEarnings || "0.00";

  if (referralsLoading || userLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="text-center">Loading referrals...</div>
        </div>
      </AppLayout>
    );
  }

  if (referralsError || userError) {
    const errorMsg = referralsError?.message ||
      'Failed to load referrals or user details.';
    return (
      <AppLayout>
        <div className="space-y-6">
          <Card className="glass-card p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Referrals</h3>
              <p className="text-muted-foreground mb-4">{errorMsg}</p>
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
            <Button onClick={handleCopy} className="bg-gradient-primary glow" disabled={!referralLink}>
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
            <p className="text-3xl font-bold text-success">${parseFloat(totalEarnings).toFixed(2)}</p>
          </Card>
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center glow">
                <Users className="w-6 h-6 text-warning" />
              </div>
              <p className="text-sm text-muted-foreground">Level 1 Referrals</p>
            </div>
            <p className="text-3xl font-bold text-foreground">{level1Referrals}</p>
          </Card>
        </div>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Referral List</h3>
          <div className="space-y-3">
            {referrals.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No referrals yet</p>
                <p className="text-sm text-muted-foreground mt-2">Share your referral link to get started!</p>
              </div>
            ) : (
              referrals.map((ref) => (
                <div key={ref.id} className="glass p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">{ref.referredUser.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {ref.referredUser.email} • Level {ref.level} • Status: {ref.status}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Bonus: {(ref.bonusPercentage * 100).toFixed(1)}% • From {new Date(ref.bonusStartDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-success">Active</p>
                    <p className="text-xs text-muted-foreground">{new Date(ref.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}