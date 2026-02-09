"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModelToggle } from "@/lib/types";
import { AlertCircle, CheckCircle2, Circle } from "lucide-react";

interface ModelHealthTableProps {
  models: ModelToggle[];
  onToggleModel: (model: ModelToggle, mode: "disable" | "enable") => void;
}

function formatLastChecked(date: Date) {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusIcon({ status }: { status: ModelToggle["status"] }) {
  if (status === "healthy") return <CheckCircle2 className="h-4 w-4 text-green-600" />;
  if (status === "degraded") return <AlertCircle className="h-4 w-4 text-amber-600" />;
  if (status === "down") return <AlertCircle className="h-4 w-4 text-red-600" />;
  return <Circle className="h-4 w-4" />;
}

function statusBadgeVariant(status: ModelToggle["status"]) {
  if (status === "healthy") return "default";
  if (status === "degraded") return "secondary";
  if (status === "down") return "destructive";
  return "outline";
}

export function ModelHealthTable({ models, onToggleModel }: ModelHealthTableProps) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="font-semibold text-primary-foreground">Model</TableHead>
            <TableHead className="font-semibold text-primary-foreground">Model Key</TableHead>
            <TableHead className="font-semibold text-primary-foreground">Provider</TableHead>
            <TableHead className="font-semibold text-primary-foreground">Status</TableHead>
            <TableHead className="font-semibold text-primary-foreground text-right">
              Error Rate
            </TableHead>
            <TableHead className="font-semibold text-primary-foreground text-right">
              Latency
            </TableHead>
            <TableHead className="font-semibold text-primary-foreground">Last Checked</TableHead>
            <TableHead className="w-24 text-primary-foreground">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {models.map((model) => (
            <TableRow
              key={model.id}
              className={
                model.disabled
                  ? "bg-muted/30 hover:bg-muted/50"
                  : "hover:bg-primary/10"
              }
            >
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <StatusIcon status={model.status} />
                  <span>{model.name}</span>
                  {model.disabled && (
                    <Badge variant="outline" className="ml-2 text-xs">
                      Disabled
                    </Badge>
                  )}
                </div>
              </TableCell>

              <TableCell className="font-mono text-xs text-muted-foreground">
                {model.modelKey}
              </TableCell>

              <TableCell>{model.provider}</TableCell>

              <TableCell>
                <Badge variant={statusBadgeVariant(model.status)} className="capitalize">
                  {model.status}
                </Badge>
              </TableCell>

              <TableCell className="text-right font-mono text-sm">
                {model.errorRate.toFixed(2)}%
              </TableCell>

              <TableCell className="text-right font-mono text-sm">
                {model.latency}ms
              </TableCell>

              <TableCell className="text-sm text-muted-foreground">
                {formatLastChecked(model.lastChecked)}
              </TableCell>

              <TableCell>
                <Button
                  variant={model.disabled ? "default" : "outline"}
                  size="sm"
                  className="text-xs"
                  onClick={() =>
                    onToggleModel(model, model.disabled ? "enable" : "disable")
                  }
                >
                  {model.disabled ? "Enable" : "Disable"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
