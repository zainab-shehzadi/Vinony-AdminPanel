// src/components/admin/user-drawer/ConfirmActionDialog.tsx
"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"

export type AdminActionType = "ban" | "delete" | "reset"

type Props = {
  open: boolean
  onOpenChange: (v: boolean) => void
  action: AdminActionType | null
  reason: string
  setReason: (v: string) => void
  onConfirm: () => void
}

export function ConfirmActionDialog({
  open,
  onOpenChange,
  action,
  reason,
  setReason,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Confirm {action} Action
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will be logged and cannot be undone. Please provide a reason.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Textarea
          placeholder="Reason for this action..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-20"
        />

        <AlertDialogAction
          onClick={onConfirm}
          className="bg-primary text-destructive-foreground hover:bg-primary/40"
        >
          Confirm {action}
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
