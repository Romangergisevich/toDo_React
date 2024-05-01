import React from "react";
import TextInput from "./UI/inputs/TextInput";

const Tests: React.FC = (props) => {
  return (
    <>
      <TextInput
        placeholder="Text"
        required={false}
        inputId={"textInput_test"}
      />
    </>
  );
};

export default Tests;
