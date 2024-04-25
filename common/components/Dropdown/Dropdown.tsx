"use client";
import React, { useState, useEffect, useRef } from "react";
import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

interface NumApply {
  [key: string]: number;
}

interface DropDownProp {
  selectedType: string;
  selectedNumApply: number;
  numApply: NumApply;
  isInitialRender: boolean;
  handleClick: (workType: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  label: string;
  isDisabled: boolean;
}

// 외부에서 workType prop을 받을 수 있게 하고, 선택된 selectedType을 상위 컴포넌트로 전달할 수 있도록 코드를 수정해야함 (나중에 연결할 때에)
const Dropdown = ({
  selectedType,
  selectedNumApply,
  numApply,
  isInitialRender,
  handleClick,
  isOpen,
  setIsOpen,
  label,
  isDisabled,
}: DropDownProp) => {
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
    transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  };

  const getInitialConsonant = (char: string) => {
    if (char >= "가" && char <= "힣") {
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
    } else if (char.toUpperCase() >= "A" && char.toUpperCase() <= "Z") {
      return char.toUpperCase(); // 대문자 알파벳 반환
    }
    return null; // 그 외 문자는 처리하지 않음
  };

  const isWorkTypeInGroup = (workType: string, group: string) => {
    const initialConsonant = getInitialConsonant(workType[0]);
    return initialConsonant === group;
  };

  const getUsedGroups = () => {
    const allGroups = [
      "ㄱ",
      "ㄴ",
      "ㄷ",
      "ㄹ",
      "ㅁ",
      "ㅂ",
      "ㅅ",
      "ㅇ",
      "ㅈ",
      "ㅊ",
      "ㅋ",
      "ㅌ",
      "ㅍ",
      "ㅎ",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    const usedGroups = new Set();

    Object.keys(numApply).forEach((workType) => {
      const initial = getInitialConsonant(workType[0]);
      if (
        initial &&
        typeof initial === "string" &&
        allGroups.includes(initial)
      ) {
        usedGroups.add(initial);
      }
    });

    return Array.from(usedGroups).sort(
      (a, b) => allGroups.indexOf(a as string) - allGroups.indexOf(b as string)
    );
  };

  const usedGroups = getUsedGroups(); // 사용 중인 그룹만 추출
  const midIndex = Math.ceil(usedGroups.length / 2); // 중간 인덱스 계산

  const buttonClass = `${
    isOpen ? "shadow-s" : ""
  } flex justify-between items-center w-[332px] h-[44px] p-m  border border-primary-navy-200 rounded-s`;

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
            <button
              key={workType}
              onClick={() => handleClick(workType)}
              className={` text-paragraph-16 p-s flex justify-start items-center gap-x-2 h-8 w-full
                        ${
                          selectedType === workType
                            ? "textColor-focus bgColor-blue font-bold"
                            : "textColor-high-emphasis bg-white hover:bgColor-neutral"
                        }`}
            >
              {workType}
              <div
                className={`badgeSize-s 
                          ${
                            selectedType === workType
                              ? "border border-primary-blue-original bg-primary-blue-400 textColor-white"
                              : "border borderColor bgColor-white textColor-mid-emphasis"
                          }`}
              >
                {numApply[workType]}
              </div>
            </button>
          ))}
    </div>
  );

  return (
    <div className="flex items-center " ref={dropdownRef}>
      {/* <span className="text-subTitle-20 font-medium w-max mr-2">공종명 :</span> */}
      {/* DropdownBox */}
      <div>
        <button
          onClick={() => !isDisabled && setIsOpen(!isOpen)}
          className={`${buttonClass} ${
            isDisabled ? "bgColor-neutral" : "bgColor-white"
          }`}
          disabled={isDisabled}
        >
          <div
            className={`w-fit flex justify-between items-center gap-x-2 ${
              isDisabled ? "bgColor-neutral" : "bgColor-white"
            }`}
          >
            <div
              className={`text-subTitle-16 flex items-center gap-x-2 ${
                !selectedType
                  ? "textColor-low-emphasis"
                  : "textColor-high-emphasis"
              }`}
            >
              <Icon
                name={label === "License" ? "Certification" : "Tool"}
                height={16}
                width={16}
              />
              {selectedType ||
                (label === "License"
                  ? "면허를 선택하세요"
                  : "지원공종을 선택하세요")}
            </div>
            {selectedType && (
              <div className="badgeSize-m border borderColor bgColor-white textColor-mid-emphasis">
                {selectedNumApply}
              </div>
            )}
          </div>
          <Icon name="ArrowDown" width={16} height={16} style={iconStyle} />
        </button>

        {isOpen && (
          <div className="bgColor-neutral w-[532px] max-h-[828px] py-2 mt-2 rounded-s shadow-s overflow-scroll absolute z-10">
            {/* Dropdown items */}
            <div className="flex">
              {/* Left column */}
              <div className="w-[284px]">
                {/* Total */}
                <div
                  onClick={() => handleClick("전체")}
                  className={`text-primary-neutral-black text-paragraph-16 p-s flex justify-start items-center gap-x-2 mb-2 h-8
                  ${
                    selectedType === "전체"
                      ? "textColor-focus bgColor-blue font-bold"
                      : "textColor-high-emphasis bg-white hover:bgColor-neutral"
                  }`}
                >
                  전체
                  <span
                    className={` badgeSize-s rounded-s text-paragraph-12
                            ${
                              selectedType === "전체"
                                ? "bg-primary-blue-400 border border-primary-blue-original text-primary-neutral-white"
                                : "border first-line:borderColor bgColor-white textColor-mid-emphasis"
                            }`}
                  >
                    {numApply["전체"]}
                  </span>
                </div>

                {/* Groups from ㄱ to ㅅ */}
                {usedGroups
                  .slice(0, midIndex)
                  .map((group) => renderGroup(group as string))}
              </div>

              {/* Right column */}
              <div className="w-[284px]">
                {usedGroups
                  .slice(midIndex)
                  .map((group) => renderGroup(group as string))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
