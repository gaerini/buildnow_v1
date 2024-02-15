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
import TopNavController from "../../../../common/components/TopNavController/TopNavController";
import DocDetail from "../../../../common/components/DocDetail/DocDetail";
import Layout from "../../../../common/components/Layout";
import extractCategoryData from "./extractCategoryData";
import CheckModal from "./CheckModal";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home({ params }: { params: { businessId: string } }) {
  // JWT 토큰
  const cookieJWTToken = Cookies.get("token");
  const axiosInstance = axios.create({
    baseURL:
      "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
    headers: {
      Authorization: `Bearer ${cookieJWTToken}`,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

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
    documentUrl: string;
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

  const [recruitmentInfo, setRecruitmentInfo] = useState<RecruitmentInfo>();
  const [applierInfo, setApplierInfo] = useState<ApplierInfo>();

  const [getTotalScore, setGetTotalScore] = useState<TotalScore>({});
  const [getAllApplierData, setGetAllApplierData] = useState<ApplierData>();

  useEffect(() => {
    if (!cookieJWTToken) {
      // If no token, redirect to login page
      window.location.href = "/login";
      return; // Prevent further execution
    }

    // Function to fetch data
    const fetchData = async () => {
      try {
        const responseApplier = await axiosInstance.get(
          `/application/getApplierInfo/${params.businessId}`
        );
        const responseTotalScore = await axiosInstance.get(
          "/application/getMyApplicants"
        );
        setRecruitmentInfo(responseApplier.data.recruitmentInfo);
        setApplierInfo(responseApplier.data.applierInfo);
        setGetTotalScore(responseTotalScore.data.total);
        setGetAllApplierData(responseTotalScore.data.applier);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error appropriately
      } finally {
        setIsLoading(true);
      }
    };

    fetchData();
  }, [cookieJWTToken, axiosInstance, params.businessId]);

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
  const companyName = applierInfo?.companyName || "정보 없음";

  const isChecked = applierInfo?.appliedList[0].isChecked || false;

  const isNew = applierInfo?.appliedList[0].isNew || false;
  const address = applierInfo?.companyAddress || "정보 없음";
  const place = extractPlace(address);

  // appliedList에서 첫 번째 항목의 applyingWorkType 가져오기
  const applyingWorkType =
    applierInfo?.appliedList[0].applyingWorkType || "정보 없음";

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
      params.businessId || "정보 없음",
      applierInfo?.corporateApplicationNum || "정보 없음",
      applierInfo?.companyPhoneNum || "정보 없음",
      place || "정보 없음",
      address || "정보 없음",
    ],
  };

  const managerInfo = {
    managerInfo: [
      applierInfo?.managerName || "정보 없음",
      applierInfo?.managerPhoneNum || "정보 없음",
      applierInfo?.managerEmail || "정보 없음",
    ],
  };

  const introInfo = {
    intro: applierInfo?.companyIntro || "정보 없음",
  };

  const historyInfo = {
    Date: applierInfo?.historyList.map((item) =>
      item.dateField.replace(/-/g, ". ")
    ) || [""], // 날짜 포맷 변경: '-'를 '. '로
    Event: applierInfo?.historyList.map((item) => item.detail) || [""],
  };

  const submitDocList = applierInfo?.paperReqList;

  const { info: MngInfo, doc: MngDoc } = extractCategoryData({
    categoryName: "경영 일반",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });
  const { info: FinInfo, doc: FinDoc } = extractCategoryData({
    categoryName: "재무 부문",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });
  const { info: CertiInfo, doc: CertiDoc } = extractCategoryData({
    categoryName: "인증 현황",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });
  const { info: ConstInfo, doc: ConstDoc } = extractCategoryData({
    categoryName: "시공 실적",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });

  const showModal = () => {
    setIsModalVisible(true);
  };

  // 모달 숨기기
  const hideModal = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(false);
  };

  // 다른 모달 표시
  const showSecondModal = () => {
    setIsModalVisible(false);
    setIsSecondModalVisible(true);
  };

  return (
    <div className="flex h-screen justify-start">
      <div className="fixed top-0 left-0 h-full z-50">
        <SideNavigator CompanyName="A 건설" />
      </div>
      <div className="flex flex-col flex-grow h-screen ml-[266px] z-40">
        <TopNavigator>
          {/* <Dropdown /> */}
          <TopNavController
            companyName={companyName}
            workType={applyingWorkType}
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
            onReviewComplete={showModal}
            isChecked={isChecked}
          />
          <DocDetail
            MngDoc={MngDoc}
            FinDoc={FinDoc}
            CertiDoc={CertiDoc}
            ConstDoc={ConstDoc}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
        <CheckModal
          isModalVisible={isModalVisible}
          isSecondModalVisible={isSecondModalVisible}
          hideModal={hideModal}
          showSecondModal={showSecondModal}
          businessId={params.businessId}
        />
      </div>
      {/* CheckBox와 ModalButtons 부분 */}
      {/* <div className="flex flex-col ml-4"> */}
      {/* {" "} */}
      {/* 여기서 ml-4는 왼쪽 요소와의 간격을 조정합니다 */}
      {/* <CheckBox items={checkboxes} onSelect={handleSelect} /> */}

      {/* </div> */}
    </div>
  );
}
