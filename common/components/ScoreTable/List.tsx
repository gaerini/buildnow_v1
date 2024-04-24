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

const licenseToWorkTypes = {
  지반조성포장공사업: ["토공사", "포장공사", "보링그라우팅파일공사"],
  실내건축공사업: ["수장공사", "인테리어공사"],
  금속창호지붕건축물조립공사업: ["휀스공사", "금속창호유리공사", "판넬공사"],
  도장습식방수석공사업: ["도장공사", "습식공사", "방수공사", "석공사"],
  조경식재시설물공사업: ["조경공사"],
  철근콘크리트공사업: ["철근콘크리트공사업"],
  구조물해체비계공사업: ["철골공사", "데크플레이트공사"],
  승강기삭도공사업: ["승강기공사"],
  기계가스설비공사업: ["기계설비공사"],
  전문소방시설공사업: ["소방공사"],
  일반소방시설공사업: ["소방공사"],
  전기공사업: ["전기공사", "자동제어공사"],
  정보통신공사업: ["통신공사"],
  전체: [],
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
    return storedLicense ? JSON.parse(storedLicense) : "전체"; // If nothing is stored, set to null
  });
  const [selectedWorkType, setSelectedWorkType] = useState(() => {
    const storedWorkType = sessionStorage.getItem("selectedWorkType");
    return storedWorkType ? JSON.parse(storedWorkType) : null; // If nothing is stored, set to null
  });
  const [workTypeIsDisabled, setWorkTypeIsDisabled] = useState(
    selectedLicense === "전체"
  );

  useEffect(() => {
    setWorkTypeIsDisabled(selectedLicense === "전체"); // Disable workType dropdown if no license is selected
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
  useEffect(() => {
    sessionStorage.setItem("selectedLicense", JSON.stringify(selectedLicense));
    sessionStorage.setItem(
      "selectedWorkType",
      JSON.stringify(selectedWorkType)
    );
  }, [selectedLicense, selectedWorkType]);

  const toggleMode = () => {
    setIsNarrow(!isNarrow); // 모드 전환 함수
  };

  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

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
    sessionStorage.setItem("selectedLicense", JSON.stringify(selectedLicense));
    sessionStorage.setItem(
      "selectedWorkType",
      JSON.stringify(selectedWorkType)
    );
    sessionStorage.setItem("page", page.toString());
    sessionStorage.setItem("isOption", JSON.stringify(isOption));
    setIsInitialRender(false);
  }, [selectedLicense, selectedWorkType, page]);

  // Count the number of applications per license and work type
  useEffect(() => {
    const newLicenseCounts: NumApply = {};
    const newWorkTypeCounts: NumApply = {};

    scoreData.forEach((item) => {
      newLicenseCounts[item.licenseName] =
        (newLicenseCounts[item.licenseName] || 0) + 1;
      if (item.licenseName === selectedLicense || selectedLicense === "전체") {
        newWorkTypeCounts[item.workType] =
          (newWorkTypeCounts[item.workType] || 0) + 1;
      }
    });

    setLicenseNumApply(newLicenseCounts);
    setWorkTypeNumApply(newWorkTypeCounts);
  }, [scoreData, selectedLicense]);

  const [selectedListLicenseApply, setSelectedListLicenseApply] =
    useState<number>(licenseNumApply["전체"]);
  const [selectedListNumWorkTypeApply, setSelectedListNumWorkTypeApply] =
    useState<number>(workTypeNumApply["전체"]);

  useEffect(() => {
    const saved = workTypeNumApply[selectedWorkType];
    const newValue = saved === undefined ? workTypeNumApply["전체"] : saved;
    setSelectedListNumWorkTypeApply(newValue);
  }, [workTypeNumApply, selectedWorkType]);

  useEffect(() => {
    // Update selected license and work type counts whenever the corresponding numApply changes or selections are made
    const licenseApplyCount = licenseNumApply[selectedLicense] || 0;
    const workTypeApplyCount = workTypeNumApply[selectedWorkType] || 0;

    setSelectedListLicenseApply(licenseApplyCount);
    setSelectedListNumWorkTypeApply(workTypeApplyCount);
  }, [licenseNumApply, workTypeNumApply, selectedLicense, selectedWorkType]);

  useEffect(() => {
    const filtered = scoreData.filter((item) => {
      return (
        (selectedLicense === "전체" || item.licenseName === selectedLicense) &&
        (selectedWorkType === "전체" || item.workType === selectedWorkType)
      );
    });
    setFilteredData(filtered);
  }, [scoreData, selectedLicense, selectedWorkType]);

  useEffect(() => {
    let newData = scoreData;

    // Filter based on selected license if not "전체"
    if (selectedLicense !== "전체") {
      newData = newData.filter((item) => item.licenseName === selectedLicense);
    }

    // Further filter based on selected work type if not "전체"
    if (selectedWorkType !== "전체") {
      newData = newData.filter((item) => item.workType === selectedWorkType);
    }

    // Update filtered data
    setFilteredData(newData);

    // Update isEmpty state based on whether filtered data is empty or not
    setIsEmpty(newData.length === 0);
  }, [scoreData, selectedLicense, selectedWorkType]); // Dependency array now listens to both selectedLicense and selectedWorkType

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
