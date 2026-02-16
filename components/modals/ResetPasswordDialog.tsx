"use client"

import { useMemo, useState } from "react"
import { Eye, EyeOff } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type ResetPasswordValues = {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  userEmail?: string
  userId?: string
  onSubmit: (values: ResetPasswordValues) => Promise<void> | void
  loading?: boolean
  minPasswordLength?: number
}

export function ResetPasswordDialog({
  open,
  onOpenChange,
  userEmail,
  userId,
  onSubmit,
  loading = false,
  minPasswordLength = 8,
}: Props) {
  const [values, setValues] = useState<ResetPasswordValues>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [show, setShow] = useState({
    current: false,
    next: false,
    confirm: false,
  })

  const error = useMemo(() => {
    const cur = values.currentPassword.trim()
    const next = values.newPassword.trim()
    const conf = values.confirmPassword.trim()

    if (!cur || !next || !conf) return "All password fields are required."
    if (next.length < minPasswordLength)
      return `New password must be at least ${minPasswordLength} characters.`
    if (next !== conf) return "New password and confirm password do not match."
    return ""
  }, [values, minPasswordLength])

  const resetLocal = () => {
    setValues({ currentPassword: "", newPassword: "", confirmPassword: "" })
    setShow({ current: false, next: false, confirm: false })
  }

  const handleOpenChange = (v: boolean) => {
    if (!v) resetLocal()
    onOpenChange(v)
  }

  const handleSubmit = async () => {
    if (error) return
    await onSubmit({
      currentPassword: values.currentPassword.trim(),
      newPassword: values.newPassword.trim(),
      confirmPassword: values.confirmPassword.trim(),
    })
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Update the user password. This action should be audited.
            {(userEmail || userId) && (
              <span className="mt-1 block text-xs text-muted-foreground">
                {userEmail ? `User: ${userEmail}` : ""}{" "}
                {userId ? `• ID: ${userId}` : ""}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Current Password */}
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={show.current ? "text" : "password"}
                value={values.currentPassword}
                onChange={(e) =>
                  setValues((p) => ({ ...p, currentPassword: e.target.value }))
                }
                placeholder="Enter current password"
                autoComplete="current-password"
                disabled={loading}
                className="pr-12" // ✅ prevent overlap with eye icon
              />
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, current: !p.current }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/60"
                aria-label={show.current ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {show.current ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={show.next ? "text" : "password"}
                value={values.newPassword}
                onChange={(e) =>
                  setValues((p) => ({ ...p, newPassword: e.target.value }))
                }
                placeholder={`Enter new password (min ${minPasswordLength})`}
                autoComplete="new-password"
                disabled={loading}
                className="pr-12" // ✅ prevent overlap with eye icon
              />
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, next: !p.next }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/60"
                aria-label={show.next ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {show.next ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={show.confirm ? "text" : "password"}
                value={values.confirmPassword}
                onChange={(e) =>
                  setValues((p) => ({ ...p, confirmPassword: e.target.value }))
                }
                placeholder="Re-enter new password"
                autoComplete="new-password"
                disabled={loading}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShow((p) => ({ ...p, confirm: !p.confirm }))}
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted/60"
                aria-label={show.confirm ? "Hide password" : "Show password"}
                disabled={loading}
              >
                {show.confirm ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error ? (
            <p className="text-sm text-destructive">{error}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Password must be strong and follow your policy.
            </p>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !!error}
              className="bg-primary"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
