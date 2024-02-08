"use client";
import react, { useState, useEffect } from "react";
import axios from "axios";

// JWT 토큰
const jwtToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDczNTk1MzUsImV4cCI6MTcwNzM2MzEzNX0.BnBVMe9B9-HrAUWfyWwKHQWiNeh7OV_R0SiV6OoCllQ";
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
  scoreBoardList: ScoreBoardItem[];
}
interface Score {
  id: number;
  isNew: boolean;
  isRecommended: boolean;
  appliedDate: string;
  applier: ApplierItem;
  upperCategoryScoreBoardList: UpperCategoryScoreBoardList[];
}

interface ScoreSummary {
  [key: string]: number;
}

interface CompanyScoreSummary {
  id: string;
  scores: ScoreSummary;
  totalscore: number;
}

export default function ScoreSummary() {
  const [totalScores, setTotalScores] = useState<CompanyScoreSummary[]>([]);
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

  const scoreData = getData.score;

  useEffect(() => {
    const calculatedScores: CompanyScoreSummary[] = scoreData.map((company) => {
      let companyTotalScore = 0;
      const scoresByCategory = company.upperCategoryScoreBoardList.reduce(
        (acc, { upperCategory, scoreBoardList }) => {
          const totalScore = scoreBoardList.reduce(
            (sum, { score }) => sum + score,
            0
          );
          acc[upperCategory] = (acc[upperCategory] || 0) + totalScore;
          companyTotalScore += totalScore;

          return acc;
        },
        {} as ScoreSummary
      );

      return {
        id: company.applier.businessId,
        scores: scoresByCategory,
        totalscore: companyTotalScore,
      };
    });

    setTotalScores(calculatedScores);
  }, [getData.score]);

  return totalScores;
}
