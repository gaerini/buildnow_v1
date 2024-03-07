import React from "react";
import SideNavigator from "./SideNavigator/SideNavigator";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <SideNavigator CompanyName="H이엔지(주)" />
      {props.children}
    </div>
  );
};

export default Layout;
