"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ScoreSummary,
  CompanyScoreSummary,
  Total,
} from "../../Interface/CompanyData";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading } from "../../LoadingContext";

const ListTableRow: React.FC<{
  company: CompanyScoreSummary;
  isOption: string | null;
  standard: Total;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ company, isOption, standard }) => {
  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();

  const cookieJWTToken = Cookies.get("token");
  const axiosInstance = axios.create({
    baseURL:
      "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
    headers: {
      Authorization: `Bearer ${cookieJWTToken}`,
    },
  });

  const handlePatchRequest = async (businessId: string) => {
    try {
      await axiosInstance.patch(`application/isRead/${businessId}`);
      console.log("Patch request successful");
    } catch (error) {
      console.error("Error in patch request:", error);
    }
  };

  const goToDetailPage = (businessId: string) => {
    handlePatchRequest(businessId);
    router.push(`/details/${businessId}`);
  };

  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div
        className={`w-[16.68%] px-8 py-4 bgColor-white justify-start items-center inline-flex whitespace-nowrap ${
          isLoading ? "border-b border-gray-300" : ""
        }`}
      >
        {isLoading ? (
          <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
            <div className="inline-flex justify-start items-center gap-2">
              <div className="text-primary-neutral-black text-lg font-normal">
                {company.companyName}
              </div>
              {!company.isRead && (
                <div className="h-4 relative">
                  <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bgColor-positive rounded z-1" />
                </div>
              )}
            </div>
            <div className="text-primary-neutral-400 text-xs font-normal leading-none">
              {company.applyingWorkType}
            </div>
          </div>
        ) : (
          <div className="w-32 h-7 animate-pulse bgColor-neutral rounded-s z-0" />
        )}
      </div>

      {/* 숫자 데이터 */}
      {["경영 일반", "재무 부문", "인증 현황", "시공 실적"].map(
        (key, index) => (
          <div
            key={key}
            className={`w-[12.5%] px-8 py-4 justify-start items-center inline-flex ${
              isLoading
                ? isOption === key
                  ? "bgColor-low-emphasis border-b border-gray-300 duration-300"
                  : "bgColor-white border-b border-gray-300 duration-300"
                : ""
            }`}
          >
            {isLoading ? (
              <div>
                <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
                  <div className="m-1 text-primary-neutral-black text-subTitle-18 font-bold ">
                    {company.score[key]}
                  </div>
                  <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
                    /
                  </div>
                  <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
                    {standard[key]}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-7 animate-pulse bgColor-neutral rounded-s" />
            )}
          </div>
        )
      )}

      {/* 총점수 */}
      <div
        className={`w-[9.93%] px-8 py-4 ${
          isOption === "scoreSum" ? "bgColor-low-emphasis" : "bgColor-white"
        } ${
          isLoading ? "border-b border-gray-300" : ""
        } justify-center bgColor-white inline-flex duration-300`}
      >
        {isLoading ? (
          <div className="h-[40px] text-primary-neutral-black text-subTitle-18 font-normal justify-center items-center inline-flex">
            {company.scoreSum}
          </div>
        ) : (
          <div className="w-full h-7 animate-pulse bgColor-neutral rounded-s" />
        )}
      </div>

      {/* 결과 */}
      <div
        className={`w-[8.86%] px-8 py-4  ${
          isOption === "isPass" ? "bgColor-low-emphasis" : "bgColor-white"
        } ${isLoading ? "border-b border-gray-300" : ""} duration-300`}
      >
        {isLoading ? (
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
        ) : (
          <div className="w-full h-7 animate-pulse bgColor-neutral rounded-s" />
        )}
      </div>

      {/* 배점표 검토 버튼 */}
      <div
        className={`w-[14.53%] px-8 py-4 bgColor-white items-center gap-2.5 inline-flex ${
          isLoading ? "border-b border-gray-300" : ""
        }`}
      >
        {isLoading ? (
          <div className="h-[40px] justify-start items-center gap-2 flex">
            <button
              className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
              onClick={() => goToDetailPage(company.businessId)}
            >
              검토하기
            </button>
          </div>
        ) : (
          <div className="w-full h-11 animate-pulse bgColor-neutral rounded-s" />
        )}
      </div>
    </div>
  );
};

export default ListTableRow;
