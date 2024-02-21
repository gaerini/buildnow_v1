"use client";

import React, { useState, useEffect } from "react";
import InputStyleSentence from "../../../../common/components/InputForm/InputStyleSentence";
import InputStyleBtn from "../../../../common/components/InputForm/InputStyleBtn";
import Icon from "../../../../common/components/Icon/Icon";

const JoinPage = () => {
  // 각 입력 필드에 대한 상태 관리
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);

  // 유효성 검사 함수
  const validate = () => {
    let isValid = true;

    setCompanyNameError(!companyName);
    isValid = isValid && companyNameError;

    return isValid;
  };

  // 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-y-8 w-[375px] px-8"
    >
      {/* 회원정보 섹션 */}
      <div>
        <div className="flex items-center w-[311px] h-[56px] text-subTitle-20 textColor-high-emphasis">
          회원정보
        </div>
        <div className="flex flex-col gap-y-4">
          {/* 회사명 입력 필드 */}
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                회사명
              </span>
              <div
                className={
                  !companyNameError && companyName.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleSentence
              placeholder="회사명을 입력하세요"
              onChange={(e) => setCompanyName(e.target.value)}
              errorMessage="필수 입력란입니다."
              isError={companyNameError}
              setIsError={setCompanyNameError}
            />
          </div>
        </div>
      </div>

      <div>
        <button className="btnStyle-main-1 btnSize-xl w-[311px] hover:bg-primary-blue-400">
          회원가입 완료
        </button>
      </div>
    </form>
  );
};

export default JoinPage;
