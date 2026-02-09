"use client";

import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import { ModelToggle } from "@/lib/types";

type Mode = "disable" | "enable";

interface ModelToggleDialogProps {
  open: boolean;
  mode: Mode | null;
  model: ModelToggle | null;
  onClose: () => void;
  onConfirm: (payload: { modelId: string; mode: Mode; reason?: string }) => void;
}

export function ModelToggleDialog({
  open,
  mode,
  model,
  onClose,
  onConfirm,
}: ModelToggleDialogProps) {
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (!open) setReason("");
  }, [open]);

  const isDisable = mode === "disable";
  const title = isDisable ? "Disable Model" : "Enable Model";

  const handleConfirm = () => {
    if (!model || !mode) return;
    onConfirm({
      modelId: model.id,
      mode,
      reason: isDisable ? reason.trim() : undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (!v ? onClose() : null)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {model ? `${model.name} (${model.provider})` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {isDisable ? (
            <div className="space-y-2">
              <Label htmlFor="reason" className="font-medium">
                Reason for Disabling <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="reason"
                placeholder="e.g., Scheduled maintenance, High error rate detected, Provider outage"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-20"
              />
              <p className="text-xs text-muted-foreground">
                This reason will be shown to users
              </p>
            </div>
          ) : (
            <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Re-enabling <span className="font-medium">{model?.name}</span> will make it
                available to users again.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant={isDisable ? "destructive" : "default"}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
