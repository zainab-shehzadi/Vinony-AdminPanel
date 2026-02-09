'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { User } from '@/lib/types'
import { ChevronRight } from 'lucide-react'

interface UsersTableProps {
  users: User[]
  onUserSelect: (user: User) => void
}

export function UsersTable({ users, onUserSelect }: UsersTableProps) {
  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free':
        return 'outline'
      case 'pro':
        return 'default'
      case 'enterprise':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'suspended':
        return 'secondary'
      case 'banned':
        return 'destructive'
      case 'deleted':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return 'Never'
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
            <TableHead className="font-semibold text-foreground">Email</TableHead>
            <TableHead className="font-semibold text-foreground">Plan</TableHead>
            <TableHead className="font-semibold text-foreground">Status</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Credits</TableHead>
            <TableHead className="font-semibold text-foreground text-right">Monthly Spend</TableHead>
            <TableHead className="font-semibold text-foreground">Last Login</TableHead>
            <TableHead className="w-10"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow 
              key={user.id} 
              className="hover:bg-primary/10 cursor-pointer"
            >
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>
                <Badge variant={getPlanColor(user.plan)} className="capitalize">
                  {user.plan}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusColor(user.status)} className="capitalize">
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right text-sm">
                <span className="font-medium">{user.creditsBalance.toLocaleString()}</span>
              </TableCell>
              <TableCell className="text-right text-sm">
                <span>${user.monthlySpend.toFixed(2)}</span>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(user.lastLogin)}
              </TableCell>
              <TableCell>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    onUserSelect(user)
                  }}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
