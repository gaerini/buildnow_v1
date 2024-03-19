// NarrowSideNavigator
"use client";

import React, { useState, useEffect } from "react";
import NarrowSideNavitem from "./NarrowSideNavitem";
import Icon from "../Icon/Icon";
import myImage from "../Icon/imgs/hanyang.png";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import * as svgs from "../Icon/svgs";
import Cookies from "js-cookie";

export type IconName = keyof typeof svgs;

const menuItems: { name: string; icon: IconName; path: string }[] = [
  { name: "지원서 목록", icon: "CompList", path: "/list" },
  { name: "평가 결과", icon: "EvalResult", path: "/result" },
];

export default function NarrowSideNavigator() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const NavItemClick = (path: string) => {
    if (isClient) {
      router.push(path);
    }
  };

  return (
    <div className="fixed top-0 left-0 h-full z-10">
      <div className="w-[119px] h-screen flex flex-col bgColor-neutral justify-start border-box border-r-[1px] borderColor">
        {/* 상단 로고 및 버전 정보 */}
        <div className="w-[119px] h-[120px] flex flex-col justify-center items-center gap-2.5">
          <Icon name="List" width={32} height={32} />
          <p className="text-subTitle-20 text-primary-navy-original">v1.1.1</p>
        </div>

        <div className="w-[119px] h-14 px-8 py-4 border-b border-t borderColor btnStyle-SideBar justify-center items-center gap-2 inline-flex">
          <div className="inline-flex justify-center items-center gap-2 ">
            <Image
              className="w-8 h-8 rounded-full shadow-xs border-2 border-white"
              src={myImage}
              alt="Description"
              width={500}
              height={300}
            />
          </div>
        </div>

        {/* 네비게이션 아이템 영역 */}
        <div className="flex flex-col">
          {menuItems.map(({ name, icon, path }) => (
            <NarrowSideNavitem
              key={name}
              icon={icon}
              Text={name}
              isActive={usePathname().includes(path)}
              onClick={() => NavItemClick(path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
