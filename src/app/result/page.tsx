"use client";
import react, { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "../../../common/components/Icon/Icon";
import Dropdown from "../../../common/components/Dropdown/Dropdown";
import CheckBox from "../../../common/components/CheckBox/CheckBox";
import SideNavigator from "../../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../../common/components/TopNavigator/TopNavigator";
import ResultScoreTable from "../../../common/components/ScoreTable/ResultScoreTable";
import ListHeader from "../../../common/components/ListHeader/ListHeader";
// import CompanyList from "../../../common/components/ScoreTable/CompanyList.json";
import Layout from "../../../common/components/Layout";
import {
  Total,
  CompanyScoreSummary,
} from "../../../common/components/Interface/CompanyData";
import axios from "axios";

// JWT 토큰
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDc4Nzg3MjksImV4cCI6MTcwNzg4MjMyOX0.AU2j_PPLCWkWYVIPgZymS-LQ5xO5UpOxdgGG_cPsTRI";
const axiosInstance = axios.create({
  baseURL: "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

export default function Home() {
  const [totalData, setTotalData] = useState<Total>({});
  const [scoreData, setScoreData] = useState<CompanyScoreSummary[]>([]);
  // const [getData, setGetData] = useState<{ total: Total[]; score: Score[] }>({
  //   total: [],
  //   score: [],
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("application/getMyApplicants");
        setTotalData(response.data.total);
        setScoreData(response.data.applier.score);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const [activeButton, setActiveButton] = useState("total");
  const [sortedData, setSortedData] = useState(scoreData);

  useEffect(() => {
    if (activeButton === "new") {
      setSortedData(scoreData.filter((item) => item.isRead));
    } else {
      setSortedData(scoreData);
    }
  }, [activeButton, scoreData]);

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
            <ResultScoreTable
              data={sortedData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

// useEffect(() => {
//   const calculatedScores: CompanyScoreSummary[] = scoreData.map((company) => {
//     let companyTotalScore = 0;
//     const scoresByCategory = company.upperCategoryScoreBoardList.reduce(
//       (acc, { upperCategory, scoreBoardList }) => {
//         const totalScore = scoreBoardList.reduce(
//           (sum, { score }) => sum + score,
//           0
//         );
//         acc[upperCategory] = (acc[upperCategory] || 0) + totalScore;
//         companyTotalScore += totalScore;

//         return acc;
//       },
//       {} as ScoreSummary
//     );

//   return {
//     name: company.applier.companyName,
//     caption: "철근 콘크리트",
//     isNew: true,
//     id: company.applier.businessId,
//     scores: scoresByCategory,
//     totalScore: companyTotalScore,
//     result: "통과",
//   };
// });

//   setTotalScores(calculatedScores);
// }, [getData.score]);
