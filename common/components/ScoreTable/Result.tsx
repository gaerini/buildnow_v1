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
import usePageLoading from "../useLoading/useLoading";

// JWT 토큰

export default function Result(data: any) {
  const router = useRouter();
  const currentPage = usePathname();
  const [totalData, setTotalData] = useState({});
  const [scoreData, setScoreData] = useState<CompanyScoreSummary[]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const [isNarrow, setIsNarrow] = useState(false); // 모드 상태 관리
  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  const { isPageLoading, startLoading, stopLoading } = usePageLoading();

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
    NProgress.start()
    setIsLoading(false);
    const rawData = data.data.applier.score.filter(
      (item: CompanyScoreSummary) => item.isChecked === true
    );
    setTotalData(data.data.total);
    setScoreData(rawData);
    setIsLoading(true);
    NProgress.done()
  }, []);

  interface NumApply {
    [key: string]: number;
  }

  const [activeButton, setActiveButton] = useState("total");
  const [filterData, setFilteredData] = useState<CompanyScoreSummary[]>([]);
  const [sortedData, setSortedData] = useState<CompanyScoreSummary[]>([]);

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
      "보링 그라우팅 파일공사": 0,
      실내건축공사: 0,
      "금속구조물 창호 온실공사": 0,
      "지붕판금 건축물 조립공사": 0,
      도장공사: 0,
      "습식 방수공사": 0,
      석공사: 0,
      조경식재공사: 0,
      조경시설물설치공사: 0,
      "철근 콘크리트 공사": 0,
      "구조물 해체 비계공사": 0,
      "상하수도 설비공사": 0,
      "철도 궤도공사": 0,
      "철강 구조물 공사": 0,
      수중공사: 0,
      준설공사: 0,
      승강기설치공사: 0,
      삭도설치공사: 0,
      기계설비공사: 0,
      "가스시설공사(제1종)": 0,
      "가스시설공사(제2종)": 0,
      "가스시설공사(제3종)": 0,
      "난방공사(제1종)": 0,
      "난방공사(제2종)": 0,
      "난방공사(제3종)": 0,
      전체: 0,
    };

    // sortedData 배열을 순회하면서 각 작업 유형의 개수를 계산
    scoreData.forEach((item) => {
      if (item.applyingWorkType in numApply) {
        numApply[item.applyingWorkType] += 1;
      }
      numApply["전체"] += 1; // '전체' 카운트도 업데이트
    });

    setNumApply(numApply); // 계산된 개수로 numApply 상태 업데이트
  }, [scoreData]); // sortedData가 변경될 때마다 이 로직 실행

  const [selectedResultNumApply, setSelectedResultNumApply] =
    useState<number>(0);

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
          scoreData.filter((item) => item.applyingWorkType === selectedWorkType)
        );
      }
    }
  }, [scoreData, selectedWorkType, isEmpty, selectedResultNumApply]);

  const [PassCompanies, setPassCompanies] = useState<number>(0);
  const [FailCompanies, setFailCompanies] = useState<number>(0);
  const [LackCompanies, setLackCompanies] = useState<number>(0);

  useEffect(() => {
    const PassCount = filterData.filter(
      (company) => company.isPass === "통과"
    ).length;
    setPassCompanies(PassCount);

    const FailCount = filterData.filter(
      (company) => company.isPass === "탈락"
    ).length;
    setFailCompanies(FailCount);

    const LackCount = filterData.filter(
      (company) => company.isPass === "미달"
    ).length;
    setLackCompanies(LackCount);
  }, [filterData]);

  useEffect(() => {
    if (activeButton === "pass") {
      setSortedData(filterData.filter((item) => item.isPass === "통과"));
    } else if (activeButton === "fail") {
      setSortedData(filterData.filter((item) => item.isPass === "불합격"));
    } else if (activeButton === "lack") {
      setSortedData(filterData.filter((item) => item.isPass === "미달"));
    } else {
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
