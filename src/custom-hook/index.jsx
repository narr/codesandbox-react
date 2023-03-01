import "./index.css";
import ButtonWithTooltip from "./ButtonWithTooltip";

export default function App() {
  return (
    <div className="buttons-with-tooltip">
      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip does not fit above the button.
            <br />
            This is why it's displayed below instead!
          </div>
        }
      >
        Hover over me (tooltip below)
      </ButtonWithTooltip>

      <div style={{ height: 50 }} />

      <ButtonWithTooltip
        tooltipContent={<div>This tooltip fits above the button</div>}
        flickeringTooltip={false}
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>

      <div style={{ height: 50 }} />

      <ButtonWithTooltip
        tooltipContent={
          <div>
            This tooltip fits above the button.
            <br />
            But it flickers and you can see its initial position before the
            corrected position as it uses "useEffect" rather than
            useLayoutEffect
          </div>
        }
        flickeringTooltip={true}
      >
        Hover over me (tooltip above)
      </ButtonWithTooltip>
    </div>
  );
}
