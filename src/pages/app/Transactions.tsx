import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Search, Filter, Download } from "lucide-react";
import { useState } from "react";

const transactions = [
  {
    id: "TXN001234",
    type: "Deposit",
    amount: "5,000.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-06-21 14:35",
    description: "Wallet deposit",
  },
  {
    id: "TXN001235",
    type: "Invest",
    amount: "5,000.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-06-21 14:40",
    description: "Silver Plan investment",
  },
  {
    id: "TXN001236",
    type: "ROI",
    amount: "500.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-06-20 09:00",
    description: "Monthly ROI credit",
  },
  {
    id: "TXN001237",
    type: "Referral",
    amount: "250.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-06-19 16:20",
    description: "Level 1 referral bonus",
  },
  {
    id: "TXN001238",
    type: "Withdraw",
    amount: "1,200.00",
    currency: "USDT",
    status: "Processing",
    date: "2024-06-20 11:15",
    description: "Wallet withdrawal",
  },
  {
    id: "TXN001239",
    type: "Transfer",
    amount: "100.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-06-18 13:25",
    description: "Transfer to JD12345",
  },
  {
    id: "TXN001240",
    type: "Redeem",
    amount: "1,300.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-06-15 10:00",
    description: "Bronze Plan redemption",
  },
  {
    id: "TXN001241",
    type: "ROI",
    amount: "500.00",
    currency: "USDT",
    status: "Completed",
    date: "2024-05-20 09:00",
    description: "Monthly ROI credit",
  },
];

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    Deposit: "bg-success/20 text-success border-success/30",
    Invest: "bg-primary/20 text-primary border-primary/30",
    ROI: "bg-success/20 text-success border-success/30",
    Referral: "bg-warning/20 text-warning border-warning/30",
    Withdraw: "bg-destructive/20 text-destructive border-destructive/30",
    Transfer: "bg-secondary/20 text-secondary border-secondary/30",
    Redeem: "bg-primary/20 text-primary border-primary/30",
  };
  return colors[type] || "bg-muted text-muted-foreground";
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Completed: "bg-success/20 text-success border-success/30",
    Processing: "bg-warning/20 text-warning border-warning/30",
    Failed: "bg-destructive/20 text-destructive border-destructive/30",
    Pending: "bg-muted text-muted-foreground border-muted",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Transaction <span className="gradient-text">History</span>
          </h1>
          <p className="text-muted-foreground">
            View all your transaction history and download statements
          </p>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-10 glass"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="glass">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="invest">Invest</SelectItem>
                <SelectItem value="roi">ROI</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="transfer">Transfer</SelectItem>
                <SelectItem value="redeem">Redeem</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="glass">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end mt-4">
            <Button variant="outline" className="border-primary/30">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </Card>

        {/* Transactions Table */}
        <Card className="glass-card p-6">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Date & Time
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-muted-foreground" />
                        <code className="text-sm font-mono text-foreground">
                          {transaction.id}
                        </code>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getTypeColor(transaction.type)}>
                        {transaction.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-semibold text-foreground">
                          ${transaction.amount}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {transaction.currency}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {transaction.date}
                    </td>
                    <td className="py-4 px-4 text-sm text-muted-foreground">
                      {transaction.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="glass p-4 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <code className="text-xs font-mono text-foreground">
                      {transaction.id}
                    </code>
                  </div>
                  <Badge className={getStatusColor(transaction.status)}>
                    {transaction.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <Badge className={getTypeColor(transaction.type)}>
                      {transaction.type}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount:</span>
                    <span className="font-semibold text-foreground">
                      ${transaction.amount} {transaction.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date:</span>
                    <span className="text-sm text-muted-foreground">
                      {transaction.date}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{transaction.description}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              Showing {transactions.length} of {transactions.length} transactions
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-primary/30" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="border-primary/30 bg-primary/20">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-primary/30">
                2
              </Button>
              <Button variant="outline" size="sm" className="border-primary/30">
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
