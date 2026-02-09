// src/components/admin/user-drawer/UserOverviewTab.tsx
"use client"

import { User } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Props = {
  user: User
  getPlanColor: (plan: string) => any
  getStatusColor: (status: string) => any
  formatDate: (date?: Date) => string
}

export function UserOverviewTab({
  user,
  getPlanColor,
  getStatusColor,
  formatDate,
}: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="bg-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Plan</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={getPlanColor(user.plan)} className="capitalize">
              {user.plan}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Status</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant={getStatusColor(user.status)} className="capitalize">
              {user.status}
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Credits Balance</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {user.creditsBalance.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Spend</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${user.monthlySpend.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      <div className="space-y-3">
        <h3 className="font-semibold">Account Information</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium">{formatDate(user.createdAt)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Last Login</p>
            <p className="font-medium">{formatDate(user.lastLogin)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
