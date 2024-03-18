"use client";
import React, { useState } from "react";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import { useRouter } from "next/navigation";
import Header from "../../../../../common/components/ApplierApply/Header";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import CompanyInfo from "./CompanyInfo";

// interface LicenseData {
//   licenseName: string;
//   fileName: string;
// }

const Page = () => {
  // const [licenseData, setLicenseData] = useState<LicenseData[]>([]);
  // const [isLicenseVisible, setIsLicenseVisible] = useState(true);
  const router = useRouter();

  const [businessType, setBusinessType] = useState("");
  const [isBusinessTypeError, setIsBusinessTypeError] = useState(false); // New error state for businessType
  const [corpRegistrationNumber, setCorpRegistrationNumber] = useState("");
  const [isCorpRegistrationNumberError, setIsCorpRegistrationNumberError] =
    useState(false);
  const [address, setAddress] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);
  const [companyPhoneNum, setCompanyPhoneNum] = useState("");
  const [isCompanyPhoneNumError, setIsCompanyPhoneNumError] = useState(false);
  const [companyDescription, setCompanyDescription] = useState("");

  const validateAndNavigate = () => {
    let errorMessages = [];

    // Resetting error states
    setIsBusinessTypeError(false);
    setIsCorpRegistrationNumberError(false);
    setIsCompanyPhoneNumError(false);

    // Business type validation
    if (!businessType) {
      setIsBusinessTypeError(true);
      errorMessages.push("사업자 유형을 선택하세요");
    }

    // Corp registration number validation for corp business type
    if (businessType === "법인 사업자" && !corpRegistrationNumber) {
      setIsCorpRegistrationNumberError(true);
      errorMessages.push("법인 등록번호를 입력하세요");
    }

    // Address validation
    if (!address) {
      setIsAddressError(true)
      errorMessages.push("회사 주소를 입력하세요");
    }

    // Company phone number validation
    if (!companyPhoneNum) {
      setIsCompanyPhoneNumError(true);
      errorMessages.push("회사 전화번호를 입력하세요");
    }

    if (errorMessages.length > 0) {
      if (errorMessages.length === 1) {
        // If there's only one error, show that specific message
        alert(errorMessages[0]);
      } else {
        // If there are multiple errors, show a general message
        alert("필수 입력란이 누락되었습니다");
      }
    } else {
      router.push("document/essential");
    }
  };

  return (
    <div>
      <ApplierTopNav text="지원서 작성" showButton={true} />

      <div className="flex flex-col w-full mt-[120px]">
        <Header
          titleText="3. 업체 정보 입력"
          additionalText={
            <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
              표시가 붙은 항목들은 필수 입력 항목입니다.
            </span>
          }
        />

        <div className="flex flex-col bg-bgColor-white p-xl h-fit ml-[641px] w-[500px] gap-y-2">
          {/*기본 정보 입력 */}
          <CompanyInfo
            setBusinessType={setBusinessType}
            isBusinessTypeError={isBusinessTypeError}
            setIsBusinessTypeError={setIsBusinessTypeError}
            corpRegistrationNumber={corpRegistrationNumber}
            setCorpRegistrationNumber={setCorpRegistrationNumber}
            isCorpRegistrationNumberError={isCorpRegistrationNumberError}
            setIsCorpRegistrationNumberError={setIsCorpRegistrationNumberError}
            setAddress={setAddress}
            isAddressError={isAddressError}
            setIsAddressError={setIsAddressError}
            companyPhoneNum={companyPhoneNum}
            setCompanyPhoneNum={setCompanyPhoneNum}
            isCompanyPhoneNumError={isCompanyPhoneNumError}
            setIsCompanyPhoneNumError={setIsCompanyPhoneNumError}
            setCompanyDescription={setCompanyDescription}
          />
        </div>
        <ApplierSideNav
          comp={"한울건설"}
          prev={"register"}
          next={"document/essential"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
};

export default Page;
