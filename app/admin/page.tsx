'use client'

import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, TrendingUp, DollarSign, RefreshCw, Activity } from 'lucide-react'
import { AdminActionTable } from '@/components/admin/admin-action-table'
import { Button } from '@/components/ui/button'
import Link from "next/link";
import { dashboardData, RecentTransaction } from '@/components/constants/mock'

const CHART_COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

function statusBadge(status: RecentTransaction["status"]) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
  if (status === "succeeded") return <span className={`${base} bg-emerald-500/15 text-emerald-700 dark:text-emerald-300`}>Succeeded</span>
  if (status === "past_due") return <span className={`${base} bg-amber-500/15 text-amber-700 dark:text-amber-300`}>Past due</span>
  return <span className={`${base} bg-red-500/15 text-red-700 dark:text-red-300`}>Failed</span>
}
export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your system overview.</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All registered users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users (7d)</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeUsers7d.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{Math.round((dashboardData.activeUsers7d / dashboardData.totalUsers) * 100)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (30d)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${dashboardData.revenue30d.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refunds (30d)</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.refundCount30d}</div>
            <p className="text-xs text-muted-foreground">Pending and completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Credits Overview */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Credits Issued</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardData.totalCreditsIssued / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Credits Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardData.totalCreditsSpent / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">{Math.round((dashboardData.totalCreditsSpent / dashboardData.totalCreditsIssued) * 100)}% utilization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credits Refunded</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(dashboardData.creditsRefunded / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Returned to users</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Users Trend (7 days)</CardTitle>
            <CardDescription>Daily active users</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={dashboardData.usersPerDay}
                margin={{ top: 10, right: 12, left: 0, bottom: 28 }} // ✅ adds space below
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  height={30}
                  tickMargin={30}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />
                <Line type="monotone" dataKey="users" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>

        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Credits Flow (Last 5 Weeks)</CardTitle>
            <CardDescription>Issued, spent, and refunded credits</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart
                data={dashboardData.creditsFlow}
                margin={{ top: 8, right: 12, left: 0, bottom: 30 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <Legend
                  verticalAlign="top"
                  align="right"
                  height={28}
                  wrapperStyle={{ paddingBottom: 8 }}
                />

                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  height={32}
                  tickMargin={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px",
                  }}
                />

                <Bar dataKey="issued" fill={CHART_COLORS[0]} name="Issued" radius={[8, 8, 0, 0]} />
                <Bar dataKey="spent" fill={CHART_COLORS[1]} name="Spent" radius={[8, 8, 0, 0]} />
                <Bar dataKey="refunded" fill={CHART_COLORS[3]} name="Refunded" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>


        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="min-w-0">
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest payments and top-ups</CardDescription>
            </div>

            <Button asChild size="sm" variant="outline" className="shrink-0 bg-primary text-white">
              <Link href="/admin/transactions">View All</Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {dashboardData.recentTransactions.map((t) => (
              <div
                key={t.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{t.userEmail}</span>
                    {statusBadge(t.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.type === "subscription" ? "Subscription" : "Top-up"} • {t.createdAt}
                  </p>
                </div>
                <div className="text-sm font-semibold">${t.amount.toFixed(2)}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Low Credits */}
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="min-w-0">
              <CardTitle>Low Credit Users</CardTitle>
              <CardDescription>Users that may need a top-up</CardDescription>
            </div>

            <Button asChild size="sm" variant="outline" className="shrink-0 bg-primary text-white">
              <Link href="/admin/credits?filter=low">View All</Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-3">
            {dashboardData.lowCreditUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-border p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{u.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Remaining: {u.creditsRemaining} credits
                  </p>
                </div>

                <Button asChild size="sm" variant="outline">
                  <Link href="/admin/credits">Add Credits</Link>
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    

      {/* Recent Admin Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Admin Actions</CardTitle>
          <CardDescription>Latest administrative changes</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminActionTable actions={dashboardData.recentActions} />
        </CardContent>
      </Card>
    </div>
  )
}
