import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowRightLeft,
  Receipt,
  Users,
  Settings,
  TrendingUp,
  Menu,
  X,
  LogOut,
  Bell,
} from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUser } from "@/api/hooks/useUser";
import { getAuth } from "@/hooks/auth";

interface AppLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app/dashboard" },
  { icon: Wallet, label: "Wallet", path: "/app/wallet" },
  { icon: CreditCard, label: "Subscriptions", path: "/app/subscriptions" },
  { icon: ArrowDownToLine, label: "Redeem", path: "/app/redeem" },
  { icon: ArrowUpFromLine, label: "Withdraw", path: "/app/withdraw" },
  { icon: ArrowRightLeft, label: "Transfer", path: "/app/transfer" },
  { icon: Receipt, label: "Transactions", path: "/app/transactions" },
  { icon: Users, label: "Referrals", path: "/app/referrals" },
  { icon: Bell, label: "Notifications", path: "/app/notifications" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { userId } = getAuth();
  const { data: user, isLoading, error } = useUser();

  const getInitials = (name?: string) => {
    if (!name) return "JD";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    queryClient.clear(); // Clear all queries
    navigate("/auth/login", { replace: true });
  };

  // Show loading only if userId exists but query is loading
  const showLoading = !!userId && isLoading && !error;
  const showError = !!userId && error;
  const hasUser = !!user && !isLoading;

  return (
    <div className="min-h-screen flex w-full">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 h-screen w-64 glass-card border-r border-primary/20 z-50 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-primary/20">
            <Link to="/app/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center glow">
                <TrendingUp className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-xl font-bold gradient-text">CryptoInvest</span>
            </Link>
            <button
              className="lg:hidden text-foreground"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 ${isActive
                      ? "bg-primary/20 text-primary glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                      }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-primary/20">
            {showLoading ? (
              <div className="flex items-center justify-center p-3">
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                <span className="ml-2 text-sm text-muted-foreground">Loading...</span>
              </div>
            ) : showError ? (
              <div className="text-center p-3 text-destructive text-sm">
                Profile error. <Button variant="link" size="sm" onClick={handleLogout}>Logout</Button>
              </div>
            ) : hasUser ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-lg glass">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-sm font-bold text-foreground">{getInitials(user.name)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name || user.email}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : !userId ? (
              <div className="text-center p-3 text-muted-foreground text-sm">
                Not authenticated. <Button variant="link" size="sm" onClick={handleLogout}>Login</Button>
              </div>
            ) : (
              <div className="text-center p-3 text-muted-foreground text-sm">
                No profile data. <Button variant="link" size="sm" onClick={handleLogout}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Mobile Header */}
        <header className="lg:hidden sticky top-0 z-30 glass-card border-b border-primary/20">
          <div className="flex items-center justify-between p-4">
            <button
              className="text-foreground"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center glow">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
              <span className="font-bold gradient-text">CryptoInvest</span>
            </div>
            <div className="w-6" /> {/* Spacer for center alignment */}
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}