// RegisterLicense.tsx

import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import License from "./License";
import FileBadge from "../../../../../common/components/InputForm/FileBadge";

interface LicenseData {
  licenseName: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface RegisterLicenseProps {
  licenseData: LicenseData[];
  setLicenseData: React.Dispatch<React.SetStateAction<LicenseData[]>>;
  isLicenseVisible: boolean;
  setIsLicenseVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

const RegisterLicense: React.FC<RegisterLicenseProps> = ({
  licenseData,
  setLicenseData,
  isLicenseVisible,
  setIsLicenseVisible,
  isError,
  setIsError,
  setPdfUrls
}) => {
  const handleAddLicense = (licenseName: string, file: File) => {
    setLicenseData([...licenseData, { licenseName, file }]);
  };

  const handleRemoveFile = (licenseName: string) => {
    setLicenseData(
      licenseData.filter((data) => data.licenseName !== licenseName)
    );
  };

  const toggleLicenseVisibility = () => {
    setIsLicenseVisible(!isLicenseVisible);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center h-[44px] mb-4">
        <span className="text-paragraph-14 relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
          면허 등록
        </span>
        <button
          className={`h-[44px] w-[320px] flex items-center justify-center btnSize-m  ${
            isLicenseVisible
              ? "bgColor-neutral textColor-low-emphasis"
              : "bgColor-white border borderColor textColor-low-emphasis hover:bgColor-neutral hover:textColor-high-emphasis"
          } rounded-s`}
          onClick={toggleLicenseVisibility}
        >
          <Icon name="Plus" height={16} width={16} />
        </button>
      </div>

      {isLicenseVisible && (
        <div className="flex justify-end">
          <License
            onAddLicense={handleAddLicense}
            onRegister={() => setIsLicenseVisible(false)}
            isError={isError}
            setIsError={setIsError}
            setPdfUrls={setPdfUrls}
            isSubmitButton={true}
          />
        </div>
      )}

      <div className="flex justify-end my-4">
        <div className="w-[320px] flex flex-col gap-y-2">
          {licenseData.map((file, index) => (
            <FileBadge
              key={index}
              filename={`${file.licenseName} | ${file.file.name}`}
              title={file.file.name}
              handleRemoveFile={() => handleRemoveFile(file.licenseName)}
              badgeWidth="70"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterLicense;
