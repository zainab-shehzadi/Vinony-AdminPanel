'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Save, AlertCircle } from 'lucide-react'

interface FreeTierLimit {
  name: string
  value: number
  description: string
}

const defaultLimits: FreeTierLimit[] = [
  { name: 'requests_per_day', value: 100, description: 'API Requests Per Day' },
  { name: 'tokens_per_month', value: 5000, description: 'Tokens Per Month' },
  { name: 'files_per_upload', value: 5, description: 'Max Files Per Upload' },
  { name: 'storage_gb', value: 1, description: 'Storage Limit (GB)' },
]

export function FreeTierLimitsForm() {
  const [limits, setLimits] = useState<FreeTierLimit[]>(defaultLimits)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleLimitChange = (index: number, newValue: number) => {
    const updated = [...limits]
    updated[index].value = newValue
    setLimits(updated)
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: 'Success',
        description: 'Free tier limits updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update limits',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Free Tier Limits</CardTitle>
        <CardDescription>Configure the resource limits for free tier users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-yellow-800 dark:text-yellow-200">
            Reducing limits may impact existing free tier users. Changes take effect immediately.
          </div>
        </div>

        <div className="space-y-4">
          {limits.map((limit, index) => (
            <div key={limit.name} className="space-y-2">
              <Label htmlFor={limit.name} className="text-base">
                {limit.description}
              </Label>
              <Input
                id={limit.name}
                type="number"
                min="1"
                value={limit.value}
                onChange={(e) => handleLimitChange(index, parseInt(e.target.value) || 0)}
                className="max-w-xs"
              />
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : 'Save Limits'}
        </Button>
      </CardContent>
    </Card>
  )
}
