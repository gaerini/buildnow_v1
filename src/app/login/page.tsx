"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../../common/components/Icon/Icon";
import Alert from "../../../common/components/Alert/Alert";
import HelpButtons from "../../../common/components/HelpButtons/HelpButtons";
import axios, { AxiosError } from "axios";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NProgress from "nprogress";

import "./style.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberUsername, setRememberUsername] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPassWordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const NavItemClick = (path: string) => {
    router.push(path);
  };

  interface ErrorResponse {
    error: string;
  }

  useEffect(() => {
    const savedId = Cookies.get("username");
    if (savedId) {
      setUsername(savedId);
      setRememberUsername(true);
    }
  }, []);

  const checkbox = [{ text: "아이디 저장" }];

  const saveId = (index: number | null) => {
    setRememberUsername(true);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");
    NProgress.start();

    try {
      let form = new FormData();
      form.append("username", username);
      form.append("password", password);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/login`,
        form
      );

      const authHeader = response.headers["authorization"];
      if (authHeader) {
        // Extract the token from the Authorization header
        const token = authHeader.split(" ")[1]; // Splits 'Bearer TOKEN' and takes the TOKEN part
        Cookies.set("accessTokenRecruiter", token, { expires: 3 }); // Save for 3 days
        console.log(token);
      }

      if (rememberUsername) {
        Cookies.set("username", username, { expires: 3 }); // Save for 3 days
      }
      // Cookies.set("refreshToken", response.data.refreshToken, { expires: 7 });
      // Check response body for "ROLE_RECRUITER"
      if (
        response.data &&
        response.data.recruiterName &&
        response.data.recruitmentInfoDTOList
      ) {
        router.push("/list");
      } else {
        setError(true);
        setUsernameError(true);
        setErrorMessage("종합건설사용 로그인 페이지입니다");
        NProgress.done();
      }
    } catch (error) {
      NProgress.done();
      console.log("Error caught", error); // Check if this log is shown
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError<ErrorResponse>;
        console.log("Server error", serverError.response); // Check the structure of the error response

        if (serverError.response && serverError.response.data) {
          const error = serverError.response.data.error;
          if (error.includes("Authentication failed: Bad credentials")) {
            setError(true);
            setUsernameError(true);
            setPassWordError(true);
            setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다");
            NProgress.done();
          }
        }
      }
    }
  };

  const handleUsername = () => {
    setUsernameError(false);
    setIsUsernameFocused(true);
  };
  const handlePassWordFocus = () => {
    setPassWordError(false);
    setIsPasswordFocused(true);
  };

  return (
    <div className="bgColor-navy h-screen w-full flex justify-center items-center">
      <div className="flex flex-col w-[375px] items-center absolute top-[130px] ml:top-[266px] gap-y-8">
        <Icon name="logo_kor_vert" width={243.74} height={174.36} />
        <div className="text-paragraph-16 font-bold textColor-title ">
          종건용 관리 사이트
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center  w-[375px] px-8"
        >
          <div className="w-full flex flex-col items-center mb-8 gap-y-2">
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
                      setUsernameError(false),
                      setPassWordError(false);
                  }}
                />
              </div>
            )}
            <div className="flex flex-col w-full gap-y-2 justify-center">
              <div
                className={`h-[44px] flex w-full bgColor-white border rounded-s items-center ${
                  usernameError && !isUsernameFocused
                    ? "border border-secondary-red-original"
                    : isUsernameFocused
                    ? "border-primary-blue-original border-2"
                    : "border borderColor"
                }`}
              >
                <div className="p-m">
                  <Icon name="User" width={16} height={16} />
                </div>
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요"
                  className="flex-grow h-[44px] bg-transparent text-subTitle-18 border-transparent focus:border-transparent focus:ring-0 textColor-high-emphasis"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={handleUsername}
                  onBlur={() => setIsUsernameFocused(false)}
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
                  <Icon name="Lock" width={16} height={16} />
                </div>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  className="flex-grow h-[44px] bg-transparent text-subTitle-18 border-transparent focus:border-transparent focus:ring-0 textColor-high-emphasis"
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
      {/* <div className="absolute bottom-0">
        <HelpButtons />
      </div> */}
    </div>
  );
};

export default LoginPage;
