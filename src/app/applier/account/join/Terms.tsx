// Terms.tsx
import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";

const Terms = () => {
  const [checked, setChecked] = useState(Array(5).fill(false));

  // 모든 체크박스를 동시에 토글하는 함수
  const handleAllCheck = () => {
    const areAllChecked = checked.every(Boolean);
    setChecked(checked.map(() => !areAllChecked));
  };

  // 개별 체크박스 상태 토글
  const handleCheck = (index: number) => {
    const updatedChecked = [...checked];
    updatedChecked[index] = !updatedChecked[index];
    setChecked(updatedChecked);
  };

  const handleLinkClick = (url: string) => {
    window.open(url, "_blank");
  };

  const termsData = [
    {
      text: "(필수) 회원 약관 동의",
      //   onClick: () => handleLinkClick("https://example.com/link-to-terms"),
      onClick: () => console.log("첫번째 버튼 클릭"),
    },
    {
      text: "(필수) 개인정보 수집 및 이용 동의",
      onClick: () => console.log("두번째 버튼 클릭"),
    },
    {
      text: "(필수) ---",
      onClick: () => console.log("세번째 버튼 클릭"),
    },
    {
      text: "(선택) 마케팅정보 수신 동의-이메일",
      onClick: () => console.log("네번째 버튼 클릭"),
    },
    {
      text: "(선택) 마케팅정보 수신 동의-SNS",
      onClick: () => console.log("다섯번째 버튼 클릭"),
    },
  ];

  return (
    <div className="border borderColor rounded-s p-4">
      {/* 첫 번째 영역 */}
      <div className="flex flex-col mb-4 w-[278px]">
        <div className="flex items-center gap-x-2 mb-1">
          <div
            className={`w-4 h-4 flex justify-center items-center rounded-s cursor-pointer ${
              checked.every(Boolean)
                ? "bg-primary-blue-original border-primary-blue-original textColor-white"
                : "border borderColor"
            }`}
            onClick={handleAllCheck}
          >
            {checked.every(Boolean) && (
              <Icon name="Check" width={18} height={18} />
            )}
          </div>
          <p className="text-paragraph-16 textColor-mid-emphasis font-extrabold">
            전체 약관 동의
          </p>
        </div>
        <div className="w-[240px] ml-[30px]">
          <p className="text-caption textColor-mid-emphasis">
            마케팅 정보 수신 동의 (이메일, SMS/MMS) (선택) 동의를 포함합니다
          </p>
        </div>
        {/* <Icon name="CaretRight" width={16} height={16} /> */}
      </div>

      <div className="w-[278px] h-[1px] bg-primary-neutral-200 my-4"></div>

      {/* 두 번째 영역 */}
      <div className="w-[278px]">
        {termsData.map((term, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-x-2">
              <div
                className={`w-4 h-4 flex justify-center items-center rounded-s cursor-pointer ${
                  checked[index]
                    ? "bg-primary-blue-original border-primary-blue-original textColor-white"
                    : "border borderColor"
                }`}
                onClick={() => handleCheck(index)}
              >
                {checked[index] && (
                  <Icon name="Check" width={18} height={18} />
                )}
              </div>
              <p
                className={`text-paragraph-16 textColor-mid-emphasis ${
                  index < 3 ? "font-extrabold" : "font-medium"
                } cursor-pointer`}
                onClick={term.onClick}
              >
                {term.text}
              </p>
            </div>
            {/* Icon */}
            <Icon
              name="CaretRight"
              width={16}
              height={16}
              className="cursor-pointer"
              onClick={term.onClick}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Terms;
