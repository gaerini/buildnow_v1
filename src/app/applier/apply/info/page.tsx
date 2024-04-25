"use client";
import React, { useState, useEffect } from "react";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import { useRouter } from "next/navigation";
import Header from "../../../../../common/components/ApplierApply/Header";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import CompanyInfo from "./CompanyInfo";
import Cookies from "js-cookie";
import axios from "axios";
import Alert from "../../../../../common/components/Alert/Alert";
import Icon from "../../../../../common/components/Icon/Icon";
import { ApplierInfo } from "./Interface";

// interface LicenseData {
//   licenseName: string;
//   fileName: string;
// }

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
  licenseName: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: TempHandedOutList[];
}

interface FetchTempSaveRequest {
  corporateApplication: string;
  companyPhoneNum: string;
  workTypeApplying: string;
  type: string;
  licenseName: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: FetchTempHandedOutList[];
}

const Page = () => {
  // const [licenseData, setLicenseData] = useState<LicenseData[]>([]);
  // const [isLicenseVisible, setIsLicenseVisible] = useState(true);
  const router = useRouter();

  const [businessType, setBusinessType] = useState("CORPORATION");
  const [isBusinessTypeError, setIsBusinessTypeError] = useState(false); // New error state for businessType
  const [corpRegistrationNumber, setCorpRegistrationNumber] = useState("");
  const [isCorpRegistrationNumberError, setIsCorpRegistrationNumberError] =
    useState(false);
  const [address, setAddress] = useState("");
  const [isAddressError, setIsAddressError] = useState(false);
  const [companyPhoneNum, setCompanyPhoneNum] = useState("");
  const [isCompanyPhoneNumError, setIsCompanyPhoneNumError] = useState(false);
  const [companyDescription, setCompanyDescription] = useState("");

  const [isTempSaved, setIsTempSaved] = useState(false);
  const [buttonState, setButtonState] = useState("default");

  const [fetchedData, setFetchedData] = useState<FetchTempSaveRequest | null>(
    null
  );
  const [getApplierInfo, setGetApplierInfo] = useState<ApplierInfo>();

  const accessTokenApplier = Cookies.get("accessTokenApplier");
  const applicationId = Cookies.get("applicationId");

  const qs = require("qs");

  function excludeIdKey(obj: FetchTempHandedOutList) {
    const { id, ...rest } = obj;
    return rest as TempHandedOutList;
  }

  // Fetch initial data
  useEffect(() => {
    const fetchTempSave = async () => {
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
            },
          }
        );

        console.log("Fetched data:", response.data);
        setFetchedData(response.data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchTempSave();
  }, []);

  useEffect(() => {
    const fetchApplierInfo = async () => {
      if (!accessTokenApplier || !applicationId) {
        console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SPRING_URL}/applier`,
          {
            headers: {
              Authorization: `Bearer ${accessTokenApplier}`,
            },
          }
        );

        setGetApplierInfo(response.data); // Set the fetched data
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchApplierInfo();
  }, []);

  const basicInfo = {
    companyName: getApplierInfo?.companyName || null,
    businessId: getApplierInfo?.businessId || null,
    managerName: getApplierInfo?.managerName || null,
    managerEmail: getApplierInfo?.managerEmail || null,
  };

  const handleTempSave = async () => {
    if (!accessTokenApplier || !applicationId) {
      console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
      return false;
    }

    if (!fetchedData) {
      console.error("No data fetched");
      return false;
    }

    // response.data.tempHandedOutList의 각 객체에서 "id" 제외
    const workType = fetchedData.workTypeApplying;

    const licenseName = fetchedData.licenseName;
    const filteredTempHandedOutList =
      fetchedData.tempHandedOutList.map(excludeIdKey);

    // API 요청을 위한 데이터 준비
    const requestBody: TempSaveRequest = {
      corporateApplication: corpRegistrationNumber,
      companyPhoneNum: companyPhoneNum,
      workTypeApplying: workType,
      type: businessType,
      licenseName: licenseName,
      companyAddress: address,
      companyIntro: companyDescription,
      tempHandedOutList: [...filteredTempHandedOutList],
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

  const validateAndNavigate = () => {
    let errorMessages = [];

    // Resetting error states
    setIsBusinessTypeError(false);
    setIsCorpRegistrationNumberError(false);
    setIsCompanyPhoneNumError(false);

    // Business type validation
    if (!businessType) {
      setIsBusinessTypeError(true);
      errorMessages.push("사업자 유형을 선택하세요");
    }

    // Corp registration number validation for corp business type
    if (businessType === "법인 사업자" && !corpRegistrationNumber) {
      setIsCorpRegistrationNumberError(true);
      errorMessages.push("법인 등록번호를 입력하세요");
    }

    // Address validation
    if (!address) {
      setIsAddressError(true);
      errorMessages.push("회사 주소를 입력하세요");
    }

    // Company phone number validation
    if (!companyPhoneNum) {
      setIsCompanyPhoneNumError(true);
      errorMessages.push("회사 전화번호를 입력하세요");
    }

    if (errorMessages.length > 0) {
      if (errorMessages.length === 1) {
        // If there's only one error, show that specific message
        alert(errorMessages[0]);
      } else {
        // If there are multiple errors, show a general message
        alert("필수 입력란이 누락되었습니다");
      }
    } else {
      handleTempSave();
      router.push("document");
    }
  };

  const handleSave = () => {
    // 저장 로직 작성
    // 예를 들어, 서버에 데이터를 저장하는 로직 등
    handleTempSave();
    setTimeout(() => {
      setIsTempSaved(true); // 1초 후에 임시저장 완료 상태로 설정
    }, 1000);
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

      <div className="flex flex-col w-full mt-[120px]">
        <Header
          titleText="2. 업체 정보 입력"
          additionalText={
            <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
              표시가 붙은 항목들은 필수 입력 항목입니다.
            </span>
          }
        />

        <div className="flex flex-col bg-bgColor-white p-xl h-fit ml-[641px] w-[500px] gap-y-2">
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

          {/*기본 정보 입력 */}
          <CompanyInfo
            basicInfo={basicInfo}
            businessType={businessType}
            setBusinessType={setBusinessType}
            isBusinessTypeError={isBusinessTypeError}
            setIsBusinessTypeError={setIsBusinessTypeError}
            corpRegistrationNumber={corpRegistrationNumber}
            setCorpRegistrationNumber={setCorpRegistrationNumber}
            isCorpRegistrationNumberError={isCorpRegistrationNumberError}
            setIsCorpRegistrationNumberError={setIsCorpRegistrationNumberError}
            setAddress={setAddress}
            isAddressError={isAddressError}
            setIsAddressError={setIsAddressError}
            companyPhoneNum={companyPhoneNum}
            setCompanyPhoneNum={setCompanyPhoneNum}
            isCompanyPhoneNumError={isCompanyPhoneNumError}
            setIsCompanyPhoneNumError={setIsCompanyPhoneNumError}
            setCompanyDescription={setCompanyDescription}
          />
        </div>
        <ApplierSideNav
          comp={"신한종합건설"}
          prev={"register"}
          next={"document"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
};

export default Page;
