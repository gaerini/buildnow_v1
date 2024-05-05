import React, { useState } from "react";
import InputStyleDropdown from "../../../../../../../common/components/InputForm/InputStyleDropdown";
import Icon from "../../../../../../../common/components/Icon/Icon";

interface LicenseProps {
  licenseList: string[];
  license: string[];
  setLicense: React.Dispatch<React.SetStateAction<string[]>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  licenseCount: number;
  essentialLicenseCount: number;
}

const LicenseDropDown: React.FC<LicenseProps> = ({
  licenseList,
  license,
  setLicense,
  isError,
  setIsError,
  licenseCount,
  essentialLicenseCount,
}) => {
  const handleDropdownSelect = (index: number, selected: string) => {
    const updatedlicense = [...license];
    updatedlicense[index] = selected;
    setLicense(updatedlicense);
    if (index < essentialLicenseCount) {
      setIsError(false); // 선택이 되면 에러 상태를 해제합니다.
    }
  };

  const dropdowns = Array.from({ length: licenseCount }, (_, index) => (
    <div key={index} className="w-full flex flex-col gap-y-1">
      <div className="w-full flex justify-between">
        <span className="relative text-paragraph-14 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
          보유 면허
        </span>
        <div
          className={
            license[index] ? "textColor-positive" : "textColor-low-emphasis"
          }
        >
          <Icon name="SubmitCheck" width={16} height={16} />
        </div>
      </div>
      <InputStyleDropdown
        placeholder="선택하세요"
        inputList={licenseList}
        value={license[index] || ""}
        onSelect={(selected) => handleDropdownSelect(index, selected)}
        isError={isError && index < essentialLicenseCount}
        setIsError={setIsError}
        errorMessage="보유 면허를 선택해주세요"
        dropdownWidth={436}
      />
    </div>
  ));

  return <>{dropdowns}</>;
};

export default LicenseDropDown;
