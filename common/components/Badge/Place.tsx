"use client";
import React from "react";
import Icon from "../Icon/Icon";

const Place: React.FC<{ place: string }> = ({ place }) => {
  return (
    <div className="badgeSize-m border borderColor bg-primary-neutral-black text-primary-neutral-white whitespace-nowrap">
      {place}
    </div>
  );
};

export default Place;
