"use client";
import React, { useState } from "react";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  // 새로운 state 추가
  const [corporateRegistrationNumber, setCorporateRegistrationNumber] =
    useState("");
  const [
    isCorporateRegistrationNumberError,
    setIsCorporateRegistrationNumberError,
  ] = useState(true);
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

  const validateAndNavigate = () => {
    if (!corporateRegistrationNumber) {
      alert("법인 등록번호를 입력하세요");
      setIsCorporateRegistrationNumberError(true); // 에러 상태 설정
      return;
    }
    router.push("document/essential");
  };

  return (
    <div>
      <ApplierTopNav text="지원서 작성" showButton={true} />

      <div className="flex flex-col w-full mt-[120px]">
        <Header
          titleText="2. 업체 정보 입력"
          additionalText={
            <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
              표시가 붙은 항목들은 필수 입력 항목입니다.
            </span>
          }
        />

        <div className="flex flex-col bg-bgColor-white p-xl h-fit ml-[641px] w-[500px] gap-y-2">
          {/*기본 정보 입력 */}
          <CompanyInfo
            corporateRegistrationNumber={corporateRegistrationNumber}
            setCorporateRegistrationNumber={setCorporateRegistrationNumber}
            isCorporateRegistrationNumberError={
              isCorporateRegistrationNumberError
            }
            setIsCorporateRegistrationNumberError={
              setIsCorporateRegistrationNumberError
            }
            companyDescription = {companyDescription}
            setCompanyDescription = {setCompanyDescription}
          />
        </div>
        <ApplierSideNav
          comp={"신영씨앤디"}
          prev={"register"}
          next={"document/essential"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
};

export default Page;
