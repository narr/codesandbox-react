import { useEffect, useLayoutEffect } from "react";

// Matches logic in React's `shared/ExecutionEnvironment` file
export const canUseDOM = !!(
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined"
);

export const useIsomorphicLayoutEffect = canUseDOM
  ? useLayoutEffect
  : useEffect;
