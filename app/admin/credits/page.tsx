"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { CreditLedgerTable } from "@/components/admin/credit-ledger-table";
import { AddCreditsForm } from "@/components/admin/add-credits-form";
import { CreditLedger } from "@/lib/types";
import { CreditCard, TrendingDown, TrendingUp } from "lucide-react";
import { Pagination } from "@/components/admin/Pagination";

const mockLedger: CreditLedger[] = [
  {
    id: 'ledger_001',
    userId: 'user_001',
    delta: 5000,
    balanceAfter: 5000,
    adminId: 'admin_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    reason: 'Signup bonus',
    source: 'system',
  },
  {
    id: 'ledger_002',
    userId: 'user_002',
    delta: -500,
    balanceAfter: 4500,
    adminId: 'admin_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    reason: 'Chat generation used',
    source: 'system',
  },
  {
    id: 'ledger_003',
    userId: 'user_003',
    delta: 10000,
    balanceAfter: 50000,
    adminId: 'admin_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    reason: 'Monthly top-up purchase',
    source: 'system',
  },
  {
    id: 'ledger_004',
    userId: 'user_001',
    delta: 1000,
    balanceAfter: 6000,
    adminId: 'admin_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    reason: 'Compensation for outage',
    source: 'manual',
    referenceId: 'manual_comp_001',
  },
  {
    id: 'ledger_005',
    userId: 'user_004',
    delta: -3000,
    balanceAfter: 0,
    adminId: 'admin_001',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    reason: 'Refund issued for disputed charges',
    source: 'refund',
    referenceId: 'refund_001',
  },
]

export default function CreditsPage() {
  const { toast } = useToast();
  const [ledger, setLedger] = useState<CreditLedger[]>(mockLedger);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ pagination state (for ledger)
  const [page, setPage] = useState(1); // 1-based
  const [pageSize, setPageSize] = useState(10);

  const stats = useMemo(() => {
    const totalIssued = ledger.filter((l) => l.delta > 0).reduce((sum, l) => sum + l.delta, 0);
    const totalSpent = Math.abs(ledger.filter((l) => l.delta < 0).reduce((sum, l) => sum + l.delta, 0));
    const totalRefunded = ledger
      .filter((l) => l.source === "refund")
      .reduce((sum, l) => sum + Math.abs(l.delta), 0);

    return { totalIssued, totalSpent, totalRefunded };
  }, [ledger]);

  // ✅ filter ledger
  const filteredLedger = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ledger;

    return ledger.filter((item) => {
      return (
        item.userId.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q)
      );
    });
  }, [ledger, searchQuery]);

  // ✅ reset page when search changes
  useMemo(() => {
    setPage(1);
  }, [searchQuery]);

  // ✅ paginate after filtering
  const totalItems = filteredLedger.length;

  const pagedLedger = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLedger.slice(start, start + pageSize);
  }, [filteredLedger, page, pageSize]);

  const handleAddCredits = (data: {
    userId: string;
    amount: number;
    reason: string;
    referenceId?: string;
  }) => {
    const newLedgerEntry: CreditLedger = {
      id: `ledger_${Date.now()}`,
      userId: data.userId,
      delta: data.amount,
      balanceAfter: data.amount, // mock
      adminId: "admin_001",
      timestamp: new Date(),
      reason: data.reason,
      source: "manual",
      referenceId: data.referenceId,
    };

    setLedger((prev) => [newLedgerEntry, ...prev]);
    toast({
      title: "Success",
      description: `Added ${data.amount} credits to ${data.userId}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Credits Administration</h1>
        <p className="text-muted-foreground">Manage user credits and view transaction history</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Issued</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalIssued / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalSpent / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalIssued > 0 ? Math.round((stats.totalSpent / stats.totalIssued) * 100) : 0}% utilization
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
            <TrendingDown className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalRefunded / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Returned to users</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="manage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="manage">Manage Credits</TabsTrigger>
          <TabsTrigger value="ledger">Ledger</TabsTrigger>
        </TabsList>

        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Add or Deduct Credits</CardTitle>
              <CardDescription>Manual credit adjustments for users. All actions are logged.</CardDescription>
            </CardHeader>
            <CardContent>
              <AddCreditsForm onSubmit={handleAddCredits} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ledger" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Ledger</CardTitle>
              <CardDescription>Transaction history for all credit operations</CardDescription>

              <div className="mt-4">
                <Input
                  placeholder="Search by user ID or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-sm"
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {totalItems > 0 ? (
                <>
                  <CreditLedgerTable ledger={pagedLedger} />

                  {/* ✅ Pagination */}
                  <Pagination
                    page={page}
                    pageSize={pageSize}
                    totalItems={totalItems}
                    onPageChange={setPage}
                    onPageSizeChange={(s) => {
                      setPageSize(s);
                      setPage(1);
                    }}
                    pageSizeOptions={[5, 10, 20, 50]}
                  />
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No ledger entries found</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
