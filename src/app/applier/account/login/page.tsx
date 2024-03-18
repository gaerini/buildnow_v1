"use client";

import React, { useState, useEffect, Suspense } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import Alert from "../../../../../common/components/Alert/Alert";
import axios, { AxiosError } from "axios";
import CheckBox from "../../../../../common/components/CheckBox/CheckBox";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import HelpButtons from "../../../../../common/components/HelpButtons/HelpButtons";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";

const LoginPage = () => {
  const [businessId, setBusinessId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [isBusinessIdFocused, setIsBusinessIdFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState(false);
  const [businessIdError, setBusinessIdError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };
  interface ErrorResponse {
    message: string;
  }

  useEffect(() => {
    const savedId = Cookies.get("businessId");
    if (savedId) {
      setBusinessId(savedId);
      setRememberId(true);
    }
  }, []);

  const checkbox = [{ text: "아이디 저장" }];

  const saveId = (index: number | null) => {
    setRememberId(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/recruiter/signin`,
        { businessId, password }
      );
      if (rememberId) {
        Cookies.set("businessId", businessId, { expires: 3 }); // Save for 7 days
      }

      Cookies.set("accessToken", response.data.accessToken);
      Cookies.set("refreshToken", response.data.refreshToken, { expires: 7 });
      router.push("/applier/application/list");
      // console.log(response.data.accessToken, response.data.refreshToken);
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
            setBusinessIdError(true);
            setErrorMessage("아이디가 일치하지 않습니다.");
          } else if (message.includes("password")) {
            setError(true);
            setPassWordError(true);
            setErrorMessage("비밀번호가 일치하지 않습니다.");
          } else {
            // Handle other errors
            setError(true);
            setBusinessIdError(true);
            setPassWordError(true);
            setErrorMessage("로그인 오류가 발생했습니다.");
          }
        }
      }
    }
  };

  const handleBusinessIdFocus = () => {
    setBusinessIdError(false);
    setIsBusinessIdFocused(true);
    setError(false);
  };
  const handlePassWordFocus = () => {
    setPassWordError(false);
    setIsPasswordFocused(true);
    setError(false);
  };
  return (
    <div className="bgColor-navy h-screen w-full flex justify-center items-center">
      <div className="flex flex-col w-[375px] items-center absolute top-[130px] ml:top-[266px] ">
        <Icon name="logo_kor_vert" width={243.74} height={174.36} />
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center  w-[375px] px-8"
        >
          <div className="w-full flex flex-col items-center my-8 gap-y-2">
            {error && (
              <div className="h-[36px] w-full">
                <Alert
                  state="negative"
                  alertIcon={<Icon name="Error" width={16} height={16} />}
                  alertText={
                    <p className="text-paragraph-14 font-light">
                      {errorMessage}
                    </p>
                  }
                  // onClose는 Alert 내의 X 버튼을 눌렀을 때 어떤 일이 일어나도록 할지
                  onClose={() => {
                    setError(false),
                      setBusinessIdError(false),
                      setPassWordError(false);
                  }}
                />
              </div>
            )}
            <div className="flex flex-col w-full gap-y-2 justify-center">
              <div
                className={`h-[44px] flex w-full bgColor-white border rounded-s items-center ${
                  businessIdError && !isBusinessIdFocused
                    ? "border border-secondary-red-original"
                    : isBusinessIdFocused
                    ? "border-primary-blue-original border-2"
                    : "borderColor"
                }`}
              >
                <div className="p-m">
                  <Icon name="User" width={12} height={12} />
                </div>
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  className="flex-grow h-[48px] bg-transparent subTitle-18  focus:outline-none textColor-high-emphasis"
                  value={businessId}
                  onChange={(e) => setBusinessId(e.target.value)}
                  onFocus={handleBusinessIdFocus}
                  onBlur={() => setIsBusinessIdFocused(false)}
                />
              </div>
              <div
                className={`h-[44px] flex w-full bgColor-white items-center border borderColor rounded-s ${
                  passwordError && !isPasswordFocused
                    ? "border-secondary-red-original"
                    : isPasswordFocused
                    ? "border-primary-blue-original border-2"
                    : "borderColor"
                }`}
              >
                <div className="p-m">
                  <Icon name="Lock" width={12} height={12} />
                </div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="flex-grow h-[48px] bg-transparent subTitle-18  focus:outline-none textColor-high-emphasis"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePassWordFocus}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </div>
            </div>
            <div className="w-full flex items-center justify-between h-[19px]">
              <div>
                <CheckBox items={checkbox} onSelect={saveId} size={12} />
              </div>
              <div className="flex gap-x-2">
                <button
                  type="button"
                  className="btnStyle-textOnly-xs hover:border-b hover:border-primary-neutral-600"
                  onClick={() => NavItemClick("/applier/account/find")}
                >
                  아이디 / 비밀번호 찾기
                </button>

                <span className="text-paragraph-12 textColor-mid-emphasis">
                  |
                </span>
                <button
                  type="button"
                  className="btnStyle-textOnly-xs hover:border-b hover:border-primary-neutral-600"
                  onClick={() => NavItemClick("/applier/account/join")}
                >
                  회원가입
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btnStyle-main-1 btnSize-xl w-full h-16"
          >
            로그인
          </button>
        </form>
      </div>
      <div className="absolute bottom-0">
        <HelpButtons />
      </div>
    </div>
  );
};

export default LoginPage;
