// CompanyInfo.tsx
"use client";
import React, { useState, useRef } from "react";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleBtn from "../../../../../common/components/InputForm/InputStyleBtn";
import InputStyleSentence from "../../../../../common/components/InputForm/InputStyleSentence";
import AddressSearch from "../../../../../common/components/AddressSearch/AddressSearch";
import CheckBox from "../../../../../common/components/CheckBox/CheckBox";
import Icon from "../../../../../common/components/Icon/Icon";
import ToolTip from "../../../../../common/components/ApplierApply/ToolTip";

interface BasicInfo {
  companyName: string | null;
  businessId: string | null;
  managerName: string | null;
  managerEmail: string | null;
  // Add other fields as necessary
}

interface CompanyInfoProps {
  basicInfo: BasicInfo;
  businessType: string;
  setBusinessType: React.Dispatch<React.SetStateAction<string>>;
  isBusinessTypeError: boolean;
  setIsBusinessTypeError: React.Dispatch<React.SetStateAction<boolean>>;
  corpRegistrationNumber: string;
  setCorpRegistrationNumber: React.Dispatch<React.SetStateAction<string>>;
  isCorpRegistrationNumberError: boolean;
  setIsCorpRegistrationNumberError: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  setAddress: React.Dispatch<React.SetStateAction<string>>;
  isAddressError: boolean;
  setIsAddressError: React.Dispatch<React.SetStateAction<boolean>>;

  companyPhoneNum: string;
  setCompanyPhoneNum: React.Dispatch<React.SetStateAction<string>>;
  isCompanyPhoneNumError: boolean;
  setIsCompanyPhoneNumError: React.Dispatch<React.SetStateAction<boolean>>;

  setCompanyDescription: React.Dispatch<React.SetStateAction<string>>;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({
  basicInfo,
  businessType,
  setBusinessType,
  isBusinessTypeError = false,
  setIsBusinessTypeError,
  corpRegistrationNumber,
  setCorpRegistrationNumber,
  isCorpRegistrationNumberError,
  setIsCorpRegistrationNumberError,
  setAddress,
  isAddressError,
  setIsAddressError,
  companyPhoneNum,
  setCompanyPhoneNum,
  isCompanyPhoneNumError,
  setIsCompanyPhoneNumError,

  setCompanyDescription,
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [tooltipStyle, setTooltipStyle] = useState({});
  const textRef = useRef<HTMLDivElement>(null);

  const handleBusinessTypeSelect = (index: number | null) => {
    const type = index === 0 ? "PERSONAL" : index === 1 ? "CORPORATION" : "";
    setBusinessType(type);
    localStorage.setItem("businessType", type);
  };

  const handleCorpRegistrationNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorpRegistrationNumber(e.target.value);
  };

  const handleCompanyPhoneNumChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCompanyPhoneNum(e.target.value);
  };

  const handleCompanyDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCompanyDescription(e.target.value);
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsHovered(true);
    if (textRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      console.log(textRef.current.getBoundingClientRect());

      // 툴팁을 호버된 요소의 오른쪽으로 9px 떨어진 위치에 배치합니다.
      const style = {
        top: rect.top - 16,
        left: rect.right + window.scrollX + 8, // 8 pixels to the right
      };
      setTooltipStyle(style);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* 회사명 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 textColor-high-emphasis">
              회사명
            </span>
          </div>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"회사명"}
              placeholder={basicInfo.companyName || "정보 없음"}
              isDisabled={true}
            />
          </div>
        </div>

        {/* 사업자 등록번호 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 textColor-high-emphasis">
              사업자 등록번호
            </span>
          </div>
          <div className="w-[320px]">
            <InputStyleBtn
              type={"사업자 등록번호"}
              placeholder={basicInfo.businessId || "정보 없음"}
              isDisabled={true}
              buttonText={"완료"}
            />
          </div>
        </div>
        {/* 담당자명 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 textColor-high-emphasis">
              담당자명
            </span>
          </div>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"담당자명"}
              placeholder={basicInfo.managerName || "정보 없음"}
              isDisabled={true}
            />
          </div>
        </div>
        {/* 담당자 이메일 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 textColor-high-emphasis">
              담당자 이메일
            </span>
          </div>
          <div className="w-[320px]">
            <InputStyleDefault
              type={"담당자 이메일"}
              placeholder={basicInfo.managerEmail || "정보 없음"}
              isDisabled={true}
            />
          </div>
        </div>
        {/* 사업자 유형 */}
        {/* <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <div className="flex h-[44px] items-center">
            <div className="flex justify-start items-center gap-1">
              <span className="text-paragraph-14 font-normal textColor-high-emphasis">
                사업자 유형
              </span>
              <Icon name="IconLight" width={16} height={16} />
            </div>
          </div>
          <div className="flex w-[320px] items-center justify-between">
            <CheckBox
              items={[{ text: "개인 사업자" }, { text: "법인 사업자" }]}
              onSelect={handleBusinessTypeSelect}
              isError={isBusinessTypeError}
              setIsError={setIsBusinessTypeError}
            />
            <div
              className="textColor-mid-emphasis hover:textColor-focus"
              onMouseEnter={handleMouseEnter} // 마우스 진입 시 호버 상태 true
              onMouseLeave={() => setIsHovered(false)}
              ref={textRef}
            >
              <Icon name="ExclamanationMark" width={16} height={16} />
              {isHovered && (
                <ToolTip
                  detailedText={
                    <span className="textColor-mid-emphasis text-paragraph-12">
                      법인 사업자일 경우{" "}
                      <span className="font-bold">
                        법인 등록번호를 <br />
                        필수로 입력
                      </span>
                      하셔야 합니다
                    </span>
                  }
                  bgColor="neutral"
                  style={tooltipStyle}
                />
              )}
            </div>
          </div>
        </div> */}

        {/* 법인 등록 번호 입력 */}
        <div className="flex justify-between items-center gap-y-4 w-full mb-4">
          <div className="flex justify-start items-center gap-1">
            <div className="flex h-[44px] items-center">
              <span className="text-paragraph-14 font-normal textColor-high-emphasis">
                법인등록번호
              </span>
              <Icon name="IconLight" width={16} height={16} />
            </div>
          </div>
          <div className="w-[320px] h-full">
            <InputStyleDefault
              type="text" // 입력 필드 타입 수정
              placeholder="법인등록번호를 입력하세요"
              value={corpRegistrationNumber}
              onChange={handleCorpRegistrationNumberChange}
              isError={isCorpRegistrationNumberError}
              setIsError={setIsCorpRegistrationNumberError}
              errorMessage="필수 입력란입니다."
              isDisabled={businessType === "PERSONAL"}
            />
          </div>
        </div>
      </div>
      <div className="w-full mt-4 flex flex-col gap-y-4">
        {/* 해당 부분에 회사 주소 입력 폼 추가 */}
        <div className="flex justify-between items-start w-full">
          <div className="flex h-[44px] items-center">
            <div className="flex justify-start items-center gap-1">
              <span className="text-paragraph-14 font-normal textColor-high-emphasis">
                회사 주소
              </span>
              <Icon name="IconLight" width={16} height={16} />
            </div>
          </div>
          <div className="w-[320px] flex">
            <AddressSearch
              setAddressState={setAddress}
              isError={isAddressError}
              setIsError={setIsAddressError}
            />
          </div>
        </div>
        <div className="flex justify-between items-center gap-y-4 w-full">
          <div className="flex h-[44px] items-center">
            <div className="flex justify-start items-center gap-1">
              <span className="text-paragraph-14 font-normal textColor-high-emphasis">
                회사 전화번호
              </span>
              <Icon name="IconLight" width={16} height={16} />
            </div>
          </div>
          <div className="w-[320px]">
            <InputStyleDefault
              type="text" // 입력 필드 타입 수정
              placeholder="회사 전화번호를 입력하세요"
              value={companyPhoneNum}
              onChange={handleCompanyPhoneNumChange}
              isError={isCompanyPhoneNumError}
              setIsError={setIsCompanyPhoneNumError}
              errorMessage="필수 입력란입니다."
            />
          </div>
        </div>
        <div className="flex justify-between items-start w-full">
          <div className="flex justify-start items-center gap-1">
            <span className="flex h-[44px] items-center text-paragraph-14 textColor-high-emphasis">
              회사 소개
            </span>
          </div>
          <div className="w-[320px]">
            <InputStyleSentence
              placeholder="회사에 대한 소개를 작성해주세요."
              //value={companyDescription}
              onChange={handleCompanyDescriptionChange}
              sentenceLimit={150}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
