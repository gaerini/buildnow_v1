"use client";

import React, { useState, useEffect } from "react";
import SideNavItem from "./SideNavitem";
import Icon from "../Icon/Icon";
import { useRouter, usePathname } from "next/navigation";

interface Props {
  CompanyName: string;
}

const menuItems = [
  { name: "지원서 목록", icon: "CompList", path: "/list" },
  { name: "평가 결과", icon: "EvalResult", path: "/result" },
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

  return (
    <div className="fixed top-0 left-0 h-full z-50">
      <div className="w-[266px] h-screen flex flex-col bg-primary-neutral-white justify-between border-box border-r-[1px] border-primary-navy-200">
        <div>
          <div className="flex w-[266px] h-16 px-8 py-4 bg-primary-neutral-white border-r border-b  border-primary-navy-200 justify-start items-center gap-2 ">
            <Icon name="Profile" width={32} height={32} />
            <p className="text-center text-primary-neutral-black text-title-24 font-normal">
              {CompanyName}
            </p>
          </div>
          <div className="flex flex-col ">
            {menuItems.map(({ name, icon, path }) => (
              <SideNavItem
                key={name}
                icon={icon}
                Text={name}
                isActive={usePathname() === path}
                onClick={() => NavItemClick(path)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-[266px] px-8 justify-start">
            <Icon name="logo" width={80} />
          </div>
          <div className="w-[266px] px-8 py-4 justify-start gap-2 inline-flex">
            <div className="text-center text-primary-neutral-600 font-normal hover:font-bold text-paragraph-12">
              이용약관
            </div>
            <div className="text-center text-primary-neutral-600 text-paragraph-12 font-normal">
              |
            </div>
            <div className="text-center text-primary-neutral-600 font-normal hover:font-bold text-paragraph-12">
              개인정보처리방침
            </div>
          </div>
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
