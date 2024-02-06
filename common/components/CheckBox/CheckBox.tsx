"use client";

// 여기는 체크박스 사용하는 방법!!
// 우선 각 체크박스에 들어갈 Text를 쓰고
// const checkboxes = [
//   { text: "Checkbox 1" },
//   { text: "Checkbox 2" },
//   // ... 추가 체크박스 구성
// ];

// 여기에서 각 Index마다 어떤 함수를 실행시킬지 결정하면 됨 (체크박스 후 확인 누르는 경우에는 상위에 함수 정의해서 쓰면 될 듯)
// const handleSelect = (index: number | null) => {
//   console.log(
//     `선택된 체크박스: ${index !== null ? checkboxes[index].text : "없음"}`
//   );
// };

{
  /* <CheckBox items={checkboxes} onSelect={handleSelect} /> */
}

// export default CheckBox;

import React, { useState } from "react";
import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

interface CheckBoxItem {
  text: string;
}

interface CheckBoxProps {
  items: CheckBoxItem[];
  onSelect: (index: number | null) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ items, onSelect }) => {
  const [selectedCheckbox, setSelectedCheckbox] = useState<number | null>(null);

  const handleCheck = (index: number) => {
    const newIndex = selectedCheckbox === index ? null : index;
    setSelectedCheckbox(newIndex);
    onSelect(newIndex); // 부모 컴포넌트에 선택된 체크박스의 인덱스 전달
  };

  return (
    <div className="flex gap-x-[50px] items-center px-5 ">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex gap-x-2 items-center"
          onClick={() => handleCheck(index)}
        >
          <div
            className={`w-5 h-5 border ${
              selectedCheckbox === index
                ? "bg-primary-navy-original border-primary-navy-original"
                : "bg-primary-neutral-white border-primary-neutral-700"
            } rounded-s`}
          >
            {selectedCheckbox === index && (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-white text-subTitle-20">
                  <Icon name="CheckMark" width={18} height={18} />
                </span>
              </div>
            )}
          </div>
          <span
            className={`text-paragraph-16 ${
              selectedCheckbox === index
                ? "text-primary-navy-original"
                : "text-primary-neutral-700"
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
