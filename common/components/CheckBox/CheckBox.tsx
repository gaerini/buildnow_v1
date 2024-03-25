"use client";

import React, { useState } from "react";
import Icon from "../Icon/Icon";

interface CheckBoxItem {
  text: string;
}

interface CheckBoxProps {
  items: CheckBoxItem[];
  onSelect: (index: number | null) => void;
  size?: number;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  items,
  onSelect,
  size,
  isError = false,
}) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);

  const handleCheck = (index: number) => {
    const isSelected = selectedCheckbox === index;
    const newIndex = isSelected ? null : index;
    setSelectedCheckbox(newIndex);
    onSelect(newIndex);
  };

  const textSizeClass = size ? `text-paragraph-${size}` : "text-paragraph-16";

  const checkboxClass = isError
    ? "border-secondary-red-original textColor-danger"
    : "borderColor textColor-mid-emphasis";

  return (
    <div className="flex gap-x-4 items-center px-5 first:px-0">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-x-2 items-center"
          onClick={() => handleCheck(index)}
        >
          <div
            className={`w-[18px] h-[18px] border rounded-s ${
              selectedCheckbox === index
                ? "bg-primary-blue-original border-primary-blue-original"
                : `bgColor-white ${checkboxClass}`
            }`}
          >
            {selectedCheckbox === index && (
              <div className="w-full h-full flex items-center justify-center">
                <span className="textColor-white text-subTitle-20">
                  <Icon name="Check" width={18} height={18} />
                </span>
              </div>
            )}
          </div>
          <span
            className={`${textSizeClass} ${
              selectedCheckbox === index ? "textColor-focus " : checkboxClass
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
