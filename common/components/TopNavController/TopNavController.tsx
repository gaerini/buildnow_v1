"use client";

import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import CompanyIntro from "../CompanyIntro/CompanyIntro";
import BusinessType from "../Badge/BusinessType";
import { Boolean } from "aws-sdk/clients/batch";
import { useLoading } from "../../../common/components/LoadingContext";
import LicenseBadge from "../Badge/LicenseBadge";
import WorkTypeBadge from "../Badge/WorkTypeBadge";

interface license {
  id: number;
  licenseName: string;
  capacityValue: number;
  licenseSeq: string;
  licenseYear: string;
  cvRank: number;
  percentage: number;
}

interface TopNavControllerProps {
  companyName: string;
  workType: string | null;
  type: string;
  licenseList?: license[];
  // companyBefore: string;
  // companyAfter: string;
  place: string;
  isNew: boolean;
  rating: number;
  companyOutline: { companyOutline: string[] };
  managerInfo: { managerInfo: string[] };
  introInfo: { intro: string };
  // historyInfo: { Date: string[]; Event: string[] };

  isNarrow: boolean;
}

const TopNavController: React.FC<TopNavControllerProps> = ({
  companyName,
  workType,
  type,
  licenseList,
  // companyBefore,
  // companyAfter,
  place,
  isNew,
  rating,
  companyOutline,
  managerInfo,
  introInfo,
  // historyInfo,
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

            {/* <span className="text-paragraph-14 font-medium textColor-mid-emphasis whitespace-nowrap">
              {workType}
            </span> */}
            {/* <BusinessType businessType={type} /> */}
            <div className="flex items-center gap-x-2">
              {licenseList?.map((licenseListItem) => (
                <LicenseBadge
                  key={licenseListItem.id}
                  license={licenseListItem.licenseName}
                />
              ))}
              <WorkTypeBadge workType={workType} />
            </div>
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
        // historyInfo={historyInfo}
        licenseList={licenseList}
        isNarrow={isNarrow}
      />
    </div>
  );
};

export default TopNavController;
