"use client";

import React, { useState } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
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

interface TableProps {
  data: CompanyData[];
  // 나중에 정렬 함수와 API 호출 함수를 추가할 수 있습니다.
}

export default function ScoreTable({ data }: TableProps) {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [sortKey, setSortKey] = useState<keyof CompanyData | null>(null);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return isAscending ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return isAscending ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, isAscending]);

  const handleSort = (key: keyof CompanyData) => {
    setIsAscending(sortKey === key ? !isAscending : true);
    setSortKey(key);
  };

  return (
    <div>
      <TableHeader onSort={handleSort} />
      {sortedData.slice(offset, offset + limit).map((company) => (
        <TableRow key={company.name} company={company} />
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
