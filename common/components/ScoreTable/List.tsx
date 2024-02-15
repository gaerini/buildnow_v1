"use client";
import { useState, useEffect } from "react";
import Dropdown from "../Dropdown/Dropdown";
import TopNavigator from "../TopNavigator/TopNavigator";
import ListScoreTable from "./List/ListScoreTable";
import { useLoading } from "../LoadingContext";
import Layout from "../Layout";
import { Total, CompanyScoreSummary } from "../Interface/CompanyData";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";

// const [accessJWTToken, setAccessJWTToken] = useState("");
// JWT 토큰
// const jwtToken =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJidXNpbmVzc0lkIjoiMTIzLTQ1LTY3ODkwIiwidXNlclR5cGUiOiJyZWNydWl0ZXIiLCJpYXQiOjE3MDc5MTkxNTcsImV4cCI6MTcwNzkyMjc1N30.SfOzfHj9AnOkX1bB66Yevh8uwj94uXlXZkq0WQgIw4w";
// const axiosInstance = axios.create({
//   baseURL: "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
//   headers: {
//     Authorization: `Bearer ${jwtToken}`,
//   },
// });

export default function List() {
  // const cookieJWTToken = Cookies.get("token");
  const [accessJWTToken, setAccessJWTToken] = useState(
    localStorage.getItem("accessToken")
  );

  const axiosInstance = axios.create({
    baseURL:
      "http://ec2-43-201-27-22.ap-northeast-2.compute.amazonaws.com:3000",
    headers: {
      Authorization: `Bearer ${accessJWTToken}`,
    },
    withCredentials: true,
  });

  const router = useRouter();
  const [totalData, setTotalData] = useState<Total>({});
  const [scoreData, setScoreData] = useState<CompanyScoreSummary[]>([]);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        router.push("/login");
        return;
      }

      try {
        const responseToken = await axiosInstance.post(
          "auth/recruiter/refresh",
          {
            refreshToken: refreshToken, // refreshToken을 요청 본문에 포함
          }
        );
        localStorage.setItem("accessToken", responseToken.data.accessToken);
        console.log(responseToken.data.accessToken);
        setAccessJWTToken(responseToken.data.accessToken);
      } catch (error) {
        console.error("Error refreshing accessToken:", error);
        router.push("/login");
      }
    };

    const fetchData = async () => {
      try {
        // setIsLoading(false);
        const response = await axiosInstance.get("application/getMyApplicants");
        setTotalData(response.data.total);
        setScoreData(response.data.applier.score);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(true);
      }
    };

    if (!accessJWTToken) {
      refreshAccessToken();
    } else {
      fetchData();
    }
  }, [accessJWTToken, axiosInstance]);

  // useEffect(() => {
  //   if (!cookieJWTToken) {
  //     // If no token, redirect to login page
  //     router.push("/login");
  //     return; // Prevent further execution
  //   }

  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(false);
  //       const response = await axiosInstance.get("application/getMyApplicants");
  //       setTotalData(response.data.total);
  //       setScoreData(response.data.applier.score);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoading(true);
  //     }
  //   };
  //   fetchData();
  // }, []);

  interface NumApply {
    [key: string]: number;
  }

  const [activeButton, setActiveButton] = useState("total");
  const [filterData, setFilteredData] = useState<CompanyScoreSummary[]>([]);
  const [sortedData, setSortedData] = useState<CompanyScoreSummary[]>([]);

  const [selectedWorkType, setSelectedWorkType] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedWorkType = sessionStorage.getItem("selectedWorkType");
    return savedWorkType ? JSON.parse(savedWorkType) : "전체"; // 초기 상태가 없으면 기본값 설정
  });
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  const [numApply, setNumApply] = useState<NumApply>({});
  const [selectedNumApply, setSelectedNumApply] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedNumApply = sessionStorage.getItem("selectedNumApply");
    return savedNumApply ? parseInt(savedNumApply, 10) : 0; // 초기 상태가 없으면 기본값 설정
  });

  const [page, setPage] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedPage = sessionStorage.getItem("page");
    return savedPage ? parseInt(savedPage, 10) : 1; // 초기 상태가 없으면 기본값 설정
  });

  const [isOption, setIsOption] = useState(() => {
    // 세션 스토리지에서 초기 상태 로드
    const savedIsOption = sessionStorage.getItem("isOption");
    return savedIsOption ? JSON.parse(savedIsOption) : null; // 초기 상태가 없으면 기본값 설정
  });

  // 옵션 변경 시 세션 스토리지에 저장
  useEffect(() => {
    sessionStorage.setItem(
      "selectedWorkType",
      JSON.stringify(selectedWorkType)
    );
    sessionStorage.setItem("selectedNumApply", selectedNumApply.toString());
    sessionStorage.setItem("page", page.toString());
    sessionStorage.setItem("isOption", JSON.stringify(isOption));
    setIsInitialRender(false);
  }, [selectedWorkType, selectedNumApply, page]);

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
      상하수도설비공사: 0,
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

  useEffect(() => {
    if (selectedWorkType === "전체") {
      setFilteredData(scoreData);
    } else {
      setFilteredData(
        scoreData.filter((item) => item.applyingWorkType === selectedWorkType)
      );
    }
  }, [scoreData, selectedWorkType]);

  useEffect(() => {
    if (activeButton === "new") {
      setSortedData(filterData.filter((item) => item.isRead === false));
    } else {
      setSortedData(filterData);
    }
  }, [activeButton, filterData]);

  return (
    <Layout>
      <div className="flex h-screen">
        <div className="fixed top-0 left-0 h-full z-10">
          {/* <SideNavigator CompanyName="A 건설" /> */}
        </div>
        <div className="flex flex-col ml-[266px] flex-1">
          <TopNavigator>
            <Dropdown
              selectedWorkType={selectedWorkType}
              setSelectedWorkType={setSelectedWorkType}
              selectedNumApply={selectedNumApply}
              setSelectedNumApply={setSelectedNumApply}
              numApply={numApply}
              isInitialRender={isInitialRender}
              setIsInitialRender={setIsInitialRender}
            />
          </TopNavigator>
          <div className="z-5">
            <ListScoreTable
              data={sortedData}
              standard={totalData}
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              page={page}
              setPage={setPage}
              isOption={isOption}
              setIsOption={setIsOption}
              // isLoading={isLoading}
              // setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
