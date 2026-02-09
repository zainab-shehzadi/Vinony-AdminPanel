// src/components/admin/user-drawer/UserDrawerHeader.tsx
"use client"

import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"

export function UserDrawerHeader({ email, id }: { email: string; id: string }) {
  return (
    <DrawerHeader className="px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <DrawerTitle className="text-2xl truncate">{email}</DrawerTitle>
          <DrawerDescription className="truncate">ID: {id}</DrawerDescription>
        </div>
      </div>
    </DrawerHeader>
  )
}
