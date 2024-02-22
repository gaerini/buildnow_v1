"use client";

import React, { useState, useEffect } from "react";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../../common/components/InputForm/InputStyleBtn";
import Icon from "../../../../../common/components/Icon/Icon";
import { useRouter } from "next/navigation";

const JoinForm = () => {
  // 각 입력 필드에 대한 상태 관리
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);

  const [businessId, setBusinessId] = useState("");
  const [businessIdError, setBusinessIdError] = useState(false);

  const [managerName, setManagerName] = useState("");
  const [managerNameError, setManagerNameError] = useState(false);

  const [managerPhoneNum, setManagerPhoneNum] = useState("");
  const [managerPhoneNumError, setManagerPhoneNumError] = useState(false);
  const [managerPhoneNumTypeError, setManagerPhoneNumTypeError] =
    useState(false);

  const [managerEmail, setManagerEmail] = useState("");
  const [managerEmailError, setManagerEmailError] = useState(false);
  const [managerEmailTypeError, setManagerEmailTypeError] = useState(false);

  const [userId, setUserId] = useState("");
  const [userIdError, setUserIdError] = useState(false);

  const [password1, setPassword1] = useState("");
  const [password1Error, setPassword1Error] = useState(false);

  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(false);

  const router = useRouter();
  // 유효성 검사 함수
  // setState 함수는 비동기적으로 작동하기 때문에, 상태를 설정한 직후에 바로 그 값을 읽어오면 예상한 값이 아닐 수 있음
  // validate 함수 내에서 직접적인 상태 검사 대신에, 현재 입력 값에 대한 검증 로직을 사용해야 합니다.
  // 예를 들어, companyNameError 상태를 설정하기 보다는 companyName 값 자체를 검사하여 유효성을 확인
  const validate = () => {
    let isValid = true;

    const companyNameValid = companyName !== "";
    setCompanyNameError(!companyNameValid);
    isValid = isValid && companyNameValid;

    const businessIdValid = businessId !== "";
    setBusinessIdError(!businessIdValid);
    isValid = isValid && businessIdValid;

    const managerNameValid = managerName !== "";
    setManagerNameError(!managerNameValid);
    isValid = isValid && managerNameValid;

    const phoneValid =
      managerPhoneNum !== "" && /^\d{3}-\d{3,4}-\d{4}$/.test(managerPhoneNum);
    setManagerPhoneNumError(!managerPhoneNum);
    setManagerPhoneNumTypeError(!phoneValid);
    isValid = isValid && phoneValid;

    const emailValid = managerEmail !== "" && /\S+@\S+\.\S+/.test(managerEmail);
    setManagerEmailError(!managerEmail);
    setManagerEmailTypeError(!emailValid);
    isValid = isValid && emailValid;

    const userIdValid = userId !== "";
    setUserIdError(!userIdValid);
    isValid = isValid && userIdValid;

    const password1Valid = password1.length >= 8;
    setPassword1Error(!password1Valid);
    isValid = isValid && password1Valid;

    const password2Valid = password1 == password2;
    setPassword2Error(!password2Valid);
    isValid = isValid && password2Valid;

    return isValid;
  };

  // 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
      // 데이터가 전송되면 login 페이지로 라우팅
      router.push("/applier/account/login");
    }
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

  const resetPhoneNumErrors = () => {
    setManagerPhoneNumError(false);
    setManagerPhoneNumTypeError(false);
  };

  const resetEmailErrors = () => {
    setManagerEmailError(false);
    setManagerEmailTypeError(false);
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
                  !businessIdError && businessId.length > 0
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
              errorMessage="필수 입력란입니다."
              isError={businessIdError} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
              setIsError={setBusinessIdError}
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
                  !userIdError && userId.length > 0
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
              onChange={(e) => setUserId(e.target.value)} // userId를 state로 관리하고, OnChange일 떄 저장
              errorMessage="필수 입력란입니다."
              isError={userIdError} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
              setIsError={setUserIdError}
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
      </div>

      <div className="py-4">
        <button className="btnStyle-main-1 btnSize-xl w-[311px] hover:bg-primary-blue-400">
          회원가입 완료
        </button>
      </div>
    </form>
  );
};

export default JoinForm;
