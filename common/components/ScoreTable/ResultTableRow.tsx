"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";

const ResultTableRow: React.FC<{ company: CompanyScoreSummary }> = ({
  company,
}) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const NavItemClick = (path: string) => {
    if (isClient) {
      router.push(path);
    }
  };

  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div className="w-[16.68%] px-8 py-4 bg-white border-b border-gray-300 justify-start items-center inline-flex">
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div>
            <div className="text-primary-neutral-black text-lg font-normal">
              {company.companyName}
            </div>
            {company.isRead && (
              <div className="h-4 relative">
                <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bg-orange-300 rounded" />
              </div>
            )}
          </div>
          <div className="text-primary-neutral-400 text-xs font-normal leading-none">
            {company.applyingWorkType}
          </div>
        </div>
      </div>

      {/* 숫자 데이터 */}
      {["경영 일반", "재무 부문", "인증 현황", "시공 실적"].map((key) => (
        <div
          className="w-[12.5%] px-8 py-4 bg-gray-100 border-b border-gray-300 justify-start items-center inline-flex"
          key={key}
        >
          <div className="h-[40px] justify-start items-center inline-flex gap-0.5">
            <div className="m-1 text-primary-neutral-black text-subTitle-18 font-bold ">
              {company.score[key as keyof ScoreSummary]}
            </div>
            <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
              /
            </div>
            <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
              10
            </div>
          </div>
        </div>
      ))}

      {/* 총점수 */}
      <div className="w-[9.93%] px-8 py-4 bg-white border-b border-gray-300">
        <div className="h-[40px] text-primary-neutral-black text-subTitle-18 font-normal justify-start items-center inline-flex">
          {company.scoreSum}
        </div>
      </div>

      {/* 결과 */}
      <div className="w-[8.86%] px-8 py-4 bg-white border-b border-gray-300 ">
        <div
          className={`h-[40px] text-subTitle-18 font-normal justify-start items-center inline-flex whitespace-nowrap  ${
            company.isPass === "불합격"
              ? "text-danger-red"
              : company.isPass === "미달"
              ? "textColor-mid-emphasis"
              : "text-primary-neutral-black"
          }`}
        >
          {company.isPass}
        </div>
      </div>

      {/* 배점표 검토 버튼 */}
      <div className="w-[14.53%] px-8 py-4 bg-white border-b border-gray-300 items-center gap-2.5 inline-flex">
        <div className="h-[40px] justify-start items-center gap-2 flex">
          <button
            className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
            onClick={() => NavItemClick("/details/34-56-678901")}
          >
            서류 확인하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultTableRow;
