"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { TOKEN_KEY } from "@/lib/taticCredentials";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    router.replace(token ? "/admin" : "/login");
  }, [router]);

  return null; // or loader
}
