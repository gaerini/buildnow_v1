import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { useState, ChangeEvent, Dispatch, SetStateAction } from "react";

interface InputValues {
  // 신용평가등급: string;
  // 자본금: string;
  // 인원보유현황_기술자: string;
  // 인원보유현황_기능공: string;
  // 보유면허1_업종: string;
  // 보유면허1_년도: string;
  // 보유면허1_등록번호: string;
  // 보유면허1_시평액: string;
  // 보유면허2_업종: string;
  // 보유면허2_년도: string;
  // 보유면허2_등록번호: string;
  // 보유면허2_시평액: string;
  // 보유면허3_업종: string;
  // 보유면허3_년도: string;
  // 보유면허3_등록번호: string;
  // 보유면허3_시평액: string;
  // 사업자등록번호: any;
  업종: string;
  등록번호: string;
}

interface InputForm2Props {
  num: number;
  inputValues: InputValues;
  keyString: string[];
}

const InputForm2: React.FC<InputForm2Props> = ({
  num,
  inputValues,
  keyString,
}) => {
  return (
    <div className="flex flex-col gap-4 justify-start">
      <div className="inline-flex items-center">
        <p className="w-[64px] flex whitespace-nowrap">업종 {num}</p>
        <div className="mx-2 w-[250px]">
          <InputStyleBtn
            name={keyString[1]}
            type="text"
            value={inputValues["업종"]}
            isButton={false}
          />
        </div>
      </div>
      <div className="inline-flex items-center">
        <p className="w-[64px] flex whitespace-nowrap">등록번호 {num}</p>
        <div className="mx-2 w-[250px]">
          <InputStyleBtn
            name={keyString[2]}
            type="text"
            value={inputValues["등록번호"]}
            isButton={false}
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm2;
