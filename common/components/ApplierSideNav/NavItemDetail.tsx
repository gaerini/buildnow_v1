import React from "react";
import { usePathname } from "next/navigation";

interface NavItemDetailProps {
  text: string;
  path: string;
}

const NavItemDetail: React.FC<NavItemDetailProps> = ({ text, path }) => {
  return (
    <div
      className={`text-paragraph-14 font-normal ${
        usePathname().includes(path)
          ? "textColor-focus"
          : "textColor-mid-emphasis"
      }`}
    >
      {text}
    </div>
  );
};

export default NavItemDetail;
