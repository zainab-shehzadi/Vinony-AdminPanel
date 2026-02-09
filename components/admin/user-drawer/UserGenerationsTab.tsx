// src/components/admin/user-drawer/UserGenerationsTab.tsx
"use client"

import { Generation } from "@/components/constants/mock"
import { Card, CardContent } from "@/components/ui/card"

export function UserGenerationsTab({ generations }: { generations: Generation[] }) {
  return (
    <div className="space-y-3">
      {generations.map((gen) => (
        <Card key={gen.id} className="hover:bg-primary/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium capitalize">{gen.type}</p>
                <p className="text-sm text-muted-foreground">{gen.model}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{gen.cost} credits</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(gen.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
