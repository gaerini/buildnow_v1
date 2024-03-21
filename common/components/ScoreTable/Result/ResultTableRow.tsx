"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ScoreSummary,
  CompanyScoreSummary,
  Total,
} from "../../Interface/CompanyData";
import Modal from "../../Modal/Modal";
import axios from "axios";
import Cookies from "js-cookie";
import { useLoading } from "../../LoadingContext";
import NProgress from "nprogress";

const ListTableRow: React.FC<{
  company: CompanyScoreSummary;
  isOption: string | null;
  standard: Total;
  isNarrow: boolean;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ company, isOption, standard, isNarrow }) => {
  const [accessJWTToken, setAccessJWTToken] = useState(
    Cookies.get("accessToken")
  );

  const { isLoading, setIsLoading } = useLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  const cookieJWTToken = Cookies.get("token");
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_URL,
    headers: {
      Authorization: `Bearer ${accessJWTToken}`,
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

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const goToDetailPage = (businessId: string) => {
    NProgress.start();
    handlePatchRequest(businessId);
    router.push(`/result/details/${businessId}`);
  };

  return (
    <div className="flex items-center">
      {/* 회사명 */}
      <div className="flex-1 p-xl bgColor-white justify-start items-center inline-flex whitespace-nowrap border-b borderColor">
        <div className="min-w-2 h-[40px] flex-col justify-start items-start gap-1 inline-flex">
          <div className="inline-flex justify-start items-center gap-2">
            <div className="textColor-high-emphasis text-lg font-bold">
              {company.companyName}
            </div>
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
            className={`w-[144px] p-xl justify-start items-center inline-flex ${
              isOption === key
                ? "bgColor-neutral border-b borderColor duration-300"
                : "bgColor-white border-b borderColor duration-300"
            }`}
          >
            <div className="h-[40px] justify-center items-center inline-flex gap-0.5">
              {company.isPass === "미달" ? (
                <p className="m-1 textColor-mid-emphasis text-subTitle-18 font-normal">
                  -
                </p>
              ) : (
                <>
                  <div className="m-1 text-primary-neutral-black text-subTitle-18 font-bold ">
                    {company.score[key]}
                  </div>
                  <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
                    /
                  </div>
                  <div className="m-0.5 text-primary-neutral-400 text-subTitle-18 font-normal ">
                    {standard[key]}
                  </div>
                </>
              )}
            </div>
          </div>
        )
      )}

      {/* 총점수 */}
      <div
        className={`w-[160px]  p-xl ${
          isOption === "scoreSum" ? "bgColor-neutral" : "bgColor-white"
        } inline-flex duration-300 border-b borderColor`}
      >
        <div className="h-[40px] text-primary-neutral-black text-subTitle-18 font-normal justify-center items-center inline-flex">
          {company.scoreSum}
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
            company.isPass === "탈락"
              ? "textColor-danger"
              : company.isPass === "미달"
              ? "textColor-mid-emphasis"
              : "text-primary-neutral-black"
          }`}
        >
          {company.isPass}
        </div>
      </div>

      {/* 배점표 검토 버튼 */}
      <div className="w-[160px] p-xl bgColor-white items-center gap-2.5 inline-flex border-b borderColor">
        <div className="h-[40px] justify-start items-center gap-2 flex">
          {company.isPass === "미달" ? (
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
                    필수서류 미제출
                  </Modal>
                </div>
              )}
            </>
          ) : (
            <button
              className="btnStyle-main-2 btnSize-m whitespace-nowrap hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-neutral-200 active:text-primary-neutral-black"
              onClick={() => goToDetailPage(company.businessId)}
            >
              다시보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListTableRow;
