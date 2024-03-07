"use client";

import React, { useEffect, useState } from "react";
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
  const [accessJWTToken, setAccessJWTToken] = useState(
    Cookies.get("accessToken")
  );
  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();

  const axiosInstance = axios.create({
    baseURL:
      "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
    headers: {
      Authorization: `Bearer ${accessJWTToken}`,
    },
  });

  const handlePatchRequest = async (businessId: string) => {
    try {
      await axiosInstance.patch(`application/isRead/${businessId}`);
      console.log("Patch request successful");
      router.refresh();
    } catch (error) {
      console.error("Error in patch request:", error);
    }
  };

  // window.addEventListener("popstate", () => {
  //   router.refresh();
  // });

  const goToDetailPage = (businessId: string) => {
    handlePatchRequest(businessId);

    router.push(`/list/details/${businessId}`);
  };

  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div className="w-[16.68%] px-8 py-4 bgColor-white justify-start items-center inline-flex whitespace-nowrap border-b borderColor">
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="inline-flex justify-start items-center gap-2">
            <div
              className={`textColor-black text-lg ${
                company.isRead ? "font-normal" : "font-bold"
              }`}
            >
              {company.companyName}
            </div>
            {!company.isRead && (
              <div className="h-4 relative">
                <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bgColor-positive rounded z-1" />
              </div>
            )}
          </div>
          <div className="text-primary-neutral-500 text-xs font-normal leading-none">
            {company.applyingWorkType}
          </div>
        </div>
      </div>

      {/* 숫자 데이터 */}
      {["경영 일반", "재무 부문", "인증 현황", "시공 실적"].map(
        (key, index) => (
          <div
            key={key}
            className={`w-[12.5%] px-8 py-4 justify-start items-center inline-flex ${
              isOption === key
                ? "bgColor-neutral border-b borderColor duration-300"
                : "bgColor-white border-b borderColor duration-300"
            }`}
          >
            <div>
              <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
                <div
                  className={`m-1 ${
                    isOption === key
                      ? "textColor-black"
                      : "textColor-mid-emphasis"
                  } text-subTitle-18 font-bold `}
                >
                  {company.score[key]}
                </div>
                <div className="m-0.5 textColor-low-emphasis text-subTitle-18 font-normal ">
                  /
                </div>
                <div className="m-0.5 textColor-low-emphasis text-subTitle-18 font-normal ">
                  {standard[key]}
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* 총점수 */}
      <div
        className={`w-[9.93%] pl-12 py-4 ${
          isOption === "scoreSum" ? "bgColor-neutral" : "bgColor-white"
        } inline-flex duration-300 border-b borderColor`}
      >
        <div className="h-[40px] text-primary-neutral-black text-subTitle-18 font-normal items-center inline-flex">
          {company.scoreSum}
        </div>
      </div>

      {/* 결과 */}
      <div
        className={`w-[8.86%] px-8 py-4  ${
          isOption === "isPass" ? "bgColor-neutral" : "bgColor-white"
        } duration-300 border-b borderColor`}
      >
        <div
          className={`h-[40px] text-subTitle-18 font-normal justify-start items-center inline-flex whitespace-nowrap  ${
            company.isPass === "탈락"
              ? "textColor-danger"
              : "text-primary-neutral-black"
          }`}
        >
          {company.isPass}
        </div>
      </div>

      {/* 배점표 검토 버튼 */}
      <div className="w-[14.53%] px-8 py-4 bgColor-white items-center gap-2.5 inline-flex border-b borderColor">
        <div className="h-[40px] justify-start items-center gap-2 flex">
          <button
            className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
            onClick={() => goToDetailPage(company.businessId)}
          >
            검토하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTableRow;
