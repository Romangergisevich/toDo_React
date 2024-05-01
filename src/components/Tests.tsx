import React from "react";
import TextInput from "./UI/inputs/TextInput";

const Tests: React.FC = (props) => {
  return (
    <>
      <TextInput
        placeholder="FirstName"
        required={false}
        inputId={"textInput_test1"}
      />
      <TextInput
        placeholder="LastName"
        required={false}
        inputId={"textInput_test2"}
      />
      <TextInput
        placeholder="EmailAdres"
        required={false}
        inputId={"textInput_test3"}
      />
    </>
  );
};

export default Tests;
