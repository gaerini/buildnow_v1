"use client";

import React, { useState, useEffect } from "react";
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
    setShowCompanyIntro((prev) => !prev);
  };

  const icon = showCompanyIntro ? "CaretDoubleLeft" : "Accordion";
  const companyNameClass = showCompanyIntro
    ? "text-primary-navy-600"
    : "text-primary-neutral-black";

  const companyInfo = {
    companyInfo: [
      "123-45-67890",
      "987-65-43210",
      "02-1234-5678",
      "경기도",
      "경기도 파주시 예시로 123 3층",
    ],
  };

  const managerInfo = {
    managerInfo: ["홍길동", "02-8765-4321", "example@example.com"],
  };

  const introInfo = {
    intro:
      "먼저 귀사의 무궁한 발전을 기원 드립니다.\n 당사는 철근콘크리트 및 철강구조물 면허를 보유한 전문 건설 업체로서 ㈜ OO 산업, OO 개발의 년간 단가 업체로서 협력한 바 있습니다. \n\n 각 현장에서 우수한 시공 능력으로 오래된 경험과 축척된 노하우로 현장에서 요구하고 있는 최상의 품질과 안전 및 성실 시공으로 건설업계 최고의 품질을 제공하고 있으며, 신제품 개발로 사랑 받는 기업이 될것을 약속 드리며 귀사의 협력업체로 등록하여 동반 성장하고자 합니다",
  };

  const historyInfo = {
    Date: [
      "2003. 07. 01",
      "2006. 06. 13",
      "2011. 11. 06",
      "2015. 09. 11",
      "2019. 01. 23",
    ],
    Event: [
      "회사 설립",
      "XX 면허 취득",
      "대표자 변경",
      "주소지 이전",
      "oo건설 우수 협력사 선정",
    ],
  };

  return (
    <div className="flex grow justify-between items-center w-full bg-primary-neutral-white">
      <div className="flex items-center">
        <button onClick={toggleCompanyIntro}>
          <Icon name={icon} width={24} height={24} />
        </button>
        <span
          className={`ml-4 text-subTitle-20 font-bold whitespace-nowrap ${companyNameClass}`}
        >
          {companyName}
        </span>
        <span className="ml-4 text-paragraph-14 font-medium text-primary-neutral-600 whitespace-nowrap">
          {workType}
        </span>
      </div>
      {/* 오른쪽 영역 */}
      <div className="flex items-center">
        <button
          className="btnStyle-main-2 btnSize-s text-primary-neutral-700 hover:text-primary-neutral-black  hover:bg-primary-neutral-100 flex gap-x-2 items-center whitespace-nowrap"
          onClick={() => console.log("이전 업체 정보로 이동")}
        >
          <Icon name="ArrowLeft" width={16} height={16} />
          {companyBefore}
        </button>
        <span className="ml-2 text-paragraph-14 text-primary-navy-500 whitespace-nowrap">
          이전 업체
        </span>
        <span className="mx-4 text-paragraph-16 text-primary-navy-500 whitespace-nowrap">
          |
        </span>
        <span className="mr-2 text-paragraph-14 text-primary-navy-500 whitespace-nowrap">
          다음 업체
        </span>
        <button
          className="btnStyle-main-2 btnSize-s text-primary-neutral-700 hover:text-primary-neutral-black  hover:bg-primary-neutral-100 flex gap-x-2 items-center whitespace-nowrap"
          onClick={() => console.log("다음 업체 정보로 이동")}
        >
          {companyAfter}
          <Icon name="ArrowRight" width={16} height={16} />
        </button>
      </div>

      <CompanyIntro
        companyName={companyName}
        workType={workType}
        place={"경기"}
        isNew={true}
        rating={3.7}
        isOpen={showCompanyIntro}
        companyInfo={companyInfo}
        managerInfo={managerInfo}
        introInfo={introInfo}
        historyInfo={historyInfo}
      />
    </div>
  );
};

export default TopNavController;
