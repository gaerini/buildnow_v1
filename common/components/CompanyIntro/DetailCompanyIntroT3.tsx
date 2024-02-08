import React from "react";
import Icon from "../Icon/Icon";

interface DetailCompanyIntroT3Props {
  title: string;
  date: string[];
  event: string[];
  toggleIsOpen: boolean;
  onToggle: () => void; // onToggle 함수 추가
}

const DetailCompanyIntroT3: React.FC<DetailCompanyIntroT3Props> = ({
  title,
  date,
  event,
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
        <div className="p-2xl">
          <div className="flex justify-start gap-y-4">
            {date.map((item, index) => (
              <div
                className="flex justify-start gap-x-8 textColor-mid-emphasis text-paragraph-14 font-normal"
                key={index}
              >
                <div className="whitespace-nowrap">{item}</div>
                <div className="whitespace-nowrap text-wrap textColor-black ">
                  {event[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailCompanyIntroT3;
