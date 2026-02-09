// src/components/admin/user-drawer/UserDetailDrawer.tsx
"use client"

import { useState } from "react"
import { User } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent } from "@/components/ui/drawer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

import { UserDrawerHeader } from "./UserDrawerHeader"
import { UserOverviewTab } from "./UserOverviewTab"
import { UserGenerationsTab } from "./UserGenerationsTab"
import { UserAdminActionsTab } from "./UserAdminActionsTab"
import { ConfirmActionDialog, type AdminActionType } from "./ConfirmActionDialog"
import { mockGenerations } from "@/components/constants/mock"
import { ResetPasswordDialog } from "@/components/modals/ResetPasswordDialog"


interface UserDetailDrawerProps {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UserDetailDrawer({ user, open, onOpenChange }: UserDetailDrawerProps) {
  const { toast } = useToast()

  const [activeTab, setActiveTab] = useState("overview")

  const [action, setAction] = useState<AdminActionType | null>(null)
  const [actionReason, setActionReason] = useState("")
  const [confirmAction, setConfirmAction] = useState(false)

  const [resetOpen, setResetOpen] = useState(false)
  const [resetLoading, setResetLoading] = useState(false)

  const handleAction = (type: AdminActionType) => {
    setAction(type)
    setConfirmAction(true)
  }

  const confirmActionHandler = () => {
    if (!action || !actionReason.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for this action",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: `User ${action} action completed: ${actionReason}`,
    })

    setConfirmAction(false)
    setAction(null)
    setActionReason("")
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "free":
        return "outline"
      case "pro":
        return "default"
      case "enterprise":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "suspended":
        return "secondary"
      case "banned":
        return "destructive"
      case "deleted":
        return "outline"
      default:
        return "outline"
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return "Never"
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="px-10 max-h-[80vh]">
          <UserDrawerHeader email={user.email} id={user.id} />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-6">
              <TabsList className="grid w-full max-w-[450px] grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="generations">Generations</TabsTrigger>
                <TabsTrigger value="actions">Admin Actions</TabsTrigger>
              </TabsList>
            </div>

            <div className="px-6 pb-6">
              <TabsContent value="overview">
                <UserOverviewTab
                  user={user}
                  getPlanColor={getPlanColor}
                  getStatusColor={getStatusColor}
                  formatDate={formatDate}
                />
              </TabsContent>

              <TabsContent value="generations">
                <UserGenerationsTab generations={mockGenerations} />
              </TabsContent>

              <TabsContent value="actions">
                <UserAdminActionsTab
                  user={user}
                  onBan={() => handleAction("ban")}
                  onDelete={() => handleAction("delete")}
                  onOpenReset={() => setResetOpen(true)}
                />
              </TabsContent>
            </div>
          </Tabs>

          <DrawerClose className="mx-6 mb-6" asChild>
            <div className="flex justify-end">
              <Button variant="outline" className="w-auto bg-primary px-4 py-2 text-sm">
                Close
              </Button>
            </div>
          </DrawerClose>
        </DrawerContent>
      </Drawer>

      <ConfirmActionDialog
      
        open={confirmAction}
        onOpenChange={setConfirmAction}
        action={action}
        reason={actionReason}
        setReason={setActionReason}
        onConfirm={confirmActionHandler}
      />

      <ResetPasswordDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        userEmail={user.email}
        userId={user.id}
        loading={resetLoading}
        onSubmit={async ({ currentPassword, newPassword }) => {
          try {
            setResetLoading(true)

            toast({
              title: "Success",
              description: "Password updated successfully.",
            })
            setResetOpen(false)
          } catch (err: any) {
            toast({
              title: "Failed",
              description: err?.message || "Could not reset password.",
              variant: "destructive",
            })
          } finally {
            setResetLoading(false)
          }
        }}
      />
    </>
  )
}
