"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "../../../ScoreTable/Pagination";
import Icon from "../../../Icon/Icon";
import { CompanyInfoSummary } from "../../../Interface/CompanyData";

interface TableProps {
  data: any[];
  page: number;
  setPage: (page: number) => void;
}

export default function Table({ data, page, setPage }: TableProps) {
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;

  console.log("page:", page);
  console.log(data.slice(0, 3).map((company) => company.id));
  return (
    <div className="w-full">
      <TableHeader />
      {data && data.length > 0 ? (
        data
          .slice(offset, offset + limit)
          .map((company) => (
            <TableRow data={company} key={company.application.id} />
          ))
      ) : (
        <div>데이터가 없습니다.</div>
      )}
      <Pagination
        total={data.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
