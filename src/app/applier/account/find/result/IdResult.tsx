"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface IdResultProps {
  userId: string;
}

const IdResult = ({ userId }: IdResultProps) => {
  const router = useRouter();
  return (
    <div className="w-[311px] flex flex-col gap-y-[36px]">
      <div className="flex flex-col justify-center h-[132px] w-full pt-[42px]">
        <p className="break-words text-center textColor-high-emphasis text-paragraph-16">
          귀하의 아이디는 다음과 같습니다
        </p>
        <p className="flex justify-center mt-[16px] text-title-28 textColor-mid-emphasis font-bold">
          {userId}
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

export default IdResult;
