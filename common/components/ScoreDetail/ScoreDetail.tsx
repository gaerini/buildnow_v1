"use client";

import React from "react";
import DetailScoreCard from "./DetailScoreCard";

interface ScoreDetailProps {
  companyName: string;
  totalScore: number;
  isPass: string;
  MngInfo: CategoryInfo;
  FinInfo: CategoryInfo;
  CertiInfo: CategoryInfo;
  ConstInfo: CategoryInfo;
}

interface CategoryInfo {
  totalScore: number;
  evalScore: number;
  DetailCat: string[];
  DetailCatValue: string[];
  DetailCatTotalScore: number[];
  DetailCatEvalScore: number[];
}

const ScoreDetail: React.FC<ScoreDetailProps> = ({
  companyName,
  totalScore,
  isPass,
  MngInfo,
  FinInfo,
  CertiInfo,
  ConstInfo,
}) => {
  return (
    <div
      className=" top-0 left-0 w-[500px] flex flex-col bg-primary-neutral-white border-r  border-primary-navy-200 z-10"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* ScoreCard Section */}
      <div className="px-8 py-4 bg-primary-neutral-white">
        <div className="h-[105px] flex flex-col justify-center items-center bg-primary-navy-300 rounded-s py-5 px-[95px]">
          <p className="first-letter:text-subTitle-20 text-primary-navy-original font-semibold mb-2">
            {companyName}
            <span className="font-normal">의 배점 결과</span>
          </p>
          <p className="text-title-28 text-primary-navy-original font-bold">
            {totalScore}
            <span className="font-light"> / 100 점 |</span> {isPass}
          </p>
        </div>
      </div>

      {/* DetailScoreCard Sections */}
      <div className="flex-grow px-8 py-4 space-y-4 overflow-y-scroll mb-auto">
        <DetailScoreCard categoryInfo={MngInfo} upperCategory="01. 경영일반" />
        <DetailScoreCard categoryInfo={FinInfo} upperCategory="02. 재무부문" />
        <DetailScoreCard
          categoryInfo={CertiInfo}
          upperCategory="03. 인증현황"
        />
        <DetailScoreCard
          categoryInfo={ConstInfo}
          upperCategory="04. 시공실적"
        />
      </div>

      {/* Button Section */}
      <div className="px-8 py-4">
        <button
          className="w-full btnStyle-main-1 btnSize-xl hover:bg-primary-navy-400 hover:text-primary-navy-original"
          onClick={() => console.log("배점표 검토 완료함")}
        >
          배점표 검토 완료하기
        </button>
      </div>
    </div>
  );
};

export default ScoreDetail;
