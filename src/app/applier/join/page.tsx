"use client";

import React, { useState } from "react";
import InputStylepasswordault from "../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../common/components/InputForm/InputStyleBtn";

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
          <InputStylepasswordault
            type="abc"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            errorMessage="@가 빠졌음"
            isError={emailError}
            isDisabled={true}
          />
        </div>
        <div className="mb-4">
          <InputStylepasswordault
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            errorMessage="7글자 이상 작성 필요"
            isError={passwordError}
          />
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
        <button type="submit" className=" btnStyle-main-1 btnSize-l">
          Submit
        </button>
      </form>
    </div>
  );
}
