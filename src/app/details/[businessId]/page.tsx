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

export default function Home({ params }: { params: { businessId: string } }) {
  // JWT 토큰
  const jwtToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDc0MTg4NzEsImV4cCI6MTcwNzQyMjQ3MX0.B-vIXtf2t2amXjkLvMHoPsEMiFVXvNEHCGM2tCHnsE4";
  const axiosInstance = axios.create({
    baseURL:
      "http://ec2-43-200-171-250.ap-northeast-2.compute.amazonaws.com:3000",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  interface Recruiter {
    id: number;
    businessId: string;
    password: string;
    managerName: string;
    companyName: string;
  }

  interface Requirement {
    id: number;
    documentName: string;
    isEssential: boolean;
  }

  interface Grading {
    id: number;
    category: string;
    perfectScore: number;
  }

  interface UpperCategoryGrading {
    id: number;
    upperCategory: string;
    gradingList: Grading[];
    requirementList: Requirement[];
  }

  interface RecruitmentInfo {
    id: number;
    deadline: string;
    threshold: number;
    recruiter: Recruiter;
    upperCategoryGradingList: UpperCategoryGrading[];
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

  interface Applied {
    id: number;
    isNew: boolean;
    isRecommended: boolean;
    isRead: boolean;
    isChecked: boolean;
    applyingWorkType: string;
    appliedDate: string;
    upperCategoryScoreBoardList: UpperCategoryScoreBoard[];
  }

  interface ApplierInfo {
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
    companyPhoneNum: string;
    companyIntro: string;
    hadAccident: boolean;
    estDate: string;
    appliedList: Applied[];
    paperReqList: Requirement[];
    historyList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
    possibleWorkTypeList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
    iso: boolean;
  }

  interface TotalScore {
    [category: string]: number;
  }

  interface ApplierScore {
    companyName: string;
    businessId: string;
    score: {
      [category: string]: number;
    };
    isPass: string;
    applyingWorkType: string;
    isRead: boolean;
    isChecked: boolean;
    scoreSum: number;
  }

  interface ApplierData {
    score: ApplierScore[];
  }

  const [recruitmentInfo, setRecruitmentInfo] =
    useState<RecruitmentInfo | null>(null);
  const [applierInfo, setApplierInfo] = useState<ApplierInfo | null>(null);

  const [getTotalScore, setGetTotalScore] = useState<TotalScore>({});
  const [getAllApplierData, setGetAllApplierData] =
    useState<ApplierData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseApplier = await axiosInstance.get(
          `/application/getApplierInfo/${params.businessId}`
        );
        const responseTotalScore = await axiosInstance.get(
          "/application/getMyApplicants"
        );
        const applierdata = responseApplier.data;
        const totaldata = responseTotalScore.data;
        
        setRecruitmentInfo(applierdata.recruitmentInfo);
        setApplierInfo(applierdata.applierInfo);
        setGetTotalScore(totaldata.total);
        setGetAllApplierData(totaldata.applier);

        console.log(responseApplier.data);
        console.log(responseTotalScore.data);
      } catch (error) {
      } finally {
        setIsLoading(true);
      }
    };
    fetchData();
  }, [[params.businessId]]);

  function extractPlace(companyAddress: string | undefined) {
    if (!companyAddress) return "주소가 비었음";

    // 주소를 공백 기준으로 분리
    const words = companyAddress.split(" ");

    if (words.length === 0) return "";

    // 첫 번째 단어 추출
    let firstWord = words[0];

    // "광역시", "특별시", "특례시" 제외
    const exclusionWords = ["광역시", "특별시", "특례시"];
    exclusionWords.forEach((word) => {
      if (firstWord.includes(word)) {
        firstWord = firstWord.replace(word, "");
      }
    });

    return firstWord;
  }

  // 여기는 체크박스 사용하는 방법!!
  // 우선 각 체크박스에 들어갈 Text를 쓰고
  // const checkboxes = [
  //   { text: "Checkbox 1" },
  //   { text: "Checkbox 2" },
  // ... 추가 체크박스 구성
  // ];

  // 여기에서 각 Index마다 어떤 함수를 실행시킬지 결정하면 됨 (체크박스 후 확인 누르는 경우에는 상위에 함수 정의해서 쓰면 될 듯)
  // const handleSelect = (index: number | null) => {
  //   console.log(
  //     `선택된 체크박스: ${index !== null ? checkboxes[index].text : "없음"}`
  //   );
  // };

  // const currentIndex = getEvalData.score.findIndex(
  //   (item) => item.applier.businessId === params.businessId
  // );
  const currentApplier = getAllApplierData?.score.find(
    (applier) => applier.businessId === params.businessId
  );
  const companyName = applierInfo?.companyName || "";

  const isNew = applierInfo?.appliedList[0].isNew || false;
  const address = applierInfo?.companyAddress || "";
  const place = extractPlace(address);

  // appliedList에서 첫 번째 항목의 applyingWorkType 가져오기
  const applyingWorkType = applierInfo?.appliedList[0].applyingWorkType || "";

  // possibleWorkTypeList에서 일치하는 workType 찾기
  const matchingWorkType = applierInfo?.possibleWorkTypeList.find(
    (workTypeItem) => workTypeItem.workType === applyingWorkType
  );

  // 일치하는 workType의 capacityValueList[0].nationalRankingRatio 가져오기
  const rating =
    matchingWorkType && matchingWorkType.capacityValueList.length > 0
      ? matchingWorkType.capacityValueList[0].nationalRankingRatio
      : 0;

  const companyOutline = {
    companyOutline: [
      params.businessId || "",
      applierInfo?.corporateApplicationNum || "",
      applierInfo?.companyPhoneNum || "",
      place || "",
      address || "",
    ],
  };

  const managerInfo = {
    managerInfo: [
      applierInfo?.managerName || "",
      applierInfo?.managerPhoneNum || "",
      applierInfo?.managerEmail || "",
    ],
  };

  const introInfo = {
    intro: applierInfo?.companyIntro || "",
  };

  const historyInfo = {
    Date: applierInfo?.historyList.map((item) =>
      item.dateField.replace(/-/g, ". ")
    ) || [""], // 날짜 포맷 변경: '-'를 '. '로
    Event: applierInfo?.historyList.map((item) => item.detail) || [""],
  };

  // const totalScore = applierInfo?.appliedList.companyIntro
  //   currentItem?.upperCategoryScoreBoardList
  //     .flatMap((cat) =>
  //       cat.scoreBoardList.map((scoreBoard) => scoreBoard.score)
  //     )
  //     .reduce((acc, score) => acc + score, 0) || 0;

  // let companyBefore = "",
  //   companyAfter = "";

  // if (currentItem) {
  //   // 'companyBefore' 설정 (이전 데이터 또는 마지막 데이터)
  //   const beforeIndex =
  //     currentIndex === 0 ? getEvalData.score.length - 1 : currentIndex - 1;
  //   companyBefore = getEvalData.score[beforeIndex].applier.companyName;

  //   // 'companyAfter' 설정 (다음 데이터 또는 첫 번째 데이터)
  //   const afterIndex =
  //     currentIndex === getEvalData.score.length - 1 ? 0 : currentIndex + 1;
  //   companyAfter = getEvalData.score[afterIndex].applier.companyName;
  // }

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
    "WATCH 등급": "watch",
  };

  const financialGradingList = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "재무 부문"
  )?.gradingList;

  const financialScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "재무 부문"
    )?.scoreBoardList;

  const FinInfo = {
    totalScore: getTotalScore["재무 부문"] || 0,
    evalScore: currentApplier?.score["재무 부문"] || 0,

    DetailCat: financialGradingList?.map((grading) => grading.category) || [],

    DetailCatValue: ["AA", "B", "정상", "30", "10"],
    DetailCatTotalScore:
      financialGradingList?.map((grading) => grading.perfectScore) || [],

    DetailCatEvalScore:
      financialGradingList
        ?.map((grading) => grading.category)
        .map((cat) => {
          const scoreItem = financialScoreBoardList?.find(
            (item) => item.category === cat
          );
          return scoreItem ? scoreItem.score : 0;
        }) || [],
  };

  const certiGradingList = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "인증 현황"
  )?.gradingList;

  const certiScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "인증 현황"
    )?.scoreBoardList;

  const CertiInfo = {
    totalScore: getTotalScore["인증 현황"] || 0,
    evalScore: currentApplier?.score["인증 현황"] || 0,
    DetailCat: ["ESG 인증 및 평가 양호 여부", "ISO 인증 보유 여부"],
    DetailCatValue: ["미보유", "보유"],
    DetailCatTotalScore:
      certiGradingList?.map((grading) => grading.perfectScore) || [],

    DetailCatEvalScore:
      certiGradingList
        ?.map((grading) => grading.category)
        .map((cat) => {
          const scoreItem = certiScoreBoardList?.find(
            (item) => item.category === cat
          );
          return scoreItem ? scoreItem.score : 0;
        }) || [],
  };

  const constGradingList = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "시공 실적"
  )?.gradingList;

  const constScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "시공 실적"
    )?.scoreBoardList;

  const ConstInfo = {
    totalScore: getTotalScore["시공 실적"] || 0,
    evalScore: currentApplier?.score["시공 실적"] || 0,
    DetailCat: ["시공능력평가액 순위", "최근 3년간 공시 실적"],
    DetailCatValue: ["5%", "양호"],
    DetailCatTotalScore:
      constGradingList?.map((grading) => grading.perfectScore) || [],

    DetailCatEvalScore:
      constGradingList
        ?.map((grading) => grading.category)
        .map((cat) => {
          const scoreItem = constScoreBoardList?.find(
            (item) => item.category === cat
          );
          return scoreItem ? scoreItem.score : 0;
        }) || [],
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
            companyName={companyName}
            workType={applyingWorkType}
            // companyBefore={CompanyInfo.companyBefore}
            // companyAfter={CompanyInfo.companyAfter}
            place={place}
            isNew={isNew}
            rating={rating}
            companyOutline={companyOutline}
            managerInfo={managerInfo}
            introInfo={introInfo}
            historyInfo={historyInfo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </TopNavigator>
        {/* flex 레이아웃을 사용하여 ScoreDetail과 CheckBox, ModalButtons를 수평으로 배열 */}
        <div className="flex">
          <ScoreDetail
            companyName={companyName}
            totalScore={currentApplier?.scoreSum || 0}
            isPass="통과"
            MngInfo={MngInfo}
            FinInfo={FinInfo}
            CertiInfo={CertiInfo}
            ConstInfo={ConstInfo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
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
