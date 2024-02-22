"use client";

import React, { useState } from "react";
import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

interface CheckBoxItem {
  text: string;
}

interface CheckBoxProps {
  items: CheckBoxItem[];
  onSelect: (index: number | null) => void;
  size?: number;
}

const CheckBox: React.FC<CheckBoxProps> = ({ items, onSelect, size }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);

  const handleCheck = (index: number) => {
    const isSelected = selectedCheckbox === index;
    const newIndex = isSelected ? null : index;
    setSelectedCheckbox(newIndex);
    onSelect(newIndex); // 부모 컴포넌트에 선택된 체크박스의 인덱스 전달
  };

  const textSizeClass = size ? `text-paragraph-${size}` : "text-paragraph-16";

  return (
    <div className="flex gap-x-[50px] items-center px-5 first:px-0">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-x-2 items-center"
          onClick={() => handleCheck(index)}
        >
          <div
            className={`w-[18px] h-[18px] border ${
              selectedCheckbox === index
                ? "bg-primary-blue-original border-primary-blue-original"
                : "bgColor-white borderColor"
            } rounded-s`}
          >
            {selectedCheckbox === index && (
              <div className="w-full h-full flex items-center justify-center">
                <span className="textColor-white text-subTitle-20">
                  <Icon name="CheckMark" width={18} height={18} />
                </span>
              </div>
            )}
          </div>
          <span
            className={`${textSizeClass} ${
              selectedCheckbox === index
                ? "textColor-focus "
                : "textColor-mid-emphasis"
            }`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CheckBox;
