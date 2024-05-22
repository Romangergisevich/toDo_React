import React from "react";
import style from "./SortButton.module.css";

interface SortProps {
  sortFunc: () => void;
}

const SortButton: React.FC<SortProps> = (props) => {
  return (
    <>
      <button
        onClick={props.sortFunc}
        type="button"
        className={style.sortButton}></button>
    </>
  );
};

export default SortButton;
