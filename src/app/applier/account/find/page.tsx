"use client";
import FindForm from "./FindForm";
import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function page() {
  const [tab, setTab] = useState("id");
  const searchParams = useSearchParams();

  useEffect(() => {
    // URL 쿼리 파라미터에서 'tab' 값을 가져옵니다.
    const tabQuery = searchParams?.get("tab");

    // 쿼리 파라미터가 'id' 또는 'password' 중 하나일 경우 해당 값을 사용하고, 그렇지 않으면 'id'를 기본값으로 사용합니다.
    setTab(tabQuery === "pw" ? "pw" : "id");
  }, [searchParams?.get("selectedTab")]);

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen bgColor-navy">
      <FindForm Tab={tab} />
      <div className="absolute bottom-0">
        <HelpButtons />
      </div>
    </div>
  );
}
