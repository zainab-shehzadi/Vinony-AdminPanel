"use client";

export default function GlobalOverlayLoader() {
  return (
    <div className="fixed inset-0 z-[99999] grid place-items-center bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
        </div>
      
    </div>
  );
}
