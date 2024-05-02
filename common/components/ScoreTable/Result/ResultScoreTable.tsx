"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "../TableHeader";
import ResultTableRow from "./ResultTableRow";
import Pagination from "../Pagination";
import ResultHeader from "../../ResultHeader/ResultHeader";
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
  scoreCategoryList: string[];
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
  currentPage: string;
  activeButton: string;
  setActiveButton: (button: string) => void;
  page: number;
  setPage: (page: number) => void;
  isOption: string | null;
  setIsOption: (isOption: string | null) => void;
  isNarrow: boolean;
}

export default function ScoreTable({
  scoreCategoryList,
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
  currentPage,
  activeButton,
  setActiveButton,
  page,
  setPage,
  isOption,
  setIsOption,
  isNarrow,
}: // isLoading,
// setIsLoading,
TableProps) {
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;
  const { isLoading, setIsLoading } = useLoading();

  const [sortKey, setSortKey] = useState<keyof ScoreSummary | any>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [resultAscending, setResultAscending] = useState<
    string | null | undefined
  >(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Calculates the sum of upperCategoryScore from the scoreList of a company
  function calculateScoreSum(company: ApplierListData) {
    return company.scoreList.reduce(
      (sum, item) => sum + item.upperCategoryScore,
      0
    );
  }

  console.log("numApply", numApply);

  // Determines the pass status based on the score sum
  // Determines the pass status based on the score sum
  function determinePassStatus(company: ApplierListData) {
    const scoreSum = calculateScoreSum(company);

    if (scoreSum === 0) {
      return "미달"; // Returns "미달" if the score sum is zero
    } else if (scoreSum < 70) {
      return "탈락"; // Returns "불합격" if the score sum is less than 70
    } else {
      return "통과"; // Returns "통과" if the score sum is 70 or more
    }
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

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    if (sortKey === "scoreSum") {
      return [...data].sort((a, b) => {
        const aValue = calculateScoreSum(a);
        const bValue = calculateScoreSum(b);
        return isAscending ? bValue - aValue : aValue - bValue;
      });
    } else if (sortKey === "isPass") {
      return [...data].sort((a, b) => {
        // "통과" 상태를 우선으로 정렬

        const aStatus = determinePassStatus(a);
        const bStatus = determinePassStatus(b);
        if (resultAscending === "통과 우선") {
          return aStatus === "통과" ? -1 : bStatus === "통과" ? 1 : 0;
        } else if (resultAscending === "탈락 우선") {
          return aStatus === "탈락" ? -1 : bStatus === "탈락" ? 1 : 0;
        } else if (resultAscending === "미달 우선") {
          return aStatus === "미달" ? -1 : bStatus === "미달" ? 1 : 0;
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
        PassCompanies={PassCompanies}
        FailCompanies={FailCompanies}
        LackCompanies={LackCompanies}
        setPassCompanies={setPassCompanies}
        setFailCompanies={setFailCompanies}
        setLackCompanies={setLackCompanies}
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
        scoreCategoryList={scoreCategoryList}
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
                지원서가 없습니다
              </p>
            </div>
          </div>
        ) : (
          <>
            {sortedData?.slice(offset, offset + limit)?.map((company) => (
              <ResultTableRow
                key={company.applicationId}
                company={company}
                isOption={isOption}
                isNarrow={isNarrow}
              />
            ))}

            <Pagination
              total={data?.length}
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
