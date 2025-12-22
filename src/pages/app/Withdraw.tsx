import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowUpFromLine, AlertCircle, CheckCircle2, Wallet, AlertTriangle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { useUserWithdrawals, useCreateWithdrawal } from "@/api/hooks/useWithdrawals";
import { useWallet } from "@/api/hooks/useWallet";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const { data: wallet, isLoading: walletLoading } = useWallet();
  const { data: withdrawals = [], isLoading: withdrawalsLoading } = useUserWithdrawals();
  const createMutation = useCreateWithdrawal();

  const availableBalance = wallet?.balance ? parseFloat(String(wallet.balance)) : 0;
  const minWithdraw = 10.0;

  const handleWithdraw = (e: FormEvent) => {
    e.preventDefault();

    const withdrawAmount = parseFloat(amount);

    if (!amount || isNaN(withdrawAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!destinationAddress.trim()) {
      toast.error("Please enter a destination address");
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

    createMutation.mutate({ amount: withdrawAmount, destinationAddress: destinationAddress.trim() });
    setAmount("");
    setDestinationAddress("");
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "APPROVED":
      case "SUCCESS":
        return "bg-success/20 text-success";
      case "PENDING":
        return "bg-warning/20 text-warning";
      case "REJECTED":
      case "FAILED":
        return "bg-destructive/20 text-destructive";
      default:
        return "bg-secondary/20 text-secondary";
    }
  };

  if (walletLoading || withdrawalsLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="text-center">Loading withdrawal information...</div>
        </div>
      </AppLayout>
    );
  }

  // Ensure withdrawals is an array
  const withdrawalList = Array.isArray(withdrawals) ? withdrawals : [];

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">Withdraw</span> Funds
          </h1>
          <p className="text-muted-foreground">
            Transfer funds from your wallet to your given wallet address or crypto wallet
          </p>
        </div>

        <Alert className="border-yellow-500/50 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500">
          <AlertTriangle className="h-4 w-4 stroke-yellow-600 dark:stroke-yellow-500" />
          <AlertTitle>Important Network Warning</AlertTitle>
          <AlertDescription className="font-medium">
            Please ensure you use ONLY <strong>BEP-20 (Binance Smart Chain)</strong> network wallet address.
            Using other networks may result in permanent loss of funds.
          </AlertDescription>
        </Alert>

        <Alert className="border-orange-500/50 bg-orange-500/10 text-orange-600 dark:text-orange-500">
          <AlertCircle className="h-4 w-4 stroke-orange-600 dark:stroke-orange-500" />
          <AlertTitle>Deduction Caution</AlertTitle>
          <AlertDescription className="font-medium">
            Please note that a <strong>10% deduction</strong> is applied to all withdrawal requests as a processing fee.
          </AlertDescription>
        </Alert>

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
                      placeholder="0.00"
                      className="pl-7 glass text-lg"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      disabled={createMutation.isPending}
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
                      disabled={createMutation.isPending}
                    >
                      Max: ${availableBalance.toFixed(2)}
                    </button>
                  </div>
                  {amount && !isNaN(parseFloat(amount)) && (
                    <div className="bg-secondary/10 p-3 rounded-md mt-2 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Requested Amount:</span>
                        <span className="font-medium text-foreground">${parseFloat(amount).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-destructive/80">Deduction (10%):</span>
                        <span className="font-medium text-destructive/80">-${(parseFloat(amount) * 0.10).toFixed(2)}</span>
                      </div>
                      <div className="h-px bg-border/50 my-1" />
                      <div className="flex justify-between text-sm">
                        <span className="font-semibold text-foreground">You Will Receive:</span>
                        <span className="font-bold text-success">${(parseFloat(amount) * 0.90).toFixed(2)} USDT</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        10% deduction will cut and only ${(parseFloat(amount) * 0.90).toFixed(2)} USDT will be withdrawn.
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    Withdrawal Address <span className="text-amber-500 font-bold text-xs uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">BEP-20 Network Only</span>
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    placeholder="Enter destination BEP-20 Wallet Address"
                    className="glass border-amber-500/30"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                    disabled={createMutation.isPending}
                  />
                  <p className="text-xs font-medium text-amber-500/80">
                    IMPORTANT: Only send to BEP-20 network addresses to avoid loss of funds.
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
                    disabled={createMutation.isPending}
                  >
                    {createMutation.isPending ? "Submitting..." : "Submit Withdrawal"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-primary/30"
                    onClick={() => {
                      setAmount("");
                      setDestinationAddress("");
                    }}
                    disabled={createMutation.isPending}
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
                    disabled={createMutation.isPending}
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
                Network fee: 10% (deducted from withdrawal)
              </p>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Only USDT (BEP-20) withdrawals supported
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
            {withdrawalList.slice(0, 3).map((withdrawal) => (
              <div
                key={withdrawal.id}
                className="glass p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">${parseFloat(String(withdrawal.amount)).toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(withdrawal.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(withdrawal.status)}`}
                >
                  {withdrawal.status}
                </div>
              </div>
            ))}
            {withdrawalList.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No recent withdrawals</p>
            )}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}