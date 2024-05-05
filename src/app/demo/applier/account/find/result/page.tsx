"use client";
// id-result/page.tsx
import React, { useState, Suspense } from "react";
import FindForm from "../FindForm"; // 기존 FindForm 임포트
import PwFindForm from "../PwFindForm";
import PwChangeAuth from "./PwChangeAuth";
import SetNewPw from "./SetNewPw";
import IdResult from "./IdResult"; // IdResult 컴포넌트 임포트
import HelpButtons from "../../../../../../../common/components/HelpButtons/HelpButtons";
import { useSearchParams, useRouter } from "next/navigation";
import PwResult from "./PwResult";

export default function ResultPage({searchParams}:{searchParams:{tab:string|undefined}}) {
  const router = useRouter();
  // const searchParams = useSearchParams();
  const tab = searchParams.tab
  const [selectedTab, setSelectedTab] = useState(tab); // URL에서 받은 탭 상태 또는 기본값
  // const [isValidationComplete, setIsValidationComplete] = useState(false);
  const [isNewPWComplete, setIsNewPwComplete] = useState(false);

  // userId를 받아와서 IdResult 로 전송해야함
  const userId = "Kyle9909";

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen bgColor-navy">
      <div className="w-[375px] h-[530px] bg-white rounded-s">
        <div className="flex items-center border-b borderColor">
          <div
            className={`w-1/2 h-[54px] paragraph-16 flex items-center justify-center ${
              selectedTab === "id"
                ? "font-bold text-black border-primary-blue-original border-b-2"
                : "font-normal textColor-mid-emphasis"
            }`}
            onClick={() => {
              setSelectedTab("id"), router.push("/applier/account/find?tab=id");
            }}
          >
            아이디 찾기
          </div>

          <div
            className={`w-1/2 h-[54px] paragraph-16 flex items-center justify-center ${
              selectedTab === "pw"
                ? "font-bold text-black border-primary-blue-original border-b-2"
                : "font-normal textColor-mid-emphasis"
            }`}
            onClick={() => {
              setSelectedTab("pw"), router.push("/applier/account/find?tab=pw");
            }}
          >
            비밀번호 재설정
          </div>
        </div>
        <div className="flex h-[475px] w-full items-center justify-center">
          {selectedTab === "id" && <IdResult userId={userId} />}
          {/* {selectedTab === "pw" && !isValidationComplete && (
            <PwChangeAuth
              userId={userId}
              onValidationComplete={setIsValidationComplete}
            />
          )} */}
          {selectedTab === "pw" && !isNewPWComplete && (
            <SetNewPw userId={userId} onChangeComplete={setIsNewPwComplete} />
          )}
          {selectedTab === "pw" && isNewPWComplete && (
            <PwResult userId={userId} />
          )}
        </div>
      </div>
      <div className="absolute bottom-0">
        <HelpButtons />
      </div>
    </div>
  );
}
