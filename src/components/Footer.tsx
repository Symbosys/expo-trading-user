import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo/logo.jpeg";

export function Footer() {
  return (
    <footer className="glass-card border-t border-primary/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="CryptoInvest" className="h-10 w-auto rounded-md" />
            </div>
            <p className="text-muted-foreground text-sm">
              Your trusted platform for USDT investments with guaranteed 10% monthly returns.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Home
              </Link>
              <Link to="/auth/login" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Login
              </Link>
              <Link to="/auth/signup" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Sign Up
              </Link>
              <Link to="/app/dashboard" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Dashboard
              </Link>
              <Link to="/app/privacy-policy" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/app/terms-of-service" className="block text-muted-foreground hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>support@cryptoinvest.io</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>123 Crypto Street, NY</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-all hover:glow"
              >
                <Facebook className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-all hover:glow"
              >
                <Twitter className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-all hover:glow"
              >
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:bg-primary/20 transition-all hover:glow"
              >
                <Instagram className="w-5 h-5 text-primary" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary/20 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} CryptoInvest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
