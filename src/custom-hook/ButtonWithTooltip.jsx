import { useState, useRef } from "react";
import Tooltip from "./Tooltip";

export default function ButtonWithTooltip({
  tooltipContent,
  flickeringTooltip,
  ...rest
}) {
  const [targetRect, setTargetRect] = useState(null);
  const buttonRef = useRef(null);
  return (
    <>
      <button
        {...rest}
        ref={buttonRef}
        onPointerEnter={() => {
          // relative to viewport
          // const rect = buttonRef.current.getBoundingClientRect();
          // setTargetRect({
          //   left: rect.left,
          //   top: rect.top,
          //   right: rect.right,
          //   bottom: rect.bottom
          // });

          // relative to the nearest parent
          const rect = buttonRef.current;
          setTargetRect({
            left: rect.offsetLeft,
            top: rect.offsetTop,
            right: rect.offsetLeft + rect.offsetWidth,
            bottom: rect.offsetTop + rect.offsetHeight
          });
        }}
        onPointerLeave={() => {
          setTargetRect(null);
        }}
      />
      {targetRect !== null && (
        <Tooltip targetRect={targetRect} flickeringTooltip={flickeringTooltip}>
          {tooltipContent}
        </Tooltip>
      )}
    </>
  );
}
