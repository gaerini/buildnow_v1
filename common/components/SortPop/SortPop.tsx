import React, { useState, RefObject } from "react";
import { ScoreSummary, CompanyScoreSummary } from "../Interface/CompanyData";
import Icon from "../Icon/Icon";
import * as svgs from "../Icon/svgs";

type IconName = keyof typeof svgs;

interface SortOption {
  label: string;
  icon: IconName;
}

interface Props {
  option: SortOption;
}

const Modal: React.FC<Props> = ({ option }) => {
  return (
    <div className="whitespace-nowrap inline-flex gap-2 items-center justify-start ">
      <Icon name={option.icon} width={16} height={16} />
      <p>{option.label}</p>
    </div>
  );
};

export default Modal;
