"use-client";

import Image from "next/image";
import Icon from "../../common/components/Icon/Icon";
import Dropdown from "../../common/components/Dropdown/Dropdown";
import CheckBox from "../../common/components/CheckBox/CheckBox";
import SideNavigator from "../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../common/components/TopNavigator/TopNavigator";
import ScoreTable from "../../common/components/ScoreTable/ScoreTable";

export default function Home() {
  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 h-full z-10">
        <SideNavigator CompanyName="A 건설" />
      </div>
      <div className="flex flex-col ml-[266px] flex-1">
        <TopNavigator />
      </div>
    </div>
  );
}
