// "use client";
// import React, { useState } from "react";
// import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

// interface CheckBoxProps {
//   text1: string;
//   text2: string;
// }

// const CheckBox: React.FC<CheckBoxProps> = ({ text1, text2 }) => {
//   const [isChecked1, setIsChecked1] = useState(false);
//   const [isChecked2, setIsChecked2] = useState(false);

//   const handleCheck1 = () => {
//     setIsChecked1(!isChecked1);
//     if (isChecked2) setIsChecked2(false);
//   };

//   const handleCheck2 = () => {
//     setIsChecked2(!isChecked2);
//     if (isChecked1) setIsChecked1(false);
//   };

//   return (
//     <div className="flex gap-x-[30px] items-center p-5 ">
//       <div className="flex justify-start gap-x-2 items-center">
//         <div
//           className={`w-5 h-5 border ${
//             isChecked1
//               ? "bg-primary-navy-original border-primary-navy-original"
//               : "bg-primary-neutral-white border-primary-neutral-700"
//           } rounded-s`}
//           onClick={handleCheck1}
//         >
//           {isChecked1 && (
//             <div className="w-full h-full flex items-center justify-center">
//               <span className="text-white text-subTitle-20">
//                 <Icon name="CheckMark" width={18} height={18} />
//               </span>
//             </div>
//           )}
//         </div>
//         <span
//           className={`text-paragraph-16  ${
//             isChecked1
//               ? "text-primary-navy-original"
//               : "text-primary-neutral-700"
//           }`}
//         >
//           {text1}
//         </span>
//       </div>

//       <div className="flex gap-x-2 items-center">
//         <div
//           className={`w-5 h-5 border ${
//             isChecked2
//               ? "bg-primary-navy-original border-primary-navy-original"
//               : "bg-primary-neutral-white border-primary-neutral-700"
//           } rounded-s`}
//           onClick={handleCheck2}
//         >
//           {isChecked2 && (
//             <div className="w-full h-full flex items-center justify-center">
//               <span className="text-white text-subTitle-20">
//                 <Icon name="CheckMark" width={18} height={18} />
//               </span>
//             </div>
//           )}
//         </div>
//         <span
//           className={`text-paragraph-16 ${
//             isChecked2
//               ? "text-primary-navy-original"
//               : "text-primary-neutral-700"
//           }`}
//         >
//           {text2}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default CheckBox;
"use client";
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
