"use client";

import { useCallback, useRef, useState } from "react";
import type { GenerateRequest, GenerateResponse } from "@/types";

type Status = "idle" | "loading" | "success" | "error";

export function useGenerate() {
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const generate = useCallback(async (payload: GenerateRequest) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const json: GenerateResponse = await res.json();
      if (!res.ok || !json.image) throw new Error(json.error ?? "Gagal memproses gambar.");
      setResult(json.image);
      setStatus("success");
      return json.image;
    } catch (err) {
      if ((err as Error).name === "AbortError") return null;
      setError((err as Error).message);
      setStatus("error");
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
    setResult(null);
    setError(null);
  }, []);

  return { status, result, error, generate, reset, isLoading: status === "loading" };
}
