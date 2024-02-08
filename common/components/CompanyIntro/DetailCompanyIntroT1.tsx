import React from "react";
import Icon from "../Icon/Icon";

interface DetailCompanyIntroT1Props {
  title: string;
  subTitle: string[];
  info: string[];
  toggleIsOpen: boolean;
  onToggle: () => void; // onToggle 함수 추가
}

const DetailCompanyIntroT1: React.FC<DetailCompanyIntroT1Props> = ({
  title,
  subTitle,
  info,
  toggleIsOpen,
  onToggle,
}) => {
  return (
    <div className="bgColor-white mb-2">
      <div
        className="h-[56px] flex justify-between items-center gap-x-2 p-2xl hover:bgColor-neutral"
        onClick={onToggle}
      >
        <div className="text-subTitle-18 whitespace-nowrap">{title}</div>
        <Icon
          name="ArrowDown"
          width={24}
          height={24}
          className={`transform transition ${
            toggleIsOpen ? "-rotate-180" : ""
          }`}
        />
      </div>
      {toggleIsOpen && (
        <div className="p-2xl ">
          <div className="flex justify-start gap-y-2">
            {subTitle.map((item, index) => (
              <div
                className="flex justify-start gap-x-8 textColor-mid-emphasis text-paragraph-14"
                key={index}
              >
                <div className="whitespace-nowrap">{item}</div>
                <div className="whitespace-nowrap">{info[index]}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCompanyIntroT1;
