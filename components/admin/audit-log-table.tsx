'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface AuditLog {
  id: string
  timestamp: string
  admin: string
  action: string
  resource: string
  details: string
  ipAddress: string
  status: 'success' | 'failed'
}

const logs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-02-06 14:32:00',
    admin: 'john.admin@company.com',
    action: 'UPDATE',
    resource: 'User #1234',
    details: 'Upgraded user to premium tier',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
  {
    id: '2',
    timestamp: '2024-02-06 13:15:00',
    admin: 'sarah.admin@company.com',
    action: 'DELETE',
    resource: 'Transaction #5678',
    details: 'Deleted fraudulent transaction',
    ipAddress: '192.168.1.101',
    status: 'success',
  },
  {
    id: '3',
    timestamp: '2024-02-06 12:45:00',
    admin: 'mike.admin@company.com',
    action: 'EXPORT',
    resource: 'User Data',
    details: 'Exported user analytics report',
    ipAddress: '192.168.1.102',
    status: 'success',
  },
  {
    id: '4',
    timestamp: '2024-02-06 11:20:00',
    admin: 'john.admin@company.com',
    action: 'ACCESS',
    resource: 'User Dashboard',
    details: 'Accessed admin dashboard',
    ipAddress: '192.168.1.100',
    status: 'success',
  },
  {
    id: '5',
    timestamp: '2024-02-06 10:00:00',
    admin: 'unknown',
    action: 'UPDATE',
    resource: 'Settings',
    details: 'Failed authentication attempt',
    ipAddress: '203.0.113.45',
    status: 'failed',
  },
]

const actionColorMap: Record<string, string> = {
  CREATE: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  UPDATE: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  DELETE: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  ACCESS: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  EXPORT: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
}

interface AuditLogTableProps {
  searchQuery?: string
  actionFilter?: string
}

export function AuditLogTable({ searchQuery = '', actionFilter = 'all' }: AuditLogTableProps) {
  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.admin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase() === actionFilter.toLowerCase()
    
    return matchesSearch && matchesAction
  })

  return (
    <div className="border rounded-lg overflow-hidden dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700">
            <TableHead>Timestamp</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Resource</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.length > 0 ? (
            filteredLogs.map(log => (
              <TableRow key={log.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                <TableCell className="text-sm">{log.timestamp}</TableCell>
                <TableCell className="text-sm">{log.admin}</TableCell>
                <TableCell>
                  <Badge className={actionColorMap[log.action] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'}>
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm font-medium">{log.resource}</TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400">{log.details}</TableCell>
                <TableCell className="text-sm font-mono text-gray-600 dark:text-gray-400">{log.ipAddress}</TableCell>
                <TableCell>
                  <Badge variant={log.status === 'success' ? 'default' : 'destructive'}>
                    {log.status === 'success' ? '✓ Success' : '✕ Failed'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                No logs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
