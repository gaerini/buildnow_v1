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
    <div className="bg-primary-neutral-white mb-2 h-fit">
      <div
        className="h-[56px] flex justify-between items-center gap-x-2 p-2xl hover:bg-primary-neutral-100"
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
          <div className="flex justify-start gap-x-8">
            <div className="text-primary-navy-500 text-paragraph-14 font-normal ">
              {date.map((item, index) => (
                <div key={index} className="mb-4 last:mb-0 whitespace-nowrap">
                  {item}
                </div>
              ))}
            </div>
            <div className="text-primary-neutral-black text-paragraph-14 font-normal ">
              {event.map((item, index) => (
                <div key={index} className="last:mb-0 whitespace-nowrap">
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

export default DetailCompanyIntroT3;
