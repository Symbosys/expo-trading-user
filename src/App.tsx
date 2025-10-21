import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/app/Dashboard";
import Wallet from "./pages/app/Wallet";
import Subscriptions from "./pages/app/Subscriptions";
import Redeem from "./pages/app/Redeem";
import Withdraw from "./pages/app/Withdraw";
import Transfer from "./pages/app/Transfer";
import Transactions from "./pages/app/Transactions";
import Referrals from "./pages/app/Referrals";
import Settings from "./pages/app/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/wallet" element={<Wallet />} />
          <Route path="/app/subscriptions" element={<Subscriptions />} />
          <Route path="/app/redeem" element={<Redeem />} />
          <Route path="/app/withdraw" element={<Withdraw />} />
          <Route path="/app/transfer" element={<Transfer />} />
          <Route path="/app/transactions" element={<Transactions />} />
          <Route path="/app/referrals" element={<Referrals />} />
          <Route path="/app/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
