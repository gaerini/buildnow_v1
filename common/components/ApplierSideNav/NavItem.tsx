import React from "react";
import { usePathname } from "next/navigation";

interface NavItemProps {
  number: string;
  path: string;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ number, path, text }) => {
  return (
    <div className="flex items-center gap-4">
      <div
        className={`badgeSize-m ${
          usePathname().includes(path)
            ? "bg-primary-blue-400 border border-primary-blue-original textColor-white"
            : "bgColor-white border borderColor textColor-mid-emphasis"
        }`}
      >
        {number}
      </div>
      <div
        className={`text-paragraph-16 ${
          usePathname().includes(path)
            ? "font-bold textColor-focus"
            : "font-normal textColor-mid-emphasis"
        }`}
      >
        {text}
      </div>
    </div>
  );
};

export default NavItem;
