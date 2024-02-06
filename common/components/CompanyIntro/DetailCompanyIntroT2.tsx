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
    <div className="bg-primary-neutral-white mb-2  ">
      <div
        className="h-[56px] flex justify-between items-center gap-x-2 p-2xl hover:bg-primary-neutral-100"
        onClick={onToggle}
      >
        <h3 className="text-subTitle-18">{title}</h3>
        <Icon
          name="ArrowDown"
          width={24}
          height={24}
          className={`transform transition ${toggleIsOpen ? "-rotate-180" : ""}`}
        />
      </div>
      {toggleIsOpen && (
        <div className="p-2xl">
          <div className="text-primary-neutral-700 text-paragraph-14">
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
      )}
    </div>
  );
};

export default DetailCompanyIntroT2;
