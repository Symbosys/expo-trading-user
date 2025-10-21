import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet as WalletIcon, Copy, CheckCircle2, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { toast } from "sonner";

const walletData = {
  id: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb7",
  balances: [
    { coin: "USDT", amount: "16,105.00", usd: "16,105.00" },
    { coin: "BTC", amount: "0.2456", usd: "16,013.40" },
    { coin: "ETH", amount: "4.6789", usd: "16,173.56" },
  ],
};

export default function Wallet() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletData.id);
    setCopiedAddress(true);
    toast.success("Wallet address copied!");
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("wallet-qr") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL();
      const link = document.createElement("a");
      link.download = "wallet-qr-code.png";
      link.href = url;
      link.click();
      toast.success("QR code downloaded!");
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            My <span className="gradient-text">Wallet</span>
          </h1>
          <p className="text-muted-foreground">
            Manage your cryptocurrency balances and wallet
          </p>
        </div>

        {/* Wallet Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Wallet Info & QR Code */}
          <Card className="glass-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow">
                <WalletIcon className="w-6 h-6 text-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Wallet Address</h3>
                <p className="text-sm text-muted-foreground">USDT (TRC-20)</p>
              </div>
            </div>

            {/* QR Code */}
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-white rounded-xl">
                <QRCodeSVG
                  id="wallet-qr"
                  value={walletData.id}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>

            {/* Address */}
            <div className="glass p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs sm:text-sm text-foreground break-all">
                  {walletData.id}
                </code>
                <Button
                  size="sm"
                  onClick={handleCopyAddress}
                  className="bg-primary/20 hover:bg-primary/30 flex-shrink-0"
                >
                  {copiedAddress ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 bg-gradient-primary glow"
                onClick={handleCopyAddress}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Address
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary/30"
                onClick={handleDownloadQR}
              >
                <Download className="w-4 h-4 mr-2" />
                Download QR
              </Button>
            </div>
          </Card>

          {/* Total Balance */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Total Balance
            </h3>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
              <p className="text-4xl font-bold gradient-text">$48,291.96</p>
            </div>

            <div className="space-y-3">
              {walletData.balances.map((balance, index) => (
                <div
                  key={index}
                  className="glass p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                      <span className="text-sm font-bold text-foreground">
                        {balance.coin[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{balance.coin}</p>
                      <p className="text-sm text-muted-foreground">{balance.amount}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">${balance.usd}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Actions */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="bg-success/20 hover:bg-success/30 text-success border border-success/30">
              Deposit
            </Button>
            <Button className="bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/30">
              Withdraw
            </Button>
            <Button className="bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30">
              Transfer
            </Button>
            <Button className="bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/30">
              View History
            </Button>
          </div>
        </Card>

        {/* Important Info */}
        <Card className="glass-card p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Important Information
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Only send USDT (TRC-20) to this address. Other tokens may be lost permanently.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Deposits typically arrive within 5-15 minutes after network confirmation.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Minimum deposit amount: 10 USDT. Transactions below this may not be credited.
            </p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              Always verify the wallet address before sending funds.
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
