"use client";
import React, { useEffect, useState, Suspense } from "react";
import Icon from "../../../../../../common/components/Icon/Icon";
import InputStyleBtn from "../../../../../../common/components/InputForm/InputStyleBtn";

interface PwChangeAuthProps {
  userId: string;
  onValidationComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const PwChangeAuth = ({ userId, onValidationComplete }: PwChangeAuthProps) => {
  const [managerPhoneNum, setManagerPhoneNum] = useState("");
  const [managerPhoneNumError, setManagerPhoneNumError] = useState(false);
  const [managerPhoneNumTypeError, setManagerPhoneNumTypeError] =
    useState(false);

  const handleValidationComplete = () => {
    // 실제로는 전화번호 인증 API로 true/false 반환
    const phoneValid =
      managerPhoneNum !== "" && /^\d{3}-\d{3,4}-\d{4}$/.test(managerPhoneNum);
    setManagerPhoneNumError(!managerPhoneNum);
    setManagerPhoneNumTypeError(!phoneValid);

    if (managerPhoneNum && phoneValid) {
      onValidationComplete(true);
    } else {
      onValidationComplete(false);
    }
  };

  const getPhoneErrorMessage = () => {
    if (managerPhoneNumError) {
      return "필수 입력란입니다.";
    } else if (managerPhoneNumTypeError) {
      return "전화번호 형식이 틀렸습니다.";
    }
    return "";
  };

  const resetPhoneNumErrors = () => {
    setManagerPhoneNumError(false);
    setManagerPhoneNumTypeError(false);
  };

  return (
    <div className="w-[311px] flex flex-col gap-y-[36px]">
      <div className="flex flex-col w-[311px]">
        <div className="flex justify-between items-center mb-1">
          <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
            담당자 전화번호
          </span>
          <div
            className={
              !managerPhoneNumError &&
              !managerPhoneNumTypeError &&
              managerPhoneNum.length > 0
                ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
            }
          >
            <Icon name="SubmitCheck" width={16} height={16} />
          </div>
        </div>
        <InputStyleBtn
          type="text"
          placeholder="010-1234-5678"
          onChange={(e) => setManagerPhoneNum(e.target.value)}
          errorMessage={getPhoneErrorMessage()}
          isError={managerPhoneNumError || managerPhoneNumTypeError}
          setIsError={resetPhoneNumErrors}
          buttonText="인증"
        />
      </div>
      <button
        type="submit"
        className="btnStyle-main-1 w-full btnSize-l hover:bg-primary-blue-400 "
        onClick={handleValidationComplete}
      >
        다음
      </button>
    </div>
  );
};

export default PwChangeAuth;
