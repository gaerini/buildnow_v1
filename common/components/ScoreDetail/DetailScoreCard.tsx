// DetailScoreCard.tsx
"use client";

import React, { useEffect } from "react";

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
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isPass: string;
}

const DetailScoreCard: React.FC<DetailScoreCardProps> = ({
  categoryInfo,
  upperCategory,
  isLoading,
  setIsLoading,
  isPass,
}) => {
  useEffect(() => {
    // 화면에 렌더링이 완료된 후 isLoading을 false로 설정
    setIsLoading(false);
  }, []);
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
                {categoryInfo.evalScore}
              </span>{" "}
              <span className="text-subTitle-18 font-normal textColor-mid-emphasis whitespace-nowrap">
                / {categoryInfo.totalScore}
              </span>
            </p>
          </div>

          {/* 세부 카테고리 정보 */}
          {categoryInfo.DetailCat.map((cat, i) => (
            <div
              key={i}
              className="mb-2 last:mb-0 flex items-center justify-between"
            >
              <p className="text-subTitle-16 textColor-black font-normal whitespace-nowrap">
                {cat}
              </p>
              <div className="flex justify-end items-center gap-x-9">
                <div className="flex flex-grow justify-center items-center">
                  <div
                    className={`badgeSize-l w-[80px] flex justify-center items-center whitespace-nowrap border ${
                      isPass === "불합격"
                        ? "bgColor-neutral textColor-mid-emphasis borderColor"
                        : "bgColor-blue textColor-focus border-primary-blue-original"
                    }`}
                  >
                    {categoryInfo.DetailCatValue[i]}
                  </div>
                </div>
                <p className="w-[57px] flex justify-between  items-center ">
                  <span className="w-[22px] text-subTitle-18 font-bold textColor-black whitespace-nowrap  flex justify-center">
                    {categoryInfo.DetailCatEvalScore[i]}
                  </span>
                  <span className="w-[7px] text-subTitle-18 font-normal textColor-mid-emphasis whitespace-nowrap flex justify-center">
                    /
                  </span>
                  <span className="w-[22px] text-subTitle-18 font-normal textColor-mid-emphasis whitespace-nowrap flex justify-center">
                    {categoryInfo.DetailCatTotalScore[i]}
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
