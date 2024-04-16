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
      default:
        return "";
    }
  };

  const sortedData = React.useMemo(() => {
    return data
      .map((applier) => ({
        ...applier,
        scoreSum: applier.scoreList.reduce(
          (sum, item) => sum + item.upperCategoryScore,
          0
        ),
        isPass:
          applier.scoreList.reduce(
            (sum, item) => sum + item.upperCategoryScore,
            0
          ) >= 60
            ? -1
            : 1,
      }))
      .sort((a, b) => {
        if (sortKey === "scoreSum") {
          const aValue = a.scoreSum;
          const bValue = b.scoreSum;
          return isAscending ? aValue - bValue : bValue - aValue;
        } else if (sortKey === "isPass") {
          return isAscending ? a.isPass - b.isPass : b.isPass - a.isPass;
        } else {
          const aValue =
            a.scoreList.find((item) => item.upperCategory === sortKey)
              ?.upperCategoryScore ?? 0;
          const bValue =
            b.scoreList.find((item) => item.upperCategory === sortKey)
              ?.upperCategoryScore ?? 0;
          return isAscending ? aValue - bValue : bValue - aValue;
        }
      });
  }, [data, sortKey, isAscending]);

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
            {sortedData.slice(offset, offset + limit).map((company) => (
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
