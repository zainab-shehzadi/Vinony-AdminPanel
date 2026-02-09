"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GlobalOverlayLoader from "@/components/GlobalOverlayLoader";
import AuthGuard from "./auth/AuthRedirectGuard";

export default function AppClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // ✅ show loader on every route change
    setShowLoader(true);

    const t = setTimeout(() => setShowLoader(false), 1000); // 1 sec
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AuthGuard>
      {showLoader ? <GlobalOverlayLoader /> : null}
      {children}
    </AuthGuard>
  );
}
