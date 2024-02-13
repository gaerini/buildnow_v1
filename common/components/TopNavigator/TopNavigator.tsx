import React, { ReactNode, useEffect } from "react";

interface TopNavigatorProps {
  children: ReactNode;
}

const TopNavigator: React.FC<TopNavigatorProps> = ({ children }) => {
  return (
    <div className=" top-0 h-16 bgColor-white border-b justify-start items-center inline-flex">
      <div className="flex h-16 items-center ml-8 w-full">{children}</div>
    </div>
  );
};

export default TopNavigator;
