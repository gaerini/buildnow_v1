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
interface ListHeaderProps {
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

export default function ListHeader({
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
}: // isLoading,
// setIsLoading,
ListHeaderProps) {
  // 현재 활성화된 버튼을 추적하는 상태입니다. "total" 또는 "new" 값을 가질 수 있습니다.
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [newCompanies, setNewCompanies] = useState<number>(0);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    // 총 업체의 갯수 계산
    if (isEmpty) {
      setTotalCompanies(0);
      setNewCompanies(0);
    } else {
      const workTypeToUse = selectedWorkType ?? "전체";
      setTotalCompanies(numApply[workTypeToUse]);
      console.log("선택 workType ", selectedWorkType);
      const newCount = data.filter((company) => company.read === false).length;
      setNewCompanies(newCount);
    }
    // isNew 속성이 true인 데이터의 갯수 계산
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
                isEmpty || newCompanies === 0
                  ? "disabled = {true}"
                  : activeButton === "new"
                  ? "bg-primary-blue-100 border-primary-blue-original text-primary-blue-original duration-500"
                  : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
              }`}
              onClick={
                newCompanies === 0
                  ? undefined
                  : (e) => handleSetActiveButton("new")
              }
            >
              <p className="whitespace-nowrap">안 읽음 {newCompanies}</p>
              <div className="w-2 h-2 ml-2 bgColor-positive rounded-lg" />
            </button>
          </>
        ) : (
          <>
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
          onClick={totalCompanies === 0 ? undefined : resetSort}
        >
          <Icon name="Reset" width={16} height={16} />
        </button>
        <button
          className={`btnStyle-main-2 btnSize-s h-8 items-center gap-2 inline-flex ${
            isEmpty
              ? "disabled = {true}"
              : " hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:bg-primary-blue-100 active:border-primary-blue-original active:text-primary-blue-original duration-500"
          }`}
          onClick={totalCompanies === 0 ? undefined : handleDownloadExcel}
        >
          <Icon name="DownLoad" width={20} height={20} />
          <p className="whitespace-nowrap">엑셀로 내려받기</p>
        </button>
      </div>
    </div>
  );
}
