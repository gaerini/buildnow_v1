"use client";

import React, { useState } from "react";
import Icon from "../Icon/Icon";

interface CompanyIntroProps {
  companyName: string; // companyName prop 추가
  workType: string;
  onClose: boolean;
}

const CompanyIntro: React.FC<{
  companyName: string;
  workType: string;
  onClose: () => void;
}> = ({ companyName, workType, onClose }) => {
  return (
    <div className="fixed top-0 left-[266px] h-full w-[calc(100%-266px)] flex">
      <div className="w-[400px] bg-primary-navy-200 border-r border-l border-primary-navy-200 shadow-r shadow-s">
        <div className="bg-primary-neutral-white flex items-center p-4 h-16">
          <button onClick={onClose}>
            <Icon name="CaretDoubleLeft" width={24} height={24} />
          </button>
          <span className="ml-4 text-subTitle-20 font-bold text-primary-navy-600">
            {companyName}
          </span>
          <span className="ml-4 text-paragraph-14 font-medium text-primary-neutral-600">
            {workType}
          </span>
        </div>
        {/* 추가 컨텐츠 */}
      </div>
      <div className="flex-grow bg-primary-neutral-black opacity-10"></div>
    </div>
  );
};

export default CompanyIntro;
