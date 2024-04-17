"use client";
import React, { useState, useRef, useEffect } from "react";
import DetailCompanyIntroT1 from "./DetailCompanyIntroT1";
import DetailCompanyIntroT2 from "./DetailCompanyIntroT2";
import DetailCompanyIntroT3 from "./DetailCompanyIntroT3";
import DetailCompanyCapacity from "./DetailCompanyCapacity";
import WorkType from "../Badge/WorkType";
import New from "../Badge/New";
import Rating from "../Badge/Rating";
import Place from "../Badge/Place";
import Icon from "../Icon/Icon";

interface CapacityValue {
  id: number;
  year1Value: number;
  year2Value: number;
  year3Value: number;
  nationalRanking: number;
  regionalRanking: number;
  nationalRankingRatio: number;
  regionalRankingRatio: number;
}

interface WorkType {
  id: number;
  workType: string | null;
  capacityValueList: CapacityValue[];
}

interface CompanyOutline {
  companyOutline: string[];
}

interface ManagerInfo {
  managerInfo: string[];
}

interface IntroInfo {
  intro: string;
}

// interface HistoryInfo {
//   Date: string[];
//   Event: string[];
// }

interface CompanyIntroProps {
  place: string;
  isNew: boolean;
  rating: number;
  showCompanyIntro: boolean;
  setShowCompanyIntro: React.Dispatch<React.SetStateAction<boolean>>;
  companyOutline: CompanyOutline;
  managerInfo: ManagerInfo;
  introInfo: IntroInfo;
  // historyInfo: HistoryInfo;
  workTypeList?: WorkType[];
  isNarrow: boolean;
}

const CompanyIntro: React.FC<CompanyIntroProps> = ({
  place,
  isNew,
  rating,
  showCompanyIntro,
  setShowCompanyIntro,
  companyOutline,
  managerInfo,
  introInfo,
  // historyInfo,
  workTypeList = [],
  isNarrow,
}) => {
  // const introRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   function handleClickOutside(event: MouseEvent) {
  //     // dropdownRef.current가 null이 아니며, event.target이 Node 타입인 경우 contains 메서드를 사용
  //     if (
  //       introRef.current &&
  //       event.target instanceof Node &&
  //       !introRef.current.contains(event.target)
  //     ) {
  //       setShowCompanyIntro(false);
  //     }
  //   }

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);
  const handleBackgroundClick = () => {
    setShowCompanyIntro(false);
  };

  const [toggleIsOpen, settoggleIsOpen] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = (index: number) => {
    settoggleIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <>
      <div
        className={`fixed top-[64px] ${
          isNarrow ? "left-[118px]" : "left-[266px]"
        } inset-0 transition-all duration-1000 h-[calc(100%-64px)] ${
          showCompanyIntro
            ? " bg-primary-neutral-black/15 pointer-events-auto"
            : " bg-primary-neutral-black/0 pointer-events-none"
        }`}
        onClick={handleBackgroundClick}
      ></div>
      <div
        className={`fixed top-[64px] transition-all duration-700 ${
          showCompanyIntro
            ? `${
                isNarrow ? "left-[118px]" : "left-[266px]"
              } pointer-events-auto`
            : "-left-[500px] pointer-events-none"
        } h-[calc(100%-64px)] w-[400px] flex`}
      >
        <div className="w-[400px] bgColor-navy border-r border-l borderColor shadow-s overflow-scroll">
          <div className="bg-secondary-blue-100 h-fit p-xl flex items-center justify-start border-t borderColor gap-x-2 gap-y-2 flex-wrap whitespace-normal ">
            <Place place={place} />
            {isNew && <New />}
            <Rating rating={rating} />
            {workTypeList.map((workTypeItem) => (
              <WorkType key={workTypeItem.id} workType="철강구조물공사업" />
            ))}
          </div>
          <div className="h-[56px] pl-8 flex items-center justify-start text-subTitle-20 border-b borderColor bgColor-white textColor-mid-emphasis   ">
            기업 개요
          </div>
          <div className="gap-y-2">
            <DetailCompanyIntroT1
              title="기업 정보"
              subTitle={[
                "사업자 등록번호",
                "법인 등록번호",
                "전화번호",
                "소재지",
                "상세 주소",
              ]}
              info={companyOutline.companyOutline}
              toggleIsOpen={toggleIsOpen[0]}
              onToggle={() => toggleOpen(0)}
            />

            <DetailCompanyIntroT1
              title="담당자 정보"
              subTitle={["담당자명", "담당자 전화번호", "담당자 이메일"]}
              info={managerInfo.managerInfo}
              toggleIsOpen={toggleIsOpen[1]}
              onToggle={() => toggleOpen(1)}
            />
            <DetailCompanyCapacity
              title="시공능력평가"
              toggleIsOpen={toggleIsOpen[2]}
              onToggle={() => toggleOpen(2)}
              workTypeList={[
                // 직접 작성함
                {
                  id: 1,
                  workType: "철강구조물공사업",
                  capacityValueList: [
                    {
                      id: 1,
                      year1Value: 850000,
                      year2Value: 80000,
                      year3Value: 95000,
                      nationalRanking: 247,
                      regionalRanking: 35,
                      nationalRankingRatio: 3,
                      regionalRankingRatio: 5,
                    },
                  ],
                },
              ]}
            />

            <DetailCompanyIntroT2
              title="회사 소개"
              info={introInfo.intro}
              toggleIsOpen={toggleIsOpen[3]}
              onToggle={() => toggleOpen(3)}
            />

            {/* <DetailCompanyIntroT3
              title="회사 주요 연혁"
              date={historyInfo.Date}
              event={historyInfo.Event}
              toggleIsOpen={toggleIsOpen[4]}
              onToggle={() => toggleOpen(4)}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyIntro;
