import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowRightLeft, AlertCircle, CheckCircle2, Wallet, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Transfer() {
  const [formData, setFormData] = useState({
    recipient: "",
    amount: "",
  });
  const availableBalance = 16105.0;
  const minTransfer = 10.0;

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();

    const transferAmount = parseFloat(formData.amount);

    if (!formData.recipient) {
      toast.error("Please enter recipient wallet ID or referral code");
      return;
    }

    if (!formData.amount || isNaN(transferAmount)) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (transferAmount < minTransfer) {
      toast.error(`Minimum transfer amount is $${minTransfer}`);
      return;
    }

    if (transferAmount > availableBalance) {
      toast.error("Insufficient balance");
      return;
    }

    toast.success(`Transfer of $${formData.amount} to ${formData.recipient} successful!`);
    setFormData({ recipient: "", amount: "" });
  };

  return (
    <AppLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="gradient-text">Transfer</span> Funds
          </h1>
          <p className="text-muted-foreground">
            Send USDT to another CryptoInvest user instantly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transfer Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow">
                  <ArrowRightLeft className="w-6 h-6 text-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Transfer Request</h3>
                  <p className="text-sm text-muted-foreground">Send funds to another user</p>
                </div>
              </div>

              <form onSubmit={handleTransfer} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="recipient">Recipient</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="recipient"
                      type="text"
                      placeholder="Wallet ID or Referral Code"
                      className="pl-10 glass"
                      value={formData.recipient}
                      onChange={(e) =>
                        setFormData({ ...formData, recipient: e.target.value })
                      }
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Enter recipient's wallet address or referral code
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Transfer Amount (USDT)</Label>
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
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Min: ${minTransfer.toFixed(2)}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, amount: availableBalance.toString() })
                      }
                      className="text-primary hover:underline"
                    >
                      Max: ${availableBalance.toFixed(2)}
                    </button>
                  </div>
                </div>

                <Alert className="glass border-warning/30">
                  <AlertCircle className="h-4 w-4 text-warning" />
                  <AlertDescription className="text-warning">
                    Please verify the recipient details. Transfers are instant and cannot be reversed.
                  </AlertDescription>
                </Alert>

                <div className="glass p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transfer Amount:</span>
                    <span className="font-medium text-foreground">
                      ${formData.amount || "0.00"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transfer Fee:</span>
                    <span className="font-medium text-success">$0.00</span>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="font-bold gradient-text">
                      ${formData.amount || "0.00"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button type="submit" className="bg-gradient-primary glow">
                    Send Transfer
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-primary/30"
                    onClick={() => setFormData({ recipient: "", amount: "" })}
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
                {[10, 50, 100, 500].map((value) => (
                  <Button
                    key={value}
                    variant="outline"
                    className="border-primary/30"
                    onClick={() => setFormData({ ...formData, amount: value.toString() })}
                  >
                    ${value}
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Transfer Info */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Transfer Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Instant transfers to verified CryptoInvest users
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Minimum transfer amount: ${minTransfer} USDT
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Zero fees for internal transfers
              </p>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                All transfers are irreversible once confirmed
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Funds credited instantly to recipient wallet
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                Transaction history available in dashboard
              </p>
            </div>
          </div>
        </Card>

        {/* Recent Transfers */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Recent Transfers
          </h3>
          <div className="space-y-3">
            {[
              { recipient: "JD12345", amount: "250.00", date: "2024-06-21", type: "Sent" },
              { recipient: "AB67890", amount: "500.00", date: "2024-06-20", type: "Received" },
              { recipient: "XY11223", amount: "100.00", date: "2024-06-19", type: "Sent" },
            ].map((transfer, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-foreground">
                    {transfer.type === "Sent" ? "To" : "From"}: {transfer.recipient}
                  </p>
                  <p className="text-sm text-muted-foreground">{transfer.date}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-bold ${
                      transfer.type === "Sent" ? "text-destructive" : "text-success"
                    }`}
                  >
                    {transfer.type === "Sent" ? "-" : "+"}${transfer.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">{transfer.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
