"use-client";

import Image from "next/image";
import SideNavigator from "../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../common/components/TopNavigator/TopNavigator";

export default function Home() {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 h-full z-10">
        <SideNavigator CompanyName="A 건설" />
      </div>
      <div className="w-full">
        <TopNavigator />
      </div>
    </div>
  );
}
