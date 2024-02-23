// RegisterLicense.tsx

import React from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import License from "./License";
import FileBadge from "../../../../../common/components/InputForm/FileBadge";

interface LicenseData {
  licenseName: string;
  fileName: string;
}

interface RegisterLicenseProps {
  licenseData: LicenseData[];
  setLicenseData: React.Dispatch<React.SetStateAction<LicenseData[]>>;
  isLicenseVisible: boolean;
  setIsLicenseVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterLicense: React.FC<RegisterLicenseProps> = ({
  licenseData,
  setLicenseData,
  isLicenseVisible,
  setIsLicenseVisible,
}) => {
  const handleAddLicense = (licenseName: string, fileName: string) => {
    setLicenseData([...licenseData, { licenseName, fileName }]);
  };

  const handleRemoveFile = (fileName: string) => {
    setLicenseData(licenseData.filter((data) => data.fileName !== fileName));
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
              : "bgColor-white border borderColor textColor-low-emphasis hover:bgColor-neutral hover:textColor-black"
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
          />
        </div>
      )}

      <div className="flex justify-end my-4">
        <div className="w-[320px] flex flex-col gap-y-2">
          {licenseData.map((file, index) => (
            <FileBadge
              key={index}
              filename={`${file.licenseName} | ${file.fileName}`}
              title={file.fileName}
              handleRemoveFile={() => handleRemoveFile(file.fileName)}
              badgeWidth="80"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterLicense;
