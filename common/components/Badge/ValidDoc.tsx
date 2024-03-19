"use client";
import React from "react";
import Icon from "../Icon/Icon";

const ValidDoc = () => {
  return (
    <div className="badgeSize-m border bgColor-white flex gap-x-1">
      <div className="textColor-focus">
        <Icon name="CheckCircle" width={18} height={18} />
      </div>
      <span className="text-paragraph-14 textColor-mid-emphasis">유효서류</span>
    </div>
  );
};

export default ValidDoc;