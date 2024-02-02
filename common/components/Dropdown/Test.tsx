// Dropdown.tsx
import React, { useState } from "react";

interface NumApply {
  [key: string]: number;
}

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
  철강구조물공사: 16,
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

const WorkTypeDropDown: React.FC = () => {
  const [selectedWorkType, setSelectedWorkType] = useState<string>("전체");
  const [selectedNumApply, setSelectedNumApply] = useState<number>(
    numApply.selectedWorkType
  );
  const [$isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelect = (workType: string) => {
    // 필터링 로직 구현
    setSelectedWorkType(workType);
    setIsOpen(false);
    setSelectedNumApply(numApply[workType]);
  };

  return (
    <div className="relative font-pretendard text-sm w-70%">
      <div className="flex justify-between items-center w-full max-w-[12.75rem]">
        <span className="whitespace-nowrap text-lg">공종명 :</span>
        <div
          onClick={() => setIsOpen(!$isOpen)}
          className="flex items-center cursor-pointer p-[0.1875rem 0.375rem] max-w-[15rem] ml-[0.375rem] border border-gray-300 w-full box-border rounded-[0.1875rem]"
        >
          <span className="flex-grow flex justify-between relative">
            {selectedWorkType}
          </span>
          <span
            className={`inline-block p-1 border-black border-[0 2px 2px 0] transform transition-transform ${
              $isOpen ? "rotate-45" : "rotate-[-135deg]"
            }`}
          ></span>
          {$isOpen && (
            <ul className="absolute top-[calc(100%+2px)] left-0 w-full z-10 bg-white list-none p-0 m-0 border border-gray-300 rounded-[0.25rem] border-t-0 box-border max-h-[calc(1.875rem*5)] overflow-y-auto shadow-[0px_4px_8px_rgba(0,0,0,0.1)]">
              {Object.entries(numApply).map(([workType, numApplications]) => (
                <li
                  key={workType}
                  onClick={() => handleSelect(workType)}
                  className={`p-[0.375rem] cursor-pointer flex justify-between items-center ${
                    selectedWorkType === workType
                      ? "text-[#2F4252]"
                      : "text-gray-500"
                  } hover:bg-gray-200 hover:text-${
                    selectedWorkType === workType ? "[#2F4252]" : "black"
                  }`}
                >
                  {workType}
                  <span
                    className={`bg-gray-200 p-[0.15rem] text-[0.525rem] h-6 w-6 mr-[0.375rem] inline-flex items-center justify-center text-gray-500 absolute right-0 ${
                      true ? "inline-flex" : "none"
                    }`}
                  >
                    {numApplications}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkTypeDropDown;
