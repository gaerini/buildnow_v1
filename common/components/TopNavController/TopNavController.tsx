"use client";

import React, { useState } from "react";
import Icon from "../Icon/Icon";
import CompanyIntro from "../CompanyIntro/CompanyIntro";

interface TopNavControllerProps {
  companyName: string;
  workType: string;
  companyBefore: string;
  companyAfter: string;
}

const TopNavController: React.FC<TopNavControllerProps> = ({
  companyName,
  workType,
  companyBefore,
  companyAfter,
}) => {
  const [showCompanyIntro, setShowCompanyIntro] = useState(false);

  const toggleCompanyIntro = () => {
    setShowCompanyIntro(!showCompanyIntro);
  };

  return (
    <div className="flex grow justify-between items-center w-full bg-primary-neutral-white">
      <div className="flex items-center">
        <button onClick={toggleCompanyIntro}>
          <Icon name="Accordion" width={24} height={24} />
        </button>
        <span className="ml-4 text-subTitle-20 font-bold text-primary-neutral-black">
          {companyName}
        </span>
        <span className="ml-4 text-paragraph-14 font-medium text-primary-neutral-600">
          {workType}
        </span>
      </div>

      {/* 오른쪽 영역 */}
      <div className="flex items-center">
        <button
          className="btnStyle-textOnly text-primary-navy-500 hover:text-primary-navy-original flex gap-x-2 items-center"
          onClick={() => console.log("이전 업체 정보로 이동")}
        >
          <Icon name="ArrowLeft" width={20} height={20} />
          {companyBefore}
        </button>
        <span className="mx-4 text-paragraph-16 text-primary-navy-500">|</span>
        <button
          className="btnStyle-textOnly text-primary-navy-500 hover:text-primary-navy-original flex gap-x-2 items-center"
          onClick={() => console.log("다음 업체 정보로 이동")}
        >
          {companyAfter}
          <Icon name="ArrowRight" width={20} height={20} />
        </button>
      </div>

      {showCompanyIntro && (
        <CompanyIntro
          companyName={companyName}
          workType={workType}
          onClose={toggleCompanyIntro}
        />
      )}
    </div>
  );
};

export default TopNavController;
