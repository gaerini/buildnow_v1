// DetailScoreCard.tsx
"use client";

import React from "react";

interface DetailScoreCardProps {
  categoryInfo: {
    totalScore: number;
    evalScore: number;
    DetailCat: string[];
    DetailCatValue: string[];
    DetailCatTotalScore: number[];
    DetailCatEvalScore: number[];
  };
  upperCategory: string;
}

const DetailScoreCard: React.FC<DetailScoreCardProps> = ({
  categoryInfo,
  upperCategory,
}) => {
  return (
    <div className="bg-white border border-primary-navy-200 p-4 rounded">
      {/* 상단 대분류 정보 */}
      <div className="flex justify-between items-center pb-2 border-b border-primary-navy-200 mb-4">
        <p className="text-paragraph-16 font-bold text-primary-navy-700 whitespace-nowrap">
          {upperCategory}
        </p>
        <p>
          <span className="text-subTitle-18 font-bold text-secondary-green-original whitespace-nowrap">
            {categoryInfo.evalScore}
          </span>{" "}
          <span className="text-subTitle-18 font-normal text-primary-neutral-500 whitespace-nowrap">
            / {categoryInfo.totalScore}
          </span>
        </p>
      </div>

      {/* 세부 카테고리 정보 */}
      {categoryInfo.DetailCat.map((cat, i) => (
        <div key={i} className="mb-2 last:mb-0 grid grid-cols-2">
          <p className="text-subTitle-16 text-primary-neutral-black font-normal whitespace-nowrap">
            {cat}
          </p>
          <div className="flex justify-end items-center">
            <div className="flex flex-grow justify-center items-center">
              <div className="badgeSize-l bg-primary-navy-100 w-[80px] flex justify-center items-center">
                <p className="text-primary-navy-original whitespace-nowrap">
                  {categoryInfo.DetailCatValue[i]}
                </p>
              </div>
            </div>
            <p className="w-[65px] flex justify-end gap-x-1 items-center">
              <span className="text-subTitle-18 font-bold text-primary-neutral-black whitespace-nowrap">
                {categoryInfo.DetailCatEvalScore[i]}
              </span>
              <span className="text-subTitle-18 font-normal text-primary-neutral-500">
                /
              </span>
              <span className="text-subTitle-18 font-normal text-primary-neutral-500 whitespace-nowrap">
                {categoryInfo.DetailCatTotalScore[i]}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailScoreCard;
