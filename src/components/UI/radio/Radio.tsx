import React, { useState } from "react";
import style from "./Radio.module.css";
import RadioItem from "./RadioItem";

interface RadioProps {
  variant: number;
  title: string;
  changeSortParams: (newVar: number, newTitle: string) => void;
}

interface RadioState {
  value: number;
  title: string;
}

const Radio: React.FC<RadioProps> = (props) => {
  const [radioState, setRadioState] = useState<RadioState>({
    value: props.variant,
    title: props.title,
  });

  const radioChange = (e: number, t: string) => {
    setRadioState((prevState) => ({ ...prevState, value: e }));
    props.changeSortParams(e, t);
  };

  return (
    <>
      <div className={style.customCheckBoxHolder}>
        <RadioItem
          radioChangeFunc={radioChange}
          currentRadioState={radioState.value}
          itemId="radio-1"
          radioValue={1}>
          Priority
        </RadioItem>
        <RadioItem
          radioChangeFunc={radioChange}
          currentRadioState={radioState.value}
          itemId="radio-2"
          radioValue={2}>
          Date
        </RadioItem>
      </div>
    </>
  );
};

export default Radio;
