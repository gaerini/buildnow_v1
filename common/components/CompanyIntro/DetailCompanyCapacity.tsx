import React from "react";
import Icon from "../Icon/Icon"; // Update path accordingly

interface CapacityValue {
  id: number;
  year1Value: number;
  year2Value: number;
  year3Value: number;
  nationalRanking: number;
  regionalRanking: number;
  nationalRankingRatio: number;
  regionalRankingRatio: number;
}

interface WorkType {
  id: number;
  workType: string;
  capacityValueList: CapacityValue[];
}

interface DetailCompanyIntroCapacityProps {
  title: string;
  toggleIsOpen: boolean;
  onToggle: () => void;
  workTypeList: WorkType[];
}

const DetailCompanyIntroCapacity: React.FC<DetailCompanyIntroCapacityProps> = ({
  title,
  toggleIsOpen,
  onToggle,
  workTypeList,
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
            시평액(순위)
          </div>
        </div>
        {workTypeList.map((workType, index) => (
          <div
            key={workType.id}
            className="flex h-[49px] textColor-mid-emphasis text-paragraph-14"
          >
            <div className="w-1/2 pl-8 pr-4 flex items-center gap-x-1 textColor-low-emphasis">
              <Icon name="BookMark" width={16} height={16} />
              <span className="textColor-mid-emphasis">{workType.workType}</span>
            </div>
            <div className="w-1/2 px-4 flex items-center">
              {workType.capacityValueList[0]?.nationalRanking} 백만원 (
              {workType.capacityValueList[0]?.nationalRankingRatio}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailCompanyIntroCapacity;
