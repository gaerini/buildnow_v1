"use client";

import React, { useEffect } from "react";
import DetailScoreCard from "./DetailScoreCard";

interface ScoreDetailProps {
  companyName: string;
  totalScore: number;
  isPass: string;
  MngInfo: CategoryInfo;
  FinInfo: CategoryInfo;
  CertiInfo: CategoryInfo;
  ConstInfo: CategoryInfo;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
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
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    // 화면에 렌더링이 완료된 후 isLoading을 false로 설정
    setIsLoading(false);
  }, []);

  return (
    <div
      className=" top-0 left-0 max-w-[500px] flex flex-col bg-primary-neutral-white"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* ScoreCard Section */}
      <div className="px-8 py-4 bg-primary-neutral-white w-[500px]  border-r  border-primary-navy-200">
        {isLoading ? (
          <div className="h-[105px] flex flex-col justify-center items-center bg-primary-navy-300 rounded-s py-5 px-[95px]">
            <p className="text-subTitle-20 text-primary-navy-original font-semibold mb-2">
              {companyName}
              <span className="font-normal">의 배점 결과</span>
            </p>
            <p className="text-title-28 text-primary-navy-original font-bold">
              {totalScore}
              <span className="font-light"> / 100 점 |</span> {isPass}
            </p>
          </div>
        ) : (
          <div className="animate-pulse h-[105px] width-[300px] bg-primary-neutral-100 rounded-s" />
        )}
      </div>

      {/* DetailScoreCard Sections */}
      <div className="flex-grow px-8 py-4 space-y-4 overflow-y-scroll mb-auto  border-r  border-primary-navy-200">
        <DetailScoreCard
          categoryInfo={MngInfo}
          upperCategory="01. 경영일반"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <DetailScoreCard
          categoryInfo={FinInfo}
          upperCategory="02. 재무부문"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <DetailScoreCard
          categoryInfo={CertiInfo}
          upperCategory="03. 인증현황"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <DetailScoreCard
          categoryInfo={ConstInfo}
          upperCategory="04. 시공실적"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>

      {/* Button Section */}
      <div className="px-8 py-4  border-r  border-primary-navy-200">
        {isLoading ? (
          <button
            className="w-full btnStyle-main-1 btnSize-xl hover:bg-primary-navy-400 hover:text-primary-navy-original"
            onClick={() => console.log("배점표 검토 완료함")}
          >
            배점표 검토 완료하기
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ScoreDetail;
