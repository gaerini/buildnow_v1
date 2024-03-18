import React from "react";
import SideNavigator from "./SideNavigator/SideNavigator";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <SideNavigator CompanyName="신한종합건설" />
      {props.children}
    </div>
  );
};

export default Layout;
