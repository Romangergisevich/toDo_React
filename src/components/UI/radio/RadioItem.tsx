import React from "react";
import style from "./Radio.module.css";

interface RadoState {
  itemId: string;
  children: any;
  radioValue: number;
  currentRadioState: number;
  radioChangeFunc: (e: number) => void;
}

const RadioItem: React.FC<RadoState> = (props) => {
  const logVal = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    props.radioChangeFunc(props.radioValue);
  };

  return (
    <>
      <input
        checked={props.radioValue == props.currentRadioState ? true : false}
        value={props.radioValue}
        onChange={logVal}
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
