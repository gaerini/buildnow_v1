"use client";
import React, { useState, useEffect } from "react";
import TopNavigator from "../../../../../common/components/TopNavigator/TopNavigator";
import ScoreDetail from "../../../../../common/components/ScoreDetail/ScoreDetail";
import TopNavController from "../../../../../common/components/TopNavController/TopNavController";
import DocDetail from "../../../../../common/components/DocDetail/DocDetail";
import ExtractCategoryData from "./ExtractCategoryData";
import CheckModal from "./CheckModal";
import { useRouter } from "next/navigation";
import Layout from "../../../../../common/components/Layout";

import {
  RecruitmentInfo,
  ApplierInfo,
  TotalScore,
  ApplierData,
} from "./Interface";

export default function Home({
  businessId,
  responseApplier,
  responseTotalScore,
}: {
  businessId: string;
  responseApplier: any;
  responseTotalScore: any;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);

  const [recruitmentInfo, setRecruitmentInfo] = useState<RecruitmentInfo>();
  const [applierInfo, setApplierInfo] = useState<ApplierInfo>();

  const [getTotalScore, setGetTotalScore] = useState<TotalScore>({});
  const [getAllApplierData, setGetAllApplierData] = useState<ApplierData>();
  const [isNarrow, setIsNarrow] = useState(false); // 모드 상태 관리

  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(1);
        setRecruitmentInfo(responseApplier.recruitmentInfo);
        setApplierInfo(responseApplier.applierInfo);
        setGetTotalScore(responseTotalScore.total);
        setGetAllApplierData(responseTotalScore.applier);
        console.log(responseApplier);
        console.log("applier", recruitmentInfo);
        console.log("totalscore", getTotalScore);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

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
  const currentApplier = getAllApplierData?.score.find(
    (applier) => applier.businessId === businessId
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
  const workTypeList = applierInfo?.possibleWorkTypeList;
  const matchingWorkType = workTypeList?.find(
    (workTypeItem) => workTypeItem.workType === applyingWorkType
  );

  // 일치하는 workType의 capacityValueList[0].nationalRankingRatio 가져오기
  const rating =
    matchingWorkType && matchingWorkType.capacityValueList.length > 0
      ? matchingWorkType.capacityValueList[0].nationalRankingRatio
      : 0;

  const companyOutline = {
    companyOutline: [
      businessId || "정보 없음",
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

  const { info: MngInfo, doc: MngDoc } = ExtractCategoryData({
    categoryName: "경영 일반",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });
  const { info: FinInfo, doc: FinDoc } = ExtractCategoryData({
    categoryName: "재무 부문",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });
  const { info: CertiInfo, doc: CertiDoc } = ExtractCategoryData({
    categoryName: "인증 현황",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating,
  });
  const { info: ConstInfo, doc: ConstDoc } = ExtractCategoryData({
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

  useEffect(() => {
    // Function to handle screen resize
    const handleResize = () => {
      if (window.innerWidth <= 1618) {
        setIsNarrow(true);
      } else {
        setIsNarrow(false);
      }
    };

    // Add event listener for screen resize
    window.addEventListener("resize", handleResize); // Corrected event name

    // Call handleResize to set the initial state correctly
    handleResize();

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize); // Corrected event name
  }, []);

  return (
    <Layout
      isNarrow={isNarrow}
      setIsNarrow={setIsNarrow}
      toggleMode={toggleMode}
    >
      <div
        className={`flex flex-col transition-all ${
          isNarrow ? "ml-[119px]" : "ml-[266px]"
        } flex-1`}
      >
        <TopNavigator>
          {/* <Dropdown /> */}
          <TopNavController
            companyName={companyName}
            workType={applyingWorkType}
            workTypeList={workTypeList}
            place={place}
            isNew={isNew}
            rating={rating}
            companyOutline={companyOutline}
            managerInfo={managerInfo}
            introInfo={introInfo}
            historyInfo={historyInfo}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            isNarrow={isNarrow}
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
        <>
          <CheckModal
            isModalVisible={isModalVisible}
            isSecondModalVisible={isSecondModalVisible}
            hideModal={hideModal}
            showSecondModal={showSecondModal}
            businessId={businessId}
          />
        </>
      </div>
    </Layout>
  );
}
