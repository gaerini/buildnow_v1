"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Table from "./TableComp/Table";

export default function TablePage() {
  const data = [
    {
      id: 1,
      companyName: "가나건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 2,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 3,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 4,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 5,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 6,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 7,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 8,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 9,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 10,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 11,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 12,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 13,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 14,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
    {
      id: 15,
      companyName: "D건설",
      applyingWorkType: "철콘",
      applyDate: "2024/03/21",
      joinDate: "2024/03/19",
      isCheck: true,
      isRead: false,
    },
  ];

  const [totalCompanies, setTotalCompanies] = useState<number>(0);
  useEffect(() => {
    // 데이터 배열의 length 속성을 사용하여 총 개수를 계산
    const total = data.length;
    // 계산된 총 개수를 totalCompanies 상태에 저장
    setTotalCompanies(total);
  }, [data]); // data 배열이 변경될 때마다 이 useEffect가 다시 실행됩니다.

  const [page, setPage] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedPage =
      typeof window !== "undefined" ? sessionStorage.getItem("page") : null;
    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  return (
    <div className="flex h-screen pt-16">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col justify-center items-center z-5">
        <div className="self-start pb-2">
          <p className="font-bold whitespace-nowrap">
            Total : {totalCompanies}
          </p>
        </div>
        <Table data={data} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
