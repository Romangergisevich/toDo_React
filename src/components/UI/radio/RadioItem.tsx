import React from "react";
import style from "./Radio.module.css";

interface RadoState {
  itemId: string;
  children: any;
  isChecked?: boolean;
  radioValue: number;
}

const RadioItem: React.FC<RadoState> = (props) => {
  const logVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return (
    <>
      <input
        value={props.radioValue}
        onChange={logVal}
        checked={props.isChecked}
        className={style.customCheckBoxInput}
        name="radio-one"
        id={props.itemId}
        type="radio"
      />
      <label
        className={style.customCheckBoxWrapper}
        htmlFor={props.itemId}>
        <div className={style.customCheckBox}>
          <div className={style.inner}>{props.children}</div>
        </div>
      </label>
    </>
  );
};

export default RadioItem;
