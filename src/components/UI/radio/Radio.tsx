import React, { useState } from "react";
import style from "./Radio.module.css";
import RadioItem from "./RadioItem";

interface RadioState {
  value: number;
}

const Radio: React.FC = (props) => {
  const [radioState, setRadioState] = useState<RadioState>({
    value: 1,
  });

  const radioChange = (e: number) => {
    setRadioState((prevState) => ({ ...prevState, value: e }));
  };

  return (
    <>
      <div className={style.customCheckBoxHolder}>
        <RadioItem
          radioChangeFunc={radioChange}
          currentRadioState={radioState.value}
          itemId="radio-1"
          radioValue={1}>
          Date
        </RadioItem>
        <RadioItem
          radioChangeFunc={radioChange}
          currentRadioState={radioState.value}
          itemId="radio-2"
          radioValue={2}>
          Priority
        </RadioItem>
      </div>
    </>
  );
};

export default Radio;
