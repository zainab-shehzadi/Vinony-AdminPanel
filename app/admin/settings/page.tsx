'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Trash2, Plus, Key, Settings, Users } from 'lucide-react'

interface Admin {
  id: string
  email: string
  role: 'admin' | 'super_admin'
  createdAt: Date
  lastActive: Date
}

const mockAdmins: Admin[] = [
  {
    id: 'admin_001',
    email: 'john.admin@example.com',
    role: 'super_admin',
    createdAt: new Date('2023-01-01'),
    lastActive: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 'admin_002',
    email: 'jane.admin@example.com',
    role: 'admin',
    createdAt: new Date('2023-06-15'),
    lastActive: new Date(Date.now() - 1000 * 60 * 30),
  },
]

export default function SettingsPage() {
  const { toast } = useToast()
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [adminToDelete, setAdminToDelete] = useState<Admin | null>(null)
  const [minPasswordLength, setMinPasswordLength] = useState('8')
  const [passwordExpiryDays, setPasswordExpiryDays] = useState('90')
  const [requireMFA, setRequireMFA] = useState(true)
  const [enforcePasswordHistory, setEnforcePasswordHistory] = useState(true)

  const handleAddAdmin = () => {
    if (!newAdminEmail || !newAdminEmail.includes('@')) {
      toast({
        title: 'Invalid Email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      })
      return
    }

    if (admins.some((a) => a.email === newAdminEmail)) {
      toast({
        title: 'Already Exists',
        description: 'This email is already an admin',
        variant: 'destructive',
      })
      return
    }

    const newAdmin: Admin = {
      id: `admin_${Date.now()}`,
      email: newAdminEmail,
      role: 'admin',
      createdAt: new Date(),
      lastActive: new Date(),
    }

    setAdmins([...admins, newAdmin])
    setNewAdminEmail('')
    toast({
      title: 'Success',
      description: `Admin added: ${newAdminEmail}`,
    })
  }

  const handleDeleteAdmin = () => {
    if (!adminToDelete) return

    if (admins.filter((a) => a.role === 'super_admin').length === 1 && adminToDelete.role === 'super_admin') {
      toast({
        title: 'Cannot Delete',
        description: 'You must have at least one super admin',
        variant: 'destructive',
      })
      setAdminToDelete(null)
      return
    }

    setAdmins(admins.filter((a) => a.id !== adminToDelete.id))
    toast({
      title: 'Admin Removed',
      description: `${adminToDelete.email} has been removed`,
    })
    setAdminToDelete(null)
  }

  const handleSavePasswordPolicy = () => {
    toast({
      title: 'Success',
      description: 'Password policy updated',
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Settings</h1>
        <p className="text-muted-foreground">Manage admin access and system policies</p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="admins" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Admin Users
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            Password Policy
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Audit Log
          </TabsTrigger>
        </TabsList>

        {/* Admin Users Tab */}
        <TabsContent value="admins" className="space-y-4">
          {/* Add Admin */}
          <Card>
            <CardHeader>
              <CardTitle>Add Admin User</CardTitle>
              <CardDescription>Grant admin access to team members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-medium">
                  Email Address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                  />
                  <Button onClick={handleAddAdmin} className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  New admins will be assigned as regular admins. Super admin role requires manual change.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Admin List */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Accounts</CardTitle>
              <CardDescription>Current admin users and their roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary hover:bg-secondary">
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Role</TableHead>
                      <TableHead className="font-semibold">Created</TableHead>
                      <TableHead className="font-semibold">Last Active</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {admins.map((admin) => (
                      <TableRow key={admin.id} className="hover:bg-secondary/50">
                        <TableCell className="font-medium">{admin.email}</TableCell>
                        <TableCell>
                          <Badge
                            variant={admin.role === 'super_admin' ? 'default' : 'secondary'}
                            className="capitalize"
                          >
                            {admin.role.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {admin.createdAt.toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {Math.floor(
                            (Date.now() - admin.lastActive.getTime()) / (1000 * 60)
                          )}{' '}
                          min ago
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setAdminToDelete(admin)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Policy Tab */}
        <TabsContent value="password" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password Policy</CardTitle>
              <CardDescription>Configure password requirements for admin accounts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Minimum Length */}
              <div className="space-y-2">
                <Label htmlFor="minLength" className="font-medium">
                  Minimum Password Length
                </Label>
                <Input
                  id="minLength"
                  type="number"
                  value={minPasswordLength}
                  onChange={(e) => setMinPasswordLength(e.target.value)}
                  min="6"
                  max="32"
                />
                <p className="text-xs text-muted-foreground">
                  Minimum number of characters required
                </p>
              </div>

              {/* Password Expiry */}
              <div className="space-y-2">
                <Label htmlFor="expiry" className="font-medium">
                  Password Expiry (Days)
                </Label>
                <Input
                  id="expiry"
                  type="number"
                  value={passwordExpiryDays}
                  onChange={(e) => setPasswordExpiryDays(e.target.value)}
                  min="0"
                  max="365"
                />
                <p className="text-xs text-muted-foreground">
                  Set to 0 to disable expiry
                </p>
              </div>

              <Separator />

              {/* MFA */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Require Multi-Factor Auth</Label>
                  <p className="text-sm text-muted-foreground">
                    All admins must set up 2FA
                  </p>
                </div>
                <Switch checked={requireMFA} onCheckedChange={setRequireMFA} />
              </div>

              {/* Password History */}
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Enforce Password History</Label>
                  <p className="text-sm text-muted-foreground">
                    Prevent reusing recent passwords
                  </p>
                </div>
                <Switch
                  checked={enforcePasswordHistory}
                  onCheckedChange={setEnforcePasswordHistory}
                />
              </div>

              <Separator />

              {/* Save Button */}
              <Button onClick={handleSavePasswordPolicy} className="w-full">
                Save Policy
              </Button>
            </CardContent>
          </Card>

          {/* Policy Preview */}
          <Card className="bg-secondary/50">
            <CardHeader>
              <CardTitle className="text-base">Current Policy Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                <strong>Minimum Length:</strong> {minPasswordLength} characters
              </p>
              <p>
                <strong>Expiry:</strong> {passwordExpiryDays === '0' ? 'Never' : `${passwordExpiryDays} days`}
              </p>
              <p>
                <strong>2FA Required:</strong> {requireMFA ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Password History:</strong> {enforcePasswordHistory ? 'Enforced' : 'Disabled'}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Admin Action Audit Log</CardTitle>
              <CardDescription>All administrative actions are logged for security</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Audit logs are maintained separately and cannot be viewed from this interface. Access audit logs through your security team or contact support.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!adminToDelete} onOpenChange={(open) => !open && setAdminToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Admin User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove {adminToDelete?.email} as an admin? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteAdmin}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Remove Admin
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
