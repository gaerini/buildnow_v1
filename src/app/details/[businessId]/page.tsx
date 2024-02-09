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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDc0OTMwMjMsImV4cCI6MTcwNzQ5NjYyM30.dY5AI-ch8tU0R10sZ8XncfWZBHv9VVNQgL9qWg_r5EU";
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

  interface SubmitDoc {
    id: number;
    documentName: string;
    documentURL: string;
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

  interface Finance {
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
    paperReqList: SubmitDoc[];
    historyList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
    possibleWorkTypeList: any[]; // 구체적인 타입이 필요하다면 여기서 정의
    finance: Finance;
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
    const exclusionWords = ["광역시", "특별시", "특례시", "특별자치시"];
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

  interface TranslateType {
    [key: string]: string | number | boolean;
  }

  const Translate: TranslateType = {
    "회사설립 경과 년수": "durationYear",
    "지방 업체(서울 경기 외) 여부": "isGreaterSeoul",
    "산재 발생 여부": "hadAccident",
    "신용 등급": "creditGrade",
    "현금흐름 등급": "cashFlowGrade",
    "WATCH 등급": "watch",
    매출액: "salesRevenue",
    영업이익률: "operatingMarginRatio",
    순이익률: "netProfitMarginRatio",
    유동비율: "currentRatio",
    당좌비율: "quickRatio",
    부채비율: "debtToEquityRatio",
    "차입금 의존도": "debtDependency",
    "ISO 인증서 보유 여부": "iso",
    "ESG 인증 및 평가": "esg",
  };

  const submitDocList = applierInfo?.paperReqList;

  const mngGrading = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "경영 일반"
  );

  const mngGradingList = mngGrading?.gradingList;
  const mngDocList = mngGrading?.requirementList;
  const mngDetailCat = mngGradingList?.map((grading) => grading.category) || [];
  const mngDetailCatTrns = mngDetailCat.map((cat) => Translate[cat]);

  const mngScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "경영 일반"
    )?.scoreBoardList;

  const finGrading = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "재무 부문"
  );

  const finGradingList = finGrading?.gradingList;
  const finDocList = finGrading?.requirementList;
  const finDetailCat = finGradingList?.map((grading) => grading.category) || [];
  const finDetailCatTrns = finDetailCat.map((cat) => Translate[cat]);
  const finScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "재무 부문"
    )?.scoreBoardList;

  const certiGrading = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "인증 현황"
  );
  const certiGradingList = certiGrading?.gradingList;
  const certiDocList = certiGrading?.requirementList;
  const certiDetailCat =
    certiGradingList?.map((grading) => grading.category) || [];
  const certiDetailCatTrns = certiDetailCat.map((cat) => Translate[cat]);
  const certiScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "인증 현황"
    )?.scoreBoardList;

  const constGrading = recruitmentInfo?.upperCategoryGradingList.find(
    (category) => category.upperCategory === "시공 실적"
  );
  const constGradingList = constGrading?.gradingList;
  const constDocList = constGrading?.requirementList;
  const constDetailCat =
    constGradingList?.map((grading) => grading.category) || [];
  const constDetailCatTrns = constDetailCat.map((cat) => Translate[cat]);
  const constScoreBoardList =
    applierInfo?.appliedList[0].upperCategoryScoreBoardList.find(
      (category) => category.upperCategory === "시공 실적"
    )?.scoreBoardList;
  console.log(constDetailCat);

  const MngInfo = {
    totalScore: getTotalScore["경영 일반"] || 0,
    evalScore: currentApplier?.score["경영 일반"] || 0,
    DetailCat: mngDetailCat,
    DetailCatValue: ["22년", "지방", "미보유"],
    DetailCatTotalScore:
      mngGradingList?.map((grading) => grading.perfectScore) || [],

    DetailCatEvalScore:
      mngGradingList
        ?.map((grading) => grading.category)
        .map((cat) => {
          const scoreItem = mngScoreBoardList?.find(
            (item) => item.category === cat
          );
          return scoreItem ? scoreItem.score : 0;
        }) || [],
  };

  const FinInfo = {
    totalScore: getTotalScore["재무 부문"] || 0,
    evalScore: currentApplier?.score["재무 부문"] || 0,

    DetailCat: finDetailCat,

    DetailCatValue: ["AA", "B", "정상", "30", "10"],
    DetailCatTotalScore:
      finGradingList?.map((grading) => grading.perfectScore) || [],

    DetailCatEvalScore:
      finGradingList
        ?.map((grading) => grading.category)
        .map((cat) => {
          const scoreItem = finScoreBoardList?.find(
            (item) => item.category === cat
          );
          return scoreItem ? scoreItem.score : 0;
        }) || [],
  };

  const CertiInfo = {
    totalScore: getTotalScore["인증 현황"] || 0,
    evalScore: currentApplier?.score["인증 현황"] || 0,
    DetailCat: certiDetailCat,
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

  const ConstInfo = {
    totalScore: getTotalScore["시공 실적"] || 0,
    evalScore: currentApplier?.score["시공 실적"] || 0,
    DetailCat: constDetailCat,
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
    docName: mngDocList?.map((doc) => doc.documentName) || [],
    docReq: mngDocList?.map((doc) => doc.isEssential) || [],
    docSubmit:
      mngDocList?.map((doc) => {
        return (
          submitDocList?.some(
            (submitDoc) => submitDoc.documentName === doc.documentName
          ) || false
        );
      }) || [],
    docRef:
      mngDocList?.map((doc) => {
        const foundDoc = submitDocList?.find(
          (submitDoc) => submitDoc.documentName === doc.documentName
        );
        return foundDoc ? foundDoc.documentURL : "";
      }) || [],
  };

  const FinDoc = {
    docName: finDocList?.map((doc) => doc.documentName) || [],
    docReq: finDocList?.map((doc) => doc.isEssential) || [],
    docSubmit:
      finDocList?.map((doc) => {
        return (
          submitDocList?.some(
            (submitDoc) => submitDoc.documentName === doc.documentName
          ) || false
        );
      }) || [],
    docRef:
      finDocList?.map((doc) => {
        const foundDoc = submitDocList?.find(
          (submitDoc) => submitDoc.documentName === doc.documentName
        );
        return foundDoc ? foundDoc.documentURL : "";
      }) || [],
  };

  const CertiDoc = {
    docName: certiDocList?.map((doc) => doc.documentName) || [],
    docReq: certiDocList?.map((doc) => doc.isEssential) || [],
    docSubmit:
      certiDocList?.map((doc) => {
        return (
          submitDocList?.some(
            (submitDoc) => submitDoc.documentName === doc.documentName
          ) || false
        );
      }) || [],
    docRef:
      certiDocList?.map((doc) => {
        const foundDoc = submitDocList?.find(
          (submitDoc) => submitDoc.documentName === doc.documentName
        );
        return foundDoc ? foundDoc.documentURL : "";
      }) || [],
  };

  const ConstDoc = {
    docName: constDocList?.map((doc) => doc.documentName) || [],
    docReq: constDocList?.map((doc) => doc.isEssential) || [],
    docSubmit:
      constDocList?.map((doc) => {
        return (
          submitDocList?.some(
            (submitDoc) => submitDoc.documentName === doc.documentName
          ) || false
        );
      }) || [],
    docRef:
      constDocList?.map((doc) => {
        const foundDoc = submitDocList?.find(
          (submitDoc) => submitDoc.documentName === doc.documentName
        );
        return foundDoc ? foundDoc.documentURL : "";
      }) || [],
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
            isPass={currentApplier?.isPass || "평가 이전"}
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
