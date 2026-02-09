import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { BarChart3, Shield, Zap, Users, TrendingUp, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Real-time market insights and technical analysis tools to inform your trading decisions",
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security measures protecting your data and transactions",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Ultra-responsive platform designed for seamless trading experience",
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Connect with traders, share insights, and grow together in our ecosystem",
    },
    {
      icon: TrendingUp,
      title: "Educational Resources",
      description: "Comprehensive guides, tutorials, and webinars to boost your trading knowledge",
    },
    {
      icon: Globe,
      title: "Global Market Access",
      description: "Access diverse markets and trading opportunities from anywhere",
    },
  ];

  const offerings = [
    "Informational and educational content related to trading and market trends",
    "Technology-based tools intended to support analysis and decision-making",
    "A user-friendly platform designed for accessibility and transparency",
    "General market insights for learning and awareness purposes only",
  ];

  const commitments = [
    {
      title: "Our Approach",
      description:
        "We believe in responsible communication, transparency, and compliance with applicable advertising and platform policies.",
    },
    {
      title: "User Responsibility",
      description:
        "Users are solely responsible for their trading decisions. We encourage consulting with qualified financial professionals.",
    },
    {
      title: "Our Commitment",
      description:
        "We maintain ethical standards, protect user trust, and operate in alignment with advertising guidelines and platform policies.",
    },
  ];

  return (
    <>
      <Navbar />
      <section className="py-20 px-4 bg-gradient-to-b from-background to-card mt-16">
        <div className="container mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              About <span className="gradient-text">ExpoTradeX</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              ExpoTradeX is a digital platform focused on providing technology-driven tools, educational resources, and market-related information designed to help users better understand trading and financial markets.
            </p>
          </div>

          {/* Main Description */}
          <Card className="glass-card p-8 mb-12 max-w-4xl mx-auto">
            <p className="text-muted-foreground leading-relaxed mb-4">
              Welcome to ExpoTradeX. We are a digital platform focused on providing technology-driven tools, educational resources, and market-related information designed to help users better understand trading and financial markets.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              ExpoTradeX does not promise guaranteed profits, fixed returns, or risk-free outcomes. All financial markets involve risk, and users are encouraged to make decisions based on their own research, judgment, and risk tolerance.
            </p>
          </Card>

          {/* Features Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Why Choose <span className="gradient-text">ExpoTradeX</span>?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="glass-card p-6">
                    <div className="mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="text-lg font-bold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* What We Offer */}
          <Card className="glass-card p-8 mb-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6">What We <span className="gradient-text">Offer</span></h3>
            <ul className="space-y-3 mb-6">
              {offerings.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm border-t border-primary/10 pt-6">
              All services and content offered by ExpoTradeX are provided strictly for informational and educational purposes and should not be considered financial, investment, or trading advice.
            </p>
          </Card>

          {/* Core Values */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">Our Core <span className="gradient-text">Values</span></h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {commitments.map((commitment, index) => (
                <Card key={index} className="glass-card p-6">
                  <h4 className="text-lg font-bold text-foreground mb-3">{commitment.title}</h4>
                  <p className="text-muted-foreground text-sm">{commitment.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <Card className="glass-card p-8 max-w-4xl mx-auto border-primary/20 mb-12">
            <p className="text-foreground font-bold mb-4">⚠️ Important Disclaimer</p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ExpoTradeX does not promise guaranteed profits, fixed returns, or risk-free outcomes. All financial markets involve risk, and users are encouraged to make decisions based on their own research, judgment, and risk tolerance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using ExpoTradeX, you acknowledge that trading involves risk and that outcomes may vary. Users are solely responsible for their trading and investment decisions. We encourage consulting with qualified financial professionals before engaging in any financial activity.
            </p>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your <span className="gradient-text">Trading Journey</span>?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of traders using ExpoTradeX to enhance their trading knowledge and access powerful market tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth/signup">
                <Button className="bg-gradient-primary glow">Get Started Today</Button>
              </Link>
              <Link to="/plans">
                <Button variant="outline">View Plans</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
