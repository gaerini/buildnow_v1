"use client";
import React, { useState, useEffect } from "react";
import Icon from "../Icon/Icon";
import ExcelDownload from "../ExcelDownload/ExcelDownload";

interface CompanyData {
  name: string;
  caption: string;
  isNew: boolean;
  management: number;
  finance: number;
  certification: number;
  performance: number;
  totalScore: number;
  result: string;
}

interface ListHeaderProps {
  data: CompanyData[];
  activeButton: string;
  setActiveButton: (buttonType: string) => void; // 이 함수를 통해 상위 컴포넌트의 상태를 업데이트합니다.
  setPage: (page: number) => void; // 이 함수를 통해 상위 컴포넌트의 상태를 업데이트합니다.
}

export default function ListHeader({
  data,
  activeButton,
  setActiveButton,
  setPage,
}: ListHeaderProps) {
  // 현재 활성화된 버튼을 추적하는 상태입니다. "total" 또는 "new" 값을 가질 수 있습니다.
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [newCompanies, setNewCompanies] = useState<number>(0);

  useEffect(() => {
    // 총 업체의 갯수 계산
    setTotalCompanies(data.length);
    // isNew 속성이 true인 데이터의 갯수 계산
    const newCount = data.filter((company) => company.isNew).length;
    setNewCompanies(newCount);
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 한 번만 실행하라는 것을 의미합니다.

  // 버튼의 활성 상태를 설정하는 핸들러 함수입니다.
  const handleSetActiveButton = (buttonType: string) => {
    if (buttonType === "new") {
      setPage(1);
    }
    setActiveButton(buttonType);
  };

  // 엑셀로 내려받기 버튼 클릭 이벤트 핸들러
  const handleDownloadExcel = () => {
    ExcelDownload(data);
  };

  return (
    <div className="flex h-14 px-8 justify-between items-center">
      <div className="flex gap-2">
        <button
          className={`btnStyle-main-2 btnSize-s ${
            activeButton === "total"
              ? "border-secondary-blue-original bg-secondary-blue-100 text-secondary-blue-original duration-500"
              : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
          }`}
          onClick={() => handleSetActiveButton("total")}
        >
          <p className="whitespace-nowrap">총 갯수 {totalCompanies}</p>
        </button>

        <button
          className={`btnStyle-main-2 btnSize-s inline-flex items-center ${
            activeButton === "new"
              ? "border-secondary-blue-original bg-secondary-blue-100 text-secondary-blue-original duration-500"
              : "hover:bg-primary-neutral-100 hover:text-primary-neutral-black duration-300"
          }`}
          onClick={() => handleSetActiveButton("new")}
        >
          <p className="whitespace-nowrap">신규 접수 {newCompanies}</p>
          <div className="w-2 h-2 ml-2 bg-orange-300 rounded-lg" />
        </button>
      </div>

      <button
        className="btnStyle-main-2 btnSize-s items-center gap-1 inline-flex hover:bg-primary-neutral-100 hover:text-primary-neutral-black active:border-secondary-blue-original active:bg-secondary-blue-100 active:text-secondary-blue-original duration-300"
        onClick={handleDownloadExcel}
      >
        <Icon
          name="DownLoad"
          width={20}
          height={20}
          style={{
            color: "#5085EA",
          }}
        />
        <p className="whitespace-nowrap">엑셀로 내려받기</p>
      </button>
    </div>
  );
}
