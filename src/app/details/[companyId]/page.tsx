"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Icon from "../../../../common/components/Icon/Icon";
import Dropdown from "../../../../common/components/Dropdown/Dropdown";
import CheckBox from "../../../../common/components/CheckBox/CheckBox";
import SideNavigator from "../../../../common/components/SideNavigator/SideNavigator";
import TopNavigator from "../../../../common/components/TopNavigator/TopNavigator";
import Modal from "../../../../common/components/Modal/Modal";
import ScoreDetail from "../../../../common/components/ScoreDetail/ScoreDetail";
import ModalButtons from "../ModalButtons";
import CompanyList from "../../../../common/components/ScoreTable/CompanyList.json";
import TopNavController from "../../../../common/components/TopNavController/TopNavController";
import DocDetail from "../../../../common/components/DocDetail/DocDetail";
import Layout from "../../../../common/components/Layout";
import axios from "axios";

export default function Home({ params }: { params: { companyId: string } }) {
  // JWT 토큰
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDczMTMzMDMsImV4cCI6MTcwNzMxNjkwM30.dX6-1DYtIGczztugwrpnFVr-PeZa_9w-FQ-0k3N7moM";
  // Axios 인스턴스 생성
  const axiosInstance = axios.create({
    baseURL:
      "http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  // EvalData에 대한 interface
  interface Grading {
    id: number;
    category: string;
    perfectScore: number;
  }

  interface TotalCategory {
    id: number;
    upperCategory: string;
    gradingList: Grading[];
  }

  interface ScoreBoard {
    id: number;
    category: string;
    score: number;
  }

  interface UpperCategoryScoreBoard {
    id: number;
    upperCategory: string;
    scoreBoardList: ScoreBoard[];
  }

  interface Score {
    id: number;
    isNew: boolean;
    isRecommended: boolean;
    appliedDate: string;
    applier: {
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
    };
    upperCategoryScoreBoardList: UpperCategoryScoreBoard[];
  }

  interface getEvalData {
    total: TotalCategory[];
    score: Score[];
  }

  // ApplierData에 대한 interface
  interface BasicInfo {
    businessId: string;
    companyName: string;
    ceoName: string;
    companyAddress: string;
  }

  interface ManagerInfo {
    managerName: string;
    managerPhoneNum: string;
    managerEmail: string;
  }

  interface FinanceInfo {
    id: number;
    creditGrade: string;
    cashFlowGrade: string;
    watchGrade: string;
    salesRevenue: number;
    operatingMarginRatio: number;
    netProfitMarginRatio: number;
    currentRatio: number;
    quickRatio: number;
    debtToEquityRatio: number;
    debtDependency: number;
  }

  interface Document {
    id: number;
    documentName: string;
    documentUrl: string;
  }

  interface CompanyHistory {
    id: number;
    dateField: string;
    detail: string;
  }

  interface CompanyData {
    basicInfo: BasicInfo;
    managerInfo: ManagerInfo;
    corporateApplication: string;
    esg: boolean;
    finance: FinanceInfo;
    paperReqList: Document[];
    historyList: CompanyHistory[];
    possibleWorkTypeList: { id: number; workType: string }[];
  }

  const initialCompanyData: CompanyData = {
    basicInfo: {
      businessId: "",
      companyName: "",
      ceoName: "",
      companyAddress: "",
    },
    managerInfo: {
      managerName: "",
      managerPhoneNum: "",
      managerEmail: "",
    },
    corporateApplication: "",
    esg: false,
    finance: {
      id: 0,
      creditGrade: "",
      cashFlowGrade: "",
      watchGrade: "",
      salesRevenue: 0,
      operatingMarginRatio: 0,
      netProfitMarginRatio: 0,
      currentRatio: 0,
      quickRatio: 0,
      debtToEquityRatio: 0,
      debtDependency: 0,
    },
    paperReqList: [],
    historyList: [],
    possibleWorkTypeList: [],
  };

  const [getEvalData, setGetEvalData] = useState<getEvalData>({
    total: [],
    score: [],
  });
  const [getApplierData, setGetApplierData] =
    useState<CompanyData>(initialCompanyData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseEval = await axiosInstance.get(
          "application/getMyApplicants"
        );
        const responseApplier = await axiosInstance.get(
          `auth/applier/${params.companyId}`
        );
        setGetEvalData(responseEval.data);
        setGetApplierData(responseApplier.data);
        console.log(responseEval.data);
        console.log(responseApplier.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  // 여기는 체크박스 사용하는 방법!!
  // 우선 각 체크박스에 들어갈 Text를 쓰고
  const checkboxes = [
    { text: "Checkbox 1" },
    { text: "Checkbox 2" },
    // ... 추가 체크박스 구성
  ];

  // 여기에서 각 Index마다 어떤 함수를 실행시킬지 결정하면 됨 (체크박스 후 확인 누르는 경우에는 상위에 함수 정의해서 쓰면 될 듯)
  const handleSelect = (index: number | null) => {
    console.log(
      `선택된 체크박스: ${index !== null ? checkboxes[index].text : "없음"}`
    );
  };

  const currentIndex = getEvalData.score.findIndex(
    (item) => item.applier.businessId === params.companyId
  );
  const currentItem =
    currentIndex !== -1 ? getEvalData.score[currentIndex] : null;

  const companyName = currentItem?.applier.companyName || "";
  const totalScore =
    currentItem?.upperCategoryScoreBoardList
      .flatMap((cat) =>
        cat.scoreBoardList.map((scoreBoard) => scoreBoard.score)
      )
      .reduce((acc, score) => acc + score, 0) || 0;

  let companyBefore = "",
    companyAfter = "";

  if (currentItem) {
    // 'companyBefore' 설정 (이전 데이터 또는 마지막 데이터)
    const beforeIndex =
      currentIndex === 0 ? getEvalData.score.length - 1 : currentIndex - 1;
    companyBefore = getEvalData.score[beforeIndex].applier.companyName;

    // 'companyAfter' 설정 (다음 데이터 또는 첫 번째 데이터)
    const afterIndex =
      currentIndex === getEvalData.score.length - 1 ? 0 : currentIndex + 1;
    companyAfter = getEvalData.score[afterIndex].applier.companyName;
  }

  const CompanyInfo = currentItem
    ? {
        companyName: currentItem.applier.companyName,
        workType: currentItem.applier.ceoName,
        companyBefore,
        companyAfter,
      }
    : {
        companyName: "",
        workType: "",
        companyBefore: "",
        companyAfter: "",
      };

  const MngInfo = {
    totalScore: 15,
    evalScore: 15,
    DetailCat: ["회사 설립 경과 년수", "지방 업체 여부", "산재 발생 여부"],
    DetailCatValue: ["22년", "지방", "미보유"],
    DetailCatTotalScore: [9, 3, 3],
    DetailCatEvalScore: [9, 3, 3],
  };

  interface FinTranslateType {
    [key: string]: string;
  }

  const FinTranslate: FinTranslateType = {
    "신용 등급": "creditGrade",
    "현금흐름 등급": "cashFlowGrade",
    부채비율: "debtToEquityRatio",
    "차입금 의존도": "debtDependency",
    유동비율: "currentRatio",
    "WATCH 등급": "wat",
  };

  const FinInfo = currentItem
    ? {
        totalScore: getEvalData.total[1].gradingList.reduce(
          (sum, grading) => sum + grading.perfectScore,
          0
        ),

        evalScore:
          currentItem.upperCategoryScoreBoardList[1].scoreBoardList.reduce(
            (sum, scoreBoard) => sum + scoreBoard.score,
            0
          ),

        DetailCat: getEvalData.total[1].gradingList.map(
          (grading) => grading.category
        ),

        DetailCatValue: getEvalData.total[1].gradingList.map((grading) => {
          const financeKey = FinTranslate[grading.category];
          return financeKey
            ? (getApplierData.finance as any)[financeKey] || "N/A"
            : "N/A";
        }),
        DetailCatTotalScore: getEvalData.total[1].gradingList.map(
          (grading) => grading.perfectScore
        ),

        DetailCatEvalScore:
          currentItem.upperCategoryScoreBoardList[1].scoreBoardList.map(
            (scoreBoard) => scoreBoard.score
          ),
      }
    : {
        totalScore: 0,
        evalScore: 0,
        DetailCat: [],
        DetailCatValue: [],
        DetailCatTotalScore: [],
        DetailCatEvalScore: [],
      };

  const CertiInfo = {
    totalScore: 10,
    evalScore: 8,
    DetailCat: ["ESG 인증 및 평가 양호 여부", "ISO 인증 보유 여부"],
    DetailCatValue: ["미보유", "보유"],
    DetailCatTotalScore: [5, 5],
    DetailCatEvalScore: [3, 5],
  };

  const ConstInfo = {
    totalScore: 35,
    evalScore: 30,
    DetailCat: ["시공능력평가액 순위", "최근 3년간 공시 실적"],
    DetailCatValue: ["5%", "양호"],
    DetailCatTotalScore: [20, 15],
    DetailCatEvalScore: [17, 13],
  };

  const MngDoc = {
    docName: [
      "법인 등기부 등본",
      "사업자 등록증 사본",
      "건설업 등록증",
      "건설 기술인 경력 수첩",
      "납세(시, 국세 완납 증명서)",
      "회사 조직표",
      "건설산업기본법에 의한 제재처분 확인서",
      "중대재해 이력 확인서",
      "경영상태 확인원",
      "회사 소개 자료 (지명원 등)",
    ],
    docReq: [true, true, true, true, true, true, true, true, true, true],
    docSubmit: [true, true, true, true, true, true, true, true, true, true],
    docRef: [
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "7https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
    ],
  };

  const FinDoc = {
    docName: ["신용평가보고서"],
    docReq: [true],
    docSubmit: [true],
    docRef: [
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
    ],
  };

  const CertiDoc = {
    docName: [
      "특허증",
      "ISO 9001 인증서",
      "ISO 14001 인증서",
      "ISO 45001 인증서",
      "ISO 19650 인증서",
      "KOSHA-MS 인증서",
      "KOSHA 18001 인증서",
      "기업부설연구소 인정서",
      "연구개발전담부서 인정서",
      "기술혁신형 중소기업(INNO-BIZ) 확인증",
      "경영혁신형 중소기업(MAIN-BIZ) 확인증",
      "벤처기업 확인서",
      "기업 인증 표창장",
    ],
    docReq: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ],
    docSubmit: [
      true,
      true,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
    ],
    docRef: [
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "",
      "",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "",
      "",
      "",
      "",
      "",
      "",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
    ],
  };

  const ConstDoc = {
    docName: [
      "건설공사 실적 확인서(3개년)",
      "23년 시공능력평가 확인서",
      "23년 시공능력순위 확인서",
      "22년 시공능력평가 확인서",
      "22년 시공능력순위 확인서",
      "21년 시공능력평가 확인서",
      "21년 시공능력순위 확인서",
    ],
    docReq: [true, true, true, false, false, false, false],
    docSubmit: [true, true, true, true, true, false, false],
    docRef: [
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "https://buildnowtestbucket.s3.ap-northeast-2.amazonaws.com/%E1%84%87%E1%85%A5%E1%86%B8%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%83%E1%85%B3%E1%86%BC%E1%84%80%E1%85%B5%E1%84%87%E1%85%AE%E1%84%83%E1%85%B3%E1%86%BC%E1%84%87%E1%85%A9%E1%86%AB.pdf",
      "",
      "",
      "",
    ],
  };

  return (
    <div className="flex h-screen justify-start">
      <div className="fixed top-0 left-0 h-full z-50">
        <SideNavigator CompanyName="A 건설" />
      </div>
      <div className="flex flex-col flex-grow h-screen ml-[266px] z-40">
        {/* SideNavigator의 너비만큼 margin-left 추가 */}
        <TopNavigator>
          {/* <Dropdown /> */}
          <TopNavController
            companyName={CompanyInfo.companyName}
            workType={CompanyInfo.workType}
            companyBefore={CompanyInfo.companyBefore}
            companyAfter={CompanyInfo.companyAfter}
          />
        </TopNavigator>
        {/* flex 레이아웃을 사용하여 ScoreDetail과 CheckBox, ModalButtons를 수평으로 배열 */}
        <div className="flex">
          <ScoreDetail
            companyName={companyName}
            totalScore={totalScore}
            isPass="통과"
            MngInfo={MngInfo}
            FinInfo={FinInfo}
            CertiInfo={CertiInfo}
            ConstInfo={ConstInfo}
          />
          <DocDetail
            MngDoc={MngDoc}
            FinDoc={FinDoc}
            CertiDoc={CertiDoc}
            ConstDoc={ConstDoc}
          />
        </div>
      </div>
      {/* CheckBox와 ModalButtons 부분 */}
      {/* <div className="flex flex-col ml-4"> */}
      {/* {" "} */}
      {/* 여기서 ml-4는 왼쪽 요소와의 간격을 조정합니다 */}
      {/* <CheckBox items={checkboxes} onSelect={handleSelect} /> */}
      {/* <ModalButtons /> */}
      {/* </div> */}
    </div>
  );
}
