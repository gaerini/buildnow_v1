"use client";
import React from "react";
import Icon from "../Icon/Icon";

const LicenseBadge: React.FC<{ license: string | null }> = ({ license }) => {
  return (
    <div className="badgeSize-m border borderColor bgColor-white textColor-mid-emphasis whitespace-nowrap flex items-center gap-x-[2px]">
      <Icon name="BookMark" width={16} height={16} />
      <span>면허 | {license}</span>
    </div>
  );
};

export default LicenseBadge;
