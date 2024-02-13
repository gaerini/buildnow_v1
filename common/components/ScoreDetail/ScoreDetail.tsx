"use client";

import React, { useEffect } from "react";
import DetailScoreCard from "./DetailScoreCard";

interface CategoryInfo {
  totalScore: number;
  evalScore: number;
  DetailCat: string[];
  DetailCatValue: string[];
  DetailCatTotalScore: number[];
  DetailCatEvalScore: number[];
}

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
  onReviewComplete: () => void;
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
  onReviewComplete,
}) => {
  useEffect(() => {
    // 화면에 렌더링이 완료된 후 isLoading을 false로 설정
    setIsLoading(false);
  }, []);

  return (
    <div
      className=" top-0 left-0 max-w-[500px] flex flex-col bgColor-white"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* ScoreCard Section */}
      <div className="px-8 py-4  w-[500px]  border-r  borderColor">
        {isLoading ? (
          <div className="h-[105px] flex flex-col justify-center items-center bgColor-blue rounded-s py-5 px-[95px] border border-primary-blue-original">
            <p className="text-subTitle-20 textColor-focus font-semibold mb-2">
              {companyName}
              <span className="font-normal textColor-focus">의 배점 결과</span>
            </p>
            <p className="text-title-28 textColor-focus font-bold">
              {totalScore}
              <span className="font-light textColor-focus"> / 100 점 | </span>
              {isPass}
            </p>
          </div>
        ) : (
          <div className="animate-pulse h-[105px]  bgColor-neutral rounded-s" />
        )}
      </div>

      {/* DetailScoreCard Sections */}
      <div className="flex-grow px-8 py-4 space-y-4 overflow-y-scroll mb-auto  border-r  borderColor">
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
      <div className="p-2xl border-r">
        {isLoading ? (
          <button
            className="w-full btnStyle-main-1 btnSize-xl bg-primary-blue-original textColor-white hover:bg-primary-blue-400 hover:text-primary-navy-original"
            onClick={onReviewComplete}
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
