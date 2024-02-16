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
  isChecked: boolean;
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
  isChecked,
}) => {
  useEffect(() => {
    // 화면에 렌더링이 완료된 후 isLoading을 false로 설정
    setIsLoading(false);
  }, []);
  console.log(isChecked);
  return (
    <div
      className=" top-0 left-0 max-w-[500px] flex flex-col bgColor-white"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      {/* ScoreCard Section */}
      <div className="px-8 py-4  w-[500px]  border-r  borderColor">
        {isLoading ? (
          <div
            className={` flex flex-col justify-center items-center rounded-s py-5 px-[95px] border ${
              isPass === "탈락"
                ? "bgColor-neutral border-color-neutral"
                : "bgColor-blue border-primary-blue-original"
            }`}
          >
            <p
              className={`text-subTitle-20 font-semibold mb-2 ${
                isPass === "탈락"
                  ? "textColor-mid-emphasis"
                  : "textColor-focus"
              }`}
            >
              {companyName}
              <span
                className={`text-subTitle-20 font-normal ${
                  isPass === "탈락"
                    ? "textColor-mid-emphasis"
                    : "textColor-focus"
                }`}
              >
                의 배점 결과
              </span>
            </p>
            <p>
              <span
                className={`text-title-28 font-bold ${
                  isPass === "탈락"
                    ? "textColor-mid-emphasis"
                    : "textColor-focus"
                }`}
              >
                {totalScore}
              </span>
              <span
                className={`text-title-28 font-light ${
                  isPass === "탈락"
                    ? "textColor-mid-emphasis"
                    : "textColor-focus"
                }`}
              >
                {" "}
                / 100 점 |{" "}
              </span>
              <span
                className={`text-title-28 font-bold ${
                  isPass === "탈락"
                    ? "textColor-mid-emphasis"
                    : "textColor-focus"
                }`}
              >
                {isPass}
              </span>
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
          isPass={isPass}
        />
        <DetailScoreCard
          categoryInfo={FinInfo}
          upperCategory="02. 재무부문"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isPass={isPass}
        />
        <DetailScoreCard
          categoryInfo={CertiInfo}
          upperCategory="03. 인증현황"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isPass={isPass}
        />
        <DetailScoreCard
          categoryInfo={ConstInfo}
          upperCategory="04. 시공실적"
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isPass={isPass}
        />
      </div>

      {/* Button Section */}
      <div className="p-2xl border-r">
        {isLoading &&
          (isChecked ? (
            <button className="w-full rounded-s bgColor-neutral btnSize-xl textColor-mid-emphasis border-none cursor-not-allowed">
              배점표 검토 완료
            </button>
          ) : (
            <button
              className="w-full btnStyle-main-1 btnSize-xl  hover:bg-primary-blue-400 hover:text-primary-navy-original"
              onClick={onReviewComplete}
            >
              배점표 검토하기
            </button>
          ))}
      </div>
    </div>
  );
};

export default ScoreDetail;
