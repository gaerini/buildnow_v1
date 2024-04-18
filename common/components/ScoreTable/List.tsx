"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Dropdown from "../Dropdown/Dropdown";
import TopNavigator from "../TopNavigator/TopNavigator";
import ListScoreTable from "./List/ListScoreTable";
import { useLoading } from "../LoadingContext";
import Layout from "../Layout";
import { ApplierListData } from "../Interface/CompanyData";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import "../../../src/app/styles/nprogress.css";
import usePageLoading from "../useLoading/useLoadingProgressBar";
// const [accessJWTToken, setAccessJWTToken] = useState("");
// JWT 토큰

export default function List(fetchedData: any) {
  const router = useRouter();
  const currentPage = usePathname();

  const [totalData, setTotalData] = useState({});
  const [scoreData, setScoreData] = useState<ApplierListData[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  const [isNarrow, setIsNarrow] = useState(false); // 모드 상태 관리
  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

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
          (item: ApplierListData) => item.checked === false
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

  const [page, setPage] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedPage =
      typeof window !== "undefined" ? sessionStorage.getItem("page") : null;

    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  const [isOption, setIsOption] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedIsOption =
      typeof window !== "undefined" ? sessionStorage.getItem("isOption") : null;
    return savedIsOption ? JSON.parse(savedIsOption) : null; // 초기 상태가 없으면 기본값 설정
  });

  // 옵션 변경 시 세션 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem(
      "selectedWorkType",
      JSON.stringify(selectedWorkType)
    );
    sessionStorage.setItem("page", page.toString());
    sessionStorage.setItem("isOption", JSON.stringify(isOption));
    setIsInitialRender(false);
  }, [selectedWorkType, page]);

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

  const [selectedListNumApply, setSelectedListNumApply] = useState<number>(
    numApply["전체"]
  );

  useEffect(() => {
    const saved = numApply[selectedWorkType];
    const newValue = saved === undefined ? numApply["전체"] : saved;
    setSelectedListNumApply(newValue);
  }, [numApply, selectedWorkType]);

  useEffect(() => {
    if (selectedListNumApply === 0) {
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
  }, [scoreData, selectedWorkType, isEmpty, selectedListNumApply]);

  useEffect(() => {
    if (activeButton === "new") {
      setSortedData(filterData.filter((item) => item.read === false));
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
    setSelectedListNumApply(numApply[workType]);
    setIsOpen(false);
    setIsInitialRender(false);
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
              selectedNumApply={selectedListNumApply}
              numApply={numApply}
              isInitialRender={isInitialRender}
              handleWorkTypeClick={handleWorkTypeClick}
              isOpen={$isOpen}
              setIsOpen={setIsOpen}
            />
          </TopNavigator>
          <div className="z-5">
            <ListScoreTable
              selectedWorkType={selectedWorkType}
              numApply={numApply}
              isEmpty={isEmpty}
              data={sortedData}
              standard={totalData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              page={page}
              currentPage={currentPage}
              setPage={setPage}
              isOption={isOption}
              setIsOption={setIsOption}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
