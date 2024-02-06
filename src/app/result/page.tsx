"use client";
import react, { useState, useEffect } from "react";
import Dropdown from "../../../common/components/Dropdown/Dropdown";
import TopNavigator from "../../../common/components/TopNavigator/TopNavigator";
import ResultScoreTable from "../../../common/components/ScoreTable/ResultScoreTable";
import CompanyList from "../../../common/components/ScoreTable/CompanyList.json";
import Layout from "../../../common/components/Layout";

export default function Home() {
  const [activeButton, setActiveButton] = useState("total");
  const [filteredData, setFilteredData] = useState(CompanyList);

  useEffect(() => {
    if (activeButton === "new") {
      setFilteredData(CompanyList.filter((company) => company.isNew));
    } else if (activeButton === "fail") {
      setFilteredData(
        CompanyList.filter((company) => company.result === "탈락")
      );
    } else if (activeButton === "pass") {
      setFilteredData(
        CompanyList.filter((company) => company.result === "통과")
      );
    } else if (activeButton === "lack") {
      setFilteredData(
        CompanyList.filter((company) => company.result === "미달")
      );
    } else {
      setFilteredData(CompanyList);
    }
  }, [activeButton]);

  return (
    <Layout>
      <div className="flex h-screen">
        <div className="flex flex-col ml-[266px] flex-1">
          <TopNavigator>
            <Dropdown />
          </TopNavigator>
          <div className="z-5">
            <ResultScoreTable
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
