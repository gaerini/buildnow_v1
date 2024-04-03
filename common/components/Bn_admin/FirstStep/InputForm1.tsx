import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputValues {
  신용평가등급: string;
  자본금: string;
  인원보유현황_기술자: string;
  인원보유현황_기능공: string;
  보유면허1_업종: string;
  보유면허1_년도: string;
  보유면허1_등록번호: string;
  보유면허1_시평액: string;
  보유면허2_업종: string;
  보유면허2_년도: string;
  보유면허2_등록번호: string;
  보유면허2_시평액: string;
  보유면허3_업종: string;
  보유면허3_년도: string;
  보유면허3_등록번호: string;
  보유면허3_시평액: string;
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
      <div className="flex w-[250px] justify-between gap-2">
        <p className="flex whitespace-nowrap justify-center items-center">
          {keyString}
        </p>
        <div className="w-[100px]">
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
