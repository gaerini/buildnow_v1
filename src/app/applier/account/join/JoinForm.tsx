"use client";

import React, { useState, useEffect } from "react";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../../common/components/InputForm/InputStyleBtn";
import Icon from "../../../../../common/components/Icon/Icon";
import { useRouter } from "next/navigation";
import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import Terms from "./Terms";

interface JoinFormProps {
  companyName: string;
  setCompanyName: React.Dispatch<React.SetStateAction<string>>;
  companyNameError: boolean;
  setCompanyNameError: React.Dispatch<React.SetStateAction<boolean>>;
  businessId: string;
  setBusinessId: React.Dispatch<React.SetStateAction<string>>;
  businessIdError: boolean;
  setBusinessIdError: React.Dispatch<React.SetStateAction<boolean>>;
  businessIdDuplicationError: boolean;
  setBusinessIdDuplicationError: React.Dispatch<React.SetStateAction<boolean>>;
  managerName: string;
  setManagerName: React.Dispatch<React.SetStateAction<string>>;
  managerNameError: boolean;
  setManagerNameError: React.Dispatch<React.SetStateAction<boolean>>;
  managerPhoneNum: string;
  setManagerPhoneNum: React.Dispatch<React.SetStateAction<string>>;
  managerPhoneNumError: boolean;
  setManagerPhoneNumError: React.Dispatch<React.SetStateAction<boolean>>;
  managerPhoneNumTypeError: boolean;
  setManagerPhoneNumTypeError: React.Dispatch<React.SetStateAction<boolean>>;
  managerEmail: string;
  setManagerEmail: React.Dispatch<React.SetStateAction<string>>;
  managerEmailError: boolean;
  setManagerEmailError: React.Dispatch<React.SetStateAction<boolean>>;
  managerEmailTypeError: boolean;
  setManagerEmailTypeError: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  usernameError: boolean;
  setUsernameError: React.Dispatch<React.SetStateAction<boolean>>;
  usernameDuplicationError: boolean;
  setUsernameDuplicationError: React.Dispatch<React.SetStateAction<boolean>>;
  password1: string;
  setPassword1: React.Dispatch<React.SetStateAction<string>>;
  password1Error: boolean;
  setPassword1Error: React.Dispatch<React.SetStateAction<boolean>>;
  password2: string;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  password2Error: boolean;
  setPassword2Error: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({
  companyName,
  setCompanyName,
  companyNameError,
  setCompanyNameError,
  businessId,
  setBusinessId,
  businessIdError,
  setBusinessIdError,
  businessIdDuplicationError,
  setBusinessIdDuplicationError,
  managerName,
  setManagerName,
  managerNameError,
  setManagerNameError,
  managerPhoneNum,
  setManagerPhoneNum,
  managerPhoneNumError,
  setManagerPhoneNumError,
  managerPhoneNumTypeError,
  setManagerPhoneNumTypeError,
  managerEmail,
  setManagerEmail,
  managerEmailError,
  setManagerEmailError,
  managerEmailTypeError,
  setManagerEmailTypeError,
  username,
  setUsername,
  usernameError,
  setUsernameError,
  usernameDuplicationError,
  setUsernameDuplicationError,
  password1,
  setPassword1,
  password1Error,
  setPassword1Error,
  password2,
  setPassword2,
  password2Error,
  setPassword2Error,
  handleSubmit,
}) => {
  // 각 입력 필드에 대한 상태 관리

  const getBusinessIdErrorMessage = () => {
    if (businessIdError) {
      return "필수 입력란입니다.";
    } else if (businessIdDuplicationError) {
      return "이미 존재하는 사업자 등록번호입니다.";
    }
    return "";
  };

  const getEmailErrorMessage = () => {
    if (managerEmailError) {
      return "필수 입력란입니다.";
    } else if (managerEmailTypeError) {
      return "이메일 형식이 틀렸습니다.";
    }
    return "";
  };

  const getPhoneErrorMessage = () => {
    if (managerPhoneNumError) {
      return "필수 입력란입니다.";
    } else if (managerPhoneNumTypeError) {
      return "전화번호 형식이 틀렸습니다.";
    }
    return "";
  };

  const getUsernameErrorMessage = () => {
    if (usernameError) {
      return "필수 입력란입니다.";
    } else if (usernameDuplicationError) {
      return "이미 존재하는 아이디입니다.";
    }
    return "";
  };

  const resetBusinessIdErrors = () => {
    setBusinessIdError(false);
    setBusinessIdDuplicationError(false);
  };

  const resetEmailErrors = () => {
    setManagerEmailError(false);
    setManagerEmailTypeError(false);
  };

  const resetPhoneNumErrors = () => {
    setManagerPhoneNumError(false);
    setManagerPhoneNumTypeError(false);
  };

  const resetUsernameErrors = () => {
    setUsernameError(false);
    setUsernameDuplicationError(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute mt-16 flex flex-col justify-center gap-y-8 w-[375px] px-8"
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
            <InputStyleDefault
              type="text"
              placeholder="회사명을 입력하세요"
              onChange={(e) => setCompanyName(e.target.value)}
              errorMessage="필수 입력란입니다."
              isError={companyNameError}
              setIsError={setCompanyNameError}
            />
          </div>
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                사업자 등록번호
              </span>
              <div
                className={
                  !businessIdError &&
                  !businessIdDuplicationError &&
                  businessId.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleBtn
              type="businessId"
              placeholder="사업자 등록번호를 입력하세요"
              onChange={(e) => setBusinessId(e.target.value)} // businessId를 state로 관리하고, OnChange일 떄 저장
              errorMessage={getBusinessIdErrorMessage()}
              isError={businessIdError || businessIdDuplicationError} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
              setIsError={resetBusinessIdErrors}
              buttonText="인증"
            />
          </div>
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                담당자 성함
              </span>
              <div
                className={
                  !managerNameError && managerName.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleDefault
              type="managerName"
              placeholder="성명을 입력하세요"
              onChange={(e) => setManagerName(e.target.value)} // managerName를 state로 관리하고, OnChange일 떄 저장
              errorMessage="필수 입력란입니다."
              isError={managerNameError} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
              setIsError={setManagerNameError}
            />
          </div>
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
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                담당자 이메일
              </span>
              <div
                className={
                  !managerEmailError &&
                  !managerEmailTypeError &&
                  managerEmail.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleBtn
              type="managerEmail"
              placeholder="이메일을 입력하세요"
              onChange={(e) => setManagerEmail(e.target.value)}
              errorMessage={getEmailErrorMessage()}
              isError={managerEmailError || managerEmailTypeError}
              setIsError={resetEmailErrors}
              buttonText="인증"
            />
          </div>
          {/* 다른 입력 필드들도 유사하게 추가 */}
        </div>
      </div>

      <div>
        <div className="flex items-center w-[311px] h-[56px] text-subTitle-20 textColor-high-emphasis">
          로그인 정보
        </div>
        <div className="flex flex-col gap-y-4">
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                아이디
              </span>
              <div
                className={
                  !usernameError &&
                  !usernameDuplicationError &&
                  username.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleBtn
              type="userId"
              placeholder="아이디를 입력하세요"
              onChange={(e) => setUsername(e.target.value)} // userId를 state로 관리하고, OnChange일 떄 저장
              errorMessage={getUsernameErrorMessage()}
              isError={usernameError || usernameDuplicationError}
              setIsError={resetUsernameErrors}
              buttonText="인증"
            />
          </div>

          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                비밀번호
              </span>

              <div
                className={
                  !password1Error && password1.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleDefault
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword1(e.target.value)} // password1를 state로 관리하고, OnChange일 떄 저장
              errorMessage="8글자 이상이어야 합니다"
              isError={password1Error} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
              setIsError={setPassword1Error}
            />
          </div>
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                비밀번호 확인
              </span>
              <div
                className={
                  !password2Error && password2.length > 0
                    ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                    : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
                }
              >
                <Icon name="SubmitCheck" width={16} height={16} />
              </div>
            </div>
            <InputStyleDefault
              type="password"
              placeholder="비밀번호를 재입력하세요"
              onChange={(e) => setPassword2(e.target.value)} // password2를 state로 관리하고, OnChange일 떄 저장
              errorMessage="동일하지 않습니다"
              isError={password2Error} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
              setIsError={setPassword2Error}
            />
          </div>
          {/* 다른 입력 필드들도 유사하게 추가 */}
        </div>
      </div>
      <div>
        <div className="flex items-center w-[311px] h-[56px] text-subTitle-20 textColor-high-emphasis">
          약관 동의
        </div>
        <Terms />
      </div>

      <div className="py-4">
        <button className="btnStyle-main-1 btnSize-xl w-[311px] hover:bg-primary-blue-400">
          회원가입 완료
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <HelpButtons />
      </div>
    </form>
  );
};

export default JoinForm;
