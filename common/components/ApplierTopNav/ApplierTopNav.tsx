"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Icon from "../Icon/Icon"; // Icon 컴포넌트의 정확한 경로를 입력해주세요.
import Cookies from "js-cookie";

interface ApplierTopNavProps {
  text: string;
  showButton?: boolean;
  onSave?: React.MouseEventHandler<HTMLButtonElement>; // onSave 함수로, post/patch 로직 전달
  buttonState?: string; // 추가
  setButtonState?: React.Dispatch<React.SetStateAction<string>>;
  tokenName?: string;
  home?: string;
}

const ApplierTopNav: React.FC<ApplierTopNavProps> = ({
  text,
  showButton,
  onSave,
  buttonState, // 추가
  setButtonState, // 추가
  tokenName = "token", //추가
  home,
}) => {
  // 버튼 상태 관리

  // 저장 로직 변경
  const handleSave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onSave) {
      onSave(e);
      setButtonState?.("saving");
    }
  };
  const router = useRouter();
  const handleLogout = () => {
    // 토큰 삭제
    Cookies.remove(`${tokenName}`);
    if (tokenName === "accessTokenAdmin") {
      console.log(home);
      router.push(`${home}`);
    }
  };

  useEffect(() => {
    if (buttonState === "saving") {
      setTimeout(() => {
        setButtonState?.("saved");
      }, 1000);
    }
  }, [buttonState, setButtonState]);

  return (
    <div className="fixed top-0 left-0 w-screen h-[64px] flex justify-between bgColor-white border-b borderColor">
      {/* 첫번째 영역: 로고 */}
      <div className="flex items-center p-xl w-[266px]">
        <Icon name="logo_kor_horiz" width={141} height={32} />
      </div>

      {/* 두번째 영역: 텍스트와 버튼 */}
      <div
        className="flex items-center justify-between p-xl bg-bgColor-white"
        style={{ flex: 1 }}
      >
        <span className="font-bold textColor-high-emphasis text-subTitle-20 whitespace-nowrap">
          {text}
        </span>
        {showButton && buttonState === "logout" ? (
          <button
            onClick={handleLogout}
            className="text-paragraph-12 font-normal hover:underline underline-offset-4 active:textColor-focus active:decoration-current"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={handleSave}
            className={`w-[133px] rounded-s border btnSize-s whitespace-nowrap flex items-center justify-center gap-x-2
              ${
                buttonState === "default"
                  ? "hover:textColor-high-emphasis hover:bgColor-neutral border-primary-neutral-200"
                  : ""
              }
              ${
                buttonState === "saving"
                  ? "border-primary-blue-original textColor-focus bgColor-blue"
                  : ""
              }
              ${
                buttonState === "saved"
                  ? "border-primary-blue-original textColor-focus bgColor-blue"
                  : ""
              }`}
          >
            {buttonState === "saving" && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="#5085EA"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="#5085EA"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}

            {buttonState === "default" && "지원서 임시저장"}
            {buttonState === "saving" && "임시저장 중"}
            {buttonState === "saved" && "임시저장 완료"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ApplierTopNav;
