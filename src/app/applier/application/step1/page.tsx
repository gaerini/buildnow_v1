"use client";
import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import FileBadge from "../../../../../common/components/InputForm/FileBadge";
import License from "./License";

interface LicenseData {
  licenseName: string;
  fileName: string;
}

const Register = () => {
  const [licenseData, setLicenseData] = useState<LicenseData[]>([]);
  console.log(licenseData);

  const handleAddLicense = (licenseName: string, fileName: string) => {
    setLicenseData([...licenseData, { licenseName, fileName }]);
  };

  const handleRemoveFile = (fileName: string) => {
    setLicenseData(licenseData.filter((data) => data.fileName !== fileName));
  };

  return (
    <div className="bg-bgColor-white p-xl h-fit w-[500px]">
      {/* 첫 번째 영역: 면허 등록 */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 h-[44px]">
          <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
            면허 등록
          </span>
          <button className="h-[44px] w-[320px] flex items-center justify-center btnSize-m  bgColor-neutral textColor-low-emphasis rounded-s">
            <Icon name="Plus" height={16} width={16} />
          </button>
        </div>
        <div className="flex justify-end">
          <License onAddLicense={handleAddLicense} />
        </div>
        <div className="flex justify-end mt-4">
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
      {/* 두 번째 영역: 지원 공종 선택 (이 부분은 구현 예정) */}
      {/* ... */}
    </div>
  );
};

export default Register;
