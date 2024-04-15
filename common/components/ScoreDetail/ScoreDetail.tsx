"use client";

import React, { useEffect } from "react";
import DetailScoreCard from "./DetailScoreCard";
import { useLoading } from "../../../common/components/LoadingContext";
import { ApplierScore } from "../../../src/app/list/details/[applicationId]/Interface";

interface GradingValueType {
  [key: string]: string;
}

interface ScoreDetailProps {
  companyName: string;
  totalScore: number;
  isPass: string;
  applierScore: ApplierScore[];
  onReviewComplete: () => void;
  isChecked: boolean;
  gradingValue: GradingValueType;
}

const ScoreDetail: React.FC<ScoreDetailProps> = ({
  companyName,
  totalScore,
  isPass,
  applierScore,
  onReviewComplete,
  isChecked,
  gradingValue,
}) => {
  const { isLoading, setIsLoading } = useLoading();

  let BizInfo: ApplierScore[] = [];
  let FinInfo: ApplierScore[] = [];
  let CertiInfo: ApplierScore[] = [];
  let ConstInfo: ApplierScore[] = [];

  applierScore.forEach((item: ApplierScore) => {
    switch (item.upperCategory) {
      case "BUSINESS":
        BizInfo.push(item);
        break;
      case "FINANCE":
        FinInfo.push(item);
        break;
      case "AUTHENTICATION":
        CertiInfo.push(item);
        break;
      case "PERFORMANCE":
        ConstInfo.push(item);
        break;
      default:
        // 만약 새로운 카테고리가 추가된 경우 여기에 처리 로직을 추가할 수 있습니다.
        break;
    }
  });

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
                isPass === "탈락" ? "textColor-mid-emphasis" : "textColor-focus"
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
          categoryInfo={BizInfo[0]}
          upperCategory="01. 경영일반"
          isPass={isPass}
          gradingValue={gradingValue}
        />
        <DetailScoreCard
          categoryInfo={FinInfo[0]}
          upperCategory="02. 재무부문"
          isPass={isPass}
          gradingValue={gradingValue}
        />
        <DetailScoreCard
          categoryInfo={CertiInfo[0]}
          upperCategory="03. 인증현황"
          isPass={isPass}
          gradingValue={gradingValue}
        />
        <DetailScoreCard
          categoryInfo={ConstInfo[0]}
          upperCategory="04. 시공실적"
          isPass={isPass}
          gradingValue={gradingValue}
        />
      </div>

      {/* Button Section */}
      <div className="p-xl border-r">
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
