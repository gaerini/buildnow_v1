// RegisterLicenseByNum.tsx
"use client";
import React from "react";
import License from "./License";
import InputFileLayer from "../../../../../../common/components/InputForm/InputFileLayer";
import Icon from "../../../../../../common/components/Icon/Icon";

interface LicenseData {
  licenseName: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface RegisterLicenseByNumProps {
  licenseNum: number;
  licenseData: LicenseData[];
  setLicenseData: React.Dispatch<React.SetStateAction<LicenseData[]>>;
  essentialLicenseNum: number;
  isLicenseError: boolean;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

const RegisterLicenseByNum: React.FC<RegisterLicenseByNumProps> = ({
  licenseNum,
  licenseData,
  setLicenseData,
  essentialLicenseNum,
  isLicenseError,
  setPdfUrls,
}) => {
  const onAddLicense = (licenseName: string, file: File) => {
    const newLicense = { licenseName, file };
    setLicenseData([...licenseData, newLicense]);
  };

  // licenseNum 개수만큼 License 컴포넌트 생성
  const licenses = Array.from({ length: licenseNum }, (_, index) => {
    const isEssential = index < essentialLicenseNum;

    return (
      <License
        key={index}
        onAddLicense={onAddLicense}
        isError={isLicenseError && isEssential}
        essentialLicenseNum={essentialLicenseNum}
        setPdfUrls={setPdfUrls}
        licenseNum={index + 1}
        isSubmitButton={false}
        isEssential={isEssential}
      />
    );
  });

  return (
    <div className="flex flex-col gap-y-1">
      <div className="h-[20px] flex w-full text-paragraph-14 gap-x-1 items-center">
        <span className="text-paragraph-14 font-normal textColor-high-emphasis">
          면허등록 &nbsp;
          <span className="text-paragraph-14 textColor-mid-emphasis">
            (협력업체 등록 신청서에 기재한 면허를{" "}
            <span className="font-bold">모두</span> 등록)
          </span>
        </span>
        <Icon name="IconLight" width={16} height={16} />
      </div>
      {licenses}
    </div>
  );
};

export default RegisterLicenseByNum;
