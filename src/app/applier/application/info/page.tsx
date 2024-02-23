"use client";
import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../../common/components/InputForm/InputStyleBtn";
import InputStyleSentence from "../../../../../common/components/InputForm/InputStyleSentence";
import FileBadge from "../../../../../common/components/InputForm/FileBadge";

import Header from "../../../../../common/components/ApplierApply/Header";

import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import CompanyInfo from "./CompanyInfo";

interface LicenseData {
  licenseName: string;
  fileName: string;
}

const Page = () => {
  const [licenseData, setLicenseData] = useState<LicenseData[]>([]);
  const [isLicenseVisible, setIsLicenseVisible] = useState(true);

  // 새로운 state 추가
  const [corporateRegistrationNumber, setCorporateRegistrationNumber] =
    useState("");
  const [companyDescription, setCompanyDescription] = useState("");

  const handleCorporateRegistrationNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorporateRegistrationNumber(e.target.value);
  };

  const handleCompanyDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCompanyDescription(e.target.value);
  };

  return (
    <div>
      <ApplierTopNav text="지원서 작성" />

      <div className="flex flex-col w-full mt-[64px]">
        <Header
          titleText="2. 업체 정보 입력"
          additionalText={
            <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
              표시가 붙은 항목들은 필수 입력 항목입니다.
            </span>
          }
        />

        <div className="flex flex-col bg-bgColor-white p-xl h-fit w-[500px] gap-y-2">
          {/*기본 정보 입력 */}
          <CompanyInfo/>
        </div>
      </div>
    </div>
  );
};

export default Page;
