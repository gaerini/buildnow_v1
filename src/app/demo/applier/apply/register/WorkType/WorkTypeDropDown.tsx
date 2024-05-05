import React, { useState } from "react";
import InputStyleDropdown from "../../../../../../../common/components/InputForm/InputStyleDropdown";
import Icon from "../../../../../../../common/components/Icon/Icon";

interface WorkTypeProps {
  workTypeList: string[];
  workTypes: string[];
  setWorkTypes: React.Dispatch<React.SetStateAction<string[]>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  workTypeCount: number;
  essentialWorkTypeCount: number;
  isDisabled: boolean;
}

const WorkTypeDropDown: React.FC<WorkTypeProps> = ({
  workTypeList,
  workTypes,
  setWorkTypes,
  isError,
  setIsError,
  workTypeCount,
  essentialWorkTypeCount,
  isDisabled,
}) => {
  const handleDropdownSelect = (index: number, selected: string) => {
    const updatedWorkTypes = [...workTypes];
    updatedWorkTypes[index] = selected;
    setWorkTypes(updatedWorkTypes);
    if (index < essentialWorkTypeCount) {
      setIsError(false); // 선택이 되면 에러 상태를 해제합니다.
    }
  };

  const dropdowns = Array.from({ length: workTypeCount }, (_, index) => (
    <div key={index} className="w-full flex flex-col gap-y-1 mb-12">
      <div className="w-full flex justify-between">
        <span className="relative text-paragraph-14 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
          주 업종
        </span>
        <div
          className={
            workTypes[index] ? "textColor-positive" : "textColor-low-emphasis"
          }
        >
          <Icon name="SubmitCheck" width={16} height={16} />
        </div>
      </div>
      <InputStyleDropdown
        placeholder="선택하세요"
        inputList={workTypeList}
        value={workTypes[index] || ""}
        onSelect={(selected) => handleDropdownSelect(index, selected)}
        isError={isError && index < essentialWorkTypeCount}
        setIsError={setIsError}
        errorMessage="주력 업종을 선택해주세요"
        dropdownWidth={436}
        isDisabled={isDisabled}
      />
    </div>
  ));

  return <>{dropdowns}</>;
};

export default WorkTypeDropDown;
