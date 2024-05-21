import React from "react";
import style from "./Radio.module.css";
import RadioItem from "./RadioItem";

const Radio: React.FC = () => {
  return (
    <>
      <div className={style.customCheckBoxHolder}>
        <RadioItem
          itemId="radio-1"
          radioValue={1}>
          Date
        </RadioItem>
        <RadioItem
          itemId="radio-2"
          radioValue={2}>
          Priority
        </RadioItem>
      </div>
    </>
  );
};

export default Radio;
