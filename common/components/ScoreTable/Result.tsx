"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Dropdown from "../Dropdown/Dropdown";
import TopNavigator from "../TopNavigator/TopNavigator";
import ResultScoreTable from "./Result/ResultScoreTable";
import { useLoading } from "../LoadingContext";
import Layout from "../Layout";
import { Total, CompanyScoreSummary } from "../Interface/CompanyData";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import "../../../src/app/styles/nprogress.css";
import usePageLoading from "../useLoading/useLoadingProgressBar";
import { ApplierListData, upperCategoryScore } from "../Interface/CompanyData";

// JWT 토큰

export default function Result(fetchedData: any) {
  const router = useRouter();
  const currentPage = usePathname();
  const [totalData, setTotalData] = useState({});
  const [scoreData, setScoreData] = useState<ApplierListData[]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const [isNarrow, setIsNarrow] = useState(false); // 모드 상태 관리
  const [PassCompanies, setPassCompanies] = useState<number>(0);
  const [FailCompanies, setFailCompanies] = useState<number>(0);
  const [LackCompanies, setLackCompanies] = useState<number>(0);
  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  const { isPageLoading, startLoading, stopLoading } = usePageLoading();
  console.log("REUSLT", fetchedData);
  // 로딩 상태 변경에 따라 NProgress 시작 또는 종료
  useEffect(() => {
    if (isPageLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isPageLoading]);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        router.push("/login");
        return;
      }
    };
  }, []);

  useEffect(() => {
    NProgress.start();
    console.log("데이터", fetchedData);
    const fetchData = async () => {
      try {
        setIsLoading(false);
        // Assuming 'fetchedData' is the object containing the array as provided.
        const rawData = fetchedData.fetchedData.filter(
          (item: ApplierListData) => {
            // item이 체크되었거나, tempPrerequisiteList 중 하나라도 isPrerequisite가 false인 경우 필터링
            return (
              item.checked === true ||
              item.tempPrerequisiteList.some(
                (prerequisite) => prerequisite.isPrerequisite === false
              )
            );
          }
        );

        setTotalData(fetchedData.fetchedData.total);
        setScoreData(rawData);
        NProgress.done();
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(true);
      }
    };
    fetchData();
  }, []);

  interface NumApply {
    [key: string]: number;
  }

  const [activeButton, setActiveButton] = useState("total");
  const [filterData, setFilteredData] = useState<ApplierListData[]>([]);
  const [sortedData, setSortedData] = useState<ApplierListData[]>([]);

  const [selectedWorkType, setSelectedWorkType] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedWorkType =
      typeof window !== "undefined"
        ? sessionStorage.getItem("selectedWorkType")
        : null;
    return savedWorkType ? JSON.parse(savedWorkType) : "전체"; // 초기 상태가 없으면 기본값 설정
  });

  useEffect(() => {
    // Perform localStorage action
    const savedWorkType = sessionStorage.getItem("selectedWorkType");
  }, []);

  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  const [numApply, setNumApply] = useState<NumApply>({});

  const [resultPage, setResultPage] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedPage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resultPage")
        : null;
    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  const [isResultOption, setIsResultOption] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedIsOption =
      typeof window !== "undefined"
        ? sessionStorage.getItem("isResultOption")
        : null;
    return savedIsOption ? JSON.parse(savedIsOption) : null; // 초기 상태가 없으면 기본값 설정
  });

  console.log("LackCount", LackCompanies);

  // 옵션 변경 시 세션 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem(
      "selectedWorkType",
      JSON.stringify(selectedWorkType)
    );
    sessionStorage.setItem("resultPage", resultPage.toString());
    sessionStorage.setItem("isOption", JSON.stringify(isResultOption));
    setIsInitialRender(false);
  }, [selectedWorkType, resultPage]);

  useEffect(() => {
    const numApply: NumApply = {
      토공사: 0,
      포장공사: 0,
      PHC파일공사: 0,
      마이크로파일공사: 0,
      수장공사: 0,
      인테리어공사: 0,
      가설휀스공사: 0,
      일반휀스공사: 0,
      AL창호: 0,
      PL창호: 0,
      내부판넬공사: 0,
      외부판넬공사: 0,
      도장공사: 0,
      "미장/조적공사": 0,
      타일공사: 0,
      방수공사: 0,
      석공사: 0,
      조경식재공사: 0,
      조경시설물설치공사: 0,
      철근콘크리트공사: 0,
      철거공사: 0,
      비계공사: 0,
      철골공사: 0,
      데크플레이트공사: 0,
      승강기공사: 0,
      배관공사: 0,
      덕트공사: 0,
      가스공사: 0,
      전체: 0,
    };

    // sortedData 배열을 순회하면서 각 작업 유형의 개수를 계산
    scoreData.forEach((item) => {
      if (item.workType in numApply) {
        numApply[item.workType] += 1;
      }
      numApply["전체"] += 1; // '전체' 카운트도 업데이트
    });

    setNumApply(numApply); // 계산된 개수로 numApply 상태 업데이트
  }, [scoreData]); // sortedData가 변경될 때마다 이 로직 실행

  const [selectedResultNumApply, setSelectedResultNumApply] = useState<number>(
    numApply["전체"]
  );

  useEffect(() => {
    const saved = numApply[selectedWorkType];
    const newValue = saved === undefined ? numApply["전체"] : saved;
    setSelectedResultNumApply(newValue);
  }, [numApply, selectedWorkType]);

  useEffect(() => {
    if (selectedResultNumApply === 0) {
      setIsEmpty(true);
    } else {
      setIsEmpty(false);
      if (selectedWorkType === "전체") {
        setFilteredData(scoreData);
      } else {
        setFilteredData(
          scoreData.filter((item) => item.workType === selectedWorkType)
        );
      }
    }
  }, [scoreData, selectedWorkType, isEmpty, selectedResultNumApply]);

  function evaluateCompanyStatus(company: ApplierListData): string {
    // Check for any unmet prerequisites
    for (const prerequisite of company.tempPrerequisiteList) {
      if (!prerequisite.isPrerequisite) {
        return "미달";
      }
    }

    // Calculate total score if all prerequisites are met
    const totalScore = company.scoreList.reduce(
      (total, current) => total + current.upperCategoryScore,
      0
    );

    // Determine pass or fail based on total score
    if (totalScore < 70) {
      return "탈락";
    } else {
      return "통과";
    }
  }

  useEffect(() => {
    const evaluateCounts = () => {
      const PassCount = filterData.filter(
        (company) => evaluateCompanyStatus(company) === "통과"
      ).length;
      const FailCount = filterData.filter(
        (company) => evaluateCompanyStatus(company) === "탈락"
      ).length;
      const LackCount = filterData.filter(
        (company) => evaluateCompanyStatus(company) === "미달"
      ).length;

      setPassCompanies(PassCount);
      setFailCompanies(FailCount);
      setLackCompanies(LackCount);
    };

    if (filterData) {
      evaluateCounts();
    }
  }, [
    scoreData,
    selectedWorkType,
    isEmpty,
    selectedResultNumApply,
    filterData,
  ]);

  useEffect(() => {
    switch (activeButton) {
      case "pass":
        setSortedData(
          filterData.filter(
            (company) => evaluateCompanyStatus(company) === "통과"
          )
        );
        break;
      case "fail":
        setSortedData(
          filterData.filter(
            (company) => evaluateCompanyStatus(company) === "탈락"
          )
        );
        break;
      case "lack":
        setSortedData(
          filterData.filter(
            (company) => evaluateCompanyStatus(company) === "미달"
          )
        );
        break;
      default:
        setSortedData(filterData);
    }
  }, [activeButton, filterData]);

  useEffect(() => {
    // Function to handle screen resize
    const handleResize = () => {
      if (window.innerWidth <= 1440) {
        setIsNarrow(true);
      } else {
        setIsNarrow(false);
      }
    };

    // Add event listener for screen resize
    window.addEventListener("resize", handleResize);
    console.log("화면크기 작아짐");

    // Call handleResize to set the initial state correctly
    handleResize();

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //Dropdown 관련
  const [$isOpen, setIsOpen] = useState<boolean>(false);

  const handleWorkTypeClick = (workType: string) => {
    setSelectedWorkType(workType);
    setSelectedResultNumApply(numApply[workType]);
    setIsOpen(false);
  };

  return (
    <Layout
      isNarrow={isNarrow}
      setIsNarrow={setIsNarrow}
      toggleMode={toggleMode}
    >
      <div className="flex h-screen">
        <div
          className={`flex flex-col transition-all ${
            isNarrow ? "ml-[119px]" : "ml-[266px]"
          } flex-1`}
        >
          <TopNavigator>
            <Dropdown
              selectedWorkType={selectedWorkType}
              selectedNumApply={selectedResultNumApply}
              numApply={numApply}
              isInitialRender={isInitialRender}
              handleWorkTypeClick={handleWorkTypeClick}
              isOpen={$isOpen}
              setIsOpen={setIsOpen}
            />
          </TopNavigator>
          <div className="z-5">
            <ResultScoreTable
              PassCompanies={PassCompanies}
              FailCompanies={FailCompanies}
              LackCompanies={LackCompanies}
              setPassCompanies={setPassCompanies}
              setFailCompanies={setFailCompanies}
              setLackCompanies={setLackCompanies}
              selectedWorkType={selectedWorkType}
              numApply={numApply}
              isEmpty={isEmpty}
              data={sortedData}
              standard={totalData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              page={resultPage}
              currentPage={currentPage}
              setPage={setResultPage}
              isOption={isResultOption}
              setIsOption={setIsResultOption}
              isNarrow={isNarrow}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
