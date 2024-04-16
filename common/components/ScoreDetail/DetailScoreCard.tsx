// DetailScoreCard.tsx
"use client";

import React, { useEffect } from "react";
import { useLoading } from "../../../common/components/LoadingContext";
import { ApplierScore } from "../../../src/app/list/details/[applicationId]/Interface";

interface GradingValueType {
  [key: string]: string;
}

interface DetailScoreCardProps {
  categoryInfo: ApplierScore;
  upperCategory: string;
  isPass: string;
  gradingValue: GradingValueType;
}

const DetailScoreCard: React.FC<DetailScoreCardProps> = ({
  categoryInfo,
  upperCategory,
  isPass,
  gradingValue,
}) => {
  const { isLoading, setIsLoading } = useLoading();
  console.log("디테일스코어", categoryInfo);
  return (
    <>
      {/* 상단 대분류 정보 */}
      {isLoading ? (
        <div className="bgColor-white border borderColor p-4 rounded-s">
          <div className="flex justify-between items-center pb-2 border-b borderColor mb-4">
            <p className="text-paragraph-16 font-bold textColor-mid-emphasis whitespace-nowrap">
              {upperCategory}
            </p>
            <p>
              <span className="text-subTitle-18 font-bold textColor-focus whitespace-nowrap">
                {categoryInfo?.upperCategoryScore}
              </span>{" "}
              <span className="text-subTitle-18 font-normal textColor-mid-emphasis whitespace-nowrap">
                / {categoryInfo?.upperCategoryPerfectScore}
              </span>
            </p>
          </div>

          {/* 세부 카테고리 정보 */}
          {categoryInfo.scoreList.map((cat, i) => (
            <div
              key={i}
              className="mb-2 last:mb-0 flex items-center justify-between"
            >
              <p className="text-subTitle-16 textColor-high-emphasis after:font-normal whitespace-nowrap">
                {cat.category}
              </p>
              <div className="flex justify-end items-center gap-x-9">
                <div className="flex flex-grow justify-center items-center">
                  <div
                    className={`badgeSize-l w-[80px] flex justify-center items-center whitespace-nowrap border ${
                      isPass === "탈락"
                        ? "bgColor-neutral textColor-mid-emphasis borderColor"
                        : "bgColor-blue textColor-focus border-primary-blue-original"
                    }`}
                  >
                    {gradingValue[cat.category]}
                  </div>
                </div>
                <p className="w-[57px] flex justify-between  items-center ">
                  <span className="w-[22px] text-subTitle-18 font-bold textColor-high-emphasis after:whitespace-nowrap  flex justify-center">
                    {cat.score}
                  </span>
                  <span className="w-[7px] text-subTitle-18 font-normal textColor-mid-emphasis whitespace-nowrap flex justify-center">
                    /
                  </span>
                  <span className="w-[22px] text-subTitle-18 font-normal textColor-mid-emphasis whitespace-nowrap flex justify-center">
                    {cat.perfectScore}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="h-[100px] animate-pulse bgColor-neutral rounded-s border-none" />
      )}
    </>
  );
};

export default DetailScoreCard;
