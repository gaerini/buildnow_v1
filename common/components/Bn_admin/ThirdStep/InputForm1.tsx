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
