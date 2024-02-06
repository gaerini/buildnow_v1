"use client";
import react, { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "../../../common/components/Icon/Icon";
import Dropdown from "../../../common/components/Dropdown/Dropdown";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import SideNavigator from "../../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../../common/components/TopNavigator/TopNavigator";
import ListScoreTable from "../../../common/components/ScoreTable/ListScoreTable";
import ListHeader from "../../../common/components/ListHeader/ListHeader";
import CompanyList from "../../../common/components/ScoreTable/CompanyList.json";
import Layout from "../../../common/components/Layout";

export default function Home() {
  const [activeButton, setActiveButton] = useState("total");
  const [filteredData, setFilteredData] = useState(CompanyList);

  useEffect(() => {
    if (activeButton === "new") {
      setFilteredData(CompanyList.filter((company) => company.isNew));
    } else {
      setFilteredData(CompanyList);
    }
  }, [activeButton]);

  return (
    <Layout>
      <div className="flex h-screen">
        <div className="fixed top-0 left-0 h-full z-10">
          {/* <SideNavigator CompanyName="A 건설" /> */}
        </div>
        <div className="flex flex-col ml-[266px] flex-1">
          <TopNavigator>
            <Dropdown />
          </TopNavigator>
          <div className="z-5">
            <ListScoreTable
              data={filteredData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
