'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface AddCreditsFormProps {
  onSubmit: (data: {
    userId: string
    amount: number
    reason: string
    referenceId?: string
  }) => void
}

export function AddCreditsForm({ onSubmit }: AddCreditsFormProps) {
  const [userId, setUserId] = useState('')
  const [amount, setAmount] = useState('')
  const [operation, setOperation] = useState<'add' | 'deduct'>('add')
  const [reason, setReason] = useState('')
  const [referenceId, setReferenceId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!userId || !amount || !reason) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const numAmount = Number(amount)
      onSubmit({
        userId,
        amount: operation === 'add' ? numAmount : -numAmount,
        reason,
        referenceId: referenceId || undefined,
      })

      setUserId('')
      setAmount('')
      setReason('')
      setReferenceId('')
      setOperation('add')
      setIsSubmitting(false)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <RadioGroup
          value={operation}
          onValueChange={(v) => setOperation(v as "add" | "deduct")}
          className="mx-auto grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2"
        >
          {/* Add */}
          <div className="relative">
            <RadioGroupItem value="add" id="op-add" className="peer sr-only" />

            <Label
              htmlFor="op-add"
              className="
          flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-4 transition
          hover:bg-muted/50
          peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
          focus-visible:outline-none
        "
            >
              <div className="min-w-0">
                <div className="font-semibold">Add Credits</div>
                <p className="text-sm text-muted-foreground">
                  Increase user's credit balance
                </p>
              </div>
            </Label>
          </div>

          {/* Deduct */}
          <div className="relative">
            <RadioGroupItem value="deduct" id="op-deduct" className="peer sr-only" />

            <Label
              htmlFor="op-deduct"
              className="
          flex cursor-pointer items-start justify-between gap-3 rounded-xl border p-4 transition
          hover:bg-muted/50
          peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
        "
            >
              <div className="min-w-0">
                <div className="font-semibold">Deduct Credits</div>
                <p className="text-sm text-muted-foreground">
                  Reduce user's credit balance
                </p>
              </div>


            </Label>
          </div>
        </RadioGroup>
      </div>
      {/* User ID */}
      <div className="space-y-2">
        <Label htmlFor="userId" className="text-base font-medium">
          User ID <span className="text-destructive">*</span>
        </Label>
        <Input
          id="userId"
          placeholder="user_001"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">
          The unique identifier of the user
        </p>
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="amount" className="text-base font-medium">
          Amount <span className="text-destructive">*</span>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-3 text-muted-foreground">
            {operation === 'add' ? '+' : '-'}
          </span>
          <Input
            id="amount"
            type="number"
            placeholder="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-8"
            min="1"
            required
          />
        </div>
        <p className="text-xs text-muted-foreground">
          The number of credits to {operation === 'add' ? 'add' : 'deduct'}
        </p>
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason" className="text-base font-medium">
          Reason <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="reason"
          placeholder="e.g., Compensation for service outage, Monthly top-up, etc."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="min-h-20"
          required
        />
        <p className="text-xs text-muted-foreground">
          This will be logged in the audit trail
        </p>
      </div>


      {/* Reference ID (Optional) */}
      <div className="space-y-2">
        <Label htmlFor="referenceId" className="text-base font-medium">
          Reference ID (Optional)
        </Label>
        <Input
          id="referenceId"
          placeholder="manual_comp_001 or refund_xyz"
          value={referenceId}
          onChange={(e) => setReferenceId(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Link this adjustment to a specific transaction or event
        </p>
      </div>


      {/* Summary Card */}
      <Card className="border border-border bg-secondary/20 p-4 space-y-2">
        <p className="text-sm font-medium">Summary</p>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-foreground text-base">User</p>
            <p className="font-medium truncate">{userId || '—'}</p>
          </div>
          <div>
            <p className="text-foreground text-base ">Change</p>
            <p className={`font-medium truncate ${operation === 'add' ? 'text-green-600' : 'text-red-600'}`}>
              {operation === 'add' ? '+' : '-'}{amount || '0'} credits
            </p>
          </div>
          <div>
            <p className="text-foreground text-base">Reason</p>
            <p className="font-medium truncate">{reason || '—'}</p>
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={isSubmitting || !userId || !amount || !reason}
      >
        {isSubmitting ? 'Processing...' : `${operation === 'add' ? 'Add' : 'Deduct'} Credits`}
      </Button>
    </form>
  )
}
