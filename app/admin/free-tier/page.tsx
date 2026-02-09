'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Lock, AlertCircle, Save } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

const availableModels = [
  'gpt-3.5-turbo',
  'gpt-4',
  'dall-e-3',
  'claude-3-haiku',
  'claude-3-sonnet',
  'llama-2',
]

export default function FreeTierPage() {
  const { toast } = useToast()
  const [freeCreditsEnabled, setFreeCreditsEnabled] = useState(true)
  const [freeCreditsAmount, setFreeCreditsAmount] = useState('100')
  const [selectedModels, setSelectedModels] = useState([
    'gpt-3.5-turbo',
    'claude-3-haiku',
    'llama-2',
  ])
  const [rateLimitPerMin, setRateLimitPerMin] = useState('10')
  const [generationsPerDay, setGenerationsPerDay] = useState('50')
  const [watermarkEnforced, setWatermarkEnforced] = useState(false)
  const [selectedWatermarkTypes, setSelectedWatermarkTypes] = useState<string[]>(['image'])
  const [isSaving, setIsSaving] = useState(false)

  const watermarkTypes = ['image', 'video', 'document']

  const toggleModel = (model: string) => {
    setSelectedModels((prev) =>
      prev.includes(model) ? prev.filter((m) => m !== model) : [...prev, model]
    )
  }

  const toggleWatermarkType = (type: string) => {
    setSelectedWatermarkTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      toast({
        title: 'Success',
        description: 'Free tier configuration saved',
      })
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Free Tier Controls</h1>
        <p className="text-muted-foreground">Configure free tier features and limits</p>
      </div>

      {/* Locked Banner */}
      <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950">
        <Lock className="h-4 w-4 text-amber-600 dark:text-amber-500" />
        <AlertDescription className="text-amber-800 dark:text-amber-200">
          This feature is locked. Access requires additional permissions from a super admin.
        </AlertDescription>
      </Alert>

      {/* Form - Disabled */}
      <div className="opacity-60 pointer-events-none">
        {/* Free Credits on Signup */}
        <Card>
          <CardHeader>
            <CardTitle>Free Credits on Signup</CardTitle>
            <CardDescription>
              Number of credits awarded to new users upon registration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-secondary/50">
              <div className="space-y-1">
                <Label className="text-base font-medium">Enable Free Credits</Label>
                <p className="text-sm text-muted-foreground">
                  Give new users free credits to try the platform
                </p>
              </div>
              <Switch checked={freeCreditsEnabled} onCheckedChange={setFreeCreditsEnabled} />
            </div>

            {freeCreditsEnabled && (
              <div className="space-y-2">
                <Label htmlFor="credits" className="font-medium">
                  Credits Amount
                </Label>
                <Input
                  id="credits"
                  type="number"
                  placeholder="100"
                  value={freeCreditsAmount}
                  onChange={(e) => setFreeCreditsAmount(e.target.value)}
                  min="0"
                />
                <p className="text-xs text-muted-foreground">
                  Each new user will receive this many credits
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Available Models */}
        <Card>
          <CardHeader>
            <CardTitle>Available Models for Free Users</CardTitle>
            <CardDescription>Select which AI models free tier users can access</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {availableModels.map((model) => (
                <div key={model} className="flex items-center space-x-3 p-3 border border-border rounded-lg">
                  <Checkbox
                    id={model}
                    checked={selectedModels.includes(model)}
                    onCheckedChange={() => toggleModel(model)}
                  />
                  <Label
                    htmlFor={model}
                    className="flex-1 cursor-pointer font-medium"
                  >
                    {model}
                  </Label>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {selectedModels.length} of {availableModels.length} models selected
            </p>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Rate Limits */}
        <Card>
          <CardHeader>
            <CardTitle>Rate Limits for Free Users</CardTitle>
            <CardDescription>Configure usage restrictions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="rate-limit" className="font-medium">
                Requests per Minute
              </Label>
              <Input
                id="rate-limit"
                type="number"
                placeholder="10"
                value={rateLimitPerMin}
                onChange={(e) => setRateLimitPerMin(e.target.value)}
                min="1"
              />
              <p className="text-xs text-muted-foreground">
                Maximum API requests per minute for free users
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="generations" className="font-medium">
                Generations per Day
              </Label>
              <Input
                id="generations"
                type="number"
                placeholder="50"
                value={generationsPerDay}
                onChange={(e) => setGenerationsPerDay(e.target.value)}
                min="1"
              />
              <p className="text-xs text-muted-foreground">
                Maximum generation requests per day
              </p>
            </div>
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Watermark */}
        <Card>
          <CardHeader>
            <CardTitle>Watermark Enforcement</CardTitle>
            <CardDescription>
              Add watermarks to content generated by free tier users
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-secondary/50">
              <div className="space-y-1">
                <Label className="text-base font-medium">Enforce Watermarks</Label>
                <p className="text-sm text-muted-foreground">
                  Mark images and videos with a watermark
                </p>
              </div>
              <Switch checked={watermarkEnforced} onCheckedChange={setWatermarkEnforced} />
            </div>

            {watermarkEnforced && (
              <div className="space-y-3">
                <Label className="font-medium">Watermark Types</Label>
                {watermarkTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-3">
                    <Checkbox
                      id={`watermark-${type}`}
                      checked={selectedWatermarkTypes.includes(type)}
                      onCheckedChange={() => toggleWatermarkType(type)}
                    />
                    <Label
                      htmlFor={`watermark-${type}`}
                      className="cursor-pointer capitalize"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Separator className="my-6" />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={isSaving} size="lg">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      {/* Unlock Note */}
      <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <CardHeader>
          <CardTitle className="text-base">Unlock This Feature</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 dark:text-blue-200">
          <p>
            To manage free tier configurations, you need to request access from a super admin.
            Contact your system administrator with your admin ID to gain permission.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
