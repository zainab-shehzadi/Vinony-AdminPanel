import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CreditLedger } from '@/lib/types'
import { TrendingUp, TrendingDown, Shuffle } from 'lucide-react'

interface CreditLedgerTableProps {
  ledger: CreditLedger[]
}

export function CreditLedgerTable({ ledger }: CreditLedgerTableProps) {
  const getSourceColor = (source: string) => {
    switch (source) {
      case 'manual':
        return 'secondary'
      case 'system':
        return 'outline'
      case 'refund':
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
            <TableHead className="font-semibold">User</TableHead>
            <TableHead className="font-semibold">Change</TableHead>
            <TableHead className="font-semibold text-right">Balance After</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Reason</TableHead>
            <TableHead className="font-semibold">Reference</TableHead>
            <TableHead className="font-semibold text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ledger.map((entry) => (
            <TableRow key={entry.id} className="hover:bg-primary/10">
              <TableCell className="font-medium">
                <code className="text-xs bg-secondary px-2 py-1 rounded">
                  {entry.userId}
                </code>
              </TableCell>
              <TableCell>
                <div className={`flex items-center gap-1 font-medium ${entry.delta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {entry.delta > 0 ? (
                    <>
                      <TrendingUp className="h-4 w-4" />
                      +{entry.delta.toLocaleString()}
                    </>
                  ) : (
                    <>
                      <TrendingDown className="h-4 w-4" />
                      {entry.delta.toLocaleString()}
                    </>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {entry.balanceAfter.toLocaleString()}
              </TableCell>
              <TableCell>
                <Badge variant={getSourceColor(entry.source)} className="capitalize">
                  {entry.source}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {entry.reason}
              </TableCell>
              <TableCell className="text-xs">
                {entry.referenceId ? (
                  <code className="bg-secondary px-2 py-1 rounded">
                    {entry.referenceId}
                  </code>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {formatDate(entry.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
