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

interface InputForm2Props {
  inputValues: InputValues;
  setInputValues: Dispatch<SetStateAction<InputValues>>;
  num: number;
  keyString: string[];
  checked?: boolean; // 추가
  checkbox?: boolean;
  handleCheckboxChange?: (keyString: string, checked: boolean) => void; // 추가
}

const InputForm2: React.FC<InputForm2Props> = ({
  inputValues,
  setInputValues,
  num,
  keyString,
  checked,
  checkbox = true,
  handleCheckboxChange,
}) => {
  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const fieldGroups = [
    [
      { label: "업종", key: keyString[1] },
      { label: "등록번호", key: keyString[2] },
    ],
    [
      { label: "년도", key: keyString[3] },
      { label: "시평액", key: keyString[4] },
    ],
  ];

  return (
    <div className="flex-col justify-start items-center">
      <div className="flex gap-2 items-center">
        <p className="whitespace-nowrap text-subTitle-18">보유면허 {num}</p>
        {checkbox && (
          <input
            type="checkbox"
            className={`form-checkbox w-5 h-5 border-gray-300 focus:ring-0 rounded text-green-500 ${
              checked ? "bg-green-500" : "bg-white"
            }`}
            checked={checked}
            onChange={(e) => {
              if (handleCheckboxChange !== undefined) {
                handleCheckboxChange(keyString[0], e.target.checked);
              }
            }}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 pt-2">
        {fieldGroups.map((group, index) => (
          <div key={index} className="flex gap-1 justify-start">
            {group.map((field) => (
              <div key={field.key} className="inline-flex items-center">
                <p className="w-[64px] flex whitespace-nowrap">{field.label}</p>
                <div className="mx-2 w-[250px]">
                  <InputStyleBtn
                    name={field.key}
                    type="text"
                    value={inputValues[field.key as keyof InputValues]}
                    onChange={handleInputChange}
                    isButton={false}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InputForm2;

{
  /* <div className="flex gap-1 justify-start">
<div className="inline-flex items-center">
  <p className="w-[64px] flex whitespace-nowrap">업종</p>
  <div className="mx-2 w-[250px]">
    <InputStyleBtn
      name={keyString[1]}
      type="text"
      value={inputValues[keyString[1] as keyof InputValues]}
      onChange={handleInputChange}
      isButton={false}
    />
  </div>
</div>
<div className="inline-flex items-center">
  <p className="w-[64px] flex whitespace-nowrap">등록번호</p>
  <div className="mx-2 w-[250px]">
    <InputStyleBtn
      name={keyString[2]}
      type="text"
      value={inputValues[keyString[2] as keyof InputValues]}
      onChange={handleInputChange}
      isButton={false}
    />
  </div>
</div>
</div>
<div className="flex gap-1 justify-start">
<div className="inline-flex items-center">
  <p className="w-[64px] flex whitespace-nowrap">년도</p>
  <div className="mx-2 w-[250px]">
    <InputStyleBtn
      name={keyString[3]}
      type="text"
      value={inputValues[keyString[3] as keyof InputValues]}
      onChange={handleInputChange}
      isButton={false}
    />
  </div>
</div>
<div className="inline-flex items-center">
  <p className="w-[64px] flex whitespace-nowrap">시평액</p>
  <div className="mx-2 w-[250px]">
    <InputStyleBtn
      name={keyString[4]}
      type="text"
      value={inputValues[keyString[4] as keyof InputValues]}
      onChange={handleInputChange}
      isButton={false}
    />
  </div>
</div>
</div> */
}
