"use client";
import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

interface NumApply {
  [key: string]: number;
}

interface DropDownProp {
  selectedWorkType: string;
  setSelectedWorkType: (workType: string) => void;
  selectedNumApply: number;
  setSelectedNumApply: (numApply: number) => void;
  numApply: NumApply;
  isInitialRender: boolean;
  setIsInitialRender: (isInitialRender: boolean) => void;
}

// 외부에서 workType prop을 받을 수 있게 하고, 선택된 selectedWorkType을 상위 컴포넌트로 전달할 수 있도록 코드를 수정해야함 (나중에 연결할 때에)
const Dropdown = ({
  selectedWorkType,
  setSelectedWorkType,
  selectedNumApply,
  setSelectedNumApply,
  numApply,
  isInitialRender,
  setIsInitialRender,
}: DropDownProp) => {
  const [$isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // dropdownRef.current가 null이 아니며, event.target이 Node 타입인 경우 contains 메서드를 사용
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const iconStyle = {
    transform: $isOpen ? "rotate(-180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  };

  const handleWorkTypeClick = (workType: string) => {
    setSelectedWorkType(workType);
    setSelectedNumApply(numApply[workType]);
    setIsOpen(false);
    setIsInitialRender(false);
  };

  const getInitialConsonant = (char: string) => {
    if (char < "가" || char > "힣") {
      return null; // 한글이 아닌 경우
    }

    const uni = char.charCodeAt(0) - 0xac00; // '가'에서의 거리
    const initialConsonantIndex = Math.floor(uni / 28 / 21); // 초성의 위치
    const initialConsonants = [
      "ㄱ",
      "ㄲ",
      "ㄴ",
      "ㄷ",
      "ㄸ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅃ",
      "ㅅ",
      "ㅆ",
      "ㅇ",
      "ㅈ",
      "ㅉ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
    ];

    return initialConsonants[initialConsonantIndex];
  };

  const isWorkTypeInGroup = (workType: string, group: string) => {
    const initialConsonant = getInitialConsonant(workType[0]);
    return initialConsonant === group;
  };

  const buttonClass = `${
    $isOpen ? "shadow-s" : ""
  } flex justify-between items-center w-[332px] h-[41px] p-m bg-primary-neutral-white border border-primary-navy-200 rounded-s`;

  const renderGroup = (group: string) => (
    <div key={group} className={`gap-x-1 ${group !== "ㅇ" ? "mt-2" : ""}`}>
      <div className="text-primary-neutral-400 text-paragraph-16 font-bold bgColor-white p-s h-8">
        {group + "."}
      </div>
      {numApply &&
        Object.keys(numApply)
          .filter(
            (workType) =>
              isWorkTypeInGroup(workType, group) && workType !== "전체"
          )
          .map((workType) => (
            <div
              key={workType}
              onClick={() => handleWorkTypeClick(workType)}
              className={` text-paragraph-16 p-s flex justify-start items-center gap-x-2 h-8
                        ${
                          selectedWorkType === workType
                            ? "textColor-focus bgColor-blue font-bold"
                            : "textColor-black bg-white hover:bgColor-neutral"
                        }`}
            >
              {workType}
              <div
                className={`badgeSize-s 
                          ${
                            selectedWorkType === workType
                              ? "border border-primary-blue-original bg-primary-blue-400 textColor-white"
                              : "border borderColor bgColor-white textColor-mid-emphasis"
                          }`}
              >
                {numApply[workType]}
              </div>
            </div>
          ))}
    </div>
  );

  return (
    <div className="flex items-center " ref={dropdownRef}>
      {/* <span className="text-subTitle-20 font-medium w-max mr-2">공종명 :</span> */}
      {/* DropdownBox */}
      <div>
        <button onClick={() => setIsOpen(!$isOpen)} className={buttonClass}>
          <div className="w-fit flex justify-between items-center gap-x-2 bgColor-white">
            <div
              className={`text-subTitle-18 ${
                isInitialRender ? "textColor-low-emphasis" : "textColor-black"
              }`}
            >
              {isInitialRender ? "공종을 선택하세요" : selectedWorkType}
            </div>
            {!isInitialRender && (
              <div className="badgeSize-m border borderColor bgColor-white textColor-mid-emphasis ">
                {selectedNumApply}
              </div>
            )}
          </div>
          <Icon name="ArrowDown" width={16} height={16} style={iconStyle} />
        </button>

        {$isOpen && (
          <div className="bgColor-neutral w-[568px] h-[828px] py-2 mt-2 rounded-s shadow-s overflow-scroll absolute z-10">
            {/* Dropdown items */}
            <div className="flex">
              {/* Left column */}
              <div className="w-[284px]">
                {/* Total */}
                <div
                  onClick={() => handleWorkTypeClick("전체")}
                  className={`text-primary-neutral-black text-paragraph-16 p-s flex justify-start items-center gap-x-2 mb-2 h-8
                  ${
                    selectedWorkType === "전체"
                      ? "textColor-focus bgColor-blue font-bold"
                      : "textColor-black bg-white hover:bgColor-neutral"
                  }`}
                >
                  전체
                  <span
                    className={` badgeSize-s rounded-s text-paragraph-12
                            ${
                              selectedWorkType === "전체"
                                ? "bg-primary-blue-400 border-primary-blue-original text-primary-neutral-white"
                                : "border first-line:borderColor bgColor-white textColor-mid-emphasis"
                            }`}
                  >
                    {numApply["전체"]}
                  </span>
                </div>

                {/* Groups from ㄱ to ㅅ */}
                {["ㄱ", "ㄴ", "ㄷ", "ㄹ", "ㅁ", "ㅂ", "ㅅ"].map((group) =>
                  renderGroup(group)
                )}
              </div>

              {/* Right column */}
              <div className="w-[284px]">
                {["ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].map((group) =>
                  renderGroup(group)
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
