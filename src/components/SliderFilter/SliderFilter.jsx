import { useState } from "react";

// export interface ISliderFilterProps {
//   minimumValue?: number;
//   maximumValue?: number;
//   stepIncrement?: number;
//   onValueChange?: (value: number) => void;
// }

const SliderFilter = (props) => {
  const {
    minimumValue = 0,
    maximumValue = 100000,
    stepIncrement = 1,
    onValueChange = () => {},
  } = props;

  const [sliderValue, setSliderValue] = useState(minimumValue);

  const onChangeSliderValue = (e) => {
    const value = Number(e.target.value);
    setSliderValue(value);
    onValueChange(value);
  };

  return (
    <div className="slider-filter">
      <h4>Filter applications by minimum spend</h4>
      <div className="slider-filter__value">{`Minimum spend: $${sliderValue.toLocaleString()}`}</div>
      <input
        type="range"
        min={minimumValue}
        max={maximumValue}
        step={stepIncrement}
        onChange={onChangeSliderValue}
      />
      <div className="slider-filter__label">
        <span className="slider-filter__min-value">
          ${minimumValue.toLocaleString()}
        </span>
        <span className="slider-filter__max-value">
          ${maximumValue.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default SliderFilter;
