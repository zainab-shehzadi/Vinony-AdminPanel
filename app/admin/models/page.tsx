"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ModelToggle } from "@/lib/types";
import { mockModels } from "@/components/constants/mock";
import { ModelHealthStats } from "@/components/admin/model/model-health-stats";
import { ModelToggleDialog } from "@/components/admin/model/model-toggle-dialog";
import { ModelHealthTable } from "@/components/admin/model/model-health-table";
import { Pagination } from "@/components/admin/Pagination";

type DialogMode = "disable" | "enable";

export default function ModelsPage() {
  const { toast } = useToast();

  const [models, setModels] = useState<ModelToggle[]>(mockModels);
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  const [dialogMode, setDialogMode] = useState<DialogMode | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // ✅ pagination state (reusable in every page)
  const [page, setPage] = useState(1); // 1-based
  const [pageSize, setPageSize] = useState(10);

  const selectedModel = useMemo(
    () => models.find((m) => m.id === selectedModelId) ?? null,
    [models, selectedModelId]
  );

  const openDialog = (model: ModelToggle, mode: DialogMode) => {
    setSelectedModelId(model.id);
    setDialogMode(mode);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedModelId(null);
    setDialogMode(null);
  };

  const handleToggleModel = (model: ModelToggle, mode: DialogMode) => {
    openDialog(model, mode);
  };

  const handleConfirmToggle = (payload: { modelId: string; mode: DialogMode; reason?: string }) => {
    const model = models.find((m) => m.id === payload.modelId);
    if (!model) return;

    if (payload.mode === "disable" && !payload.reason?.trim()) {
      toast({
        title: "Error",
        description: "Please provide a reason for disabling",
        variant: "destructive",
      });
      return;
    }

    setModels((prev) =>
      prev.map((m) =>
        m.id === payload.modelId
          ? {
              ...m,
              disabled: payload.mode === "disable",
              disableReason: payload.mode === "disable" ? payload.reason?.trim() : undefined,
            }
          : m
      )
    );

    toast({
      title: "Success",
      description: `Model ${payload.mode === "disable" ? "disabled" : "enabled"}: ${model.name}`,
    });

    closeDialog();
  };

  // ✅ slice data for current page
  const totalItems = models.length;

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  // keep page valid when data changes
  if (page > totalPages) setPage(totalPages);

  const pagedModels = useMemo(() => {
    const start = (page - 1) * pageSize;
    return models.slice(start, start + pageSize);
  }, [models, page, pageSize]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Model Health & Toggles</h1>
        <p className="text-muted-foreground">Monitor model status and manage availability</p>
      </div>

      <ModelHealthStats models={models} />

      <Card>
        <CardHeader>
          <CardTitle>All Models</CardTitle>
          <CardDescription>Disable/enable models to manage availability</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {models.length ? (
            <>
              <ModelHealthTable models={pagedModels} onToggleModel={handleToggleModel} />

              <Pagination
                page={page}
                pageSize={pageSize}
                totalItems={totalItems}
                onPageChange={setPage}
                onPageSizeChange={(s) => {
                  setPageSize(s);
                  setPage(1); // ✅ reset to first page
                }}
                pageSizeOptions={[5, 10, 20, 50]}
              />
            </>
          ) : (
            <div className="py-8 text-center text-muted-foreground">No models found</div>
          )}
        </CardContent>
      </Card>

      <ModelToggleDialog
        open={isDialogOpen}
        mode={dialogMode}
        model={selectedModel}
        onClose={closeDialog}
        onConfirm={handleConfirmToggle}
      />
    </div>
  );
}
