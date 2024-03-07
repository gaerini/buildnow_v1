"use client";

import React, { useState } from "react";
import InputStyleDefault from "../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../common/components/InputForm/InputStyleBtn";
import Icon from "../../../../common/components/Icon/Icon";
import InputStyleDropdown from "../../../../common/components/InputForm/InputStyleDropdown";

export default function Join() {
  const [abc, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (input: string) => {
    return input.includes("@");
  };

  const validatePassword = (input: string) => {
    return input.length >= 7;
  };

  const validateBusinessId = (input: string) => {
    return input.length >= 12;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(abc);
    const isPasswordValid = validatePassword(password);
    const isBusinessIdValid = validateBusinessId(businessId);

    if (!isEmailValid) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (!isPasswordValid) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (isEmailValid && isPasswordValid) {
      console.log(`Email: ${abc}`);
      console.log(`Password: ${password}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Join</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <InputStyleDefault
            type="abc"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="@가 빠졌음"
            isError={emailError}
            isDisabled={true}
          />
        </div>
        <div className="mb-4">
          <InputStyleDefault
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            errorMessage="7글자 이상 작성 필요"
            isError={passwordError}
          ></InputStyleDefault>
        </div>
        <div className="mb-4 w-[400px]">
          <InputStyleBtn
            type="businessId"
            placeholder="사업자 등록번호 입력"
            onChange={(e) => setBusinessId(e.target.value)}
            errorMessage="사업자 등록번호 인증 오류"
            isError={passwordError}
            buttonText="인증"
          />
        </div>
        <div className="mb-4 w-[400px]">
          {/* <InputStyleDropdown
            placeholder="선택하세요"
            inputList={[
              "지반조성 포장공사업",
              "실내건축공사업",
              "금속창호 지붕건축물 조립공사업",
              "도장 습식 방수 석공사업",
              "조경식재 시설물공사업",
              "철근 콘크리트 공사업",
              "구조물해체 비계 공사업",
              "상하수도 설비공사업",
              "철도 궤도공사업",
              "철강구조물공사업",
              "수중 준설공사업",
              "승강기 삭도 공사업",
              "기계가스설비 공사업",
              "가스난방공사업",
              "전기공사업"

            ]}
          /> */}
        </div>
        <button type="submit" className=" btnStyle-main-1 btnSize-l">
          Submit
        </button>
      </form>
    </div>
  );
}
