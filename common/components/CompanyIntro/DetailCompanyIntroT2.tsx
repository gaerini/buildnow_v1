import React from "react";
import Icon from "../Icon/Icon";

interface DetailCompanyIntroT2Props {
  title: string;
  info: string;
  toggleIsOpen: boolean;
  onToggle: () => void;
}

const DetailCompanyIntroT2: React.FC<DetailCompanyIntroT2Props> = ({
  title,
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
      <div
        className="transition-all duration-300 overflow-hidden"
        style={{
          maxHeight: toggleIsOpen ? "1000px" : "0", // 임의의 충분히 큰 값
          opacity: toggleIsOpen ? 1 : 0.7,
        }}
      >
        <div className="p-2xl">
          <div className="textColor-mid-emphasis text-paragraph-14">
            <p>
              {info.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCompanyIntroT2;
