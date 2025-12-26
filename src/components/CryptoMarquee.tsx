import { TrendingUp, TrendingDown } from "lucide-react";

const cryptoData = [
  { symbol: "BTC", name: "Bitcoin", price: "$88,854.51", change: 2.5, isUp: true },
  { symbol: "ETH", name: "Ethereum", price: "$2,977.78", change: 1.8, isUp: true },
  { symbol: "USDT", name: "Tether", price: "$1.00", change: 0.01, isUp: true },
  { symbol: "BNB", name: "Binance", price: "$841.45", change: -0.5, isUp: false },
  { symbol: "SOL", name: "Solana", price: "$124.90", change: 4.2, isUp: true },
  { symbol: "XRP", name: "Ripple", price: "$1.87", change: -1.2, isUp: false },
  { symbol: "ADA", name: "Cardano", price: "$0.36", change: 3.1, isUp: true },
  { symbol: "DOGE", name: "Dogecoin", price: "$0.13", change: 5.8, isUp: true },
];

export function CryptoMarquee() {
  // Duplicate the data for seamless loop
  const duplicatedData = [...cryptoData, ...cryptoData];

  return (
    <div className="w-full overflow-hidden glass-card py-4 border-y border-primary/20">
      <div className="flex animate-marquee" style={{ animationDuration: "5s" }}>
        {duplicatedData.map((crypto, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mx-6 whitespace-nowrap"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">{crypto.symbol[0]}</span>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-foreground">{crypto.symbol}</span>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {crypto.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">
                    {crypto.price}
                  </span>
                  <span
                    className={`text-xs flex items-center gap-0.5 ${crypto.isUp ? "text-success" : "text-destructive"
                      }`}
                  >
                    {crypto.isUp ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {Math.abs(crypto.change)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
