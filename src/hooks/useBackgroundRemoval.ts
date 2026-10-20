"use client";

import { useCallback, useState } from "react";

/**
 * Removes the background fully in the browser (WASM model, downloaded once and cached),
 * so the photo never leaves the device for this step.
 */
export function useBackgroundRemoval() {
  const [progress, setProgress] = useState(0);

  const remove = useCallback(async (src: string): Promise<string> => {
    setProgress(0);
    const { removeBackground } = await import("@imgly/background-removal");
    const blob = await removeBackground(src, {
      output: { format: "image/png" },
      progress: (key, current, total) => {
        if (key.startsWith("fetch") && total) setProgress(Math.round((current / total) * 100));
      },
    });
    return URL.createObjectURL(blob);
  }, []);

  return { remove, progress };
}
