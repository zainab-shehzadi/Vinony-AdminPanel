"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UsersTable } from "@/components/admin/users-table";
import { User } from "@/lib/types";
import { UserDetailDrawer } from "@/components/admin/user-drawer/UserDetailDrawer";
import { Pagination } from "@/components/admin/Pagination";
import { Button } from "@/components/ui/button";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<"all" | "free" | "pro" | "enterprise">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "suspended" | "banned">("all");

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return mockUsers.filter((user) => {
      const matchesSearch =
        q.length === 0 ||
        user.email.toLowerCase().includes(q) ||
        user.id.toLowerCase().includes(q);

      const matchesPlan = planFilter === "all" || user.plan === planFilter;
      const matchesStatus = statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [searchQuery, planFilter, statusFilter]);
  const handleReset = () => {
    setSearchQuery("");
    setPlanFilter("all");
    setStatusFilter("all");
    setPage(1);
    setPageSize(10);
  };

  useEffect(() => {
    setPage(1);
  }, [searchQuery, planFilter, statusFilter]);

  const totalItems = filteredUsers.length;

  const pagedUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page, pageSize]);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsDrawerOpen(true);
  };

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
              <label className="mb-2 block text-sm font-medium">Search by email or ID</label>
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
              <label className="mb-2 block text-sm font-medium">Plan</label>
              <Select value={planFilter} onValueChange={(v) => setPlanFilter(v as any)}>
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
              <label className="mb-2 block text-sm font-medium">Status</label>
              <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
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
            <div className="w-full md:w-auto md:ml-auto">
              <Button
                type="button"
                variant="outline"
                className="w-full md:w-auto border border-border bg-primary text-white"
                onClick={handleReset}
                disabled={searchQuery === "" && planFilter === "all" && statusFilter === "all"}
              >
                Reset
              </Button>
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

        <CardContent className="space-y-4">
          {totalItems > 0 ? (
            <>
              <UsersTable users={pagedUsers} onUserSelect={handleUserSelect} />

              <Pagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setPage}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1);
                }}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </>
          ) : (
            <div className="py-8 text-center text-muted-foreground">
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
  );
}
