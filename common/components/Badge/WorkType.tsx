
"use client";
import React from "react";
import Icon from "../Icon/Icon";

const WorkTypeBadge: React.FC<{ workType: string }> = ({ workType }) => {
    return (
      <div className="badgeSize-m border border-primary-blue-original bg-primary-blue-100 textColor-focus whitespace-nowrap flex items-center gap-x-2 px-2 py-1 rounded-s">
        <Icon name="BookMark" width={16} height={16} />
        <span>면허 | {workType}</span>
      </div>
    );
  };

  export default WorkTypeBadge;
