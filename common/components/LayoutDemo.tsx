import React, { useState } from "react";
import WideSideNavigator from "./SideNavigator/WideSideNavigator";
import NarrowSideNavigator from "./SideNavigator/NarrowSideNavigator";
import SideNavigator from "./SideNavigatorDemo/SideNavigatorDemo";

interface LayoutProps {
  children: React.ReactNode;
  isNarrow: boolean;
  setIsNarrow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
}

const LayoutDemo: React.FC<LayoutProps> = ({
  children,
  isNarrow,
  setIsNarrow,
  toggleMode,
}) => {
  return (
    <div className="scrollbar-hide">
      <SideNavigator
        CompanyName="한울건설"
        isNarrow={isNarrow}
        setIsNarrow={setIsNarrow}
        toggleMode={toggleMode}
      />
      {children}
    </div>
  );
};

export default LayoutDemo;
