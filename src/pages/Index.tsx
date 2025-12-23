import { UserStats } from "@/components/UserStats";
import cryptoAbstract from "@/assets/crypto-abstract.jpg";
import heroImage from "@/assets/hero-bg.jpg";
import { CryptoMarquee } from "@/components/CryptoMarquee";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

import { ArrowRight, Download, FileText, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Suspense } from "react";
import { Link } from "react-router-dom";
import { SubscriptionSection } from "@/components/SubscriptionSection";
import { getAuth } from "@/hooks/auth";
import expotradexPdf from "@/assets/pdf/Expotradex (1).pdf";



export default function Index() {
  const { userId } = getAuth();
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
              {userId ? (
                <Link to="/app/dashboard">
                  <Button size="lg" className="bg-gradient-primary glow-pulse text-lg px-8 py-6">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/auth/signup">
                  <Button size="lg" className="bg-gradient-primary glow-pulse text-lg px-8 py-6">
                    Start Investing Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
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

      {/* User Stats Section */}
      <UserStats />

      {/* Investment Plans */}
      <SubscriptionSection />

      {/* PDF Document Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background via-card/30 to-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm font-medium text-foreground">Official Company Document</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Company Overview</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access our comprehensive whitepaper to understand our investment strategy, security measures, and guaranteed returns.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-card p-8 md:p-12 rounded-3xl glow relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2" />

              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                {/* What's Inside */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground mb-4">What's Inside</h4>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Investment Strategy</h5>
                      <p className="text-sm text-muted-foreground">Our proven methodology for generating consistent returns</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Security Measures</h5>
                      <p className="text-sm text-muted-foreground">How we protect your investments 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">ROI Mechanics</h5>
                      <p className="text-sm text-muted-foreground">Understanding your guaranteed monthly returns</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-primary/10 hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-foreground">Company Profile</h5>
                      <p className="text-sm text-muted-foreground">Meet the team behind Expotradex</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                      Expotradex Whitepaper
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our comprehensive document covers everything you need to know about Expotradex — from our investment methodology to security protocols and guaranteed return mechanisms.
                    </p>
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-card/50 p-3 rounded-xl border border-primary/10 text-center">
                      <Shield className="w-5 h-5 text-success mx-auto mb-1" />
                      <p className="text-xs font-medium text-foreground">Verified</p>
                    </div>
                    <div className="bg-card/50 p-3 rounded-xl border border-primary/10 text-center">
                      <Zap className="w-5 h-5 text-warning mx-auto mb-1" />
                      <p className="text-xs font-medium text-foreground">Official</p>
                    </div>
                    <div className="bg-card/50 p-3 rounded-xl border border-primary/10 text-center">
                      <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-xs font-medium text-foreground">Updated</p>
                    </div>
                  </div>

                  {/* Download Button */}
                  <a href={expotradexPdf} download="Expotradex.pdf" className="block">
                    <Button size="lg" className="w-full bg-gradient-primary glow-pulse text-lg py-6 group">
                      <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                      Download Whitepaper
                    </Button>
                  </a>

                  {/* File Info */}
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <FileText className="w-3 h-3" />
                      PDF Format
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>Free Download</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="flex items-center gap-1">
                      <Shield className="w-3 h-3 text-success" />
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
          {userId ? (
            <Link to="/app/dashboard">
              <Button size="lg" className="bg-gradient-primary glow-pulse text-lg px-8 py-6">
                Go to Dashboard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/auth/signup">
              <Button size="lg" className="bg-gradient-primary glow-pulse text-lg px-8 py-6">
                Create Your Account
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}