"use client";
import React from "react";
import Icon from "../Icon/Icon";

const BusinessType: React.FC<{ businessType: string }> = ({ businessType }) => {
  // Determine the icon name based on the business type
  const iconName =
    businessType === "PERSONAL"
      ? "User"
      : businessType === "CORPORATION"
      ? "SuitCase"
      : "BookMark";

  return (
    <div className="badgeSize-m border border-primary-neutral-200 text-paragraph-14 font-bold bgColor-white text-primary-neutral-700 whitespace-nowrap flex items-center gap-x-2 px-2 py-1 rounded-s">
      <Icon name={iconName} width={16} height={16} />
      <span>
        {businessType === "PERSONAL"
          ? "개인 사업자"
          : businessType === "CORPORATION"
          ? "법인 사업자"
          : ""}
      </span>
    </div>
  );
};

export default BusinessType;
