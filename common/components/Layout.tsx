import React, { useState } from "react";
import WideSideNavigator from "./SideNavigator/WideSideNavigator";
import NarrowSideNavigator from "./SideNavigator/NarrowSideNavigator";
import SideNavigator from "./SideNavigator/SideNavigator";

interface LayoutProps {
  children: React.ReactNode;
  isNarrow: boolean;
  setIsNarrow: React.Dispatch<React.SetStateAction<boolean>>;
  toggleMode: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  isNarrow,
  setIsNarrow,
  toggleMode,
}) => {
  return (
    <div className="scrollbar-hide">
      <SideNavigator
        CompanyName="신한종합건설"
        isNarrow={isNarrow}
        setIsNarrow={setIsNarrow}
        toggleMode={toggleMode}
      />
      {children}
    </div>
  );
};

export default Layout;
