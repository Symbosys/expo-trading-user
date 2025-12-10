import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";
import logo1 from "@/assets/logo/logo1.jpeg";
import logo2 from "@/assets/logo/logo2.jpeg";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-card border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logo1} alt="CryptoInvest" className="h-10 w-auto block dark:hidden rounded-md" />
            <img src={logo2} alt="CryptoInvest" className="h-10 w-auto hidden dark:block rounded-md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/#about" className="text-foreground/80 hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/#plans" className="text-foreground/80 hover:text-primary transition-colors">
              Plans
            </Link>
            <Link to="/#contact" className="text-foreground/80 hover:text-primary transition-colors">
              Contact
            </Link>
            <ModeToggle />
            <Link to="/auth/login">
              <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
                Login
              </Button>
            </Link>
            <Link to="/auth/signup">
              <Button className="bg-gradient-primary glow-pulse border-0">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ModeToggle />
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link
              to="/#about"
              className="block text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/#plans"
              className="block text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Plans
            </Link>
            <Link
              to="/#contact"
              className="block text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link to="/auth/login" onClick={() => setIsMenuOpen(false)}>
              <Button variant="outline" className="w-full border-primary/30">
                Login
              </Button>
            </Link>
            <Link to="/auth/signup" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full bg-gradient-primary">Get Started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
