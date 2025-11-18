import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, Search, Filter, Download } from "lucide-react";
import { useState } from "react";
import { useUserTransactions } from "@/api/hooks/useTransactions";
import { AxiosError } from "axios";

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    DEPOSIT: "bg-success/20 text-success border-success/30",
    WITHDRAW: "bg-destructive/20 text-destructive border-destructive/30",
    TRANSFER: "bg-secondary/20 text-secondary border-secondary/30",
    INVESTMENT: "bg-primary/20 text-primary border-primary/30",
    REFERRAL_BONUS: "bg-warning/20 text-warning border-warning/30",
    ROI: "bg-success/20 text-success border-success/30",
  };
  return colors[type] || "bg-muted text-muted-foreground";
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    SUCCESS: "bg-success/20 text-success border-success/30",
    PENDING: "bg-warning/20 text-warning border-warning/30",
    FAILED: "bg-destructive/20 text-destructive border-destructive/30",
  };
  return colors[status] || "bg-muted text-muted-foreground";
};

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  const { data: rawTransactions = [], isLoading, error } = useUserTransactions();

  if (isLoading) {
    return (
      <AppLayout>
        <div className="space-y-6">
          <div className="text-center">Loading transactions...</div>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    const axiosError = error as AxiosError;
    return (
      <AppLayout>
        <div className="space-y-6">
          <Card className="glass-card p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Error Loading Transactions</h3>
              <p className="text-muted-foreground mb-4">
                {axiosError.message || "Failed to load transactions."}
              </p>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </Card>
        </div>
      </AppLayout>
    );
  }

  // Filter and search transactions
  let filteredTransactions = rawTransactions.filter((transaction) => {
    const matchesSearch =
      searchQuery === "" ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.description && transaction.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === "all" || transaction.type === filterType;
    const matchesStatus = filterStatus === "all" || transaction.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const startIndex = (currentPage - 1) * transactionsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + transactionsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const noTransactions = paginatedTransactions.length === 0;

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
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={(value) => { setFilterType(value); setCurrentPage(1); }}>
              <SelectTrigger className="glass">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="DEPOSIT">Deposit</SelectItem>
                <SelectItem value="INVESTMENT">Invest</SelectItem>
                <SelectItem value="ROI">ROI</SelectItem>
                <SelectItem value="REFERRAL_BONUS">Referral</SelectItem>
                <SelectItem value="WITHDRAW">Withdraw</SelectItem>
                <SelectItem value="TRANSFER">Transfer</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(value) => { setFilterStatus(value); setCurrentPage(1); }}>
              <SelectTrigger className="glass">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass-card">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="SUCCESS">Completed</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
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
                {noTransactions ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      <p className="text-muted-foreground">No transaction history</p>
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((transaction) => (
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
                          {transaction.type.replace(/_/g, ' ')}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            ${parseFloat(transaction.amount).toLocaleString()}
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
                        {new Date(transaction.createdAt).toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {transaction.description || 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {noTransactions ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No transaction history</p>
              </div>
            ) : (
              paginatedTransactions.map((transaction) => (
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
                        {transaction.type.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Amount:</span>
                      <span className="font-semibold text-foreground">
                        ${parseFloat(transaction.amount).toLocaleString()} {transaction.currency}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Date:</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(transaction.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{transaction.description || 'N/A'}</p>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-primary/20">
            <p className="text-sm text-muted-foreground">
              Showing {paginatedTransactions.length} of {filteredTransactions.length} transactions
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || totalPages === 0}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i + 1}
                  variant="outline"
                  size="sm"
                  className={`border-primary/30 ${currentPage === i + 1 ? 'bg-primary/20' : ''}`}
                  onClick={() => handlePageChange(i + 1)}
                  disabled={totalPages === 0}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="border-primary/30"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}