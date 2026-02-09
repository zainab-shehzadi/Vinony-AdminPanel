'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/hooks/use-toast'
import { CreditLedgerTable } from '@/components/admin/credit-ledger-table'
import { AddCreditsForm } from '@/components/admin/add-credits-form'
import { CreditLedger } from '@/lib/types'
import { CreditCard, TrendingDown, TrendingUp } from 'lucide-react'

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
  const { toast } = useToast()
  const [ledger, setLedger] = useState<CreditLedger[]>(mockLedger)
  const [searchQuery, setSearchQuery] = useState('')

  const stats = {
    totalIssued: ledger.filter((l) => l.delta > 0).reduce((sum, l) => sum + l.delta, 0),
    totalSpent: Math.abs(ledger.filter((l) => l.delta < 0).reduce((sum, l) => sum + l.delta, 0)),
    totalRefunded: ledger.filter((l) => l.source === 'refund').reduce((sum, l) => sum + Math.abs(l.delta), 0),
  }

  const filteredLedger = ledger.filter(
    (item) =>
      item.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddCredits = (data: {
    userId: string
    amount: number
    reason: string
    referenceId?: string
  }) => {
    const newLedgerEntry: CreditLedger = {
      id: `ledger_${Date.now()}`,
      userId: data.userId,
      delta: data.amount,
      balanceAfter: data.amount, // Mock - would be calculated from user's current balance
      adminId: 'admin_001',
      timestamp: new Date(),
      reason: data.reason,
      source: 'manual',
      referenceId: data.referenceId,
    }

    setLedger([newLedgerEntry, ...ledger])
    toast({
      title: 'Success',
      description: `Added ${data.amount} credits to ${data.userId}`,
    })
  }

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
            <p className="text-xs text-muted-foreground">{Math.round((stats.totalSpent / stats.totalIssued) * 100)}% utilization</p>
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
              <CardDescription>
                Manual credit adjustments for users. All actions are logged.
              </CardDescription>
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
            <CardContent>
              {filteredLedger.length > 0 ? (
                <CreditLedgerTable ledger={filteredLedger} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No ledger entries found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

 
    </div>
  )
}
