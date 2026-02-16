"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  page: number; // 1-based
  pageSize: number;
  totalItems: number;
  onPageChange: (nextPage: number) => void;
  onPageSizeChange?: (nextSize: number) => void;
  pageSizeOptions?: number[];
  siblingCount?: number; // how many pages around current
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function range(start: number, end: number) {
  const out: number[] = [];
  for (let i = start; i <= end; i++) out.push(i);
  return out;
}

function getPageItems(totalPages: number, page: number, siblingCount: number) {
  if (totalPages <= 1) return [1];

  const first = 1;
  const last = totalPages;

  const start = Math.max(first + 1, page - siblingCount);
  const end = Math.min(last - 1, page + siblingCount);

  const pages: (number | "…")[] = [first];

  if (start > first + 1) pages.push("…");
  pages.push(...range(start, end));
  if (end < last - 1) pages.push("…");

  if (last !== first) pages.push(last);

  return pages;
}

export function Pagination({
  page,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50],
  siblingCount = 1,
  className,
}: Props) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = clamp(page, 1, totalPages);

  const canPrev = safePage > 1;
  const canNext = safePage < totalPages;

  const from = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(totalItems, safePage * pageSize);

  const items = getPageItems(totalPages, safePage, siblingCount);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {/* left: range + page size */}
      <div className="flex items-center justify-between gap-3 sm:justify-start">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{from}</span>–
          <span className="font-medium text-foreground">{to}</span> of{" "}
          <span className="font-medium text-foreground">{totalItems}</span>
        </div>

        {onPageSizeChange && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Rows</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="h-9 rounded-xl border border-input bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {pageSizeOptions.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* right: controls */}
      <div className="flex items-center justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!canPrev}
          onClick={() => onPageChange(safePage - 1)}
        >
          Prev
        </Button>

        <div className="flex items-center gap-1">
          {items.map((it, idx) =>
            it === "…" ? (
              <span key={`dots-${idx}`} className="px-2 text-muted-foreground">
                …
              </span>
            ) : (
              <Button
                key={it}
                variant={it === safePage ? "default" : "outline"}
                size="sm"
                className="min-w-9"
                onClick={() => onPageChange(it)}
              >
                {it}
              </Button>
            )
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={!canNext}
          onClick={() => onPageChange(safePage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
