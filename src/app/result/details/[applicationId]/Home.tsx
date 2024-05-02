"use client";
import React, { useState, useEffect } from "react";
import TopNavigator from "../../../../../common/components/TopNavigator/TopNavigator";
import ScoreDetail from "../../../../../common/components/ScoreDetail/ScoreDetail";
import TopNavController from "../../../../../common/components/TopNavController/TopNavController";
import DocDetail from "../../../../../common/components/DocDetail/DocDetail";
import ExtractCategoryData from "../../../../../common/components/ExtractCategoryData/ExtractCategoryData";
import CheckModal from "./CheckModal";
import Layout from "../../../../../common/components/Layout";
import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";
import "../../../styles/nprogress.css";
import useLoadingProgressBar from "../../../../../common/components/useLoading/useLoadingProgressBar";
import { useLoading } from "../../../../../common/components/LoadingContext";
import PerformanceDetail from "../../../../../common/components/PerformanceDetail/PerformanceDetail";
import Icon from "../../../../../common/components/Icon/Icon";

import { ApplierScore } from "./Interface";

export default function Home({
  applicationId,
  applierInfoData,
  applierScoreData,
}: {
  applicationId: string;
  applierInfoData: any;
  applierScoreData: any;
}) {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSecondModalVisible, setIsSecondModalVisible] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false); // 모드 상태 관리

  NProgress.done();
  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  const applierInfo = applierInfoData;
  const applierScore = applierScoreData;

  const [activeTab, setActiveTab] = useState("score"); // State to track active tab

  // Function to change the active tab
  const handleTabChange = (tabName: string) => {
    setIsLoading(true); // 탭 변경 시 로딩 상태 초기화
    setActiveTab(tabName);
  };

  const { isPageLoading, startLoading, stopLoading } = useLoadingProgressBar();

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

  useEffect(() => {
    const handlePopState = () => {
      NProgress.start();
      router.push("/details");
    };

    // 브라우저 히스토리 이벤트 리스너 추가
    window.addEventListener("popstate", handlePopState);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
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

  const companyName = applierInfo?.companyName || ("정보 없음" as string); // 바뀐 API 적용
  const businessId = applierInfo?.businessId || ("정보 없음" as string); // 바뀐 API 적용
  const managerName =
    applierInfo?.managerName || ("담당자 정보 없음" as string); // 바뀐 API 적용
  const managerPhoneNum =
    applierInfo?.managerPhoneNum || ("담당자 전화번호 정보 없음" as string); // 바뀐 API 적용
  const managerEmail =
    applierInfo?.managerEmail || ("담당자 이메일 정보 없음" as string); // 바뀐 API 적용
  const address = applierInfo?.companyAddress || "소재지 정보 없음"; // 바뀐 API
  const place = extractPlace(address);
  const corporateApplicationNum =
    applierInfo?.corporateApplicationNum || ("개인사업자" as string); // 바뀐 API
  const companyPhoneNum =
    applierInfo?.companyPhoneNum || ("회사 전화번호 정보 없음" as string); // 바뀐 API

  const type = applierInfo?.type || ("정보 없음" as string); // 바뀐 API

  const licenseList = applierInfo?.licenseList;

  const firstApplication = applierInfo?.applicationList?.[0]; // 바뀐 API 적용
  const isChecked = firstApplication?.checked || false; // 바뀐 API 적용
  const isNew = firstApplication?.new || false; // 바뀐 API 적용
  const workTypeApplying =
    firstApplication?.workTypeApplying || ("정보 없음" as string); // 바뀐 API

  // 바뀐 API
  const companyOutline = {
    companyOutline: [
      businessId,
      corporateApplicationNum,
      companyPhoneNum,
      place,
      address,
    ],
  };

  const managerInfo = {
    managerInfo: [managerName, managerPhoneNum, managerEmail],
  };

  const introInfo = {
    intro: applierInfo?.companyIntro || ("정보 없음" as string),
  };

  const documentList = applierInfo?.handedOutList || [];

  // 임의의 변수 생성
  const rating = applierInfo?.licenseList[0]?.percentage;

  const { info } = ExtractCategoryData({ applierInfo, place, rating });
  console.log("어플라이어 인포", applierInfo);

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

  const calculateTotalScore = (data: ApplierScore[]): number => {
    return data?.reduce((acc, item) => acc + item.upperCategoryScore, 0);
  };
  const totalScore = calculateTotalScore(applierScore);
  const isPass = totalScore >= 70 ? "통과" : "탈락";

  // 조건에 따른 리턴 로직
  if (!applierInfoData || !applierScoreData) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="w-full h-[216px] px-4 py-8 flex-col justify-center items-center gap-2 inline-flex">
          <div className="h-2/4 flex-col justify-end items-center inline-flex">
            <Icon name="NoItem" width={32} height={32} />
          </div>
          <div className="h-2/4 justify-center items-center">
            <p className="text-subTitle-20 font-bold textColor-low-emphasis">
              다시 로그인 해주세요
            </p>
          </div>
        </div>
      </div>
    );
  }

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
            workType={workTypeApplying}
            type={type}
            licenseList={licenseList}
            place={place}
            isNew={isNew}
            rating={rating}
            companyOutline={companyOutline}
            managerInfo={managerInfo}
            introInfo={introInfo}
            // historyInfo={historyInfo}
            isNarrow={isNarrow}
          />
        </TopNavigator>
        {/* flex 레이아웃을 사용하여 ScoreDetail과 CheckBox, ModalButtons를 수평으로 배열 */}

        {/* <div className="flex items-center bgColor-white p-xl gap-x-4 h-[56px] border-t border-b w-full borderColor">
          <div
            className={`flex text-paragraph-16 gap-x-[10px] h-[54px] ${
              activeTab === "review"
                ? "font-bold textColor-high-emphasis border-b-2 border-primary-blue-original"
                : "font-normal textColor-mid-emphasis"
            } cursor-pointer p-4`}
            onClick={() => handleTabChange("review")}
          >
            <Icon name="Chart" width={20} height={20} />
            한판정리
          </div>
          <div
            className={`flex text-paragraph-16 gap-x-[10px] h-[54px] ${
              activeTab === "score"
                ? "font-bold textColor-high-emphasis border-b-2 border-primary-blue-original"
                : "font-normal textColor-mid-emphasis"
            } cursor-pointer p-4`}
            onClick={() => handleTabChange("score")}
          >
            <Icon name="Storage" width={20} height={20} />
            배점결과 다시보기
          </div>
        </div> */}

        <div className="flex w-full">
          {activeTab === "review" ? (
            <PerformanceDetail />
          ) : activeTab === "score" ? (
            <>
              <ScoreDetail
                companyName={companyName}
                totalScore={totalScore}
                isPass={isPass}
                applierScore={applierScore}
                gradingValue={info}
                onReviewComplete={showModal}
                isChecked={isChecked}
              />
              <DocDetail documentList={documentList} isTab={false} />
            </>
          ) : null}
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
