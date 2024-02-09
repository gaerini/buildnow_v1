import React, { ReactNode, useEffect } from "react";

interface TopNavigatorProps {
  children: ReactNode;
}

const TopNavigator: React.FC<TopNavigatorProps> = ({ children }) => {
  return (
    <div className="sticky top-0 h-16 bgColor-white border-b justify-start items-center inline-flex z-5">
      <div className="flex items-center ml-8 w-full grow">{children}</div>
    </div>
  );
};

export default TopNavigator;
