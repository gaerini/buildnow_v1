"use client";

import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import CompanyIntro from "../CompanyIntro/CompanyIntro";
import BusinessType from "../Badge/BusinessType";
import { Boolean } from "aws-sdk/clients/batch";
import { useLoading } from "../../../common/components/LoadingContext";

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

interface TopNavControllerProps {
  companyName: string;
  workType: string|null;
  workTypeList?: WorkType[];
  // companyBefore: string;
  // companyAfter: string;
  place: string;
  isNew: boolean;
  rating: number;
  companyOutline: { companyOutline: string[] };
  managerInfo: { managerInfo: string[] };
  introInfo: { intro: string };
  historyInfo: { Date: string[]; Event: string[] };

  isNarrow: boolean;
}

const TopNavController: React.FC<TopNavControllerProps> = ({
  companyName,
  workType,
  workTypeList,
  // companyBefore,
  // companyAfter,
  place,
  isNew,
  rating,
  companyOutline,
  managerInfo,
  introInfo,
  historyInfo,

  isNarrow,
}) => {
  const [showCompanyIntro, setShowCompanyIntro] = useState(false);
  const { isLoading, setIsLoading } = useLoading();
  const toggleCompanyIntro = () => {
    setShowCompanyIntro((prev) => !prev);
  };

  const icon = showCompanyIntro ? "CaretDoubleLeft" : "Accordion";
  const companyNameClass = showCompanyIntro
    ? "text-primary-navy-600"
    : "text-black";

  return (
    <div className="flex grow justify-between items-center w-full bgColor-white">
      {isLoading ? (
        <>
          <div className="flex items-center gap-x-4">
            <button onClick={toggleCompanyIntro}>
              <Icon name={icon} width={24} height={24} />
            </button>
            <span
              className={`text-subTitle-20 font-bold whitespace-nowrap text-title ${companyNameClass}`}
            >
              {companyName}
            </span>

            <span className="text-paragraph-14 font-medium textColor-mid-emphasis whitespace-nowrap">
              {workType}
            </span>
            <BusinessType businessType="법인" />
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-x-2 justify-items-start">
            <div className="animate-pulse h-[28px] w-[155px] bgColor-neutral rounded-s" />
            <div className="animate-pulse h-[20px] w-[148px] bgColor-neutral rounded-s" />
          </div>
        </>
      )}

      <CompanyIntro
        place={place}
        isNew={isNew}
        rating={rating}
        showCompanyIntro={showCompanyIntro}
        setShowCompanyIntro={setShowCompanyIntro}
        companyOutline={companyOutline}
        managerInfo={managerInfo}
        introInfo={introInfo}
        historyInfo={historyInfo}
        workTypeList={[ // 직접 작성함
          {
            id: 1,
            workType: workType,
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
        isNarrow={isNarrow}
      />
    </div>
  );
};

export default TopNavController;
