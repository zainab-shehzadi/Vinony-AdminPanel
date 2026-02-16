'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { RefundTransactionTable } from '@/components/admin/refund-transaction-table'
import { RefundModal } from '@/components/admin/refund-modal'
import { Transaction } from '@/lib/types'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import { mockTransactions } from '@/components/constants/mock'
import { Pagination } from '@/components/admin/Pagination'



export default function RefundsPage() {
  const { toast } = useToast()
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)

  const stats = {
    totalTransactions: transactions.length,
    completedTransactions: transactions.filter((t) => t.status === 'completed').length,
    totalValue: transactions.reduce((sum, t) => sum + t.total, 0),
  }
  const [page, setPage] = useState(1); // 1-based
  const [pageSize, setPageSize] = useState(10);

  const filteredTransactions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return transactions;

    return transactions.filter((txn) => {
      return (
        txn.userId.toLowerCase().includes(q) ||
        txn.id.toLowerCase().includes(q) ||
        txn.providerRef.toLowerCase().includes(q)
      );
    });
  }, [transactions, searchQuery]);

  // reset to first page when search changes
  useMemo(() => {
    setPage(1);
  }, [searchQuery]);

  const totalItems = filteredTransactions.length;

  const pagedTransactions = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, page, pageSize]);


  const handleRefundClick = (transaction: Transaction) => {
    if (transaction.status !== 'completed') {
      toast({
        title: 'Cannot Refund',
        description: 'Only completed transactions can be refunded',
        variant: 'destructive',
      })
      return
    }
    setSelectedTransaction(transaction)
    setIsRefundModalOpen(true)
  }

  const handleRefund = (data: { reason: string; creditsToRefund: number }) => {
    if (!selectedTransaction) return

    // NOTE: keeping status same (you can add `refunded` status later if your type supports it)
    toast({
      title: 'Refund Initiated',
      description: `Refund of ${data.creditsToRefund} credits initiated for ${selectedTransaction.userId}. Reason: ${data.reason}`,
    })

    setIsRefundModalOpen(false)
    setSelectedTransaction(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Refunds</h1>
        <p className="text-muted-foreground">Manage refunds and view transaction history</p>
      </div>

      {/* Important Note */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          <strong>Important:</strong> Refunds are processed only in the Stripe Dashboard. This page
          lets you initiate refunds locally and track them. Actual card refunds must be processed
          through Stripe.
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <div className="text-2xl font-bold">{stats.completedTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalTransactions > 0
                ? Math.round((stats.completedTransactions / stats.totalTransactions) * 100)
                : 0}
              % success rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalValue.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className='flex flex-col gap-1.5'>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                View all transactions. Click on a completed transaction to initiate a refund.
              </CardDescription>
            </div>

            <Input
              placeholder="Search by user ID, transaction ID, or provider ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:max-w-sm"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {totalItems > 0 ? (
            <>
              <RefundTransactionTable
                transactions={pagedTransactions}
                onRefundClick={handleRefundClick}
              />

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
            <div className="py-8 text-center text-muted-foreground">No transactions found</div>
          )}
        </CardContent>

      </Card>

      {selectedTransaction && (
        <RefundModal
          transaction={selectedTransaction}
          open={isRefundModalOpen}
          onOpenChange={setIsRefundModalOpen}
          onRefund={handleRefund}
        />
      )}
    </div>
  )
}
