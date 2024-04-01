"use client";

import React, { useState, useRef, useEffect } from "react";
import Icon from "../../Icon/Icon";
import CheckBox from "../../CheckBox/CheckBox";

type PerformanceDetailFilterProps = {
  selectedLicense: string[];
  onSelectLicense: (selected: string[]) => void;
  selectedType: string[];
  onSelectType: (selected: string[]) => void;
  selectedPeriod: string;
  onSelectPeriod: (selected: string) => void;
  inputListLicense: string[];
  inputListType: string[];
  inputListPeriod: string[];
};

const PerformanceDetailFilter: React.FC<PerformanceDetailFilterProps> = ({
  selectedLicense,
  onSelectLicense,
  selectedType,
  onSelectType,
  selectedPeriod,
  onSelectPeriod,
  inputListLicense,
  inputListType,
  inputListPeriod,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 외부 클릭 감지 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLicenseSelect = (license: string) => {
    let newSelection;
    if (license === "전체") {
      if (selectedLicense.length === inputListLicense.length) {
        newSelection = ["전체"];
      } else {
        newSelection = [...inputListLicense];
      }
    } else {
      newSelection = selectedLicense.includes(license)
        ? selectedLicense.filter((l) => l !== license)
        : [...selectedLicense.filter((l) => l !== "전체"), license];

      // 전체 항목이 선택되어 있고, 다른 항목이 취소될 때 전체 항목도 취소
      if (
        selectedLicense.includes("전체") &&
        newSelection.length < inputListLicense.length
      ) {
        newSelection = newSelection.filter((l) => l !== "전체");
      }

      if (
        newSelection.length === inputListLicense.length - 1 &&
        !newSelection.includes("전체")
      ) {
        newSelection.push("전체");
      }
    }
    // 선택된 항목이 없으면 "전체"로 자동 설정
    if (newSelection.length === 0) {
      newSelection = ["전체"];
    }
    onSelectLicense(newSelection);
  };

  const handleTypeSelect = (type: string) => {
    let newSelection;
    if (type === "전체") {
      if (selectedType.length === inputListType.length) {
        newSelection = ["전체"];
      } else {
        newSelection = [...inputListType];
      }
    } else {
      newSelection = selectedType.includes(type)
        ? selectedType.filter((t) => t !== type)
        : [...selectedType.filter((t) => t !== "전체"), type];

      // 전체 항목이 선택되어 있고, 다른 항목이 취소될 때 전체 항목도 취소
      if (
        selectedType.includes("전체") &&
        newSelection.length < inputListType.length
      ) {
        newSelection = newSelection.filter((t) => t !== "전체");
      }

      if (
        newSelection.length === inputListType.length - 1 &&
        !newSelection.includes("전체")
      ) {
        newSelection.push("전체");
      }
    }
    // 선택된 항목이 없으면 "전체"로 자동 설정
    if (newSelection.length === 0) {
      newSelection = ["전체"];
    }
    onSelectType(newSelection);
  };

  const renderLicenseFilter = () => {
    return (
      <div className="bgColor-white py-2">
        <p className="flex gap-x-1 text-paragraph-16 textColor-low-emphasis p-s font-bold items-center">
          <Icon name="Certification" width={18} height={18} />
          면허
        </p>
        <div className="flex p-s gap-x-2">
          {inputListLicense.map((license: string) => (
            <div
              key={license}
              className={`btnSize-s rounded-s border whitespace-nowrap ${
                selectedLicense.includes(license)
                  ? "border-primary-blue-original textColor-focus bgColor-blue"
                  : "borderColor textColor-mid-emphasis hover:bgColor-neutral hover:textColor-high-emphasis"
              }`}
              onClick={() => handleLicenseSelect(license)}
            >
              {license}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTypeFilter = () => {
    return (
      <div className="bgColor-white py-2">
        <p className="flex gap-x-1 text-paragraph-16 textColor-low-emphasis p-s font-bold items-center">
          <Icon name="BuildingLight" width={18} height={18} />
          공사의 종류
        </p>
        <div className="flex flex-wrap p-s gap-x-2 gap-y-2">
          {inputListType.map((type) => (
            <div
              key={type}
              className={`btnSize-s rounded-s border whitespace-nowrap ${
                selectedType.includes(type)
                  ? "border-primary-blue-original textColor-focus bgColor-blue"
                  : "borderColor textColor-mid-emphasis hover:bgColor-neutral hover:textColor-high-emphasis"
              }`}
              onClick={() => handleTypeSelect(type)}
            >
              {type}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const [selectedCheckboxIndex, setSelectedCheckboxIndex] = useState<number>(0); // 기본으로 "3개년" 선택

  const handleCheckboxChange = (index: number) => {
    setSelectedCheckboxIndex(index);
    onSelectPeriod(inputListPeriod[index]);
  };

  const renderPeriodFilter = () => {
    return (
      <div className="bgColor-white py-2">
        <p className="flex gap-x-1 text-paragraph-16 textColor-low-emphasis p-s font-bold items-center">
          <Icon name="Calender" width={18} height={18} />
          기간
        </p>
        <div className="flex justify-between">
          {inputListPeriod.map((period, index) => (
            <div key={period} className="flex items-center w-[200px] p-s">
              <label
                htmlFor={`checkbox-${period}`}
                className="flex items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  id={`checkbox-${period}`}
                  name="period"
                  className="hidden"
                  checked={selectedCheckboxIndex === index}
                  onChange={() => handleCheckboxChange(index)}
                />
                <div
                  className={`w-[20px] h-[20px] border rounded-s flex justify-center items-center ${
                    selectedCheckboxIndex === index
                      ? "bg-primary-blue-original border-primary-blue-original"
                      : "bgColor-white borderColor"
                  }`}
                >
                  {selectedCheckboxIndex === index && (
                    <span className="textColor-white text-subTitle-20">
                      <Icon name="Check" width={18} height={18} />
                    </span>
                  )}
                </div>
                <span className="ml-2 text-paragraph-16 textColor-mid-emphasis">
                  {period}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Badge를 제거하는 함수
  const removeLicenseBadge = (license: string) => {
    let newSelection = selectedLicense.filter((l) => l !== license);
    newSelection = newSelection.filter((l) => l !== "전체");
    if (newSelection.length === 0) {
      newSelection.push("전체"); // 모든 항목이 제거된 경우 "전체" 추가
    }

    if (newSelection.length === 0) {
      newSelection.push("전체"); // 모든 항목이 제거된 경우 "전체" 추가
    }
    onSelectLicense(newSelection);
  };

  const removeTypeBadge = (type: string) => {
    let newSelection = selectedType.filter((t) => t !== type);
    if (newSelection.length === 0) {
      newSelection.push("전체"); // 모든 항목이 제거된 경우 "전체" 추가
    }
    newSelection = newSelection.filter((t) => t !== "전체");
    if (newSelection.length === 0) {
      newSelection.push("전체"); // 모든 항목이 제거된 경우 "전체" 추가
    }
   
    onSelectType(newSelection);
  };

  const totalSelectedFilters =
    selectedLicense.filter((l) => l !== "전체").length +
    selectedType.filter((t) => t !== "전체").length +
    (selectedPeriod !== "전체" ? 1 : 0);

  // Selected filters summary
  // Selected filters summary with Tailwind CSS classes
  const renderSelectedFiltersSummary = () => {
    if (totalSelectedFilters <= 1) {
      return null; // 필터가 1개 이하일 때는 요약을 표시하지 않음
    }
    const selectedFilters = [];
    selectedLicense.forEach((license) => {
      if (license !== "전체") {
        selectedFilters.push(
          <div
            key={license}
            className="badgeSize-m border borderColor mx-1 my-1 flex items-center gap-x-1 textColor-mid-emphasis"
          >
            <Icon name="Certification" width={18} height={18} />
            <span>{license}</span>
            <button onClick={() => removeLicenseBadge(license)}>
              <Icon name="X" width={16} height={16} />
            </button>
          </div>
        );
      }
    });

    selectedType.forEach((type) => {
      if (type !== "전체") {
        selectedFilters.push(
          <div
            key={type}
            className="badgeSize-m border borderColor mx-1 my-1 flex items-center gap-x-1 textColor-mid-emphasis"
          >
            <Icon name="BuildingLight" width={18} height={18} />
            <span>{type}</span>
            <button onClick={() => removeTypeBadge(type)}>
              <Icon name="X" width={16} height={16} />
            </button>
          </div>
        );
      }
    });

    selectedFilters.push(
      <div
        key="period"
        className="badgeSize-m border borderColor mx-1 my-1 flex items-center gap-x-1 textColor-mid-emphasis"
      >
        <Icon name="Calender" width={18} height={18} />
        <span>{selectedPeriod}</span>
      </div>
    );

    return (
      <div className="flex h-[44px] w-[500px] overflow-x-scroll whitespace-nowrap">
        {selectedFilters}
      </div>
    );
  };

  // 선택된 필터를 바탕으로 badge 표시
  const renderSelectedFilters = () => {
    return (
      <div className="flex flex-col w-full bgColor-white">
        <div className="h-[32px] flex items-cente p-m">
          <span className="textColor-low-emphasis text-paragraph-16 font-bold">
            선택된 항목
          </span>
        </div>
        <div className="flex flex-wrap p-m gap-x-1 gap-y-1">
          {selectedLicense.map(
            (license) =>
              license !== "전체" && (
                <div
                  key={license}
                  className="badgeSize-m border borderColor flex items-center gap-x-1 textColor-mid-emphasis"
                >
                  <Icon name="Certification" width={18} height={18} />
                  <span className="text-paragraph-14">{license}</span>
                  <span onClick={() => removeLicenseBadge(license)}>
                    <Icon name="X" width={16} height={16} />
                  </span>
                </div>
              )
          )}
          {selectedType.map(
            (type) =>
              type !== "전체" && (
                <div
                  key={type}
                  className="badgeSize-m border borderColor flex items-center gap-x-1 textColor-mid-emphasis"
                >
                  <Icon name="BuildingLight" width={18} height={18} />
                  <span className="text-paragraph-14">{type}</span>
                  <span onClick={() => removeTypeBadge(type)}>
                    <Icon name="X" width={16} height={16} />
                  </span>
                </div>
              )
          )}
          <div className="badgeSize-m border borderColor flex items-center gap-x-1 textColor-mid-emphasis">
            <Icon name="Calender" width={18} height={18} />
            <span className="text-paragraph-14">{selectedPeriod}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-[76px] bgColor-white  py-[16px] px-4">
      <div className="w-[600px]" ref={dropdownRef}>
        <div
          className="flex border borderColor rounded-s items-center justify-between w-[600px] h-[44px] px-4"
          onClick={toggleDropdown}
        >
          <div className="flex items-center gap-x-2 overflow-hidden  ">
            <div className="textColor-mid-emphasis">
              <Icon name="Funnel" width={16} height={16} />
            </div>
            {totalSelectedFilters > 1 ? (
              renderSelectedFiltersSummary()
            ) : (
              <span className="textColor-low-emphasis">
                면허, 공사의 종류, 기간을 선택하세요
              </span>
            )}
          </div>
          <Icon
            name="ArrowDown"
            width={16}
            height={16}
            style={{ transform: isDropdownOpen ? "rotate(180deg)" : "none" }}
          />
        </div>
        {isDropdownOpen && (
          <div className="flex flex-col border borderColor bgColor-neutral rounded-s py-2 absolute z-16 w-[600px] mt-2 gap-y-1 shadow-xs">
            {renderSelectedFilters()}
            <div>
              {renderLicenseFilter()}
              {renderTypeFilter()}
              {renderPeriodFilter()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDetailFilter;
