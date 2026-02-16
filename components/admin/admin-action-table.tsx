import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface AdminActionRow {
  id: string
  adminEmail: string
  action: string
  entityType: string
  entityId: string
  reason: string
  timestamp: Date
}

interface AdminActionTableProps {
  actions: AdminActionRow[]
}

export function AdminActionTable({ actions }: AdminActionTableProps) {
  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    return date.toLocaleDateString()
  }

  const getActionColor = (action: string) => {
    if (action.includes('Ban') || action.includes('Delete')) return 'destructive'
    if (action.includes('Add') || action.includes('Create')) return 'default'
    if (action.includes('Disable') || action.includes('Suspend')) return 'secondary'
    return 'outline'
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary text-white">
            <TableHead className="font-semibold">Action</TableHead>
            <TableHead className="font-semibold">Admin</TableHead>
            <TableHead className="font-semibold">Entity</TableHead>
            <TableHead className="font-semibold">Reason</TableHead>
            <TableHead className="font-semibold text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {actions.map((action) => (
            <TableRow key={action.id} className="hover:bg-primary/10">
              <TableCell>
                <Badge variant={getActionColor(action.action)}>
                  {action.action}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{action.adminEmail}</TableCell>
              <TableCell className="text-sm">
                <code className="rounded bg-secondary px-2 py-1 font-mono text-xs">
                  {action.entityType}: {action.entityId}
                </code>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                {action.reason}
              </TableCell>
              <TableCell className="text-right text-sm text-muted-foreground">
                {formatTime(action.timestamp)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
