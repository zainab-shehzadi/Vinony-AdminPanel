"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Lock,
  Zap,
  Settings,
  LogOut,
  Shield,
  FileText,
} from "lucide-react"

import {
  Sidebar as UISidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { LogoutDialog } from "../modals/LogoutDialog"

const mainItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Credits", href: "/admin/credits", icon: CreditCard },
  { title: "Refunds", href: "/admin/refunds", icon: RefreshCw },
  { title: "Transactions", href: "/admin/transactions", icon: TrendingUp },
]

const secondaryItems = [
  { title: "Free Tier Controls", href: "/admin/free-tier", icon: Lock, locked: true },
  { title: "Model Health & Toggles", href: "/admin/models", icon: Zap },
  { title: "Privacy Policy", href: "/admin/privacy-policy", icon: Shield },
  { title: "Terms & Conditions", href: "/admin/terms-condition", icon: FileText },

  // { title: "Admin Settings", href: "/admin/settings", icon: Settings },
]

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin"
  return pathname === href || pathname.startsWith(href + "/")
}

export function Sidebar() {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()
  const closeMobile = () => setOpenMobile(false)

  const menuBtnClass = (active: boolean) =>
    cn(
      // base
      "relative w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
      !active &&
      "text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent/70",
      active &&
      cn(
        "bg-primary text-foreground shadow-sm",
        "ring-2 ring-primary/35",
        "font-semibold",
        "hover:bg-primary/90"
      ),
      active &&
      "before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[4px] before:rounded-r-full "
    )

  const iconClass = (active: boolean) =>
    cn(
      "h-4 w-4 transition-colors",
      active ? "text-foreground" : "text-sidebar-foreground/70"
    )
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)

    try {
      // TODO: clear auth here if needed
      // localStorage.removeItem("admin_token")
      // await fetch("/api/auth/logout", { method: "POST" })

      router.push("/login")
    } finally {
      setLoggingOut(false)
      setLogoutOpen(false)
      closeMobile()
    }
  }

  return (
    <UISidebar collapsible="offcanvas" className="border-r border-border/50">
      <SidebarContent className="bg-background text-sidebar-foreground h-dvh overflow-y-auto">
        {/* Brand */}
        <div className=" p-10  flex items-center justify-center">
          <Link
            href="/admin"
            className="flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
            aria-label="Go to Admin Dashboard"
          >
            <Image
              src="/logo.png"
              alt="Nexus Admin Logo"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wide text-foreground">
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {mainItems.map((item) => {
                const active = isActivePath(pathname, item.href)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active} className={menuBtnClass(active)}>
                      <Link href={item.href} onClick={closeMobile}>
                        <item.icon className={iconClass(active)} />
                        <span className={cn(active ? "text-foreground" : "")}>
                          {item.title}
                        </span>

                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold tracking-wide text-foreground">
            Configuration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1 pb-4">
              {secondaryItems.map((item) => {
                const active = isActivePath(pathname, item.href)

                if (item.locked) {
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        disabled
                        className="w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-sm opacity-60"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                        <span className="flex w-full items-center gap-2">
                          {item.title}
                          <span className="ml-auto text-[11px] text-muted-foreground">Locked</span>
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                }

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active} className={menuBtnClass(active)}>
                      <Link href={item.href} onClick={closeMobile}>
                        <item.icon className={iconClass(active)} />
                        <span className={cn(active ? "text-foreground" : "")}>
                          {item.title}
                        </span>

                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>

            <div className="border-t border-border/50 ">
              <button
                onClick={() => setLogoutOpen(true)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition hover:bg-sidebar-accent/70"
              >
                <LogOut className="h-4 w-4 text-sidebar-foreground/70" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        loading={loggingOut}
        onConfirm={handleLogout}
      />

    </UISidebar>
  )
}
