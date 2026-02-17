"use client";

import { Moon, Sun, Monitor, LogOut, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LogoutDialog } from "../modals/LogoutDialog";

export function AdminHeader() {
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const currentTheme = resolvedTheme ?? theme;

  const ThemeIcon =
    theme === "system" ? Monitor : currentTheme === "dark" ? Moon : Sun;

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      router.push("/login");
    } finally {
      setLoggingOut(false);
      setLogoutOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <SidebarTrigger />
            <div className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">
                Admin Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center ">
            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-9 rounded-xl px-2 sm:px-3 hover:bg-accen flex items-center gap-2"
                >
                  <div className="h-8 w-8 rounded-full bg-primary/15 ring-1 ring-primary/25 flex items-center justify-center">
                    <span className="text-xs font-semibold text-primary">
                      AU
                    </span>
                  </div>

                  <div className="hidden sm:flex flex-col items-start leading-tight">
                    <span className="text-sm font-semibold text-foreground">
                      Admin
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      admin@vinony.com
                    </span>
                  </div>

                  <ChevronDown className="hidden sm:block h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-semibold text-foreground">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    admin@vinony.com
                  </p>
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  className="text-destructive font-bold focus:text-destructive hover:bg-destructive/20"
                  onClick={() => setLogoutOpen(true)}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <LogoutDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        loading={loggingOut}
        onConfirm={handleLogout}
      />
    </>
  );
}
