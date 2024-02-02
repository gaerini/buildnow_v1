"use client";
import React from "react";
import arrowDownSvg from "./arrow-down.svg"; // arrow-down.svg의 정확한 경로를 지정해주세요.

const Dropdown = () => {
  return (
    <div className="w-10 p-m bg-neutral-400 border border-primary-navy-200 rounded-s">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-subTitle-20 text-primary-neutral-black">
            공종
          </span>
          <div className="bg-primary-navy-200 rounded-s px-2 ml-2">
            <span className="text-paragraph-16">9</span>
          </div>
        </div>
        <img src={arrowDownSvg} alt="Arrow Down" className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Dropdown;
