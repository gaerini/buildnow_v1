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

  interface NumApply {
    [key: string]: number;
  }

  const [activeButton, setActiveButton] = useState("total");
  const [filterData, setFilteredData] = useState<CompanyScoreSummary[]>([]);
  const [sortedData, setSortedData] = useState<CompanyScoreSummary[]>([]);

  const [selectedWorkType, setSelectedWorkType] = useState<string>("전체");

  const [numApply, setNumApply] = useState<NumApply>({});
  const [selectedNumApply, setSelectedNumApply] = useState<number>(
    numApply[selectedWorkType]
  );

  useEffect(() => {
    const numApply: NumApply = {
      토공사: 0,
      포장공사: 0,
      "보링 그라우팅 파일공사": 0,
      실내건축공사: 0,
      "금속구조물 창호 온실공사": 0,
      "지붕판금 건축물 조립공사": 0,
      도장공사: 0,
      "습식 방수공사": 0,
      석공사: 0,
      조경식재공사: 0,
      조경시설물설치공사: 0,
      "철근 콘크리트 공사": 0,
      "구조물 해체 비계공사": 0,
      상하수도설비공사: 0,
      "철도 궤도공사": 0,
      "철강 구조물 공사": 0,
      수중공사: 0,
      준설공사: 0,
      승강기설치공사: 0,
      삭도설치공사: 0,
      기계설비공사: 0,
      "가스시설공사(제1종)": 0,
      "가스시설공사(제2종)": 0,
      "가스시설공사(제3종)": 0,
      "난방공사(제1종)": 0,
      "난방공사(제2종)": 0,
      "난방공사(제3종)": 0,
      전체: 0,
    };

    // sortedData 배열을 순회하면서 각 작업 유형의 개수를 계산
    scoreData.forEach((item) => {
      if (item.applyingWorkType in numApply) {
        numApply[item.applyingWorkType] += 1;
      }
      numApply["전체"] += 1; // '전체' 카운트도 업데이트
    });

    setNumApply(numApply); // 계산된 개수로 numApply 상태 업데이트
  }, [scoreData]); // sortedData가 변경될 때마다 이 로직 실행

  useEffect(() => {
    setFilteredData(
      scoreData.filter((item) => item.applyingWorkType === selectedWorkType)
    );
  }, [selectedWorkType]);

  useEffect(() => {
    if (activeButton === "new") {
      setSortedData(filterData.filter((item) => item.isRead === false));
    } else {
      setSortedData(filterData);
    }
  }, [activeButton, filterData]);

  return (
    <Layout>
      <div className="flex h-screen">
        <div className="fixed top-0 left-0 h-full z-10">
          {/* <SideNavigator CompanyName="A 건설" /> */}
        </div>
        <div className="flex flex-col ml-[266px] flex-1">
          <TopNavigator>
            <Dropdown
              selectedWorkType={selectedWorkType}
              setSelectedWorkType={setSelectedWorkType}
              selectedNumApply={selectedNumApply}
              setSelectedNumApply={setSelectedNumApply}
              numApply={numApply}
            />
          </TopNavigator>
          <div className="z-5">
            <ListScoreTable
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
