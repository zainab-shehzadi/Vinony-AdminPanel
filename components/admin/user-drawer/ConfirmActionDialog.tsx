// src/components/admin/user-drawer/ConfirmActionDialog.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type AdminActionType = "ban" | "delete" | "reset";

type Props = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  action: AdminActionType | null;
  reason: string;
  setReason: (v: string) => void;
  onConfirm: () => void;
};

export function ConfirmActionDialog({
  open,
  onOpenChange,
  action,
  reason,
  setReason,
  onConfirm,
}: Props) {
  const [error, setError] = useState("");

  const canConfirm = useMemo(() => reason.trim().length > 0, [reason]);

  useEffect(() => {
    if (!open) setError("");
  }, [open]);

  const handleConfirm = () => {
    if (!canConfirm) {
      setError("Reason is required.");
      return;
    }
    setError("");
    onConfirm();
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Confirm {action ?? "this"} action
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action will be logged and cannot be undone. Please provide a reason.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2">
          <Textarea
            placeholder="Reason for this action..."
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              if (error && e.target.value.trim()) setError("");
            }}
            className={cn(
              "min-h-20",
              error && "border-destructive focus-visible:ring-destructive"
            )}
          />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            disabled={!canConfirm}
            onClick={handleConfirm}
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90",
              !canConfirm && "pointer-events-none opacity-50"
            )}
          >
            Confirm {action ?? ""}
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
