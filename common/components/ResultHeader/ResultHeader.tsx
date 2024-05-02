"use client";
import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import ExcelDownload from "../ExcelDownload/ExcelDownload";
import { ScoreSummary, ApplierListData } from "../Interface/CompanyData";
import { useLoading } from "../../../common/components/LoadingContext";

interface SortOption {
  label: string;
  icon: string;
}
interface SortOptions {
  sortByScore: SortOption[];
  sortByResult: SortOption[];
}
interface NumApply {
  [key: string]: number;
}
interface ResultHeaderProps {
  PassCompanies: number;
  FailCompanies: number;
  LackCompanies: number;
  setPassCompanies: (passCompanies: number) => void;
  setFailCompanies: (failCompanies: number) => void;
  setLackCompanies: (lackCompanies: number) => void;
  selectedWorkType: string;
  numApply: NumApply;
  isEmpty: boolean;
  data: ApplierListData[];
  activeButton: string;
  setActiveButton: (buttonType: string) => void; // 이 함수를 통해 상위 컴포넌트의 상태를 업데이트합니다.
  setPage: (page: number) => void; // 이 함수를 통해 상위 컴포넌트의 상태를 업데이트합니다.
  setSortKey: (sortKey: string | null) => void;
  setIsOption: (isOption: string | null) => void;
  setSelectedOption: (selectedOption: string | null) => void;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ResultHeader({
  PassCompanies,
  FailCompanies,
  LackCompanies,
  setPassCompanies,
  setFailCompanies,
  setLackCompanies,
  selectedWorkType,
  numApply,
  isEmpty,
  data,
  activeButton,
  setActiveButton,
  setPage,
  setSortKey,
  setIsOption,
  setSelectedOption,
}: ResultHeaderProps) {
  // 현재 활성화된 버튼을 추적하는 상태입니다. "total" 또는 "new" 값을 가질 수 있습니다.
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const { isLoading, setIsLoading } = useLoading();
  console.log("selectedWorkType", selectedWorkType);
  useEffect(() => {
    if (isEmpty) {
      setTotalCompanies(0);
      setPassCompanies(0);
      setFailCompanies(0);
      setLackCompanies(0);
    } else {
      setTotalCompanies(numApply[selectedWorkType]);
    }
  }, [data, isEmpty]); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 한 번만 실행하라는 것을 의미합니다.

  // 버튼의 활성 상태를 설정하는 핸들러 함수입니다.
  const handleSetActiveButton = (buttonType: string) => {
    setActiveButton(buttonType);
    setPage(1);
  };

  // 엑셀로 내려받기 버튼 클릭 이벤트 핸들러
  const handleDownloadExcel = () => {
    ExcelDownload(data);
  };

  // Sort 기능 초기화
  const resetSort = () => {
    setSortKey(null);
    setIsOption(null);
    setSelectedOption(null);
  };

  return (
    <div className="flex h-14 px-8 justify-between items-center border-t borderColor">
      <div className="flex gap-2">
        {isLoading ? (
          <>
            <button
              className={`btnStyle-main-2 btnSize-s ${
                isEmpty
                  ? "disabled = {true}"
                  : activeButton === "total"
                  ? "bg-primary-blue-100 border-primary-blue-original text-primary-blue-original duration-500"
                  : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
              }`}
              onClick={() => handleSetActiveButton("total")}
            >
              <p className="whitespace-nowrap">총 갯수 {totalCompanies}</p>
            </button>

            <button
              className={`btnStyle-main-2 btnSize-s inline-flex items-center ${
                isEmpty || PassCompanies === 0
                  ? "disabled = {true}"
                  : activeButton === "pass"
                  ? "bg-primary-blue-100 border-primary-blue-original text-primary-blue-original duration-500"
                  : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
              }`}
              onClick={
                PassCompanies === 0
                  ? undefined
                  : (e) => handleSetActiveButton("pass")
              }
            >
              <p className="whitespace-nowrap">통과업체 {PassCompanies}</p>
            </button>

            <button
              className={`btnStyle-main-2 btnSize-s inline-flex items-center ${
                isEmpty || FailCompanies === 0
                  ? "disabled = {true}"
                  : activeButton === "fail"
                  ? "bg-primary-blue-100 border-primary-blue-original text-primary-blue-original duration-500"
                  : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
              }`}
              onClick={
                FailCompanies === 0
                  ? undefined
                  : (e) => handleSetActiveButton("fail")
              }
            >
              <p className="whitespace-nowrap">탈락업체 {FailCompanies}</p>
            </button>

            <button
              className={`btnStyle-main-2 btnSize-s inline-flex items-center ${
                isEmpty || LackCompanies === 0
                  ? "disabled = {true}"
                  : activeButton === "lack"
                  ? "bg-primary-blue-100 border-primary-blue-original text-primary-blue-original duration-500"
                  : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
              }`}
              onClick={
                LackCompanies === 0
                  ? undefined
                  : (e) => handleSetActiveButton("lack")
              }
            >
              <p className="whitespace-nowrap">미달업체 {LackCompanies}</p>
            </button>
          </>
        ) : (
          <>
            <div className="w-20 h-8 animate-pulse bgColor-neutral rounded-s" />
            <div className="w-20 h-8 animate-pulse bgColor-neutral rounded-s" />
            <div className="w-20 h-8 animate-pulse bgColor-neutral rounded-s" />
            <div className="w-20 h-8 animate-pulse bgColor-neutral rounded-s" />
          </>
        )}
      </div>
      <div className="inline-flex gap-2">
        <button
          className={`btnStyle-main-2 btnSize-s h-8 items-center gap-1 inline-flex
          ${
            isEmpty
              ? "disabled = {true}"
              : " hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-blue-100 active:border-primary-blue-original active:text-primary-blue-original duration-500"
          }`}
          onClick={resetSort}
        >
          <Icon name="Reset" width={16} height={16} />
        </button>
        <button
          className={`btnStyle-main-2 btnSize-s h-8 items-center gap-2 inline-flex ${
            isEmpty
              ? "disabled = {true}"
              : " hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-blue-100 active:border-primary-blue-original active:text-primary-blue-original duration-500"
          }`}
          onClick={isEmpty ? undefined : handleDownloadExcel}
        >
          <Icon
            name="DownLoad"
            width={20}
            height={20}
            color="hover:primary-neutral-black"
          />
          <p className="whitespace-nowrap">엑셀로 내려받기</p>
        </button>
      </div>
    </div>
  );
}
