"use client";

import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import ListTableRow from "./ListTableRow";
import Pagination from "./Pagination";
import ListHeader from "../ListHeader/ListHeader";

import CompanyList from "./CompanyList.json";
import axios from "axios";

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

  // // JWT 토큰
  // const jwtToken =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDcyMzE5NjMsImV4cCI6MTcwNzIzNTU2M30.02eQYx43_D2Li8Zlcz7jkNQrv3IOLIqu073osLx2AZM";
  // // Axios 인스턴스 생성
  // const axiosInstance = axios.create({
  //   baseURL:
  //     "http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000",
  //   headers: {
  //     Authorization: `Bearer ${jwtToken}`,
  //   },
  // });

  // const [getData, setGetData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axiosInstance.get("application/getMyApplicants");
  //       setGetData(response.data);
  //       console.log(response.data);
  //     } catch (error) {}
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <ListHeader
        data={CompanyList}
        activeButton={activeButton}
        setActiveButton={setActiveButton}
        setPage={setPage}
      />
      <TableHeader onSort={handleSort} />
      {sortedData.slice(offset, offset + limit).map((company) => (
        <ListTableRow key={company.name} company={company} />
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
