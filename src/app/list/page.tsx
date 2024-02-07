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
// import CompanyList from "../../../common/components/ScoreTable/CompanyList.json";
import Layout from "../../../common/components/Layout";
import axios from "axios";

// JWT 토큰
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDczMDYwODYsImV4cCI6MTcwNzMwOTY4Nn0.AG_ET66AkUOuqEYGjMiNEXYiI4xw6vIK1dV2VKziIKA";
const axiosInstance = axios.create({
  baseURL:
    "http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000",
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

interface GradingItem {
  id: number;
  category: string;
  perfectScore: number;
}

interface Total {
  id: number;
  upperCategory: string;
  gradingList: GradingItem[];
}

interface ApplierItem {
  id: number;
  businessId: string;
  companyName: string;
  ceoName: string;
  companyAddress: string;
  managerName: string;
  managerPhoneNum: string;
  managerEmail: string;
  corporateApplicationNum: string;
  esg: boolean;
}

interface ScoreBoardItem {
  id: number;
  category: string;
  score: number;
}

interface UpperCategoryScoreBoardList {
  id: number;
  upperCategory: string;
  ScoreBoardList: ScoreBoardItem[];
}
interface Score {
  id: number;
  isNew: boolean;
  isRecommended: boolean;
  appliedDate: string;
  applier: ApplierItem;
  upperCategoryScoreBoardList: UpperCategoryScoreBoardList[];
}

export default function Home() {
  const [getData, setGetData] = useState<{ total: Total[]; score: Score[] }>({
    total: [],
    score: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("application/getMyApplicants");
        setGetData(response.data);
        console.log(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);
  const [activeButton, setActiveButton] = useState("total");
  const [filteredData, setFilteredData] = useState(getData);

  console.log(getData.total[0].gradingList[0].perfectScore);

  // useEffect(() => {
  //   if (activeButton === "new") {
  //     setFilteredData(getData.filter((company) => company.isNew));
  //   } else {
  //     setFilteredData(getData);
  //   }
  // }, [activeButton]);

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
            {/* <ListScoreTable
              data={filteredData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}
