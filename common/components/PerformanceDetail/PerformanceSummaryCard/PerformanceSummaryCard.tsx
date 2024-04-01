"use client";
import React from "react";
import TypeCard from "./TypeCard";
import LocationCard from "./LocationCard";
import ContractAmountCard from "./ContractAmountCard";
import GCCard from "./GCCard";

type PerformanceDetail = {
  발주처: string;
  구분: string;
  원도급사: string;
  공종: string;
  공사명: string;
  "계약금액(백만원)": number;
  "공사 시작": string;
  "공사 종료 (예정)": string;
  "공사의 종류": string;
  위치: string;
  지역: string;
};

type SummaryCardProps = {
  filteredData: PerformanceDetail[];
};

const SummaryCard: React.FC<SummaryCardProps> = ({ filteredData }) => {
  return (
    <div className="bgColor-white w-full gap-x-4 p-xl flex">
      <TypeCard filteredData={filteredData} />
      <LocationCard filteredData={filteredData} />
      <ContractAmountCard filteredData={filteredData} />
      <GCCard filteredData={filteredData} />
    </div>
  );
};

export default SummaryCard;
