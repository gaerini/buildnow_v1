"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "../TableHeader";
import ListTableRow from "./ListTableRow";
import Pagination from "../Pagination";
import ListHeader from "../../ListHeader/ListHeader";
import Icon from "../../Icon/Icon";
import {
  ScoreSummary,
  CompanyScoreSummary,
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
  data: CompanyScoreSummary[];
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

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    if (sortKey === "scoreSum") {
      return [...data].sort((a, b) => {
        const aValue = a.scoreSum ?? 0;
        const bValue = b.scoreSum ?? 0;
        return isAscending ? bValue - aValue : aValue - bValue;
      });
    } else if (sortKey === "isPass") {
      return [...data].sort((a, b) => {
        // "통과" 상태를 우선으로 정렬
        if (resultAscending === "통과 우선") {
          return a.isPass === "통과" ? -1 : b.isPass === "통과" ? 1 : 0;
        } else if (resultAscending === "탈락 우선") {
          return a.isPass === "불합격" ? -1 : b.isPass === "불합격" ? 1 : 0;
        }
        return 0;
      });
    } else {
      return [...data].sort((a, b) => {
        const aValue = a.score[sortKey as keyof ScoreSummary] ?? 0;
        const bValue = b.score[sortKey as keyof ScoreSummary] ?? 0;
        return isAscending ? +bValue - +aValue : +aValue - +bValue;
      });
    }
  }, [data, sortKey, isAscending, resultAscending]);

  const onSort = (
    column: string | null,
    ascending: boolean,
    option: SortOption
  ) => {
    setSortKey(column);
    setIsAscending(ascending);
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
                key={company.businessId}
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
