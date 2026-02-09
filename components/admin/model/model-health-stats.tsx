"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelToggle } from "@/lib/types";

interface ModelHealthStatsProps {
  models: ModelToggle[];
}

export function ModelHealthStats({ models }: ModelHealthStatsProps) {
  const stats = {
    healthy: models.filter((m) => m.status === "healthy").length,
    degraded: models.filter((m) => m.status === "degraded").length,
    down: models.filter((m) => m.status === "down").length,
    disabled: models.filter((m) => m.disabled).length,
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Healthy Models</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.healthy}</div>
          <p className="text-xs text-muted-foreground">Operating normally</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Degraded</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-amber-600">{stats.degraded}</div>
          <p className="text-xs text-muted-foreground">Performance issues</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Down</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.down}</div>
          <p className="text-xs text-muted-foreground">Unavailable</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Disabled by Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.disabled}</div>
          <p className="text-xs text-muted-foreground">Temporarily blocked</p>
        </CardContent>
      </Card>
    </div>
  );
}
