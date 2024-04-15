"use client";
import React, { useState, useEffect } from "react";
import TopNavigator from "../../../../../common/components/TopNavigator/TopNavigator";
import ScoreDetail from "../../../../../common/components/ScoreDetail/ScoreDetail";
import TopNavController from "../../../../../common/components/TopNavController/TopNavController";
import DocDetail from "../../../../../common/components/DocDetail/DocDetail";
import ExtractCategoryData from "./ExtractCategoryData";
import CheckModal from "./CheckModal";
import Layout from "../../../../../common/components/Layout";
import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";
import useLoadingProgressBar from "../../../../../common/components/useLoading/useLoadingProgressBar";
import { useLoading } from "../../../../../common/components/LoadingContext";
import "../../../styles/nprogress.css";

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

  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  const applierInfo = applierInfoData;
  const applierScore = applierScoreData;

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
      router.push("/list");
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

  // const currentApplier = getAllApplierData?.score.find(
  //   (applier) => applier.businessId === businessId
  // );

  console.log("지원자", applierInfoData, "점수", applierScoreData);

  const companyName = applierInfo?.companyName || ("정보 없음" as string); // 바뀐 API 적용
  const businessId = applierInfo?.businessId || ("정보 없음" as string); // 바뀐 API 적용
  const managerName =
    applierInfo?.managerName || ("담당자 정보 없음" as string); // 바뀐 API 적용
  const managerPhoneNum =
    applierInfo?.managerPhoneNum || ("담당자 전화번호 정보 없음" as string); // 바뀐 API 적용
  const managerEmail =
    applierInfo?.managerEmail || ("담당자 이메일 정보 없음" as string); // 바뀐 API 적용

  const firstApplication = applierInfo?.applicationList?.[0]; // 바뀐 API 적용
  const isChecked = firstApplication ? firstApplication.checked : false; // 바뀐 API 적용
  const isNew = firstApplication ? firstApplication.new : false; // 바뀐 API 적용
  const address =
    firstApplication?.tempSaved.companyAddress || "소재지 정보 없음"; // 바뀐 API - 임시저장 버전으로 작성
  const place = extractPlace(address);
  const corporateApplicationNum =
    firstApplication?.tempSaved.corporateApplicationNum ||
    ("사업자등록번호 정보 없음" as string); // 바뀐 API - 임시저장 버전으로 작성
  const companyPhoneNum =
    firstApplication?.tempSaved.companyPhoneNum ||
    ("회사 전화번호 정보 없음" as string); // 바뀐 API - 임시저장 버전으로 작성
  const workTypeApplying =
    firstApplication?.tempSaved.workTypeApplying || ("정보 없음" as string); // 바뀐 API - 임시저장 버전으로 작성
  const type = firstApplication?.tempSaved?.type || ("정보 없음" as string); // 바뀐 API - 임시저장 버전으로 작성

  // 바뀐 API - 임시저장 버전으로 작성
  const companyOutline = {
    companyOutline: [
      businessId,
      corporateApplicationNum,
      companyPhoneNum,
      place,
      address,
    ],
  };

  // 바뀐 API - 임시저장 버전으로 작성
  const managerInfo = {
    managerInfo: [managerName, managerPhoneNum, managerEmail],
  };

  // 임의의 변수 생성
  const rating = 13;

  const { info } = ExtractCategoryData({ applierInfo, place, rating });

  // 바뀐 API - 임시저장 버전으로 작성
  const introInfo = {
    intro:
      applierInfo?.applicationList[0]?.tempSaved?.companyIntro ||
      ("회사 소개" as string),
  };

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

  // 지금은 임시저장 된걸로 구현 -> ADMIN에서 넣어주면 그때 보이게 해줘야함
  const documentList =
    applierInfo?.applicationList[0]?.tempSaved?.tempHandedOutList || [];

  const calculateTotalScore = (data: ApplierScore[]): number => {
    return data.reduce((acc, item) => acc + item.upperCategoryScore, 0);
  };
  const totalScore = calculateTotalScore(applierScore);
  const isPass = totalScore >= 70 ? "통과" : "탈락";

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
            workTypeList={[
              // 직접 작성함
              {
                id: 1,
                workType: workTypeApplying,
                capacityValueList: [
                  {
                    id: 1,
                    year1Value: 850000,
                    year2Value: 80000,
                    year3Value: 95000,
                    nationalRanking: 247,
                    regionalRanking: 35,
                    nationalRankingRatio: 3,
                    regionalRankingRatio: 5,
                  },
                ],
              },
            ]}
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

        <div className="flex">
          <ScoreDetail
            companyName={companyName}
            totalScore={totalScore}
            isPass={isPass}
            applierScore={applierScore}
            gradingValue={info}
            onReviewComplete={showModal}
            isChecked={isChecked}
          />
          <DocDetail documentList={documentList} />
        </div>
        <>
          <CheckModal
            isModalVisible={isModalVisible}
            isSecondModalVisible={isSecondModalVisible}
            hideModal={hideModal}
            showSecondModal={showSecondModal}
            businessId={businessId}
            isNarrow={isNarrow}
          />
        </>
      </div>
    </Layout>
  );
}
