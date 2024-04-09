"use client";

import JoinForm from "./JoinForm";
import React, { useState } from "react";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import axios, { AxiosError } from "axios";

export default function page() {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [companyNameError, setCompanyNameError] = useState(false);

  const [businessId, setBusinessId] = useState("");
  const [businessIdError, setBusinessIdError] = useState(false);
  const [businessIdDuplicationError, setBusinessIdDuplicationError] =
    useState(false);

  const [managerName, setManagerName] = useState("");
  const [managerNameError, setManagerNameError] = useState(false);

  const [managerPhoneNum, setManagerPhoneNum] = useState("");
  const [managerPhoneNumError, setManagerPhoneNumError] = useState(false);
  const [managerPhoneNumTypeError, setManagerPhoneNumTypeError] =
    useState(false);

  const [managerEmail, setManagerEmail] = useState("");
  const [managerEmailError, setManagerEmailError] = useState(false);
  const [managerEmailTypeError, setManagerEmailTypeError] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [usernameDuplicationError, setUsernameDuplicationError] =
    useState(false);

  const [password1, setPassword1] = useState("");
  const [password1Error, setPassword1Error] = useState(false);

  const [password2, setPassword2] = useState("");
  const [password2Error, setPassword2Error] = useState(false);

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

    const usernameValid = username !== "";
    setUsernameError(!usernameValid);
    isValid = isValid && usernameValid;

    const password1Valid = password1.length >= 8;
    setPassword1Error(!password1Valid);
    isValid = isValid && password1Valid;

    const password2Valid = password1 == password2;
    setPassword2Error(!password2Valid);
    isValid = isValid && password2Valid;

    return isValid;
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    NProgress.start();

    if (validate()) {
      let form = new FormData();
      form.append("username", username);
      form.append("password", password1);
      form.append("businessId", businessId);
      form.append("managerName", managerName);
      form.append("companyName", companyName);
      form.append("managerPhoneNum", managerPhoneNum);
      form.append("managerEmail", managerEmail);

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_SPRING_URL}/applier/join`,
          form
        );
        console.log("Form Submitted");
        router.push("/applier/account/login");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log("Error submitting form", error.response.data);
          if (error.response.data.message === "이미 존재하는 아이디입니다.") {
            setUsernameDuplicationError(true);
            // 추가적으로 필요한 처리를 여기에 구현합니다.
          }
          if (error.response.data.message === "이미 가입된 회사입니다.") {
            setBusinessIdDuplicationError(true);
          }
        } else {
          console.log("Error submitting form", error);
        }
      } finally {
        NProgress.done();
      }
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center h-screen">
      <div className="z-10">
        <ApplierTopNav text="협력업체 회원가입" />
      </div>
      <div className="flex justify-center w-full h-screen overflow-y-scroll">
        <JoinForm
          companyName={companyName}
          setCompanyName={setCompanyName}
          companyNameError={companyNameError}
          setCompanyNameError={setCompanyNameError}
          businessId={businessId}
          setBusinessId={setBusinessId}
          businessIdError={businessIdError}
          setBusinessIdError={setBusinessIdError}
          businessIdDuplicationError={businessIdDuplicationError}
          setBusinessIdDuplicationError={setBusinessIdDuplicationError}
          managerName={managerName}
          setManagerName={setManagerName}
          managerNameError={managerNameError}
          setManagerNameError={setManagerNameError}
          managerPhoneNum={managerPhoneNum}
          setManagerPhoneNum={setManagerPhoneNum}
          managerPhoneNumError={managerPhoneNumError}
          setManagerPhoneNumError={setManagerPhoneNumError}
          managerPhoneNumTypeError={managerPhoneNumTypeError}
          setManagerPhoneNumTypeError={setManagerPhoneNumTypeError}
          managerEmail={managerEmail}
          setManagerEmail={setManagerEmail}
          managerEmailError={managerEmailError}
          setManagerEmailError={setManagerEmailError}
          managerEmailTypeError={managerEmailTypeError}
          setManagerEmailTypeError={setManagerEmailTypeError}
          username={username}
          setUsername={setUsername}
          usernameError={usernameError}
          setUsernameError={setUsernameError}
          usernameDuplicationError={usernameDuplicationError}
          setUsernameDuplicationError={setUsernameDuplicationError}
          password1={password1}
          setPassword1={setPassword1}
          password1Error={password1Error}
          setPassword1Error={setPassword1Error}
          password2={password2}
          setPassword2={setPassword2}
          password2Error={password2Error}
          setPassword2Error={setPassword2Error}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
