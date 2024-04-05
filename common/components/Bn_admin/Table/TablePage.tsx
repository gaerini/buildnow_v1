"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Table from "./TableComp/Table";

export default function TablePage(fetchedData: any) {
  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  const [adminData, setAdminData] = useState([]);

  // console.log(fetchedData);

  const [page, setPage] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedPage =
      typeof window !== "undefined" ? sessionStorage.getItem("page") : null;
    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("페치", fetchedData.fetchedData);
        const rawData = fetchedData.fetchedData.filter(
          (item: any) => item.application.submit === false
        );
        setAdminData(rawData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("어드민", adminData);

    // 데이터 배열의 length 속성을 사용하여 총 개수를 계산
    const total = adminData.length;
    // 계산된 총 개수를 totalCompanies 상태에 저장
    setTotalCompanies(total);
  }, [adminData]); // data 배열이 변경될 때마다 이 useEffect가 다시 실행됩니다.

  return (
    <div className="flex h-screen pt-16">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-start items-start z-5">
        <div className="self-start pb-2">
          <p className="font-bold whitespace-nowrap">
            Total : {totalCompanies}
          </p>
        </div>
        <Table data={adminData} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
