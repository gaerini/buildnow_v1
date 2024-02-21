"use client";

import React, { useState, useEffect } from "react";
import IdFindForm from "./IdFindForm";
import PwFindForm from "./PwFindForm";
import { useSearchParams, useRouter } from "next/navigation";
interface FindProps {
  Tab?: string;
}

const FindForm = ({ Tab }: FindProps) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("");
  useEffect(() => {
    if (Tab) {
      setSelectedTab(Tab);
    }
  }, [Tab]);

  return (
    <div className="w-[468px] h-[530px] bg-white rounded-s">
      <div className="flex items-center border-b borderColor">
        <div
          className={`w-1/2 h-[54px] paragraph-16 flex items-center justify-center ${
            selectedTab === "id"
              ? "font-bold text-black border-primary-blue-original border-b-2"
              : "font-normal textColor-mid-emphasis"
          }`}
          onClick={() => {
            setSelectedTab("id"), router.push("?tab=id");
          }}
        >
          아이디 찾기
        </div>
        <div
          className={`w-1/2 h-[54px] paragraph-16 flex items-center justify-center  ${
            selectedTab === "pw"
              ? "font-bold text-black border-primary-blue-original border-b-2"
              : "font-normal textColor-mid-emphasis"
          }`}
          onClick={() => {
            setSelectedTab("pw"),
              router.push("?tab=pw");
          }}
        >
          비밀번호 재설정
        </div>
      </div>
      <div className="flex h-[475px] w-full items-center justify-center">
        {selectedTab === "id" && <IdFindForm selectedTab={"id"} />}
        {selectedTab === "pw" && <PwFindForm selectedTab={"pw"}/>}
      </div>
    </div>
  );
};

export default FindForm;
