"use client";
import React, { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Icon from "../../../../../../common/components/Icon/Icon";
import InputStyleDefault from "../../../../../../common/components/InputForm/InputStyleDefault";

interface SetNewPwProps {
  userId: string;
  onChangeComplete: React.Dispatch<React.SetStateAction<boolean>>;
}

const SetNewPw = ({ userId, onChangeComplete }: SetNewPwProps) => {
  const [password1, setPassword1] = useState("");
  const [password1Error, setPassword1Error] = useState(false);

  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(false);

  const handlePasswordReset = () => {
    // password1의 유효성 검사
    const password1Valid = password1.length >= 8;
    setPassword1Error(!password1Valid);

    // password1과 password2가 같은지 검사
    const password2Valid = password1 === password2;
    setPassword2Error(!password2Valid);

    // 두 검사 모두 통과하면 추가 로직 수행 (예: 비밀번호 변경 API 호출)
    if (password1Valid && password2Valid) {
      // TODO: 여기에 비밀번호 변경 처리 로직을 추가
      onChangeComplete(true);
    } else {
      onChangeComplete(false);
    }
  };

  return (
    <div className="w-[311px] flex flex-col gap-y-[16px]">
      <div className="flex h-[56px] textColor-high-emphasis font-normal text-subTitle-20 items-center ">
        비밀번호 재설정
      </div>
      <div className="flex flex-col w-[311px] gap-y-1">
        <span className="textColor-black text-paragraph-14">
          새로운 비밀번호
        </span>
        <InputStyleDefault
          type="password"
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => setPassword1(e.target.value)} // password1를 state로 관리하고, OnChange일 떄 저장
          errorMessage="8글자 이상이어야 합니다"
          isError={password1Error} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
          setIsError={setPassword1Error}
        />
        <div className="flex items-center textColor-mid-emphasis text-paragraph-12 gap-x-1">
          <Icon name="Error" width={12} height={12} />
          영문, 숫자 포함 8자 이상으로 설정해 주십시오
        </div>
      </div>
      <div className="flex flex-col w-[311px] gap-y-1">
        <span className="textColor-black text-paragraph-14">비밀번호 확인</span>
        <InputStyleDefault
          type="password"
          placeholder="비밀번호를 재입력하세요"
          onChange={(e) => setPassword2(e.target.value)} // password2를 state로 관리하고, OnChange일 떄 저장
          errorMessage="동일하지 않습니다"
          isError={password2Error} // handleSubmit 함수가 실행될 때에 validation을 진행해서 true/false를 입력
          setIsError={setPassword2Error}
        />
      </div>
      <button
        type="button"
        className="btnStyle-main-1 w-full btnSize-l hover:bg-primary-blue-400 "
        onClick={handlePasswordReset}
      >
        비밀번호 재설정
      </button>
    </div>
  );
};

export default SetNewPw;
