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

import {
  RecruitmentInfo,
  ApplierInfo,
  TotalScore,
  ApplierData,
} from "./Interface";

export default function Home({
  applicationId,
  responseApplier,
  responseTotalScore,
  applierInfoData,
}: {
  applicationId: string;
  responseApplier: any;
  responseTotalScore: any;
  applierInfoData: any;
}) {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
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
    console.log(responseApplier.recruitmentInfo);
    const fetchData = async () => {
      try {
        setIsLoading(false);
        setRecruitmentInfo(responseApplier.recruitmentInfo);
        setApplierInfo(applierInfoData);
        setGetTotalScore(responseTotalScore.total);
        setGetAllApplierData(responseTotalScore.applier);
        console.log("applier", recruitmentInfo);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  const { isPageLoading, startLoading, stopLoading } = useLoadingProgressBar();

  useEffect(() => {
    startLoading();

    // 데이터가 로드되면 로딩 상태 종료
    if (responseApplier && responseTotalScore) {
      stopLoading();
    }
  }, [responseApplier, responseTotalScore]);

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

  const currentApplier = getAllApplierData?.score.find(
    (applier) => applier.businessId === businessId
  );
  const companyName = applierInfo?.companyName || ("정보 없음" as string);
  const businessId = applierInfo?.businessId || ("정보 없음" as string);
  const managerName =
    applierInfo?.managerName || ("담당자 정보 없음" as string);
  const managerPhoneNum =
    applierInfo?.managerPhoneNum || ("담당자 전화번호 정보 없음" as string);
  const managerEmail =
    applierInfo?.managerEmail || ("담당자 이메일 정보 없음" as string);

  const firstApplication = applierInfo?.applicationList?.[0];
  const isChecked = firstApplication ? firstApplication.checked : false;
  const isNew = firstApplication ? firstApplication.new : false;
  const address =
    firstApplication?.tempSaved.companyAddress || "소재지 정보 없음"; // 임시저장 버전으로 작성
  const place = extractPlace(address);

  const corporateApplicationNum =
    firstApplication?.tempSaved.corporateApplicationNum ||
    ("사업자등록번호 정보 없음" as string); // 임시저장 버전
  const companyPhoneNum =
    firstApplication?.tempSaved.companyPhoneNum ||
    ("회사 전화번호 정보 없음" as string); // 임시저장 버전

  // appliedList에서 첫 번째 항목의 workTypeApplying 가져오기
  const workTypeApplying =
    firstApplication?.tempSaved.workTypeApplying || ("정보 없음" as string);

  const type = firstApplication?.tempSaved?.type || ("정보 없음" as string);

  // // possibleWorkTypeList에서 일치하는 workType 찾기
  // const workTypeList = applierInfo?.possibleWorkTypeList;
  // const matchingWorkType = workTypeList?.find(
  //   (workTypeItem) => workTypeItem.workType === workTypeApplying
  // );

  // 일치하는 workType의 capacityValueList[0].nationalRankingRatio 가져오기
  // const rating =
  //   matchingWorkType && matchingWorkType.capacityValueList.length > 0
  //     ? matchingWorkType.capacityValueList[0].nationalRankingRatio
  //     : 0;

  const companyOutline = {
    companyOutline: [
      businessId,
      corporateApplicationNum,
      companyPhoneNum, //임시저장 버전
      place,
      address,
    ],
  };

  const managerInfo = {
    managerInfo: [managerName, managerPhoneNum, managerEmail],
  };

  // 지금은 임시저장 된걸로 구현 -> ADMIN에서 넣어주면 그때 보이게 해줘야함
  const introInfo = {
    intro:
      applierInfo?.applicationList[0]?.tempSaved?.companyIntro ||
      ("회사 소개" as string),
  };

  const historyInfo = {
    Date: applierInfo?.historyList?.map((item) =>
      item.dateField.replace(/-/g, ". ")
    ) ?? [""],
    Event: applierInfo?.historyList?.map((item) => item.detail) ?? [""],
  };

  const submitDocList = applierInfo?.handedOutList;

  const { info: MngInfo, doc: MngDoc } = ExtractCategoryData({
    categoryName: "경영 일반",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating: "3",
  });
  const { info: FinInfo, doc: FinDoc } = ExtractCategoryData({
    categoryName: "재무 부문",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating: "3",
  });
  const { info: CertiInfo, doc: CertiDoc } = ExtractCategoryData({
    categoryName: "인증 현황",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating: "3",
  });
  const { info: ConstInfo, doc: ConstDoc } = ExtractCategoryData({
    categoryName: "시공 실적",
    recruitmentInfo,
    applierInfo,
    submitDocList,
    getTotalScore,
    currentApplier,
    place,
    rating: "3",
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

  // 임의의 변수 생성
  const rating = 13;

  // 지금은 임시저장 된걸로 구현 -> ADMIN에서 넣어주면 그때 보이게 해줘야함
  const documentList =
    applierInfo?.applicationList[0]?.tempSaved?.tempHandedOutList || [];

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
            historyInfo={historyInfo}
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
