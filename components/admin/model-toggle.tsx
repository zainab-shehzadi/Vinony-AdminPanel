'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { AlertCircle } from 'lucide-react'

interface ModelStatus {
  id: string
  name: string
  version: string
  status: 'enabled' | 'disabled' | 'maintenance'
  uptime: number
  lastUpdated: string
}

const models: ModelStatus[] = [
  {
    id: 'gpt4',
    name: 'GPT-4',
    version: '4.0',
    status: 'enabled',
    uptime: 99.9,
    lastUpdated: '2024-02-06',
  },
  {
    id: 'gpt35',
    name: 'GPT-3.5 Turbo',
    version: '3.5',
    status: 'enabled',
    uptime: 99.95,
    lastUpdated: '2024-02-06',
  },
  {
    id: 'claude',
    name: 'Claude 3',
    version: '3.0',
    status: 'enabled',
    uptime: 99.8,
    lastUpdated: '2024-02-05',
  },
]

export function ModelToggle() {
  const [modelStates, setModelStates] = useState<Record<string, boolean>>(
    models.reduce((acc, m) => ({ ...acc, [m.id]: m.status === 'enabled' }), {})
  )
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const handleToggle = (modelId: string) => {
    setModelStates(prev => ({
      ...prev,
      [modelId]: !prev[modelId],
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: 'Success',
        description: 'Model states updated successfully',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update models',
        variant: 'destructive',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Status Control</CardTitle>
        <CardDescription>Enable or disable AI models for user access</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950 p-4 flex gap-3">
          <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 dark:text-blue-200">
            Disabling a model will immediately prevent new requests. Active sessions will continue.
          </div>
        </div>

        <div className="space-y-4">
          {models.map(model => (
            <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700">
              <div className="flex-1">
                <div className="font-medium">{model.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  v{model.version} • {model.uptime}% uptime
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-500">
                  {modelStates[model.id] ? 'Enabled' : 'Disabled'}
                </div>
                <Switch
                  checked={modelStates[model.id]}
                  onCheckedChange={() => handleToggle(model.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </CardContent>
    </Card>
  )
}
