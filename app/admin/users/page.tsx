'use client'

import { useState, useCallback } from 'react'
import { Search} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { UsersTable } from '@/components/admin/users-table'
import { User } from '@/lib/types'
import { UserDetailDrawer } from '@/components/admin/user-drawer/UserDetailDrawer'

const mockUsers: User[] = [
  {
    id: 'user_001',
    email: 'john.doe@example.com',
    plan: 'pro',
    status: 'active',
    createdAt: new Date('2024-01-15'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2),
    creditsBalance: 5000,
    monthlySpend: 450,
  },
  {
    id: 'user_002',
    email: 'jane.smith@example.com',
    plan: 'free',
    status: 'active',
    createdAt: new Date('2024-02-20'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24),
    creditsBalance: 100,
    monthlySpend: 0,
  },
  {
    id: 'user_003',
    email: 'bob.wilson@example.com',
    plan: 'enterprise',
    status: 'active',
    createdAt: new Date('2023-12-01'),
    lastLogin: new Date(Date.now() - 1000 * 60 * 5),
    creditsBalance: 50000,
    monthlySpend: 5000,
  },
  {
    id: 'user_004',
    email: 'alice.johnson@example.com',
    plan: 'pro',
    status: 'suspended',
    createdAt: new Date('2024-01-10'),
    lastLogin: new Date('2024-02-15'),
    creditsBalance: 0,
    monthlySpend: 250,
  },
  {
    id: 'user_005',
    email: 'charlie.brown@example.com',
    plan: 'free',
    status: 'banned',
    createdAt: new Date('2023-11-20'),
    creditsBalance: 0,
    monthlySpend: 0,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [planFilter, setPlanFilter] = useState<'all' | 'free' | 'pro' | 'enterprise'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'banned'>('all')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const filteredUsers = useCallback(() => {
    return mockUsers.filter((user) => {
      const matchesSearch = user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPlan = planFilter === 'all' || user.plan === planFilter
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesPlan && matchesStatus
    })
  }, [searchQuery, planFilter, statusFilter])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setIsDrawerOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts, plan, and access</p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Search by email or ID</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="john@example.com or user_001"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Plan</label>
              <Select value={planFilter} onValueChange={(v: any) => setPlanFilter(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="pro">Pro</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-48">
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={(v: any) => setStatusFilter(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>


        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Accounts</CardTitle>
          <CardDescription>Click on a user to view details and take actions</CardDescription>
        </CardHeader>
        <CardContent>
          {filteredUsers().length > 0 ? (
            <UsersTable 
              users={filteredUsers()} 
              onUserSelect={handleUserSelect}
            />
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No users found matching your filters
            </div>
          )}
        </CardContent>
      </Card>

      {selectedUser && (
        <UserDetailDrawer
          user={selectedUser}
          open={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
        />

      )}
    </div>
  )
}
