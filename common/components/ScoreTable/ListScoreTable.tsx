"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import ListTableRow from "./ListTableRow";
import Pagination from "./Pagination";
import ListHeader from "../ListHeader/ListHeader";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";

interface SortOption {
  label: string;
  icon: string;
}

interface TableProps {
  data: CompanyScoreSummary[];
  activeButton: string;
  setActiveButton: (button: string) => void;
  // 나중에 정렬 함수와 API 호출 함수를 추가할 수 있습니다.
}

export default function ScoreTable({
  data,
  activeButton,
  setActiveButton,
}: TableProps) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [sortKey, setSortKey] = useState<keyof ScoreSummary | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);
  const [resultAscending, setResultAscending] = useState<
    string | null | undefined
  >(null);

  // const [sortedData, setSortedData] = useState<CompanyScoreSummary[]>(data);

  // useEffect(() => {
  //   const sortData = () => {
  //     if (!sortKey) return data;
  //     const sorted = [...data].sort((a, b) => {
  //       const aValue = a.score[sortKey] ?? 0; // 'undefined' 값을 처리하기 위해 '?? 0'을 추가
  //       const bValue = b.score[sortKey] ?? 0; // 동일하게 'undefined' 값 처리
  //       if (aValue < bValue) return isAscending ? -1 : 1;
  //       if (aValue > bValue) return isAscending ? 1 : -1;
  //       return 0;
  //     });
  //     setSortedData(sorted);
  //   };

  //   sortData();
  // }, [data, sortKey, isAscending]); // 'data', 'sortKey', 'isAscending' 변경 시 정렬 실행
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

  console.log(resultAscending);
  console.log(sortKey);

  return (
    <div>
      <ListHeader
        data={data}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setPage={setPage}
      />
      <TableHeader onSort={onSort} />
      {sortedData.slice(offset, offset + limit).map((company) => (
        <ListTableRow key={company.businessId} company={company} />
      ))}
      <Pagination
        total={data.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}

// else if ( sortClass === "result"){

// }
