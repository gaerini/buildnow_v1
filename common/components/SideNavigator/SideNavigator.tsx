// SideNavigator
"use client";

import React, { useState, useEffect, useRef } from "react";
import WideSideNavItem from "./WideSideNavitem";
import NarrowSideNavItem from "./NarrowSideNavitem";
import SideNavitem from "./SideNavitem";
import Icon from "../Icon/Icon";
import { useRouter, usePathname } from "next/navigation";
import * as svgs from "../Icon/svgs";
import Image from "next/image";
import myImage from "../Icon/imgs/hanyang.png";
import sinhan from "../Icon/imgs/sinhan_logo.jpeg";

import Cookies from "js-cookie";
import HelpButtons from "../HelpButtons/HelpButtons";
import ToolTip from "../ApplierApply/ToolTip";

export type IconName = keyof typeof svgs;

interface Props {
  CompanyName: string;
  isNarrow: boolean;
  setIsNarrow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
}

const menuItems: { name: string; icon: IconName; path: string }[] = [
  { name: "지원서 목록", icon: "CompList", path: "/list" },
  { name: "평가 결과", icon: "EvalResult", path: "/result" },
];

export default function SideNavigator({
  CompanyName,
  isNarrow,
  setIsNarrow,
  toggleMode,
}: Props) {
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

  const handleLogout = () => {
    // 토큰 삭제
    Cookies.remove("token");

    // 로그인 페이지로 리다이렉트
    router.push("/login");
  };

  const imageRef = useRef<HTMLImageElement>(null);
  const [showToolTip, setShowToolTip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const handleHelpClick = () => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      setTooltipPosition({
        top: rect.top + window.scrollY, // Position it at the top of the image
        left: rect.right + window.scrollX + 8, // Position it 8px to the right of the image
      });
    }
    setShowToolTip(!showToolTip);
  };

  const newToggleMode = () => {
    toggleMode(); // Call the original toggleMode function
    setShowToolTip(false); // Additionally, set showToolTip to false
  };

  return (
    <div
      className={`fixed top-0 left-0 h-screen z-10  duration-500 ${
        isNarrow ? "w-[119px]" : "w-[266px]"
      }`}
    >
      <div className="h-screen flex flex-col bgColor-neutral justify-start border-box border-r-[1px] borderColor transition-all duration-500">
        {/* 상단 로고 및 모드 전환 버튼 */}
        {isNarrow ? (
          <div
            className={`${
              isNarrow ? "w-[119px]" : "w-[266px]"
            } h-[120px] flex flex-col justify-center items-center gap-2.5 border-b borderColor transition-all duration-500`}
            onClick={newToggleMode}
          >
            <Icon name="List" width={32} height={32} />
            <p className="text-paragraph-18 text-primary-navy-original">
              v1.1.1
            </p>
          </div>
        ) : (
          <div
            className="w-[266px] h-[120px] px-8 pt-[25px] pb-8 border-b borderColor flex-col transition-all duration-500 justify-start items-start gap-2.5"
            onClick={newToggleMode}
          >
            <Icon name="logo_kor_horiz" width={141} height={32} />
            <div className="justify-start items-center gap-1 inline-flex">
              <p className="text-paragraph-14 textColor-title">
                협력업체 관리 시스템 v1.
              </p>
              <button>
                <Icon name="Info" width={16} height={16} />
              </button>
            </div>
          </div>
        )}

        {isNarrow ? (
          <div className="w-[119px] h-14 px-8 py-4 btnStyle-SideBar justify-center transition-all  duration-500 items-center gap-2 inline-flex">
            <div
              className="inline-flex justify-center items-center gap-2 "
              onClick={handleHelpClick}
              ref={imageRef}
            >
              <Image
                className="w-8 h-8 rounded-full shadow-xs border-2 border-white"
                src={myImage}
                alt="Description"
                width={500}
                height={300}
              />
              {showToolTip && (
                <ToolTip
                  detailedText={
                    <button
                      className="btnStyle-textOnly-xs textColor-white font-normal hover:underline underline-offset-4 active:textColor-focus active:decoration-current z-10 whitespace-nowrap"
                      onClick={handleLogout}
                    >
                      로그아웃
                    </button>
                  }
                  bgColor="black"
                  style={{
                    position: "absolute",
                    top: `${tooltipPosition.top}px`,
                    left: `${tooltipPosition.left}px`,
                  }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="w-[266px] h-14 px-8 py-4  btnStyle-SideBar justify-between items-center gap-2  inline-flex">
            <div className="inline-flex justify-center items-center gap-2 ">
              <Image
                className="w-8 h-8 rounded-full shadow-xs border-2 border-white"
                src={myImage}
                alt="Description"
                width={500}
                height={300}
              />

              <p className="text-center textColor-high-emphasis text-subTitle-18 font-bold">
                {CompanyName}
              </p>
            </div>
            <button
              className="btnStyle-textOnly-xs textColor-mid-emphasis font-normal hover:underline underline-offset-4 active:textColor-focus active:decoration-current"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}

        {/* 네비게이션 아이템 영역 */}
        <div className="flex flex-col border-t borderColor">
          {menuItems.map(({ name, icon, path }) => (
            <SideNavitem
              key={name}
              icon={icon}
              Text={name}
              isActive={usePathname().includes(path)}
              onClick={() => NavItemClick(path)}
              isNarrow={isNarrow}
            />
          ))}
        </div>

        {/* Wide 모드에서만 표시되는 하단 영역 */}
        {!isNarrow && (
          <div className="absolute bottom-0">
            <HelpButtons />
          </div>
        )}
      </div>
    </div>
  );
}
