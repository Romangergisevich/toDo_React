import React from "react";
import TextInput from "./UI/inputs/TextInput";
import TextArea from "./UI/inputs/TextArea";

const Tests: React.FC = (props) => {
  const testFunc = (): void => {
    console.log("test");
  };

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
      <TextArea
        textAreaId={"qwerty"}
        placeholder={"TextArea"}
        onInputFunc={testFunc}
      />
    </>
  );
};

export default Tests;
