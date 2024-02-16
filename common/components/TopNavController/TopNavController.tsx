"use client";

import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import CompanyIntro from "../CompanyIntro/CompanyIntro";

interface TopNavControllerProps {
  companyName: string;
  workType: string;
  // companyBefore: string;
  // companyAfter: string;
  place: string;
  isNew: boolean;
  rating: number;
  companyOutline: { companyOutline: string[] };
  managerInfo: { managerInfo: string[] };
  introInfo: { intro: string };
  historyInfo: { Date: string[]; Event: string[] };
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TopNavController: React.FC<TopNavControllerProps> = ({
  companyName,
  workType,
  // companyBefore,
  // companyAfter,
  place,
  isNew,
  rating,
  companyOutline,
  managerInfo,
  introInfo,
  historyInfo,
  isLoading,
  setIsLoading,
}) => {
  const [showCompanyIntro, setShowCompanyIntro] = useState(false);

  const toggleCompanyIntro = () => {
    setShowCompanyIntro((prev) => !prev);
  };

  const icon = showCompanyIntro ? "CaretDoubleLeft" : "Accordion";
  const companyNameClass = showCompanyIntro
    ? "text-primary-navy-600"
    : "text-black";

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="flex grow justify-between items-center w-full bgColor-white">
      {isLoading ? (
        <>
          <div className="flex items-center">
            <button onClick={toggleCompanyIntro}>
              <Icon name={icon} width={24} height={24} />
            </button>
            <span
              className={`ml-4 text-subTitle-20 font-bold whitespace-nowrap text-title ${companyNameClass}`}
            >
              {companyName}
            </span>

            <span className="ml-4 text-paragraph-14 font-medium textColor-mid-emphasis whitespace-nowrap">
              {workType}
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-x-2 justify-items-start">
            <div className="animate-pulse  h-[28px] w-[155px] bgColor-neutral rounded-s" />
            <div className="animate-pulse  h-[20px] w-[148px] bgColor-neutral rounded-s" />
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
      />
    </div>
  );
};

export default TopNavController;
