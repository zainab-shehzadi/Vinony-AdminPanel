// src/components/admin/user-drawer/UserAdminActionsTab.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Ban, RotateCcw, Trash2 } from "lucide-react"
import { User } from "@/lib/types"

type Props = {
  user: User
  onBan: () => void
  onDelete: () => void
  onOpenReset: () => void
}

export function UserAdminActionsTab({ user, onBan, onDelete, onOpenReset }: Props) {
  return (
    <div className="space-y-6">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="rounded-xl border border-amber-200/70 bg-amber-50 p-4 text-amber-900 dark:border-amber-800/70 dark:bg-amber-950/50 dark:text-amber-100">
          <p className="text-sm leading-relaxed">
            All actions require a reason and are logged for audit purposes.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-1">
          <Button
            onClick={onBan}
            variant="outline"
            disabled={user.status === "banned"}
            className="h-auto justify-start rounded-xl px-4 py-4 text-left hover:bg-muted/50 hover:text-foreground"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <Ban className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {user.status === "banned" ? "User Already Banned" : "Ban User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  Block login and restrict platform access.
                </span>
              </div>
            </div>
          </Button>

          {/* <Button
            onClick={onOpenReset}
            variant="outline"
            disabled={user.status === "banned" || user.status === "deleted"}
            className="h-auto justify-start rounded-xl px-4 py-4 text-left hover:bg-muted/50  hover:text-foreground"
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                <RotateCcw className="h-4 w-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Reset Password</span>
                <span className="text-xs text-muted-foreground">
                  Force password reset for the user.
                </span>
              </div>
            </div>
          </Button> */}
        </div>

        <Button
          onClick={onDelete}
          variant="destructive"
          disabled={user.status === "deleted"}
          className="h-auto w-full justify-start rounded-xl px-4 py-4 text-left"
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/15">
              <Trash2 className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {user.status === "deleted" ? "User Already Deleted" : "Delete User"}
              </span>
              <span className="text-xs text-destructive-foreground/80">
                Remove user account and data access.
              </span>
            </div>
          </div>
        </Button>
      </div>
    </div>
  )
}
