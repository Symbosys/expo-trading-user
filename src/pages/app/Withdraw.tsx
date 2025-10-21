import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowUpFromLine, AlertCircle, CheckCircle2, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const availableBalance = 16105.0;
  const minWithdraw = 10.0;

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();

    const withdrawAmount = parseFloat(amount);

    if (!amount || isNaN(withdrawAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount < minWithdraw) {
      toast.error(`Minimum withdrawal amount is $${minWithdraw}`);
      return;
    }

    if (withdrawAmount > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    toast.success(`Withdrawal request for $${amount} submitted successfully!`);
    setAmount("");
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">Withdraw</span> Funds
          </h1>
          <p className="text-muted-foreground">
            Transfer funds from your wallet to your bank or crypto wallet
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Withdraw Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow">
                  <ArrowUpFromLine className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Withdrawal Request</h3>
                  <p className="text-sm text-muted-foreground">Enter withdrawal details</p>
                </div>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Withdrawal Amount (USDT)</Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      $
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="pl-7 glass text-lg"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Min: ${minWithdraw.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAmount(availableBalance.toString())}
                      className="text-primary hover:underline"
                    >
                      Max: ${availableBalance.toFixed(2)}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Withdrawal Address</Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter your wallet address"
                    className="glass"
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter USDT (TRC-20) wallet address
                  </p>
                </div>

                <Alert className="glass border-warning/30">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <AlertDescription className="text-warning">
                    Please double-check your wallet address. Transactions cannot be reversed.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button
                    type="submit"
                    className="bg-gradient-primary glow"
                  >
                    Submit Withdrawal
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-primary/30"
                    onClick={() => setAmount("")}
                  >
                    Clear Form
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          {/* Balance Info */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-success" />
                </div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
              </div>
              <p className="text-3xl font-bold gradient-text mb-2">
                ${availableBalance.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">USDT</p>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Amounts</h3>
              <div className="grid grid-cols-2 gap-3">
                {[50, 100, 500, 1000].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    className="border-primary/30"
                    onClick={() => setAmount(value.toString())}
                  >
                    ${value}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Withdrawal Info */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Withdrawal Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Minimum withdrawal amount: ${minWithdraw} USDT
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Processing time: 24-48 hours for verification
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Network fee: 1 USDT (deducted from withdrawal)
              </p>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Only USDT (TRC-20) withdrawals supported
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Daily withdrawal limit: $50,000 USDT
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                All withdrawals require email verification
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Withdrawals */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Withdrawals
          </h3>
          <div className="space-y-3">
            {[
              { amount: "500.00", status: "Completed", date: "2024-06-15" },
              { amount: "1,200.00", status: "Processing", date: "2024-06-20" },
              { amount: "750.00", status: "Completed", date: "2024-06-18" },
            ].map((withdrawal, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">${withdrawal.amount}</p>
                  <p className="text-sm text-muted-foreground">{withdrawal.date}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    withdrawal.status === "Completed"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  {withdrawal.status}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
