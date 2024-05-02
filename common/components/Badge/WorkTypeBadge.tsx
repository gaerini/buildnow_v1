"use client";
import React from "react";
import Icon from "../Icon/Icon";

const WorkTypeBadge: React.FC<{ workType: string | null }> = ({ workType }) => {
  return (
    <div className="badgeSize-m border borderColor bgColor-white textColor-mid-emphasis whitespace-nowrap flex items-center gap-x-[2px]">
      <Icon name="ToolDark" width={16} height={16} />
      <span>공종 | {workType}</span>
    </div>
  );
};

export default WorkTypeBadge;
