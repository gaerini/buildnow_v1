"use client";
// Landing Page Component
import React from "react";
import Icon from "../../../../common/components/Icon/Icon";
import HelpButtons from "../../../../common/components/HelpButtons/HelpButtons";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const companyName = "신영씨앤디"; // 회사 이름을 여기에 입력하세요

  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };

  return (
    <div className="bgColor-navy flex justify-center items-center h-screen">
      <div className="w-[375px] px-8">
        {/* 첫 번째 영역 */}
        <div className="flex flex-col justify-start top-[327px]">
          <p className="text-title-28 textColor-title font-extrabold">
            {companyName} <span className="font-medium">협력업체 지원</span>
          </p>
          <div className="flex justify-start items-center gap-2 mt-2">
            <Icon name="logo_kor_horiz" width={141} height={32} />
            <span className="text-title-28 textColor-title font-medium">
              에서!
            </span>
          </div>
        </div>

        {/* 두 번째 영역 */}
        <div className="mt-12">
          <p className="flex justify-start text-paragraph-16 textColor-mid-emphasis">
            빌드나우를 통한 지원이 처음이라면?
          </p>
          <button
            className="w-full btnStyle-main-1 btnSize-xl hover:bg-primary-blue-400 mt-2"
            onClick={() => NavItemClick("/applier/account/join")}
          >
            회원가입
          </button>
        </div>

        {/* 세 번째 영역 */}
        <div className="mt-4 text-center">
          <p className="flex justify-start text-paragraph-16 textColor-mid-emphasis">
            이미 빌드나우 회원이라면
          </p>
          <button
            className="w-full btnStyle-main-2 btnSize-xl hover:bgColor-neutral hover:textColor-black mt-2"
            onClick={() => NavItemClick("/applier/account/login")}
          >
            로그인
          </button>
        </div>
      </div>
      <div className="absolute bottom-0">
        <HelpButtons />
      </div>
    </div>
  );
};

export default LandingPage;
