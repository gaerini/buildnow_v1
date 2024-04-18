"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "../TableHeader";
import ListTableRow from "./ListTableRow";
import Pagination from "../Pagination";
import ListHeader from "../../ListHeader/ListHeader";
import Icon from "../../Icon/Icon";
import {
  ScoreSummary,
  ApplierListData,
  Total,
} from "../../Interface/CompanyData";
import { useLoading } from "../../LoadingContext";
import RowSkeleton from "../RowSkeleton";

interface SortOption {
  label: string;
  icon: string;
}
interface NumApply {
  [key: string]: number;
}
interface TableProps {
  selectedWorkType: string;
  numApply: NumApply;
  isEmpty: boolean;
  data: ApplierListData[];
  currentPage: string;
  standard: Total;
  activeButton: string;
  setActiveButton: (button: string) => void;
  page: number;
  setPage: (page: number) => void;
  isOption: string | null;
  setIsOption: (isOption: string | null) => void;
}

export default function ScoreTable({
  selectedWorkType,
  numApply,
  isEmpty,
  data,
  currentPage,
  standard,
  activeButton,
  setActiveButton,
  page,
  setPage,
  isOption,
  setIsOption,
}: // isLoading,
// setIsLoading,
TableProps) {
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;
  const { isLoading, setIsLoading } = useLoading();

  const [sortKey, setSortKey] = useState<keyof ScoreSummary | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [resultAscending, setResultAscending] = useState<
    string | null | undefined
  >(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

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
      case "scoreSum":
        return "scoreSum";
      case "isPass":
        return "isPass";
      default:
        return "";
    }
  };

  // Calculates the sum of upperCategoryScore from the scoreList of a company
  function calculateScoreSum(company: ApplierListData) {
    return company.scoreList.reduce(
      (sum, item) => sum + item.upperCategoryScore,
      0
    );
  }

  // Determines the pass status based on the score sum
  function determinePassStatus(company: ApplierListData) {
    return calculateScoreSum(company) >= 70 ? "통과" : "탈락";
  }

  // Extracts the score for a specific category (sortKey) from a company's scoreList
  function getCategoryScore(
    company: ApplierListData,
    sortKey: keyof ScoreSummary
  ) {
    const category = company.scoreList.find(
      (item) => item.upperCategory === sortKey
    );
    return category ? category.upperCategoryScore : 0;
  }
  console.log("sortKey", sortKey);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;

    if (sortKey === "scoreSum") {
      return [...data].sort((a, b) => {
        const aValue = calculateScoreSum(a);
        console.log("aValue", aValue);
        const bValue = calculateScoreSum(b);
        return isAscending ? bValue - aValue : aValue - bValue;
      });
    } else if (sortKey === "isPass") {
      return [...data].sort((a, b) => {
        const aStatus = determinePassStatus(a);
        const bStatus = determinePassStatus(b);
        if (resultAscending === "통과 우선") {
          return aStatus === "통과" ? -1 : bStatus === "통과" ? 1 : 0;
        } else if (resultAscending === "탈락 우선") {
          return aStatus === "탈락" ? -1 : bStatus === "탈락" ? 1 : 0;
        }
        return 0;
      });
    } else {
      return [...data].sort((a, b) => {
        const aValue = getCategoryScore(a, sortKey);
        const bValue = getCategoryScore(b, sortKey);
        return isAscending ? +bValue - +aValue : +aValue - +bValue;
      });
    }
  }, [data, sortKey, isAscending, resultAscending]);

  const onSort = (
    column: string | null,
    isAscending: boolean,
    option: SortOption
  ) => {
    if (column !== null) {
      setSortKey(getCategoryKey(column));
    } else {
      setSortKey(null); // Handle null appropriately if needed
    }
    setIsAscending(isAscending);
    setResultAscending(option.label);
  };

  return (
    <div>
      <ListHeader
        selectedWorkType={selectedWorkType}
        numApply={numApply}
        isEmpty={isEmpty}
        data={data}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setPage={setPage}
        setSortKey={setSortKey}
        setIsOption={setIsOption}
        setSelectedOption={setSelectedOption}
      />
      <TableHeader
        isEmpty={isEmpty}
        currentPage={currentPage}
        onSort={onSort}
        isOption={isOption}
        setIsOption={setIsOption}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      {isLoading ? (
        isEmpty ? (
          <div className="w-full h-[216px] px-4 py-8 flex-col justify-center items-center gap-2 inline-flex">
            <div className="h-2/4 flex-col justify-end items-center inline-flex">
              <Icon name="NoItem" width={32} height={32} />
            </div>
            <div className="h-2/4 justify-center items-center">
              <p className="text-subTitle-20 font-bold textColor-low-emphasis">
                접수된 지원서가 없습니다
              </p>
            </div>
          </div>
        ) : (
          <>
            {sortedData?.slice(offset, offset + limit).map((company) => (
              <ListTableRow
                key={company.applicationId}
                company={company}
                standard={standard}
                isOption={isOption}
              />
            ))}

            <Pagination
              total={data.length}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </>
        )
      ) : (
        <>
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </>
      )}
    </div>
  );
}
