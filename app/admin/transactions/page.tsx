'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { TransactionsTable } from '@/components/admin/transactions-table'
import { Transaction } from '@/lib/types'
import { Download, Filter } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Pagination } from '@/components/admin/Pagination'

const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    userId: 'user_001',
    type: 'credit_purchase',
    amount: 100,
    vat: 20,
    total: 120,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: 'txn_002',
    userId: 'user_002',
    type: 'subscription',
    amount: 29,
    vat: 5.8,
    total: 34.8,
    currency: 'USD',
    status: 'completed',
    providerRef: 'sub_stripe_002',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 'txn_003',
    userId: 'user_003',
    type: 'topup',
    amount: 500,
    vat: 100,
    total: 600,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_003',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: 'txn_004',
    userId: 'user_001',
    type: 'credit_purchase',
    amount: 250,
    vat: 50,
    total: 300,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_004',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    id: 'txn_005',
    userId: 'user_004',
    type: 'subscription',
    amount: 49,
    vat: 9.8,
    total: 58.8,
    currency: 'USD',
    status: 'pending',
    providerRef: 'sub_stripe_005',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
  },
  {
    id: 'txn_006',
    userId: 'user_005',
    type: 'credit_purchase',
    amount: 50,
    vat: 10,
    total: 60,
    currency: 'USD',
    status: 'completed',
    providerRef: 'pi_stripe_006',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
]

export default function TransactionsPage() {
  const { toast } = useToast()
  const [transactions] = useState<Transaction[]>(mockTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | Transaction['type']>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | Transaction['status']>('all')
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  const stats = {
    totalTransactions: transactions.length,
    completedCount: transactions.filter((t) => t.status === 'completed').length,
    totalRevenue: transactions
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + t.total, 0),
    vatCollected: transactions
      .filter((t) => t.status === 'completed')
      .reduce((sum, t) => sum + t.vat, 0),
  }

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return transactions.filter((txn) => {
      const matchesSearch =
        txn.userId.toLowerCase().includes(q) ||
        txn.id.toLowerCase().includes(q) ||
        txn.providerRef.toLowerCase().includes(q);

      const matchesType = typeFilter === "all" || txn.type === typeFilter;
      const matchesStatus = statusFilter === "all" || txn.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, searchQuery, typeFilter, statusFilter]);

  const totalItems = filteredTransactions.length;

  const pagedTransactions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, page, pageSize]);
  useMemo(() => {
    setPage(1);
  }, [searchQuery, typeFilter, statusFilter]);

  const handleExport = () => {
    const csv = [
      ['Date', 'User ID', 'Type', 'Amount', 'VAT', 'Total', 'Status', 'Provider Ref'],
      ...filteredTransactions.map((t) => [
        new Date(t.createdAt).toISOString().split('T')[0],
        t.userId,
        t.type,
        t.amount,
        t.vat,
        t.total,
        t.status,
        t.providerRef,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n')

    const element = document.createElement('a')
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`)
    element.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    toast({
      title: 'Success',
      description: `Exported ${filteredTransactions.length} transactions`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transactions & Exports</h1>
        <p className="text-muted-foreground">View all transactions and export financial data</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCount}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((stats.completedCount / stats.totalTransactions) * 100)}% success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">VAT Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.vatCollected.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="transactions">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="vat">VAT Breakdown</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history with filters and export</CardDescription>
              <div className="mt-4 flex flex-wrap items-end gap-3">
                {/* Search */}
                <div className="w-full sm:flex-1 sm:min-w-[280px]">
                  <Input
                    placeholder="Search by user ID, transaction ID, or provider ref..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Type */}
                <div className="w-full sm:w-48">
                  <label className="mb-2 block text-sm font-medium">Type</label>
                  <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="topup">Top-up</SelectItem>
                      <SelectItem value="credit_purchase">Credit Purchase</SelectItem>
                      <SelectItem value="refund">Refund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Status */}
                <div className="w-full sm:w-48">
                  <label className="mb-2 block text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Export */}
                <div className="w-full sm:w-auto sm:ml-auto">
                  <Button onClick={handleExport} className="w-full sm:w-auto bg-secondary hover:bg-secondary/90">
                    <Download className="mr-2 h-4 w-4" />
                    Export CSV
                  </Button>
                </div>
              </div>

            </CardHeader>
            <CardContent className="space-y-4">
              {totalItems > 0 ? (
                <>
                  <TransactionsTable transactions={pagedTransactions} />

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
                <div className="text-center py-8 text-muted-foreground">
                  No transactions found
                </div>
              )}
            </CardContent>

          </Card>
        </TabsContent>

        <TabsContent value="vat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>VAT Breakdown</CardTitle>
              <CardDescription>Tax information for completed transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card className="bg-primary/20">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                    <p className="text-2xl font-bold">
                      ${(stats.totalRevenue - stats.vatCollected).toFixed(2)}
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-primary/20">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">VAT (20%)</p>
                    <p className="text-2xl font-bold">${stats.vatCollected.toFixed(2)}</p>
                  </CardContent>
                </Card>

                <Card className="bg-primary/20 md:col-span-2">
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold">${stats.totalRevenue.toFixed(2)}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> VAT is calculated at 20%. Ensure all VAT is properly
                  remitted to tax authorities according to your jurisdiction's requirements.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
