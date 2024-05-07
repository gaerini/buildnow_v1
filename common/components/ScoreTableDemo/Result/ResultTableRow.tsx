"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ScoreSummary,
  ApplierListData,
  Total,
} from "../../Interface/CompanyData";
import Modal from "../../Modal/Modal";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading } from "../../LoadingContext";
import NProgress from "nprogress";
import { sendGTMEvent } from "@next/third-parties/google";

const ResultTableRow: React.FC<{
  company: ApplierListData;
  isOption: string | null;
  isNarrow: boolean;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ company, isOption, isNarrow }) => {
  const [accessJWTToken, setAccessJWTToken] = useState(
    Cookies.get("accessToken")
  );

  const { isLoading, setIsLoading } = useLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const goToDetailPage = (applicationId: string) => {
    NProgress.start();
    router.push(`/demo/result/details/${applicationId}`);
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

  function determinePassStatus(): [string, string[]] {
    let midalReasons: string[] = [];

    for (const prerequisite of company.tempPrerequisiteList) {
      if (!prerequisite.isPrerequisite) {
        midalReasons.push(prerequisite.whyMidal);
      }
    }

    if (midalReasons.length > 0) {
      return ["미달", midalReasons];
    }

    if (scoreSum < 70) {
      return ["탈락", []];
    } else {
      return ["통과", []];
    }
  }

  const categories = ["경영 일반", "재무 부문", "인증 현황", "시공 실적"];

  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div className="flex-1 min-w-[170px] p-xl bgColor-white justify-start items-center inline-flex whitespace-nowrap border-b borderColor">
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="inline-flex justify-start items-center gap-2">
            <div className="textColor-high-emphasis text-lg font-bold">
              {company.companyName}
            </div>
          </div>
          <div className="text-primary-neutral-500 text-xs font-normal leading-none">
            {company.licenseName} | {company.workType}
          </div>
        </div>
      </div>

      {/* 숫자 데이터 */}
      {categories.map((key) => {
        const upperCategoryKey = getCategoryKey(key);
        const foundCategory = company.scoreList.find(
          (item) => item.upperCategory === upperCategoryKey
        );
        const categoryScoreList = foundCategory?.scoreList;
        console.log(categoryScoreList);
        if (categoryScoreList?.length === 0) return null; // 카테고리가 없으면 렌더링하지 않습니다.
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
              {determinePassStatus()[0] === "미달" ? (
                <p className="m-1 textColor-mid-emphasis text-subTitle-18 font-normal">
                  -
                </p>
              ) : (
                <>
                  <div className="m-1 text-primary-neutral-black text-subTitle-18 font-bold ">
                    {foundCategory?.upperCategoryScore}
                  </div>
                  <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
                    /
                  </div>
                  <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
                    {foundCategory?.upperCategoryPerfectScore}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}

      {/* 총점수 */}
      <div
        className={`w-[160px] justify-start items-center  p-xl ${
          isOption === "scoreSum" ? "bgColor-neutral" : "bgColor-white"
        } inline-flex duration-300 border-b borderColor`}
      >
        {determinePassStatus()[0] === "미달" ? (
          <p className="h-[40px] flex items-center textColor-mid-emphasis text-subTitle-18 font-normal">
            -
          </p>
        ) : (
          <div className="h-[40px]  text-primary-neutral-black text-subTitle-18 font-normal items-center inline-flex">
            {scoreSum}
          </div>
        )}
      </div>

      {/* 결과 */}
      <div
        className={`w-[116px] p-xl  ${
          isOption === "isPass" ? "bgColor-neutral" : "bgColor-white"
        } duration-300 border-b borderColor`}
      >
        <div
          className={`h-[40px] text-subTitle-18 font-normal justify-start items-center inline-flex whitespace-nowrap  ${
            determinePassStatus()[0] === "탈락"
              ? "textColor-danger"
              : determinePassStatus()[0] === "미달"
              ? "textColor-mid-emphasis"
              : "text-primary-neutral-black"
          }`}
        >
          {determinePassStatus()[0]}
        </div>
      </div>

      {/* 배점표 검토 버튼 */}
      <div className="w-[160px] p-xl bgColor-white items-center gap-2.5 inline-flex border-b borderColor">
        <div className="h-[40px] justify-start items-center gap-2 flex">
          {determinePassStatus()[0] === "미달" ? (
            <>
              <button
                className="btnStyle-main-2 btnSize-m whitespace-nowrap disabled:true hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
                onClick={toggleModal}
              >
                미달사유
              </button>
              {isModalVisible && (
                <div
                  style={{
                    position: "absolute",
                    left: "0",
                    top: "100%", // 버튼의 바로 아래 위치
                    marginTop: "8px", // 버튼과의 간격
                    // 필요한 스타일 추가
                  }}
                >
                  <Modal
                    hasCloseIcon={true}
                    buttonType="none"
                    isNarrow={isNarrow}
                  >
                    {determinePassStatus()[1].map((reason, index) => (
                      <p key={index}>{reason}</p>
                    ))}
                  </Modal>
                </div>
              )}
            </>
          ) : (
            <button
              className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
              onClick={() => {
                goToDetailPage(company.applicationId),
                  sendGTMEvent({
                    event: `${company.applicationId} | ${company.companyName} 조회`,
                    value: "xyz",
                  });
              }}
            >
              다시보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultTableRow;
