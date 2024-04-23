"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "../../../ScoreTable/Pagination";
import Icon from "../../../Icon/Icon";
import { CompanyInfoSummary } from "../../../Interface/CompanyData";

interface adminData {
  adminData: [];
}
interface TableProps {
  data: adminData;
  page: number;
  setPage: (page: number) => void;
}

export default function Table({ data, page, setPage }: TableProps) {
  const [limit, setLimit] = useState(10);
  const offset = (page - 1) * limit;

  // console.log("page:", page);
  // console.log(data.slice(0, 3).map((company) => company.id));
  // console.log("data", data.adminData);
  const currentPageData = data.adminData.slice(offset, offset + limit);

  return (
    <div className="w-full">
      <TableHeader />
      {currentPageData.length > 0 ? (
        currentPageData.map((company: any) => (
          <TableRow data={company} key={company.application.id} />
        ))
      ) : (
        <div>데이터가 없습니다.</div>
      )}
      <Pagination
        total={data.adminData.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
