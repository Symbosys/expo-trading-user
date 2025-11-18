import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet as WalletIcon, Copy, CheckCircle2, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useWallet } from "@/api/hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { getAuth } from "@/hooks/auth";
import { AxiosError } from "axios";

export default function Wallet() {
  const navigate = useNavigate();
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [walletAddressInput, setWalletAddressInput] = useState("");
  const { data: wallet, isLoading, error, createWallet, isCreating } = useWallet();
  const { userId } = getAuth();

  console.log(wallet)

  useEffect(() => {
    if (error instanceof AxiosError) {
      // const axiosError = error as AxiosError;
      // toast.error(
      //   axiosError.response?.data?.error ||
      //   axiosError.message ||
      //   "Failed to fetch wallet"
      // );

      toast.error(error.response?.data?.error || error.message || "Failed to fetch wallet");
    }
  }, [error]);


  const isNoWalletError = !!error && (error as AxiosError).response?.status === 404;

  const handleCopyAddress = () => {
    if (!wallet?.walletAddress) return;
    navigator.clipboard.writeText(wallet.walletAddress);
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

  const handleCreateWallet = () => {
    if (!walletAddressInput.trim()) {
      toast.error("Please enter a wallet address");
      return;
    }
    createWallet({ walletAddress: walletAddressInput.trim(), currency: "USDT" });
    setWalletAddressInput(""); // Clear input on submit
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div>Loading wallet...</div>
        </div>
      </AppLayout>
    );
  }

  if (error && !isNoWalletError) {
    const axiosError = error as AxiosError;
    return (
      <AppLayout>
        <div className="space-y-6">
          <Card className="glass-card p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Wallet</h3>
              <p className="text-muted-foreground mb-4">
                {error.message || "Failed to fetch wallet"}
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  const formattedBalance = wallet
    ? parseFloat(wallet.balance.toString()).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    })
    : "0.00";

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

        {wallet ? (
          <>
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
                    <p className="text-sm text-muted-foreground">
                      {wallet.currency} ({wallet.currency === "USDT" ? "TRC-20" : "Network"})
                    </p>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="p-6 bg-white rounded-xl">
                    {wallet.qrCodeUrl ? (
                      <img src={wallet.qrCodeUrl} alt="QR Code" className="w-48 h-48" />
                    ) : (
                      <QRCodeSVG
                        id="wallet-qr"
                        value={wallet.walletAddress}
                        size={200}
                        level="H"
                        includeMargin={true}
                      />
                    )}
                  </div>
                </div>

                {/* Address */}
                <div className="glass p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-xs sm:text-sm text-foreground break-all">
                      {wallet.walletAddress}
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
                  <Button className="flex-1 bg-gradient-primary glow" onClick={handleCopyAddress}>
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
                <h3 className="text-lg font-semibold text-foreground mb-6">Total Balance</h3>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
                  <p className="text-4xl font-bold gradient-text">${formattedBalance}</p>
                  <p className="text-sm text-muted-foreground">{formattedBalance} {wallet.currency}</p>
                </div>

                <div className="space-y-3">
                  <div className="glass p-4 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-foreground">
                          {wallet.currency[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{wallet.currency}</p>
                        <p className="text-sm text-muted-foreground">{formattedBalance}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-foreground">${formattedBalance}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
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
              <h3 className="text-lg font-semibold text-foreground mb-4">Important Information</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  Only send {wallet.currency} to this address. Other tokens may be lost permanently.
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  Deposits typically arrive within 5-15 minutes after network confirmation.
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  Minimum deposit amount: 10 {wallet.currency}. Transactions below this may not be credited.
                </p>
                <p className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  Always verify the wallet address before sending funds.
                </p>
              </div>
            </Card>
          </>
        ) : isNoWalletError ? (
          <Card className="glass-card p-6 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto mb-4 glow">
                <WalletIcon className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No Wallet Found</h3>
              <p className="text-muted-foreground">
                Create your wallet to start managing your cryptocurrency balances.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input
                  id="walletAddress"
                  type="text"
                  placeholder="0x1234567890abcdef..."
                  value={walletAddressInput}
                  onChange={(e) => setWalletAddressInput(e.target.value)}
                  className="glass"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your USDT (TRC-20) wallet address.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  className="flex-1 bg-gradient-primary glow"
                  onClick={handleCreateWallet}
                  disabled={isCreating || !walletAddressInput.trim()}
                >
                  {isCreating ? "Creating..." : "Create Wallet"}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-primary/30"
                  onClick={() => window.location.reload()}
                  disabled={isCreating}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        ) : null}
      </div>
    </AppLayout>
  );
}