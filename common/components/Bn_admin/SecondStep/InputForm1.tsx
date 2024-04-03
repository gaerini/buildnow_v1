import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputValues {
  사업자등록번호: string;
}

interface InputForm1Props {
  inputValues: InputValues;
  keyString: string;
  isButton: boolean;
  ButtonText?: string;
}

const InputForm1: React.FC<InputForm1Props> = ({
  inputValues,
  keyString,
  isButton,
  ButtonText,
}) => {
  return (
    <div className="flex justify-start items-center gap-3">
      <div className="flex w-[350px] justify-between gap-2">
        <p className="flex whitespace-nowrap justify-center items-center">
          {keyString}
        </p>
        <div className="w-[250px]">
          <InputStyleBtn
            name={keyString}
            type="text"
            value={inputValues[keyString as keyof InputValues]}
            isButton={isButton}
            buttonText={ButtonText}
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm1;
