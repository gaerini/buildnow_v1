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
        <h3 className="text-subTitle-18 whitespace-nowrap">{title}</h3>
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
          <div className="flex justify-start gap-x-8 ">
            <div className="textColor-mid-emphasis text-paragraph-14 mb-2 last:mb-0">
              {subTitle.map((item, index) => (
                <div key={index} className="mb-2 last:mb-0 whitespace-nowrap">
                  {item}
                </div>
              ))}
            </div>
            <div className="textColor-mid-emphasis text-paragraph-14 ">
              {info.map((item, index) => (
                <div key={index} className="mb-2 last:mb-0 whitespace-nowrap">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCompanyIntroT1;
