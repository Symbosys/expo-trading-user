import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, TrendingUp } from "lucide-react";
import { getAuth } from "@/hooks/auth";
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useROIRecords } from "@/api/hooks/useRoI";
import { useSubscriptionPlans } from "@/api/hooks/useSubscription";

export default function ROIHistory() {
  const { userId } = getAuth();
  const { data: plans = [] } = useSubscriptionPlans(userId);

  const [selectedPlanId, setSelectedPlanId] = useState<string | undefined>(undefined);
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useROIRecords(
    userId,
    selectedPlanId,
    startDate,
    endDate
  );

  const allRoiRecords = data?.pages.flatMap(page => page.data) || [];

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const totalRoiEarned = allRoiRecords.reduce((sum, record) => sum + Number(record.roiAmount), 0);
  const totalReferralBonusApplied = allRoiRecords.filter(record => record.isReferralBonusApplied).length;

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="text-center">Loading ROI history...</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">ROI</span> History
          </h1>
          <p className="text-muted-foreground">
            View your accumulated returns from investments
          </p>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select value={selectedPlanId || "all"} onValueChange={(val) => setSelectedPlanId(val === "all" ? undefined : val)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Plans" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  {plans.map(plan => (
                    <SelectItem key={plan.id} value={plan.id}>{plan.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate || ''}
                onChange={(e) => setStartDate(e.target.value || undefined)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate || ''}
                onChange={(e) => setEndDate(e.target.value || undefined)}
              />
            </div>
          </div>
        </Card>

        {/* Summary Card */}
        <Card className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center glow">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">Total ROI Earned</p>
              </div>
              <p className="text-3xl font-bold gradient-text">${totalRoiEarned.toLocaleString()}</p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Total Records</p>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {allRoiRecords.length}
              </p>
            </div>

            <div className="glass p-4 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center glow">
                  <Clock className="w-5 h-5 text-warning" />
                </div>
                <p className="text-sm text-muted-foreground">Referral Bonus Applied</p>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {totalReferralBonusApplied}
              </p>
            </div>
          </div>
        </Card>

        {/* ROI History Table */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            ROI Records
          </h3>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Week
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    ROI Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Investment Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Plan
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Referral Bonus
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {allRoiRecords.map((record) => (
                  <tr
                    key={record.id}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-4 px-4 font-medium text-foreground">
                      Week {record.weekNumber}
                    </td>
                    <td className="py-4 px-4 font-medium text-success">
                      ${Number(record.roiAmount).toLocaleString()}
                    </td>
                    <td className="py-4 px-4 font-medium text-foreground">
                      ${record.investment ? Number(record.investment.amountInvested).toLocaleString() : 'N/A'}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground">
                      {record.investment?.plan?.name || 'N/A'}
                    </td>
                    <td className="py-4 px-4">
                      <Badge
                        className={
                          record.isReferralBonusApplied
                            ? "bg-success/20 text-success border-success/30"
                            : "bg-muted text-muted-foreground border-muted"
                        }
                      >
                        {record.isReferralBonusApplied ? "Applied" : "Not Applied"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {new Date(record.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {allRoiRecords.map((record) => (
              <div key={record.id} className="glass p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-foreground">Week {record.weekNumber}</p>
                    <p className="text-xs text-muted-foreground">#{record.id}</p>
                  </div>
                  <Badge
                    className={
                      record.isReferralBonusApplied
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-muted text-muted-foreground border-muted"
                    }
                  >
                    {record.isReferralBonusApplied ? "Bonus Applied" : "Standard"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ROI Amount:</span>
                    <span className="font-medium text-success">${Number(record.roiAmount).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Investment:</span>
                    <span className="font-medium text-foreground">
                      ${record.investment ? Number(record.investment.amountInvested).toLocaleString() : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Plan:</span>
                    <span className="font-medium text-foreground">
                      {record.investment?.plan?.name || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="text-muted-foreground text-xs">
                      {new Date(record.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={ref} className="flex justify-center py-4">
            {isFetchingNextPage && <p className="text-muted-foreground">Loading more...</p>}
          </div>
        </Card>

        {/* Info */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            ROI Information
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              ROI is credited automatically to your wallet balance.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Referral bonuses may be applied to eligible ROI records.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Records are grouped by week for better organization.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              No fees are charged on ROI credits.
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}