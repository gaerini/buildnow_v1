"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface PwResultProps {
  userId: string;
}

const PwResult = ({ userId }: PwResultProps) => {
  const router = useRouter();
  return (
    <div className="w-[311px] flex flex-col gap-y-[36px]">
      <div className="flex flex-col justify-center h-[132px] w-full pt-[42px]">
        <p className="break-words text-center textColor-high-emphasis text-paragraph-16">
          귀하의 비밀번호가 재설정 되었습니다.
        </p>
      </div>
      <button
        type="button"
        className="btnStyle-main-1 w-full btnSize-l hover:bg-primary-blue-400 "
        onClick={() => router.push("/applier/account/login")}
      >
        로그인 하기
      </button>
    </div>
  );
};

export default PwResult;
