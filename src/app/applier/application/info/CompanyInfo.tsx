// CompanyInfo.tsx

import React, { useState } from "react";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../../common/components/InputForm/InputStyleBtn";
import InputStyleSentence from "../../../../../common/components/InputForm/InputStyleSentence";

const CompanyInfo = () => {
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
    <>
      <div className="w-full">
        {/* 회사명 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <span className="text-paragraph-14 textColor-high-emphasis">
            회사명
          </span>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"회사명"}
              placeholder="L이앤씨"
              isDisabled={true}
            />
          </div>
        </div>

        {/* 사업자 등록번호 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <span className="text-paragraph-14 textColor-high-emphasis">
            사업자 등록번호
          </span>
          <div className="w-[320px]">
            <InputStyleBtn
              type={"사업자 등록번호"}
              placeholder="324-166-3156"
              isDisabled={true}
              buttonText={"완료"}
            />
          </div>
        </div>
        {/* 담당자명 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <span className="text-paragraph-14 textColor-high-emphasis">
            담당자명
          </span>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"담당자명"}
              placeholder="김담당"
              isDisabled={true}
            />
          </div>
        </div>
        {/* 담당자 이메일 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <span className="text-paragraph-14 textColor-high-emphasis">
            담당자 이메일
          </span>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"담당자 이메일"}
              placeholder="kyle9909@naver.com"
              isDisabled={true}
            />
          </div>
        </div>
        {/* 법인 등록 번호 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <span className="text-paragraph-14 relative ...">법인등록번호</span>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"법인등록번호"}
              placeholder="법인등록번호를 입력하세요"
              value={corporateRegistrationNumber}
              onChange={handleCorporateRegistrationNumberChange}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-start gap-y-4 w-full mt-4 ">
        <span className="flex h-[44px] items-center text-paragraph-14 textColor-high-emphasis">
          회사 소개
        </span>
        <div className="w-[320px]">
          <InputStyleSentence
            placeholder="회사에 대한 소개를 작성해주세요."
            //value={companyDescription}
            onChange={handleCompanyDescriptionChange}
            sentenceLimit={150}
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
