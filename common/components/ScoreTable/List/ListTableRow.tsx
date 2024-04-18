"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ScoreSummary,
  ApplierListData,
  Total,
} from "../../Interface/CompanyData";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading } from "../../LoadingContext";
import NProgress from "nprogress";

const ListTableRow: React.FC<{
  company: ApplierListData;
  isOption: string | null;
  standard: Total;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ company, isOption, standard }) => {
  const { isLoading, setIsLoading } = useLoading();
  const router = useRouter();

  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessTokenRecruiter")
  );
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SPRING_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const handlePatchRequest = async (applicationId: string) => {
    try {
      await axiosInstance.patch(
        `application/recruiter/read-true/${applicationId}`
      );
      console.log("Patch request successful");
      router.refresh();
    } catch (error) {
      console.error("Error in patch request:", error);
    }
  };

  const goToDetailPage = (applicationId: string) => {
    NProgress.start();
    handlePatchRequest(applicationId);

    router.push(`/list/details/${applicationId}`);
  };

  const getCategoryKey = (categoryName: string): string => {
    switch (categoryName) {
      case "경영 일반":
        return "BUSINESS";
      case "재무 부문":
        return "FINANCE";
      case "인증 현황":
        return "AUTHENTICATION";
      case "시공 실적":
        return "PERFORMANCE";
      default:
        return "";
    }
  };

  const scoreSum = company.scoreList.reduce(
    (total, current) => total + current.upperCategoryScore,
    0
  );
  const isPass = scoreSum >= 70 ? "통과" : "탈락";

  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div className="flex-1 min-w-[170px] p-xl bgColor-white justify-start items-center inline-flex whitespace-nowrap border-b borderColor">
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="inline-flex justify-start items-center gap-2">
            <div
              className={`textColor-high-emphasis text-lg ${
                company.read ? "font-normal" : "font-bold"
              }`}
            >
              {company.companyName}
            </div>
            {!company.read && (
              <div className="h-4 relative">
                <div className="w-1.5 h-1.5 left-[4.50px] top-[4.50px] absolute bgColor-positive rounded z-1" />
              </div>
            )}
          </div>
          <div className="text-primary-neutral-500 text-xs font-normal leading-none">
            {company.workType}
          </div>
        </div>
      </div>

      {/* 숫자 데이터 */}
      {["경영 일반", "재무 부문", "인증 현황", "시공 실적"].map(
        (key, index) => {
          const upperCategoryKey = getCategoryKey(key);
          const foundCategory = company.scoreList.find(
            (item) => item.upperCategory === upperCategoryKey
          );
          return (
            <div
              key={key}
              className={`w-[144px] p-xl justify-start items-center inline-flex ${
                isOption === key
                  ? "bgColor-neutral border-b borderColor duration-300"
                  : "bgColor-white border-b borderColor duration-300"
              }`}
            >
              <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
                <div
                  className={`m-1 ${
                    isOption === key
                      ? "textColor-high-emphasis"
                      : "textColor-mid-emphasis"
                  } text-subTitle-18 font-bold `}
                >
                  {foundCategory ? foundCategory.upperCategoryScore : "N/A"}
                </div>
                <div className="m-0.5 textColor-low-emphasis text-subTitle-18 font-normal ">
                  /
                </div>
                <div className="m-0.5 textColor-low-emphasis text-subTitle-18 font-normal ">
                  {foundCategory
                    ? foundCategory.upperCategoryPerfectScore
                    : "N/A"}
                </div>
              </div>
            </div>
          );
        }
      )}

      {/* 총점수 */}
      <div
        className={`w-[160px] p-xl ${
          isOption === "scoreSum" ? "bgColor-neutral" : "bgColor-white"
        } inline-flex duration-300 border-b borderColor`}
      >
        <div className="h-[40px] text-primary-neutral-black text-subTitle-18 font-normal items-center inline-flex">
          {scoreSum}
        </div>
      </div>

      {/* 결과 */}
      <div
        className={`w-[116px] p-xl  ${
          isOption === "isPass" ? "bgColor-neutral" : "bgColor-white"
        } duration-300 border-b borderColor`}
      >
        <div
          className={`h-[40px] text-subTitle-18 font-normal justify-start items-center inline-flex whitespace-nowrap  ${
            isPass === "탈락"
              ? "textColor-danger"
              : "text-primary-neutral-black"
          }`}
        >
          {isPass}
        </div>
      </div>

      {/* 배점표 검토 버튼 */}
      <div className="w-[160px] p-xl bgColor-white items-center gap-2.5 inline-flex border-b borderColor">
        <div className="h-[40px] justify-start items-center gap-2 flex">
          <button
            className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
            onClick={() => goToDetailPage(company.applicationId)}
          >
            검토하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListTableRow;
