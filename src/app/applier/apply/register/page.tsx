"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterLicense from "./RegisterLicense";
import RegisterWorkType from "./RegisterWorkType";
import RegisterLicenseByNum from "./RegisterLicenseByNum";
import Header from "../../../../../common/components/ApplierApply/Header";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import WorkType from "./WorkType";
import Example from "./Example";
import Cookies from "js-cookie";
import axios from "axios";
import Alert from "../../../../../common/components/Alert/Alert";
import Icon from "../../../../../common/components/Icon/Icon";

interface LicenseData {
  licenseName: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface TempHandedOutList {
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

interface FetchTempHandedOutList {
  id: number;
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

interface TempSaveRequest {
  corporateApplication: string;
  companyPhoneNum: string;
  workTypeApplying: string;
  type: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: TempHandedOutList[];
}

// 공종 이름 list
const workTypeList = [
  "골조공사 (건축)",
  "미장방수.조적.타일 (건축)",
  "도장공사 (건축)",
  "석공사 (건축)",
  "목재창호공사 (건축)",
  "AL창호공사 (건축)",
  "PL창호공사 (건축)",
  "내장목공사 (건축)",
  "잡철물공사 (건축)",
  "지붕공사 (건축)",
  "일반건설업 (건축)",
  "철골공사 (건축)",
  "데크플레이트 (건축)",
  "테라쪼 (건축)",
  "인테리어 (건축)",
  "세대현관문 (건축)",
  "커튼월,외장판넬 (건축)",
  "계단난간대 (건축)",
  "유리공사 (건축)",
  "PVC바닥재 (건축)",
  "도배공사 (건축)",
  "골조 (건축)",
  "미장/조적 (건축)",
  "방수 (건축)",
  "타일 (건축)",
  "도장 (건축)",
  "석공사 (건축)",
  "목재창호 (건축)",
  "AL창호 (건축)",
  "PL창호 (건축)",
  "유리 (건축)",
  "내장목 (건축)",
  "잡철물 (건축)",
  "지붕 (건축)",
  "도배/바닥재 (건축)",
  "건축시설물유지 (건축)",
  "경량콘크리트판넬 (건축)",
  "온돌/강화마루 (건축)",
  "파일항타[건축] (건축)",
  "조경식재 (건축)",
  "조경식재/조경시설물 (건축)",
  "안전시설물 (건축)",
  "가구/주방가구 (건축)",
  "데크플레이트 (건축)",
  "시스템루버 (건축)",
  "기타 (건축)",
  "일반토목 (토목)",
  "부대토목 (토목)",
  "포장공사 (토목)",
  "파일항타공사 (토목)",
  "조경시설물 (토목)",
  "상하수도 (토목)",
  "토목철물 (토목)",
  "철거공사 (토목)",
  "철강재 (토목)",
  "특수구조물 (토목)",
  "보링,연약지반 (토목)",
  "수중 (토목)",
  "준설 (토목)",
  "조경식재 (토목)",
  "법면보호 (토목)",
  "교좌장치 (토목)",
  "도로유관관로공사 (토목)",
  "철근콘크리트공사 (토목)",
  "방수 (토목)",
  "신축이음 (토목)",
  "일반토목 (토목)",
  "포장 (토목)",
  "상하수도 (토목)",
  "토목철물 (토목)",
  "파일항타[토목] (토목)",
  "토목시설물유지 (토목)",
  "기타 (토목)",
  "소방전기 (전기)",
  "정보통신 (전기)",
  "임시동력 (전기)",
  "전기일반 (전기)",
  "소방전기 (전기)",
  "정보통신 (전기)",
  "기타 (전기)",
  "소방설비 (기계)",
  "가스공사 (기계)",
  "자동제어 (기계)",
  "터널기계설비 (기계)",
  "조립식P.D (기계)",
  "기계일반 (기계)",
  "기계일반[소방포함] (기계)",
  "가스설비 (기계)",
  "자동제어 (기계)",
  "우수처리/정화조 (기계)",
  "냉난방기 (기계)",
  "실내환기설비 (기계)",
  "기타 (기계)",
  "건축시설물유지 (기타)",
  "토목시설물유지 (기타)",
  "지하수개발 (기타)",
  "기타 (기타)",
];

const Page = () => {
  const router = useRouter();
  const [licenseData, setLicenseData] = useState<LicenseData[]>([]);
  const [isLicenseError, setIsLicenseError] = useState(false);
  const [isLicenseVisible, setIsLicenseVisible] = useState(true);
  const [isWorkTypeError, setIsWorkTypeError] = useState(false);
  const essentialLicenseNum = 1;

  // 선택할 수 있는 공종의 개수 조절 (일반 & 필수)
  const workTypeCount = 1; // 예를 들어, 1개의 workType 상태를 관리
  const essentialWorkTypeCount = 1;

  const [workTypes, setWorkTypes] = useState(Array(workTypeCount).fill(""));
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  const [isTempSaved, setIsTempSaved] = useState(false);
  const [buttonState, setButtonState] = useState("default");

  const accessTokenApplier = Cookies.get("accessTokenApplier");
  const applicationId = Cookies.get("applicationId");
  const [fetchedData, setFetchedData] = useState([]);

  const qs = require("qs");

  const handleWorkTypeChange = (index: number, value: string) => {
    const updatedWorkTypes = [...workTypes];
    updatedWorkTypes[index] = value;
    setWorkTypes(updatedWorkTypes);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!accessTokenApplier || !applicationId) {
        console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/applier/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${accessTokenApplier}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Fetched data:", response.data);
        // Assuming response.data.tempHandedOutList is the data you want to store
        setFetchedData(response.data.tempHandedOutList.map(excludeIdKey));
        // Update state with fetched data
        // You may need to set other state variables based on the fetched data
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Ensure that TypeScript knows the type of the accumulator
    const updatedPdfUrls = Object.entries(pdfUrls).reduce<PdfUrlsType>(
      (acc, [key, urls]) => {
        acc[key] = [urls[urls.length - 1]];
        return acc;
      },
      {} // Initialized as an empty object of PdfUrlsType
    );

    if (JSON.stringify(pdfUrls) !== JSON.stringify(updatedPdfUrls)) {
      setPdfUrls(updatedPdfUrls);
    }
  }, [pdfUrls]);

  useEffect(() => {
    // Define the type for the accumulator object
    const uniqueLicenseDataMap: { [key: string]: LicenseData } =
      licenseData.reduce((acc, current) => {
        acc[current.licenseName] = current;
        return acc;
      }, {} as { [key: string]: LicenseData }); // Provide an initial value with the correct type

    const uniqueLicenseData = Object.values(
      uniqueLicenseDataMap
    ) as LicenseData[];

    if (JSON.stringify(uniqueLicenseData) !== JSON.stringify(licenseData)) {
      setLicenseData(uniqueLicenseData);
    }
  }, [licenseData]);

  const createTempHandedOutList = () => {
    return Object.entries(pdfUrls).flatMap(([documentName, urls]) =>
      urls.map((documentUrl) => ({
        documentName,
        documentUrl,
        requiredLevelENUM: "REQUIRED",
        upperCategoryENUM: "LICENSE",
      }))
    );
  };

  function excludeIdKey(obj: FetchTempHandedOutList) {
    const { id, ...rest } = obj;
    return rest;
  }

  const handleTempSave = async () => {
    console.log("기존", fetchedData);
    if (!accessTokenApplier || !applicationId) {
      console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
      return false;
    }

    // response.data.tempHandedOutList의 각 객체에서 "id" 제외
    const filteredTempHandedOutList = fetchedData;
    const newTempHandedOutList = createTempHandedOutList();
    const applyWorkType = workTypes[0];

    console.log("신규 임시저장 값", newTempHandedOutList, applyWorkType);

    // API 요청을 위한 데이터 준비
    const requestBody: TempSaveRequest = {
      corporateApplication: "",
      companyPhoneNum: "",
      workTypeApplying: applyWorkType,
      type: "",
      companyAddress: "",
      companyIntro: "",
      tempHandedOutList: [
        ...filteredTempHandedOutList,
        ...newTempHandedOutList,
      ],
    };

    // Convert the entire object into x-www-form-urlencoded format
    console.log(requestBody);
    // Filter the tempHandedOutList to keep only the last occurrence of each documentName
    const uniqueTempHandedOutList = requestBody.tempHandedOutList.reduceRight(
      (acc: TempHandedOutList[], current) => {
        if (!acc.some((item) => item.documentName === current.documentName)) {
          acc.push(current);
        }
        return acc;
      },
      [] as TempHandedOutList[]
    ); //
    // Prepare the updated requestBody
    const updatedRequestBody: TempSaveRequest = {
      ...requestBody,
      tempHandedOutList: uniqueTempHandedOutList,
    };

    const formBody = qs.stringify(updatedRequestBody, { allowDots: true });

    console.log(formBody);

    try {
      // 서버에 POST 요청을 보냅니다.
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/applier/${applicationId}`,
        formBody,
        {
          headers: {
            Authorization: `Bearer ${accessTokenApplier}`,
            "Content-Type": "application/x-www-form-urlencoded",
            // 필요한 경우, 인증 토큰 등의 헤더를 추가합니다.
          },
        }
      );

      if (response.status === 200) {
        // 성공적으로 임시저장되었을 때의 로직
        console.log("임시 저장 성공", response.data);

        return true;
        // 여기에 성공시 처리할 코드를 작성하세요.
      }
    } catch (error) {
      console.error("임시 저장 실패", error);
      return false;
      // 에러 처리 로직
    }
  };

  // 에러 관리
  const validateAndNavigate = async () => {
    const hasValidLicense = licenseData.length >= essentialLicenseNum;
    const hasValidWorkTypes =
      workTypes.filter(Boolean).length >= essentialWorkTypeCount;

    setIsLicenseError(false);
    setIsWorkTypeError(false);

    // 두 조건 모두 충족되지 않는 경우
    if (!hasValidLicense && !hasValidWorkTypes) {
      setIsLicenseError(true);
      setIsWorkTypeError(true);
      alert("필수 제출란을 확인해주세요");
      return;
    }

    // 면허 데이터가 유효하지 않은 경우
    if (!hasValidLicense) {
      setIsLicenseError(true);
      alert("보유하신 면허를 등록해주세요.");
      return;
    }

    // 공종 데이터가 유효하지 않은 경우
    if (!hasValidWorkTypes) {
      setIsWorkTypeError(true);
      alert("지원하실 공종을 한 개 이상 선택해주세요.");
      return;
    }

    try {
      const tempSaveSuccessful = await handleTempSave();
      if (tempSaveSuccessful) {
        router.push("info");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생: ", error);
      alert("파일 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const [zIndex, setZIndex] = useState(10); // default z-index when visible

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      // Adjust these values as per your requirement
      if (currentScroll > 100) {
        // Example value, change as needed
        setZIndex(-10); // Set to -z-10 when scrolled
      } else {
        setZIndex(10); // Set back to z-10 when in view
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("licenseData", licenseData);
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

  const handleSave = async () => {
    const saveSuccessful = await handleTempSave();
    if (saveSuccessful) {
      setTimeout(() => {
        setIsTempSaved(true); // 1초 후에 임시저장 완료 상태로 설정
      }, 1000);
    }
  };

  useEffect(() => {
    if (!isTempSaved) {
      setButtonState("default"); // isTempSaved가 false로 바뀔 때 버튼 상태를 초기화
    }
  }, [isTempSaved]);

  return (
    <div>
      <ApplierTopNav
        text="지원서 작성"
        showButton={true}
        onSave={handleSave}
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
      <div className="flex flex-col w-full">
        <Header
          titleText="2. 면허 등록 및 공종 선택"
          additionalText={
            <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
              표시가 붙은 항목들은 필수 입력 항목입니다.
            </span>
          }
        />

        <div className="flex flex-col bgColor-white h-fit ml-[641px] mt-[120px] w-[500px] gap-y-2">
          {/* 첫 번째 영역: 면허 등록 */}
          <div className="p-xl flex flex-col gap-y-2">
            {isTempSaved && (
              <div className="h-[36px] w-full">
                <Alert
                  state="neutral"
                  alertIcon={<Icon name="Check" width={16} height={16} />}
                  alertText={
                    <p className="text-paragraph-14 font-light">
                      {"임시저장되었습니다"}
                    </p>
                  }
                  onClose={() => setIsTempSaved(false)}
                />
              </div>
            )}

            <Example />
          </div>

          <div className="p-xl ">
            {/* 하나씩 선택해서 추가하는 버전 */}
            {/* <RegisterLicense
            licenseData={licenseData}
            setLicenseData={setLicenseData}
            isLicenseVisible={isLicenseVisible}
            setIsLicenseVisible={setIsLicenseVisible}
            isError={isLicenseError}
            setIsError={setIsLicenseError}
            setPdfUrls={setPdfUrls}
          /> */}
            <RegisterLicenseByNum
              licenseNum={3}
              essentialLicenseNum={essentialLicenseNum}
              licenseData={licenseData}
              setLicenseData={setLicenseData}
              isLicenseError={isLicenseError}
              setPdfUrls={setPdfUrls}
            />
          </div>
          <div className="p-xl">
            {/* 여러개의 공종을 관리하는 버전 */}
            {/* <RegisterWorkType
              workTypeCount={workTypeCount}
              essentialWorkType={essentialWorkTypeCount}
              workTypes={workTypes}
              onWorkTypeChange={handleWorkTypeChange}
              workTypeList={workTypeList}
              isError={isWorkTypeError}
              setIsError={setIsWorkTypeError}
            /> */}
            <WorkType
              workTypeList={workTypeList}
              workTypes={workTypes}
              setWorkTypes={setWorkTypes}
              isError={isWorkTypeError}
              setIsError={setIsWorkTypeError}
              workTypeCount={workTypeCount}
              essentialWorkTypeCount={essentialWorkTypeCount}
            />
          </div>
        </div>
      </div>

      <ApplierSideNav
        comp="한울건설"
        prev="application"
        next="info"
        onValidateAndNavigate={validateAndNavigate}
      />
    </div>
  );
};

export default Page;
