"use client"

import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminHeader } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-dvh w-full bg-background overflow-hidden">
        <Sidebar />

        <div className="flex flex-1 flex-col min-w-0">
          <AdminHeader />

          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">{children}</div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
