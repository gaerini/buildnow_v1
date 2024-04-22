import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputValues {
  사업자등록번호: string;
  시국세완납증명내역: string;
}

interface InputForm1Props {
  inputValues?: InputValues;
  isString?: boolean;
  keyString: string;
  isButton: boolean;
  ButtonText?: string;
  placeholder?: string;
}

const InputForm1: React.FC<InputForm1Props> = ({
  inputValues,
  isString = true,
  keyString,
  isButton,
  ButtonText,
  placeholder,
}) => {
  return (
    <div className="flex justify-start items-center gap-3">
      <div
        className={`flex ${isString ? "w-[350px]" : ""}  justify-between gap-2`}
      >
        {isString && (
          <p className="flex whitespace-nowrap justify-center items-center">
            {keyString}
          </p>
        )}
        <div className="w-[150px]">
          <InputStyleBtn
            name={keyString}
            type="text"
            value={
              inputValues ? inputValues[keyString as keyof InputValues] : ""
            }
            placeholder={placeholder}
            isButton={isButton}
            buttonText={ButtonText}
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm1;
