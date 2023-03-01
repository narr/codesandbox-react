import { useRef } from "react";
import { createPortal } from "react-dom";
import TooltipContainer from "./TooltipContainer";
import { useTooltipHeight } from "./useTooltipHeight";

export default function Tooltip({ children, targetRect, flickeringTooltip }) {
  const ref = useRef(null);
  const tooltipHeight = useTooltipHeight(ref, flickeringTooltip);

  let tooltipX = 0;
  let tooltipY = 0;
  if (targetRect !== null) {
    tooltipX = targetRect.left;
    tooltipY = targetRect.top - tooltipHeight;
    if (tooltipY < 0) {
      // It doesn't fit above, so place below.
      tooltipY = targetRect.bottom;
    }
  }

  // This artificially slows down rendering
  let now = performance.now();
  while (performance.now() - now < 100) {
    // Do nothing for a bit...
  }

  return createPortal(
    <TooltipContainer x={tooltipX} y={tooltipY} contentRef={ref}>
      {children}
    </TooltipContainer>,
    document.querySelector(".buttons-with-tooltip")
  );
}
