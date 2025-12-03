



import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard";
import Redeem from "./pages/app/Redeem";
import Referrals from "./pages/app/Referrals";
import Settings from "./pages/app/Settings";
import Subscriptions from "./pages/app/Subscriptions";
import Transactions from "./pages/app/Transactions";
import Transfer from "./pages/app/Transfer";
import Wallet from "./pages/app/Wallet";
import Withdraw from "./pages/app/Withdraw";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/termand condition/privecy";
import TermsOfService from "./pages/termand condition/term";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
    },
  }
});

/* ---------------- Protected Layout ---------------- */
const ProtectedLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

/* ---------------- Public Layout ---------------- */
const PublicLayout = () => {
  const token = localStorage.getItem("token");

  if (token) {
    // If already logged in, redirect to dashboard
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/app/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/app/terms-of-service" element={<TermsOfService />} />
          </Route>

          {/* Protected routes */}
          <Route path="/app" element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="redeem" element={<Redeem />} />
            <Route path="withdraw" element={<Withdraw />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="referrals" element={<Referrals />} />
            <Route path="settings" element={<Settings />} />
            
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
