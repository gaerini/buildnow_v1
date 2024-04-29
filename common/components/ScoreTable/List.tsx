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
    "AL창호공사",
    "PL창호공사",
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
  상하수도설비공사업: ["상하수도설비공사"],

  철도궤도공사업: ["철도궤도공사"],
  철강구조물공사업: ["강구조물공사", "철강재설치공사"],
  수중준설공사업: ["수중공사", "준설공사"],

  승강기삭도공사업: ["승강기설치공사","기계식주차설비"],
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
    "AL창호공사",
    "PL창호공사",
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
    "상하수도설비공사",
    "철도궤도공사",
    "강구조물공사",
    "철강재설치공사",
    "수중공사",
    "준설공사",
    "승강기설치공사","기계식주차설비",
    "기계설비공사",
    "가스시설공사",
    "소방공사",
    "전기공사",
    "자동제어공사",
    "통신공사",
  ],
};

export default function List(fetchedData: any) {
  const router = useRouter();
  const currentPage = usePathname();

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
    return storedWorkType ? JSON.parse(storedWorkType) : null; // If nothing is stored, set to null
  });

  const [workTypeIsDisabled, setWorkTypeIsDisabled] = useState(
    !selectedLicense
  );

  console.log(fetchedData);

  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

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

  // page 상태 로드
  const [page, setPage] = useState(() => {
    const savedPage =
      typeof window !== "undefined" ? sessionStorage.getItem("page") : null;

    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  // isOption 상태 로드
  const [isOption, setIsOption] = useState(() => {
    const savedIsOption =
      typeof window !== "undefined" ? sessionStorage.getItem("isOption") : null;
    return savedIsOption ? JSON.parse(savedIsOption) : null; // 초기 상태가 없으면 기본값 설정
  });

  // sotring 옵션 변경 시 세션 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem("page", page.toString());
    sessionStorage.setItem("isOption", JSON.stringify(isOption));
    setIsInitialRender(false);
  }, [page, isOption]);

  // 면허 numApply
  useEffect(() => {
    const newLicenseCounts: NumApply = {};

    // Initialize all licenses with zero counts
    Object.keys(licenseToWorkTypes).forEach((license) => {
      newLicenseCounts[license] = 0;
    });

    // Count each occurrence of licenses in the scoreData
    scoreData.forEach((item) => {
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

  // 공종 numApply
  useEffect(() => {
    const newWorkTypeCounts: NumApply = {};

    if (selectedLicense && selectedLicense !== "전체") {
      // Initialize work types for the selected license with zero counts
      licenseToWorkTypes[selectedLicense].forEach((workType) => {
        newWorkTypeCounts[workType] = 0;
      });

      // Count each work type for the selected license
      scoreData.forEach((item) => {
        if (
          item.licenseName === selectedLicense &&
          newWorkTypeCounts.hasOwnProperty(item.workType)
        ) {
          newWorkTypeCounts[item.workType]++;
        }
      });

      // Sum total for all work types under the selected license
      newWorkTypeCounts["전체"] = Object.values(newWorkTypeCounts).reduce(
        (sum: number, count: number) => sum + count,
        0
      );
    } else {
      // If "전체" is selected, aggregate counts for all work types across all licenses
      Object.keys(licenseToWorkTypes).forEach((license) => {
        licenseToWorkTypes[license].forEach((workType) => {
          if (!newWorkTypeCounts[workType]) {
            newWorkTypeCounts[workType] = 0;
          }
        });
      });

      // Count occurrences for each work type across all data
      scoreData.forEach((item) => {
        if (newWorkTypeCounts.hasOwnProperty(item.workType)) {
          newWorkTypeCounts[item.workType]++;
        }
      });

      // Calculate the total count for "전체" as the sum of all individual counts
      newWorkTypeCounts["전체"] = Object.values(newWorkTypeCounts).reduce(
        (sum: number, count: number) => sum + count,
        0
      );
    }

    setWorkTypeNumApply(newWorkTypeCounts);
  }, [scoreData, selectedLicense]);

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

  // 총 갯수 / 안 읽음 여부 sorting
  useEffect(() => {
    if (activeButton === "new") {
      setSortedData(filterData.filter((item) => item.read === false));
    } else {
      setSortedData(filterData);
    }
  }, [activeButton, filterData]);

  // 화면 너비 조정 (isNarrow)
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
            <ListScoreTable
              selectedWorkType={selectedWorkType}
              numApply={workTypeNumApply}
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
