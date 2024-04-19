import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputValues {
  [key: string]: string;
}

interface InputForm1Props {
  inputValues?: InputValues;
  setInputValues?: Dispatch<SetStateAction<InputValues>>;
  checkboxStates?: any;
  setCheckboxStates?: any;
  isString?: boolean;
  keyString: string;
  isButton: boolean;
  ButtonText?: string;
  placeholder?: string;
  width?: string;
}

const InputForm1: React.FC<InputForm1Props> = ({
  inputValues,
  setInputValues,
  setCheckboxStates,
  isString = true,
  keyString,
  isButton,
  ButtonText,
  placeholder,
  width = "w-[350px]",
}) => {
  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (setInputValues) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    if (setCheckboxStates) {
      setCheckboxStates((prevValues: any) => ({
        ...prevValues,
        [name]: true,
      }));
    }
  };
  return (
    <div className="flex justify-between items-center gap-3 p-2">
      <div className={`flex ${isString ? width : ""}  justify-between gap-2`}>
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
            onChange={handleInputChange}
            isButton={isButton}
            buttonText={ButtonText}
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm1;
