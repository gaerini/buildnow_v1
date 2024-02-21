"use client";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
// PwFindForm.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface PwFindFormProps {
  selectedTab: string;
}

const PwFindForm = ({ selectedTab }: PwFindFormProps) => {
  const [userId, setUserId] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [userIdError, setUserIdError] = useState(false);
  const [businessIdError, setBusinessIdError] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    // 실제로는 id patch해서 등록되어있는지 확인
    // 사업자 등록번호 존재하는지
    // id와 사업자 등록번호가 매칭되는지 확인
    if (userId.length >= 6 && businessId.length >= 10) {
      router.push(`/applier/account/find/result?tab=${selectedTab}`);
    } else {
      setUserIdError(userId.length < 6);
      setBusinessIdError(businessId.length < 10);
    }
  };

  return (
    <div className="w-[311px] mx-auto gap-y-[16px] flex flex-col">
      <div className="flex flex-col w-full gap-y-1">
        <span className="textColor-black text-paragraph-14">아이디</span>
        <InputStyleDefault
          type="businessId"
          placeholder="등록된 아이디를 작성하세요"
          onChange={(e) => setUserId(e.target.value)}
          errorMessage="등록되어있지 않은 아이디 입니다."
          isError={userIdError}
        />
      </div>
      <div className="flex flex-col w-full gap-y-1">
        <span className="textColor-black text-paragraph-14">
          사업자등록번호
        </span>
        <InputStyleDefault
          type="businessId"
          placeholder="등록된 사업자등록번호를 작성하세요"
          onChange={(e) => setBusinessId(e.target.value)}
          errorMessage="올바르지 않은 사업자등록번호 입니다."
          isError={businessIdError}
        />
      </div>
      <button
        type="submit"
        className="btnStyle-main-1 w-full btnSize-l hover:bg-primary-blue-400"
        onClick={validateForm}
      >
        다음
      </button>
    </div>
  );
};

export default PwFindForm;
