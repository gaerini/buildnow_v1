"use client";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
// IdFindForm.tsx
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";

interface IdFindFormProps {
  selectedTab: string;
}

const IdFindForm = ({ selectedTab }: IdFindFormProps) => {
  const [businessId, setBusinessId] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [businessIdError, setBusinessIdError] = useState(false);
  const [managerEmailError, setManagerEmailError] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    // 유효성 검사 로직
    if (businessId.length >= 10 && /\S+@\S+\.\S+/.test(managerEmail)) {
      // 유효성 검사 통과 시, 페이지 이동
      // url query로 userId 전송
      router.push(`/applier/account/find/result?tab=${selectedTab}`);
    } else {
      // 유효성 검사 실패 시, 에러 상태 업데이트
      setBusinessIdError(businessId.length < 10);
      setManagerEmailError(!/\S+@\S+\.\S+/.test(managerEmail));
    }
  };

  return (
    <div className="w-[311px] mx-auto gap-y-[16px] flex flex-col">
      <div className="flex flex-col w-full gap-y-1">
        <span className="textColor-high-emphasis text-paragraph-14">
          사업자등록번호
        </span>
        <InputStyleDefault
          type="businessId"
          placeholder="등록된 사업자 등록번호를 작성하세요"
          onChange={(e) => setBusinessId(e.target.value)}
          errorMessage="올바르지 않은 사업자등록번호 입니다."
          isError={businessIdError}
        />
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <span className="textColor-high-emphasis text-paragraph-14">
          담당자 이메일
        </span>
        <InputStyleDefault
          type="managerEmail"
          placeholder="등록된 이메일을 작성하세요"
          onChange={(e) => setManagerEmail(e.target.value)}
          errorMessage="등록되지 않은 이메일입니다."
          isError={managerEmailError}
        />
      </div>

      <button
        type="submit"
        className="btnStyle-main-1 w-full btnSize-l hover:bg-primary-blue-400"
        onClick={validateForm}
      >
        아이디 찾기
      </button>
    </div>
  );
};

export default IdFindForm;
