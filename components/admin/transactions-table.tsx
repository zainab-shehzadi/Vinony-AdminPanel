import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Transaction } from '@/lib/types'

interface TransactionsTableProps {
  transactions: Transaction[]
}

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'subscription':
        return 'default'
      case 'topup':
        return 'secondary'
      case 'credit_purchase':
        return 'outline'
      case 'refund':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'default'
      case 'pending':
        return 'secondary'
      case 'failed':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="font-semibold">Date</TableHead>
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Type</TableHead>
            <TableHead className="font-semibold text-right">Amount</TableHead>
            <TableHead className="font-semibold text-right">VAT</TableHead>
            <TableHead className="font-semibold text-right">Total</TableHead>
            <TableHead className="font-semibold">Currency</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Provider Ref</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((txn) => (
            <TableRow key={txn.id} className="hover:bg-primary/10">
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(txn.createdAt)}
              </TableCell>
              <TableCell className="font-medium">
                <code className="text-xs bg-secondary px-2 py-1 rounded">
                  {txn.userId}
                </code>
              </TableCell>
              <TableCell>
                <Badge variant={getTypeColor(txn.type)} className="capitalize">
                  {txn.type.replace('_', ' ')}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${txn.amount.toFixed(2)}</TableCell>
              <TableCell className="text-right text-muted-foreground">
                ${txn.vat.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-medium">
                ${txn.total.toFixed(2)}
              </TableCell>
              <TableCell>{txn.currency}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(txn.status)} className="capitalize">
                  {txn.status}
                </Badge>
              </TableCell>
              <TableCell>
                <code className="text-xs bg-secondary px-2 py-1 rounded">
                  {txn.providerRef}
                </code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
