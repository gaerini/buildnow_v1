"use client";
import React, { useState } from "react";
import Icon from "../Icon/Icon"; // arrow-down.svg의 정확한 경로를 지정해주세요.

interface NumApply {
  [key: string]: number;
}

// 이 부분은 나중에 백에서 불러올 수 있도록
const numApply: NumApply = {
  토공사: 1,
  포장공사: 2,
  "보링 그라우팅 파일공사": 3,
  실내건축공사: 4,
  "금속구조물 창호 온실공사": 5,
  "지붕판금 건축물 조립공사": 6,
  도장공사: 7,
  "습식 방수공사": 8,
  석공사: 9,
  조경식재공사: 10,
  조경시설물설치공사: 11,
  "철근 콘크리트 공사": 12,
  "구조물해체 비계공사": 13,
  상하수도설비공사: 14,
  "철도 궤도공사": 15,
  "철강 구조물 공사": 16,
  수중공사: 17,
  준설공사: 18,
  승강기설치공사: 19,
  삭도설치공사: 20,
  기계설비공사: 21,
  "가스시설공사(제1종)": 22,
  "가스시설공사(제2종)": 23,
  "가스시설공사(제3종)": 24,
  "난방공사(제1종)": 25,
  "난방공사(제2종)": 26,
  "난방공사(제3종)": 27,
  전체: 378,
};

// 외부에서 workType prop을 받을 수 있게 하고, 선택된 selectedWorkType을 상위 컴포넌트로 전달할 수 있도록 코드를 수정해야함 (나중에 연결할 때에)
const Dropdown = () => {
  const [selectedWorkType, setSelectedWorkType] = useState<string>("전체");
  const [selectedNumApply, setSelectedNumApply] = useState<number>(
    numApply[selectedWorkType]
  );
  const [$isOpen, setIsOpen] = useState<boolean>(false);

  const iconStyle = {
    transform: $isOpen ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.3s ease",
  };

  const handleWorkTypeClick = (workType: string) => {
    setSelectedWorkType(workType);
    setSelectedNumApply(numApply[workType]);
    setIsOpen(false);
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
      <div className="text-primary-neutral-400 text-paragraph-16 font-bold bg-white px-4 py-1">
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
              className={`text-primary-neutral-black text-paragraph-16 px-4 py-1 flex justify-start items-center gap-x-2 
                        ${
                          selectedWorkType === workType
                            ? "bg-secondary-blue-100 font-bold"
                            : "bg-white hover:bg-primary-neutral-100"
                        }`}
            >
              {workType}
              <span
                className={`rounded-s px-2 py-[3px] text-paragraph-12
                          ${
                            selectedWorkType === workType
                              ? "bg-primary-navy-original text-primary-neutral-white"
                              : "bg-primary-navy-200"
                          }`}
              >
                {numApply[workType]}
              </span>
            </div>
          ))}
    </div>
  );

  return (
    <div className="relative flex items-center">
      <span className="text-subTitle-20 font-medium w-max mr-2">공종명 :</span>
      <div>
        <button onClick={() => setIsOpen(!$isOpen)} className={buttonClass}>
          <div className="w-fit flex justify-between items-center gap-x-2">
            <span className="text-subTitle-20 text-primary-neutral-black">
              {selectedWorkType}
            </span>
            <span className="bg-primary-navy-200 rounded-s px-2 text-paragraph-16">
              {selectedNumApply}
            </span>
          </div>
          <Icon name="ArrowDown" width={16} height={16} style={iconStyle} />
        </button>

        {$isOpen && (
          <div
            className="bg-primary-navy-100 w-[568px] h-[828px] py-2 mt-2 rounded-s shadow-s overflow-scroll absolute top-[41px]"
            style={{ zIndex: 1000 }} // z-index를 직접 설정
          >
            {/* Dropdown items */}
            <div className="flex">
              {/* Left column */}
              <div className="w-[284px]">
                {/* Total */}

                <div
                  onClick={() => handleWorkTypeClick("전체")}
                  className={`text-primary-neutral-black text-paragraph-16 px-4 py-1 flex justify-start items-center gap-x-2 mb-2
                          ${
                            selectedWorkType === "전체"
                              ? "bg-secondary-blue-100"
                              : "bg-white hover:bg-primary-neutral-100"
                          }
                          ${selectedWorkType === "전체" ? "font-bold" : ""}`}
                >
                  전체
                  <span
                    className={`rounded-s px-2 py-[3px] text-paragraph-12
                            ${
                              selectedWorkType === "전체"
                                ? "bg-primary-navy-original text-primary-neutral-white"
                                : "bg-primary-navy-200"
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
                {["ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"].map(
                  (group, index) => renderGroup(group)
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
