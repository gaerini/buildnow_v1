"use client";

import React, { useState } from "react";
import SideNavItem from "./SideNavitem";
import Icon from "../Icon/Icon";

interface Props {
  CompanyName: string;
}
export default function SideNavigator({ CompanyName }: Props) {
  const [activeItem, setActiveItem] = useState("CompList");

  const NavItemClick = (itemName: string) => {
    setActiveItem(itemName);
  };

  return (
    <div className="w-[266px] h-screen flex flex-col bg-white justify-between box-border">
      <div>
        {/* 상단 로고와 회사 이름 */}
        <div className="flex w-[266px] h-16 px-8 py-4 bg-white border-b border-gray-300 justify-start items-center gap-2 ">
          <Icon name="Profile" width={32} height={32} />
          <p className="text-center text-black text-title-24 font-normal">
            {CompanyName}
          </p>
        </div>
        {/* 메뉴 아이템 */}
        <div className="flex flex-col ">
          <SideNavItem
            icon="CompList"
            Text="지원서 목록"
            isActive={activeItem == "CompList"}
            onClick={() => NavItemClick("CompList")}
          />
          <SideNavItem
            icon="EvalResult"
            Text="평가 결과"
            isActive={activeItem == "EvalResult"}
            onClick={() => NavItemClick("EvalResult")}
          />
        </div>
      </div>
      <div className="flex flex-col">
        {/* 로고 */}
        <div className="w-[266px] px-8 justify-start">
          <Icon name="logo" width={80} />
        </div>
        {/* 하단 이용약관 및 개인정보처리방침 */}
        <div className="w-[266px] px-8 py-4 justify-start gap-2 inline-flex">
          <div className="text-center text-neutral-600 font-normal hover:font-bold text-xs leading-[14.4px]">
            이용약관
          </div>
          <div className="text-center text-neutral-600 text-xs leading-[14.4px] font-normal">
            |
          </div>
          <div className="text-center text-neutral-600 font-normal hover:font-bold text-xs leading-[14.4px]">
            개인정보처리방침
          </div>
        </div>
      </div>
    </div>
  );
}
