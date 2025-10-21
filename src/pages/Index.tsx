import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CryptoMarquee } from "@/components/CryptoMarquee";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { TrendingUp, Shield, Users, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import cryptoAbstract from "@/assets/crypto-abstract.jpg";

const subscriptionPlans = [
  {
    name: "Bronze Plan",
    term: "3 Months",
    roi: "10% Monthly",
    min: "100 USDT",
    max: "1,000 USDT",
    features: ["Guaranteed 10% ROI", "Flexible withdrawal", "24/7 Support", "Referral bonus"],
  },
  {
    name: "Silver Plan",
    term: "6 Months",
    roi: "10% Monthly",
    min: "1,000 USDT",
    max: "5,000 USDT",
    features: ["Guaranteed 10% ROI", "Priority support", "Bonus rewards", "VIP referral bonus"],
    popular: true,
  },
  {
    name: "Gold Plan",
    term: "12 Months",
    roi: "10% Monthly",
    min: "5,000 USDT",
    max: "50,000 USDT",
    features: ["Guaranteed 10% ROI", "Dedicated manager", "Exclusive perks", "Premium rewards"],
  },
];

export default function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section 
        className="relative pt-32 pb-20 px-4 overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-background/90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 animate-float">
              <Zap className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-foreground">10% Monthly ROI Guaranteed</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text glow-text">Invest in Crypto.</span>
              <br />
              <span className="text-foreground">Earn Consistently.</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors earning guaranteed 10% monthly returns on USDT investments. 
              Secure, transparent, and profitable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button size="lg" className="bg-gradient-primary glow-pulse text-lg px-8 py-6">
                  Start Investing Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="#about">
                <Button size="lg" variant="outline" className="border-primary/30 text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Ticker */}
      <CryptoMarquee />

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose <span className="gradient-text">CryptoInvest?</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                We leverage advanced trading algorithms and market expertise to generate consistent 
                returns for our investors. Your investment is secure, transparent, and profitable.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Secure & Transparent</h3>
                    <p className="text-sm text-muted-foreground">
                      Bank-grade security with full transparency on all transactions
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Guaranteed Returns</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn 10% monthly ROI on your USDT investments, guaranteed
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Referral Rewards</h3>
                    <p className="text-sm text-muted-foreground">
                      Earn additional income through our multi-level referral program
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-3xl opacity-20 animate-glow-pulse" />
              <img
                src={cryptoAbstract}
                alt="Crypto Investment"
                className="relative rounded-2xl shadow-2xl glass-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Investment Plans */}
      <section id="plans" className="py-20 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your <span className="gradient-text">Investment Plan</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the plan that fits your investment goals. All plans guarantee 10% monthly ROI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {subscriptionPlans.map((plan, index) => (
              <Card
                key={index}
                className={`glass-card p-6 relative ${
                  plan.popular ? "border-primary glow" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-primary px-4 py-1 rounded-full text-sm font-medium text-foreground">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{plan.term}</p>
                  <div className="text-3xl font-bold gradient-text">{plan.roi}</div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Min Investment:</span>
                    <span className="font-semibold text-foreground">{plan.min}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Max Investment:</span>
                    <span className="font-semibold text-foreground">{plan.max}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/auth/signup">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-primary glow"
                        : "bg-primary/10 hover:bg-primary/20"
                    }`}
                  >
                    Invest Now
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Info */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="glass-card p-8 md:p-12 rounded-2xl glow">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  <span className="gradient-text">Referral Program</span>
                </h2>
                <p className="text-muted-foreground mb-6">
                  Earn extra income by referring friends and family to CryptoInvest. 
                  Our multi-level referral system rewards you for every successful referral.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <span className="text-foreground">Level 1: 5% of referral investment</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <span className="text-foreground">Level 2: 3% of sub-referral investment</span>
                  </div>
                </div>
              </div>

              <div className="bg-card/50 p-6 rounded-xl">
                <h3 className="font-semibold text-foreground mb-4">Example Earnings</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-success/10 border border-success/20">
                    <span className="text-sm text-muted-foreground">Direct referral invests $1000</span>
                    <span className="font-bold text-success">+$50</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-success/10 border border-success/20">
                    <span className="text-sm text-muted-foreground">Sub-referral invests $1000</span>
                    <span className="font-bold text-success">+$30</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-background to-card">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">
            Ready to <span className="gradient-text">Start Earning?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Join CryptoInvest today and start earning guaranteed returns on your USDT investments.
          </p>
          <Link to="/auth/signup">
            <Button size="lg" className="bg-gradient-primary glow-pulse text-lg px-8 py-6">
              Create Your Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
