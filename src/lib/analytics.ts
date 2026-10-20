"use client";

import { sendGAEvent } from "@next/third-parties/google";

import { GA_MEASUREMENT_ID } from "@/constants";

type EventName =
  | "photo_rejected"
  | "generate_start"
  | "generate_success"
  | "generate_error"
  | "download";

/** Safe wrapper: never throws, no-op on the server or when GA is blocked. */
export function trackEvent(name: EventName, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  try {
    sendGAEvent("event", name, params);
  } catch {
    /* analytics must never break the app */
  }
}
