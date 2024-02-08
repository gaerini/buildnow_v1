"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import ListTableRow from "./ListTableRow";
import Pagination from "./Pagination";
import ListHeader from "../ListHeader/ListHeader";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";

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
    return [...data].sort((a, b) => {
      const aValue = a.score[sortKey],
        bValue = b.score[sortKey]; // scores 접근 수정
      if (aValue < bValue) return isAscending ? -1 : 1;
      if (aValue > bValue) return isAscending ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, isAscending]);

  const handleSort = (key: keyof ScoreSummary | null) => {
    setIsAscending(sortKey === key ? !isAscending : true);
    setSortKey(key);
  };

  console.log("데이터2:", sortedData);

  return (
    <div>
      <ListHeader
        data={data}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setPage={setPage}
      />
      <TableHeader onSort={handleSort} />
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
