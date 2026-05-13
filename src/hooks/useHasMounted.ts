"use client";

import { useSyncExternalStore } from "react";

function noopSubscribe() {
  return () => {};
}

export function useHasMounted(): boolean {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
