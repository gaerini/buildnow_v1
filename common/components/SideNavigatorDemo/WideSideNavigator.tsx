"use client";

import React, { useState, useEffect } from "react";
import WideSideNavitem from "./WideSideNavitem";
import Icon from "../Icon/Icon";
import { useRouter, usePathname } from "next/navigation";
import * as svgs from "../Icon/svgs";
import Image from "next/image";
import myImage from "../Icon/imgs/hanyang.png";
import Cookies from "js-cookie";
import HelpButtons from "../HelpButtons/HelpButtons";

interface Props {
  CompanyName: string;
}

export type IconName = keyof typeof svgs;

const menuItems: { name: string; icon: IconName; path: string }[] = [
  { name: "지원서 목록", icon: "CompList", path: "/demo/list" },
  { name: "평가 결과", icon: "EvalResult", path: "/demo/result" },
];

export default function SideNavigator({ CompanyName }: Props) {
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

  return (
    <div className="fixed top-0 left-0 h-full z-10">
      <div className="w-[266px] h-screen flex flex-col bgColor-neutral justify-start border-box border-r-[1px] borderColor">
        {/* 로고 및 최상단 영역 */}
        <div className="w-[266px] h-[120px] px-8 pt-[25px] pb-8 border-b borderColor flex-col justify-start items-start gap-2.5 inline-flex">
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

        {/* 로그인 프로필 영역 */}

        <div className="w-[266px] h-14 px-8 py-4 border-b borderColor btnStyle-SideBar justify-between items-center gap-2 inline-flex">
          <div className="inline-flex justify-center items-center gap-2 ">
            <Image
              className="w-8 h-8 rounded-full shadow-xs border-2 border-white"
              src={myImage}
              alt="Description"
              width={500}
              height={300}
            />
            <p className="text-center text-primary-neutral-black text-subTitle-18 font-bold">
              {CompanyName}
            </p>
          </div>
          <button
            className="btnStyle-textOnly-s text-paragraph-12 font-normal hover:underline underline-offset-4 active:textColor-focus active:decoration-current"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>

        {/* 네비게이션 아이템 영역 */}
        <div className="flex flex-col ">
          {menuItems.map(({ name, icon, path }) => (
            <WideSideNavitem
              key={name}
              icon={icon}
              Text={name}
              isActive={usePathname().includes(path)}
              onClick={() => NavItemClick(path)}
            />
          ))}
        </div>

        {/* 최하단 영역 */}
        <div className="absolute bottom-0">
          <HelpButtons />
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import SideNavItem from "./SideNavitem";
// import Icon from "../Icon/Icon";
// import { useRouter } from "next/navigation";

// interface Props {
//   CompanyName: string;
// }
// export default function SideNavigator({ CompanyName }: Props) {
//   const router = useRouter();
//   const [activeItem, setActiveItem] = useState<string>("CompList");

//   const NavItemClick = (itemName: string, url: string) => {
//     setActiveItem(itemName);
//     router.push(url);
//   };

//   return (
//     <div className="fixed top-0 left-0 h-full z-10">
//       <div className="w-[266px] h-screen flex flex-col bg-primary-neutral-white justify-between border-box border-r-[1px] border-primary-navy-200">
//         <div>
//           {/* 상단 로고와 회사 이름 */}
//           <div className="flex w-[266px] h-16 px-8 py-4 bg-primary-neutral-white border-b border-primary-neutral-300 justify-start items-center gap-2 ">
//             <Icon name="Profile" width={32} height={32} />
//             <p className="text-center text-primary-neutral-black text-title-24 font-normal">
//               {CompanyName}
//             </p>
//           </div>
//           {/* 메뉴 아이템 */}
//           <div className="flex flex-col ">
//             <SideNavItem
//               icon="CompList"
//               Text="지원서 목록"
//               isActive={activeItem == "CompList"}
//               onClick={() => NavItemClick("CompList", "/list")}
//             />
//             <SideNavItem
//               icon="EvalResult"
//               Text="평가 결과"
//               isActive={activeItem == "EvalResult"}
//               onClick={() => NavItemClick("EvalResult", "/result")}
//             />
//           </div>
//         </div>
//         <div className="flex flex-col">
//           {/* 로고 */}
//           <div className="w-[266px] px-8 justify-start">
//             <Icon name="logo" width={80} />
//           </div>
//           {/* 하단 이용약관 및 개인정보처리방침 */}
//           <div className="w-[266px] px-8 py-4 justify-start gap-2 inline-flex">
//             <div className="text-center text-primary-neutral-600 font-normal hover:font-bold text-paragraph-12">
//               이용약관
//             </div>
//             <div className="text-center text-primary-neutral-600 text-paragraph-12 font-normal">
//               |
//             </div>
//             <div className="text-center text-primary-neutral-600 font-normal hover:font-bold text-paragraph-12">
//               개인정보처리방침
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
