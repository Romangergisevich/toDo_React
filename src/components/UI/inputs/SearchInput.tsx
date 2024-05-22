import React from "react";
import style from "./SearchInput.module.css";

interface SearchInputProps {
  extended: boolean;
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className={style.container}>
      <input
        type="search"
        name="text"
        className={style.input}
        required={props.extended}
        placeholder="Search..."
      />
      <div
        style={!props.extended ? { cursor: "default" } : { cursor: "pointer" }}
        className={style.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={style.ionicon}
          viewBox="0 0 512 512">
          <title>Search</title>
          <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"></path>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M338.29 338.29L448 448"></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchInput;
