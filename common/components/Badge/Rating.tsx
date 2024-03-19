
"use client";
import React from "react";
import Icon from "../Icon/Icon";

const Rating: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="badgeSize-m border border-primary-blue-original bgColor-blue textColor-focus whitespace-nowrap">
        시공능력평가액 상위 {rating}%
      </div>
    );
  };

  export default Rating;
