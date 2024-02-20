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
        className="h-[56px] flex justify-between items-center gap-x-2 p-xl hover:bg-primary-neutral-100"
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
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: toggleIsOpen ? "1000px" : "0", // 임의의 충분히 큰 값
          opacity: toggleIsOpen ? 1 : 0.7,
        }}
      >
        <div className="p-xl">
          <div className="flex flex-col gap-y-4">
            {date.map((item, index) => (
              <div key={index} className="flex gap-x-4 items-start">
                <div className="text-primary-navy-500 text-paragraph-14 font-normal whitespace-nowrap">
                  {item}
                </div>
                <div className="text-primary-neutral-black text-paragraph-14 font-normal flex-1">
                  {event[index]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCompanyIntroT3;
