'use client'

import { useState } from 'react'
import { Transaction } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'

interface RefundModalProps {
  transaction: Transaction
  open: boolean
  onOpenChange: (open: boolean) => void
  onRefund: (data: { reason: string; creditsToRefund: number }) => void
}

export function RefundModal({
  transaction,
  open,
  onOpenChange,
  onRefund,
}: RefundModalProps) {
  const [creditsToRefund, setCreditsToRefund] = useState(String(Math.floor(transaction.total)))
  const [reason, setReason] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const maxCredits = Math.floor(transaction.total)
  const creditsValue = Number(creditsToRefund) || 0
  const isValid = creditsValue > 0 && creditsValue <= maxCredits && reason.trim()

  const handleRefund = () => {
    if (!isValid) return
    setIsProcessing(true)
    setTimeout(() => {
      onRefund({
        reason,
        creditsToRefund: creditsValue,
      })
      setCreditsToRefund(String(maxCredits))
      setReason('')
      setIsProcessing(false)
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Initiate Refund</DialogTitle>
          <DialogDescription>
            Process a refund for this transaction. This creates a local record only—you
            must process the actual card refund in Stripe Dashboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Transaction Summary */}
          <Card className="bg-secondary/50">
            <CardContent className="pt-4">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID</span>
                  <code className="bg-background px-2 py-1 rounded text-xs">
                    {transaction.id}
                  </code>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">User</span>
                  <span className="font-medium">{transaction.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-medium">${transaction.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium capitalize">
                    {transaction.type.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Warning */}
          <Alert className="border-destructive/50 bg-destructive/10">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Ensure you process the actual card refund in Stripe Dashboard after approving
              this refund.
            </AlertDescription>
          </Alert>

          {/* Credits to Refund */}
          <div className="space-y-2">
            <Label htmlFor="creditsToRefund" className="font-medium">
              Credits to Refund <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="creditsToRefund"
                type="number"
                value={creditsToRefund}
                onChange={(e) => setCreditsToRefund(e.target.value)}
                min="1"
                max={maxCredits}
                className="pr-12"
              />
              <span className="absolute right-3 top-3 text-sm text-muted-foreground">
                of {maxCredits}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Maximum: {maxCredits} credits (cannot exceed transaction amount)
            </p>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason" className="font-medium">
              Reason <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="reason"
              placeholder="e.g., Customer requested refund due to service issue"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-24"
            />
            <p className="text-xs text-muted-foreground">
              This will be logged in the audit trail
            </p>
          </div>

          {/* Confirmation */}
          {creditsValue > 0 && reason.trim() && (
            <Card className="border border-primary bg-primary/5 p-3">
              <p className="text-sm">
                You are about to refund{' '}
                <span className="font-bold text-primary">{creditsValue} credits</span> to{' '}
                <span className="font-bold">{transaction.userId}</span>
              </p>
            </Card>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleRefund}
            disabled={!isValid || isProcessing}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isProcessing ? 'Processing...' : 'Confirm Refund'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
