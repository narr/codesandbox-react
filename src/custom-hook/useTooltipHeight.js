import { useState, useEffect } from "react";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

export function useTooltipHeight(ref, forceFlickering) {
  const [tooltipHeight, setTooltipHeight] = useState(0);

  // the tooltip “flickers” and you briefly see its initial position before
  // the corrected position when useEffect is used.
  useEffect(() => {
    console.log("useTooltipHeight - useEffect");
    if (forceFlickering) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    console.log(
      "useTooltipHeight - useIsomorphicLayoutEffect (useLayoutEffect)"
    );
    if (!forceFlickering) {
      const { height } = ref.current.getBoundingClientRect();
      setTooltipHeight(height);
    }
  }, []);

  return tooltipHeight;
}
