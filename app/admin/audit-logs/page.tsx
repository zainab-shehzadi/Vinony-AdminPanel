'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Download, Filter, Search } from 'lucide-react'
import { AuditLogTable } from '@/components/admin/audit-log-table'

export default function AuditLogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Exporting audit logs...')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Track all administrative actions and system events
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>Filter and search through administrative actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search logs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="action" className="text-sm">Action Type</Label>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger id="action">
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                  <SelectItem value="access">Access</SelectItem>
                  <SelectItem value="export">Export</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                variant="outline"
                className="w-full gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                {isExporting ? 'Exporting...' : 'Export CSV'}
              </Button>
            </div>
          </div>

          <AuditLogTable searchQuery={searchQuery} actionFilter={actionFilter} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Information</CardTitle>
          <CardDescription>GDPR and SOC 2 compliance details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg border dark:border-gray-700">
              <div className="font-medium mb-2">Data Retention</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Audit logs are retained for 90 days by default
              </div>
            </div>
            <div className="p-4 rounded-lg border dark:border-gray-700">
              <div className="font-medium mb-2">Access Logs</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                All admin access is logged with IP and timestamp
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
