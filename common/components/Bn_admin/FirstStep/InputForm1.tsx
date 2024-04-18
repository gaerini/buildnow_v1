import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputValues {
  [key: string]: string;
}

interface InputForm1Props {
  inputValues: InputValues;
  setInputValues: Dispatch<SetStateAction<InputValues>>;
  checked: boolean; // 추가
  handleCheckboxChange: (keyString: string, checked: boolean) => void; // 추가
  keyString: string;
}

const InputForm1: React.FC<InputForm1Props> = ({
  inputValues,
  setInputValues,
  checked,
  handleCheckboxChange,
  keyString,
}) => {
  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-start items-center gap-3">
      <div className="flex w-[300px] justify-between gap-2">
        <p className="flex whitespace-nowrap justify-center items-center">
          {keyString}
        </p>
        <div className="w-[150px]">
          <InputStyleBtn
            name={keyString}
            type="text"
            value={inputValues[keyString as keyof InputValues]}
            onChange={handleInputChange}
            isButton={false}
          />
        </div>
      </div>

      <input
        type="checkbox"
        className={`form-checkbox w-5 h-5 border-gray-300 focus:ring-0 rounded text-green-500 ${
          checked ? "bg-green-500" : "bg-white"
        }`}
        checked={checked}
        onChange={(e) => handleCheckboxChange(keyString, e.target.checked)}
      />
    </div>
  );
};

export default InputForm1;
