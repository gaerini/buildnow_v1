"use client";

import React, { useState } from "react";
import Icon from "../../../common/components/Icon/Icon";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [businessId, setBusinessId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const NavToList = (path: string) => {
    router.push(path);
  };
  interface ErrorResponse {
    message: string;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    const apiEndpoint =
      "http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000/auth/recruiter/signin";

    try {
      const response = await axios.post(apiEndpoint, { businessId, password });
      NavToList("/details/23-56-678901");
      localStorage.setItem("token", response.data.accessToken);
      console.log(response.data.accessToken);
      // Handle successful login here
    } catch (error) {
      console.log("Error caught", error); // Check if this log is shown
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;
        console.log("Server error", serverError.response); // Check the structure of the error response

        if (serverError.response && serverError.response.data.message) {
          const message = serverError.response.data.message;
          if (message.includes("businessId")) {
            setError(true);
            setErrorMessage("아이디가 일치하지 않습니다");
          } else if (message.includes("password")) {
            setError(true);
            setErrorMessage("비밀번호가 일치하지 않습니다");
          } else {
            // Handle other errors
            setError(true);
            setErrorMessage("로그인 오류가 발생했습니다");
          }
        }
      }
    }
  };

  return (
    <div className="bgColor-navy h-screen w-full flex flex-col justify-center items-center">
      <Icon name="BuildnowLogo" width={243.74} height={174.36} />
      <form onSubmit={handleLogin} className="flex flex-col items-center">
        <div className="mt-[72px] w-[468px] flex flex-col items-center gap-y-2">
          {error && (
            <p className="text-paragraph-14 text-danger-red mb-2 items-center">
              {errorMessage}
            </p>
          )}
          <div
            className={`flex w-full bgColor-white items-center border rounded-s ${
              error ? "border-danger-red" : "borderColor"
            }`}
          >
            <div className="p-m ">
              <Icon name="User" width={32} height={32} />
            </div>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="flex-grow h-[48px] bg-transparent p-m subTitle-18 textColor-mid-emphasis"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
            />
          </div>
          <div
            className={`flex w-full bgColor-white items-center border rounded-s ${
              error ? "border-danger-red" : "borderColor"
            }`}
          >
            <div className="p-m">
              <Icon name="Lock" width={32} height={32} />
            </div>
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="flex-grow h-[48px] bg-transparent p-m subTitle-18 textColor-mid-emphasis"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-[72px] btnStyle-main-1 btnSize-xl w-[468px] h-16"
        >
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
