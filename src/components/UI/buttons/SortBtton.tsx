import React from "react";
import style from "./SortButton.module.css";

const SortButton: React.FC = () => {
  return (
    <>
      <button
        type="button"
        className={style.sortButton}></button>
    </>
  );
};

export default SortButton;
