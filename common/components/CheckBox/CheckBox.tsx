"use client";
import React, { useState } from "react";
import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

interface CheckBoxProps {
  text1: string;
  text2: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({ text1, text2 }) => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleCheck1 = () => {
    setIsChecked1(!isChecked1);
    if (isChecked2) setIsChecked2(false);
  };

  const handleCheck2 = () => {
    setIsChecked2(!isChecked2);
    if (isChecked1) setIsChecked1(false);
  };

  return (
    <div className="flex gap-x-[50px] items-center p-5 ">
      <div className="flex justify-start gap-x-2 items-center">
        <div
          className={`w-5 h-5 border ${
            isChecked1
              ? "bg-primary-navy-original border-primary-navy-original"
              : "bg-primary-neutral-white border-primary-neutral-500"
          } rounded-s`}
          onClick={handleCheck1}
        >
          {isChecked1 && (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-subTitle-20">
                <Icon name="CheckMark" width={18} height={18} />
              </span>
            </div>
          )}
        </div>
        <span
          className={`text-paragraph-16 font-normal ${
            isChecked1
              ? "text-primary-navy-original"
              : "text-primary-neutral-500"
          }`}
        >
          {text1}
        </span>
      </div>

      <div className="flex gap-x-2 items-center">
        <div
          className={`w-5 h-5 border ${
            isChecked2
              ? "bg-primary-navy-original border-primary-navy-original"
              : "bg-primary-neutral-white border-primary-neutral-500"
          } rounded-s`}
          onClick={handleCheck2}
        >
          {isChecked2 && (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-white text-subTitle-20">
                <Icon name="CheckMark" width={18} height={18} />
              </span>
            </div>
          )}
        </div>
        <span
          className={`text-paragraph-16 font-normal ${
            isChecked2
              ? "text-primary-navy-original"
              : "text-primary-neutral-500"
          }`}
        >
          {text2}
        </span>
      </div>
    </div>
  );
};

export default CheckBox;
