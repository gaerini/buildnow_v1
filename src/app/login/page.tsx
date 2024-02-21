"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../../common/components/Icon/Icon";
import axios, { AxiosError } from "axios";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
      router.push("/list");
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
            setErrorMessage("아이디가 일치하지 않습니다");
          } else if (message.includes("password")) {
            setError(true);
            setPassWordError(true);
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

  const handleBusinessIdFocus = () => {
    setBusinessIdError(false);
    setIsBusinessIdFocused(true);
  };
  const handlePassWordFocus = () => {
    setPassWordError(false);
    setIsPasswordFocused(true);
  };
  return (
    <div className="bgColor-navy h-screen w-full flex justify-center">
      <div className="flex flex-col items-center gap-y-[72px] absolute xl:top-[50px] 2xl:top-[266px]">
        <Icon name="logo_kor_vert" width={243.74} height={174.36} />
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center h-[190px]"
        >
          <div className=" w-[468px] flex flex-col items-center">
            <div className="h-[17px] mb-6">
              {error && (
                <p className="text-paragraph-14 textColor-danger mb-2 items-center">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full h-[104px] gap-y-2">
              <div
                className={`h-[48px] flex w-full bgColor-white border rounded-s ${
                  businessIdError && !isBusinessIdFocused
                    ? "border-secondary-red-original"
                    : isBusinessIdFocused
                    ? "border-primary-blue-original border-2"
                    : "borderColor"
                }`}
              >
                <div className="p-m ">
                  <Icon name="User" width={32} height={32} />
                </div>
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  className="flex-grow h-[48px] bg-transparent p-m subTitle-18  focus:outline-none textColor-black"
                  value={businessId}
                  onChange={(e) => setBusinessId(e.target.value)}
                  onFocus={handleBusinessIdFocus}
                  onBlur={() => setIsBusinessIdFocused(false)}
                />
              </div>
              <div
                className={`h-[48px] flex w-full bgColor-white items-center border borderColor rounded-s ${
                  passwordError && !isPasswordFocused
                    ? "border-secondary-red-original"
                    : isPasswordFocused
                    ? "border-primary-blue-original"
                    : "borderColor"
                }`}
              >
                <div className="p-m">
                  <Icon name="Lock" width={32} height={32} />
                </div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="flex-grow h-[48px] bg-transparent p-m subTitle-18  focus:outline-none textColor-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handlePassWordFocus}
                  onBlur={() => setIsPasswordFocused(false)}
                />
              </div>
            </div>
            <div className="w-full justify-center mt-[18px] mb-8 h-[24px]">
              <CheckBox items={checkbox} onSelect={saveId} />
            </div>
          </div>

          <button
            type="submit"
            className="btnStyle-main-1 btnSize-xl w-[468px] h-16"
          >
            로그인
          </button>
        </form>
      </div>
      <div className="flex flex-col justify-center absolute bottom-0">
        <div className="p-xl justify-between gap-x-4 inline-flex">
          <div className="btnStyle-textOnly text-paragraph-12 text-center hover:underline underline-offset-4 active:textColor-focus active:decoration-current">
            이용약관
          </div>
          <div className="btnStyle-textOnly text-paragraph-12 text-center hover:underline underline-offset-4 active:textColor-focus active:decoration-current">
            개인정보처리방침
          </div>
          <div
            className="btnStyle-textOnly text-paragraph-12 text-center hover:underline underline-offset-4 active:textColor-focus active:decoration-current"
            onClick={() => NavItemClick("/contact")}
          >
            고객센터
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
