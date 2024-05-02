"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Dropdown from "../Dropdown/Dropdown";
import TopNavigator from "../TopNavigator/TopNavigator";
import ResultScoreTable from "./Result/ResultScoreTable";
import { useLoading } from "../LoadingContext";
import Layout from "../Layout";
import { ApplierListData, ScoreCategory } from "../Interface/CompanyData";
import Cookies from "js-cookie";
import NProgress from "nprogress";
import "../../../src/app/styles/nprogress.css";
import Icon from "../Icon/Icon";

// JWT 토큰

interface NumApply {
  [key: string]: number;
}

interface LicenseToWorkTypes {
  [key: string]: string[];
}

const licenseToWorkTypes: LicenseToWorkTypes = {
  지반조성포장공사업: ["토공사", "포장공사", "보링그라우팅파일공사"],
  실내건축공사업: ["수장공사", "인테리어공사"],
  금속창호지붕건축물조립공사업: [
    "휀스공사",
    "유리공사",
    "판넬공사",
    "방음벽공사",
    "AL창호공사",
    "PL창호공사",
    "바닥재공사",
  ],
  도장습식방수석공사업: [
    "도장공사",
    "습식공사",
    "방수공사",
    "석공사",
    "단열공사",
  ],
  조경식재시설물공사업: ["조경공사"],
  철근콘크리트공사업: ["철근콘크리트공사업"],
  구조물해체비계공사업: ["철골공사", "데크플레이트공사", "철거공사"],
  승강기삭도공사업: ["승강기설치공사"],
  기계가스설비공사업: ["기계설비공사", "가스시설공사"],
  전문소방시설공사업: ["소방공사"],
  일반소방시설공사업: ["소방공사"],
  전기공사업: ["전기공사", "자동제어공사"],
  정보통신공사업: ["통신공사"],
  전체: [
    "토공사",
    "포장공사",
    "보링그라우팅파일공사",
    "수장공사",
    "인테리어공사",
    "휀스공사",
    "유리공사",
    "판넬공사",
    "방음벽공사",
    "AL창호공사",
    "PL창호공사",
    "바닥재공사",
    "도장공사",
    "습식공사",
    "방수공사",
    "석공사",
    "단열공사",
    "조경공사",
    "철근콘크리트공사업",
    "철골공사",
    "데크플레이트공사",
    "철거공사",
    "승강기설치",
    "기계식주차설비",
    "기계설비공사",
    "가스시설공사",
    "소방공사",
    "전기공사",
    "자동제어공사",
    "통신공사",
  ],
};

interface ResultProps {
  fetchedData: ApplierListData[];
  scoreCategory: ScoreCategory[];
}

export default function Result({ fetchedData, scoreCategory }: ResultProps) {
  const router = useRouter();
  const currentPage = usePathname();
  const accessTokenRecruiter = Cookies.get("accessTokenRecruiter");

  const [totalData, setTotalData] = useState({});
  const [scoreData, setScoreData] = useState<ApplierListData[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  const [isNarrow, setIsNarrow] = useState(false); // 모드 상태 관리

  const [activeButton, setActiveButton] = useState("total");

  const [filterData, setFilteredData] = useState<ApplierListData[]>([]);
  const [sortedData, setSortedData] = useState<ApplierListData[]>([]);

  const [licenseNumApply, setLicenseNumApply] = useState<NumApply>({});
  const [workTypeNumApply, setWorkTypeNumApply] = useState<NumApply>({});

  const [licenseIsOpen, setLicenseIsOpen] = useState(false);
  const [workTypeIsOpen, setWorkTypeIsOpen] = useState(false);

  const [selectedLicense, setSelectedLicense] = useState(() => {
    const storedLicense = sessionStorage.getItem("selectedLicense");
    return storedLicense ? JSON.parse(storedLicense) : null; // If nothing is stored, set to null
  });

  const [selectedWorkType, setSelectedWorkType] = useState(() => {
    const storedWorkType = sessionStorage.getItem("selectedWorkType");
    return storedWorkType ? JSON.parse(storedWorkType) : "전체"; // If nothing is stored, set to "전체"
  });

  const [workTypeIsDisabled, setWorkTypeIsDisabled] = useState(
    !selectedLicense
  );

  const [scoreCategoryList, setScoreCategoryList] = useState<string[]>([]);

  useEffect(() => {
    // Extract unique upperCategoryENUM values using a Set for uniqueness
    const uniqueCategories = new Set(
      scoreCategory?.map((item) => item.upperCategoryENUM)
    );

    // Convert Set back to an array and update state
    setScoreCategoryList(Array.from(uniqueCategories));
  }, [scoreCategory]); // Ensure this runs whenever scoreCategory prop changes

  const [PassCompanies, setPassCompanies] = useState<number>(0);
  const [FailCompanies, setFailCompanies] = useState<number>(0);
  const [LackCompanies, setLackCompanies] = useState<number>(0);

  // 로고 눌렀을 떄 Narrow 상태 변환
  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  console.log("REUSLT", fetchedData);

  // 선택된 License가 전체이거나 처음 접속해서 null 이면 공종 Dropdown은 disabled
  useEffect(() => {
    if (selectedLicense === "전체" || !selectedLicense) {
      setSelectedWorkType(null); // Set work type to null if "전체" is selected
      setWorkTypeIsDisabled(true); // Disable the workType dropdown
    } else {
      setWorkTypeIsDisabled(false); // Enable the dropdown if any specific license is selected
      setSelectedWorkType("전체"); // Optionally reset to "전체" upon license change
    }
  }, [selectedLicense]);

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        router.push("/login");
        return;
      }
    };
  }, []);

  // 데이터 Fetch 하는 부분
  useEffect(() => {
    NProgress.start();
    const fetchData = async () => {
      try {
        setIsLoading(false);
        const rawData = fetchedData?.filter((item: ApplierListData) => {
          return (
            item.checked === true ||
            item.tempPrerequisiteList.some(
              (prerequisite) => prerequisite.isPrerequisite === false
            )
          );
        });

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

  // sessionStorage에 license & workType 저장
  useEffect(() => {
    sessionStorage.setItem("selectedLicense", JSON.stringify(selectedLicense));
    sessionStorage.setItem(
      "selectedWorkType",
      JSON.stringify(selectedWorkType)
    );
  }, [selectedLicense, selectedWorkType]);

  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  // result page 상태 로드
  const [resultPage, setResultPage] = useState(() => {
    const savedPage =
      typeof window !== "undefined"
        ? sessionStorage.getItem("resultPage")
        : null;
    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  // isResultOption 상태 로드
  const [isResultOption, setIsResultOption] = useState(() => {
    const savedIsOption =
      typeof window !== "undefined"
        ? sessionStorage.getItem("isResultOption")
        : null;
    return savedIsOption ? JSON.parse(savedIsOption) : null; // 초기 상태가 없으면 기본값 설정
  });

  console.log("LackCount", LackCompanies);

  // sotring 옵션 변경 시 세션 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem("resultPage", resultPage.toString());
    sessionStorage.setItem("isOption", JSON.stringify(isResultOption));
    setIsInitialRender(false);
  }, [selectedWorkType, resultPage]);

  // 면허 numApply
  useEffect(() => {
    const newLicenseCounts: NumApply = {};

    // Initialize all licenses with zero counts
    Object.keys(licenseToWorkTypes)?.forEach((license) => {
      newLicenseCounts[license] = 0;
    });

    // Count each occurrence of licenses in the scoreData
    scoreData?.forEach((item) => {
      if (newLicenseCounts.hasOwnProperty(item.licenseName)) {
        newLicenseCounts[item.licenseName]++;
      }
    });

    // Calculate the total count for "전체" as the sum of all individual license counts
    newLicenseCounts["전체"] = Object.values(newLicenseCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    setLicenseNumApply(newLicenseCounts);
  }, [scoreData]);
  console.log("licenseNumApply", licenseNumApply);

  // 공종 numApply
  useEffect(() => {
    const newWorkTypeCounts: NumApply = {};

    if (selectedLicense && selectedLicense !== "전체") {
      // Initialize work types for the selected license with zero counts
      licenseToWorkTypes[selectedLicense]?.forEach((workType) => {
        console.log("workType", workType);
        newWorkTypeCounts[workType] = 0;
      });

      // Count each work type for the selected license
      scoreData?.forEach((item) => {
        if (
          item.licenseName === selectedLicense &&
          newWorkTypeCounts.hasOwnProperty(item.workType)
        ) {
          newWorkTypeCounts[item.workType]++;
        }
      });
    } else {
      // If "전체" is selected, aggregate counts for all work types across all licenses
      Object.keys(licenseToWorkTypes)?.forEach((license) => {
        licenseToWorkTypes[license]?.forEach((workType) => {
          if (!newWorkTypeCounts[workType]) {
            newWorkTypeCounts[workType] = 0;
          }
        });
      });

      // Count occurrences for each work type across all data
      scoreData?.forEach((item) => {
        if (newWorkTypeCounts.hasOwnProperty(item.workType)) {
          newWorkTypeCounts[item.workType]++;
        }
      });
    }
    newWorkTypeCounts["전체"] = Object.values(newWorkTypeCounts).reduce(
      (sum: number, count: number) => sum + count,
      0
    );
    console.log("newWorkTypeCounts", newWorkTypeCounts);

    setWorkTypeNumApply(newWorkTypeCounts);
  }, [scoreData, selectedLicense]);
  console.log("workTypeNumApply", workTypeNumApply);

  // 선택된 license / worktype 의 개수
  const [selectedListLicenseApply, setSelectedListLicenseApply] =
    useState<number>(licenseNumApply["전체"]);
  const [selectedListNumWorkTypeApply, setSelectedListNumWorkTypeApply] =
    useState<number>(workTypeNumApply["전체"]);

  // 선택된 License / WorkType에 대한 개수 update
  useEffect(() => {
    const licenseApplyCount = licenseNumApply[selectedLicense] || 0;
    const workTypeApplyCount = workTypeNumApply[selectedWorkType] || 0;

    setSelectedListLicenseApply(licenseApplyCount);
    setSelectedListNumWorkTypeApply(workTypeApplyCount);
  }, [licenseNumApply, workTypeNumApply, selectedLicense, selectedWorkType]);

  // 데이터 필터링 로직
  useEffect(() => {
    // 필터링 로직 업데이트
    let newData = scoreData;

    if (
      selectedLicense === "전체" ||
      (!selectedLicense && selectedWorkType === "전체") ||
      !selectedWorkType
    ) {
      setFilteredData(newData);
    } else {
      // 필터링 조건에 맞는 데이터만 표시
      if (selectedLicense !== "전체") {
        newData = newData.filter(
          (item) => item.licenseName === selectedLicense
        );
      }
      if (selectedWorkType !== "전체") {
        newData = newData.filter((item) => item.workType === selectedWorkType);
      }
      setFilteredData(newData);
    }
  }, [scoreData, selectedLicense, selectedWorkType]); // 의존성 배열 업데이트

  const handleLicenseClick = (license: string) => {
    setSelectedLicense(license);
    setSelectedWorkType("전체"); // Reset work type when changing license
    setLicenseIsOpen(false); // Close the license dropdown
    setIsInitialRender(false);
  };

  const handleWorkTypeClick = (workType: string) => {
    if (!workTypeIsDisabled) {
      setSelectedWorkType(workType);
      setSelectedListNumWorkTypeApply(workTypeNumApply[workType]);
      setWorkTypeIsOpen(false); // Close the work type dropdown
      setIsInitialRender(false);
    }
  };

  // 통과, 탈락 여부 확인
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

  // 통과/탈락/미달 버튼
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
  }, [scoreData, selectedWorkType, isEmpty, filterData]);
  // 통과/탈락/미달 필터링
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

  // 화면 크기 조정
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

  if ((!fetchedData && !scoreCategory) || !accessTokenRecruiter) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex gap-y-4 w-full  px-4 py-8 flex-col justify-center items-center gap-2">
          <div className="h-2/4 flex-col justify-end items-center inline-flex">
            <Icon name="NoItem" width={32} height={32} />
          </div>
          <div className="h-2/4 justify-center items-center">
            <p className="text-subTitle-20 font-bold textColor-low-emphasis">
              다시 로그인 해주세요
            </p>
          </div>
          <button
            className="btnStyle-main-1 text-subTitle-20 font-bold p-l hover:bg-primary-navy-400 hover:text-primary-navy-original"
            onClick={() => router.push("/login")}
          >
            로그인 페이지로 돌아가기
          </button>
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
      <div className="flex h-screen">
        <div
          className={`flex flex-col transition-all ${
            isNarrow ? "ml-[119px]" : "ml-[266px]"
          } flex-1`}
        >
          <TopNavigator>
            <div className="flex gap-x-4">
              <Dropdown
                selectedType={selectedLicense}
                selectedNumApply={selectedListLicenseApply}
                numApply={licenseNumApply}
                isInitialRender={isInitialRender}
                handleClick={handleLicenseClick}
                isOpen={licenseIsOpen}
                setIsOpen={setLicenseIsOpen}
                label="License" // Adding a label to distinguish the dropdown
                isDisabled={false}
              />
              <Dropdown
                selectedType={selectedWorkType}
                selectedNumApply={selectedListNumWorkTypeApply}
                numApply={workTypeNumApply}
                isInitialRender={isInitialRender}
                handleClick={handleWorkTypeClick}
                isOpen={workTypeIsOpen}
                setIsOpen={setWorkTypeIsOpen}
                label="WorkType" // Adding a label to distinguish the dropdown
                isDisabled={workTypeIsDisabled}
              />
            </div>
          </TopNavigator>
          <div className="z-5">
            <ResultScoreTable
              scoreCategoryList={scoreCategoryList}
              PassCompanies={PassCompanies}
              FailCompanies={FailCompanies}
              LackCompanies={LackCompanies}
              setPassCompanies={setPassCompanies}
              setFailCompanies={setFailCompanies}
              setLackCompanies={setLackCompanies}
              selectedWorkType={selectedWorkType}
              numApply={workTypeNumApply}
              isEmpty={isEmpty}
              data={sortedData}
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
