"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "../TableHeader";
import ResultTableRow from "./ResultTableRow";
import Pagination from "../Pagination";
import ResultHeader from "../../ResultHeader/ResultHeader";
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

interface TableProps {
  data: CompanyScoreSummary[];
  standard: Total;
  activeButton: string;
  setActiveButton: (button: string) => void;
  page: number;
  setPage: (page: number) => void;
  isOption: string | null;
  setIsOption: (isOption: string | null) => void;
  // isLoading: boolean;
  // setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // 나중에 정렬 함수와 API 호출 함수를 추가할 수 있습니다.
}

export default function ScoreTable({
  data,
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
        const aValue = a[sortKey] ?? 0;
        const bValue = b[sortKey] ?? 0;
        return isAscending ? bValue - aValue : aValue - bValue;
      });
    } else if (sortKey === "isPass") {
      return [...data].sort((a, b) => {
        // "통과" 상태를 우선으로 정렬
        if (resultAscending === "통과 우선") {
          return a.isPass === "통과" ? -1 : b.isPass === "통과" ? 1 : 0;
        } else if (resultAscending === "탈락 우선") {
          return a.isPass === "불합격" ? -1 : b.isPass === "불합격" ? 1 : 0;
        } else if (resultAscending === "미달 우선") {
          return a.isPass === "미달" ? -1 : b.isPass === "불합격" ? 1 : 0;
        }
        return 0;
      });
    } else {
      return [...data].sort((a, b) => {
        const aValue = a.score[sortKey] ?? 0;
        const bValue = b.score[sortKey] ?? 0;
        return isAscending ? bValue - aValue : aValue - bValue;
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

  // console.log(resultAscending);
  // console.log(sortKey);

  return (
    <div>
      <ResultHeader
        data={data}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setPage={setPage}
        setSortKey={setSortKey}
        setIsOption={setIsOption}
        setSelectedOption={setSelectedOption}
        // isLoading={isLoading}
        // setIsLoading={setIsLoading}
      />
      <TableHeader
        onSort={onSort}
        isOption={isOption}
        setIsOption={setIsOption}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        // isLoading={isLoading}
        // setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <>
          {sortedData.slice(offset, offset + limit).map((company) => (
            <ResultTableRow
              key={company.businessId}
              company={company}
              standard={standard}
              isOption={isOption}
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
            />
          ))}
        </>
      ) : (
        <>
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
          <RowSkeleton />
        </>
      )}
      <Pagination
        total={data.length}
        limit={limit}
        page={page}
        setPage={setPage}
        // isLoading={isLoading}
        // setIsLoading={setIsLoading}
      />
    </div>
  );
}

// else if ( sortClass === "result"){

// }
