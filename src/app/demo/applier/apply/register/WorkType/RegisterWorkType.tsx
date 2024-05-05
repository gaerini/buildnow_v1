// RegisterWorkType.tsx
import React from "react";
import InputStyleDropdown from "../../../../../../../common/components/InputForm/InputStyleDropdown";

interface RegisterWorkTypeProps {
  workTypeCount: number;
  essentialWorkType: number;
  workTypes: string[];
  onWorkTypeChange: (index: number, value: string) => void;
  workTypeList: string[];
  isError?: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegisterWorkType: React.FC<RegisterWorkTypeProps> = ({
  workTypeCount,
  essentialWorkType,
  workTypes,
  onWorkTypeChange,
  workTypeList,
  isError,
  setIsError,
}) => {
  const dropdownOptions = workTypeList; // Dropdown에 표시될 옵션 목록

  return (
    <div className="w-full">
      {Array.from({ length: workTypeCount }, (_, index) => (
        <div
          key={index}
          className="flex justify-between items-start gap-y-4 w-full mb-4 "
          style={{ zIndex: workTypeCount - index }} // z-index 설정
        >
          <div className="h-[44px] flex items-center">
            <span
              className={`text-paragraph-14 textColor-high-emphasis items-center ${
                index < essentialWorkType
                  ? "relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2"
                  : ""
              }`}
            >
              지원 공종 {index + 1}
            </span>
          </div>
          <div className="w-full">
            <div className="relative">
              <InputStyleDropdown
                placeholder="공종을 선택하세요"
                inputList={dropdownOptions}
                value={workTypes[index]}
                onSelect={(selectedItem) =>
                  onWorkTypeChange(index, selectedItem)
                }
                isError={isError && index < essentialWorkType}
                setIsError={setIsError}
                errorMessage="지원 공종을 선택하세요"
                dropdownWidth={404}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegisterWorkType;
