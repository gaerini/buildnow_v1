import React from "react";
import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";

interface Props {
  buttonUrl: string;
  buttonText: string;
  title: string;
  dropDownKeyString: string;
  midalStatesChange: any;
  whyMidalChange: any;
  whyMidalItems?: string[];
}

const CustomComponent: React.FC<Props> = ({
  buttonUrl,
  buttonText,
  title,
  dropDownKeyString,
  midalStatesChange,
  whyMidalChange,
  whyMidalItems = ["미달사유1", "미달사유2", "미달사유3"],
}) => {
  const handleButtonClick = (url: string) => {
    window.open(url, "_blank"); // 새 탭에서 URL을 열도록 설정
  };

  return (
    <div>
      <p className="w-[150px] text-subTitle-20 font-bold">{title}</p>
      <button
        className="btnStyle-textOnly-s p-m m-4 bg-primary-neutral-200 hover:textColor-focus hover:underline"
        onClick={() => handleButtonClick(buttonUrl)}
      >
        <p>{buttonText}</p>
      </button>
      <div className="inline-flex pt-2 pb-6 items-center gap-2">
        <AdminStyleDropDown
          placeholder="선택하셈"
          dropdownItems={["미달", "미달아님"]}
          handleCheckboxChange={midalStatesChange}
          keyString={dropDownKeyString}
        />
        <AdminStyleDropDown
          placeholder="선택하셈"
          width="w-64"
          dropdownItems={whyMidalItems}
          handleCheckboxChange={whyMidalChange}
          keyString={dropDownKeyString}
        />
      </div>
    </div>
  );
};

export default CustomComponent;
