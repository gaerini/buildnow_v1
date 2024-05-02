import React from "react";
import Icon from "../Icon/Icon"; // Update path accordingly

interface license {
  id: number;
  licenseName: string;
  capacityValue: number;
  licenseSeq: string;
  licenseYear: string;
  cvRank: number;
  percentage: number;
}

interface DetailCompanyIntroCapacityProps {
  title: string;
  toggleIsOpen: boolean;
  onToggle: () => void;
  licenseList: license[];
}

const DetailCompanyIntroCapacity: React.FC<DetailCompanyIntroCapacityProps> = ({
  title,
  toggleIsOpen,
  onToggle,
  licenseList,
}) => {
  return (
    <div className="bgColor-white mb-2">
      <div
        className="h-[56px] flex justify-between items-center gap-x-2 p-xl  hover:bgColor-neutral"
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
          maxHeight: toggleIsOpen ? "1000px" : "0",
          opacity: toggleIsOpen ? 1 : 0.7,
        }}
      >
        <div className="flex border-b ">
          <div className="w-1/2 h-[56px] pl-8 pr-4 flex items-center textColor-mid-emphasis text-paragraph-16 font-bold">
            보유 면허
          </div>
          <div className="w-1/2 h-[56px] px-4 flex items-center textColor-mid-emphasis text-paragraph-16 font-bold">
            시평액 (순위)
          </div>
        </div>
        {licenseList.map((licenseListItem, index) => (
          <div
            key={licenseListItem.id}
            className="flex h-[49px] textColor-mid-emphasis text-paragraph-14"
          >
            <div className="w-1/2 pl-8 pr-4 flex items-center gap-x-1 textColor-low-emphasis">
              <Icon name="BookMark" width={16} height={16} />
              <span className="textColor-mid-emphasis">
                {licenseListItem.licenseName}
              </span>
            </div>
            <div className="w-1/2 px-4 flex items-center">
              {licenseListItem.capacityValue}천원 ({licenseListItem.percentage}
              %)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCompanyIntroCapacity;
