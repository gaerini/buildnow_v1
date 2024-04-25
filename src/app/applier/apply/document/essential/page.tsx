"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../../common/components/ApplierApply/Essential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";
import Cookies from "js-cookie";
import axios from "axios";

interface CreditReportData {
  CRA: string;
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

interface FetchTempSaveRequest {
  corporateApplication: string;
  companyPhoneNum: string;
  workTypeApplying: string;
  type: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: FetchTempHandedOutList[];
}

export default function page() {
  const [saupFile, setSaupFile] = useState<File | null>(null); // 사업자등록증
  const [corpFile, setCorpFile] = useState<File | null>(null); // 법인 등기부 등본
  const [ingamFile, setIngamFile] = useState<File | null>(null); // 인감증명서
  const [sayongIngamFile, setSayongIngamFile] = useState<File | null>(null); // 사용인감계
  const [taxFiles, setTaxFiles] = useState<File[]>([]); // 납세 (시, 국세 완납 증명서)
  const [creditReportFiles, setCreditReportFiles] = useState<
    CreditReportData[]
  >([]); // 신용평가보고서
  const [jiFile, setJiFile] = useState<File | null>(null); // 지명원

  const [saupFileError, setSaupFileError] = useState(false);
  const [corpFileError, setCorpFileError] = useState(false);
  const [ingamFileError, setIngamFileError] = useState(false);
  const [sayongIngamFileError, setSayongIngamFileError] = useState(false);
  const [taxFilesError, setTaxFilesError] = useState(false);
  const [creditReportFilesError, setCreditReportFilesError] = useState(false);
  const [jiFileError, setJiFileError] = useState(false);

  const [isTempSaved, setIsTempSaved] = useState(false);
  const [buttonState, setButtonState] = useState("default");

  const [fetchedData, setFetchedData] = useState<FetchTempSaveRequest | null>(
    null
  );

  const accessTokenApplier = Cookies.get("accessTokenApplier");
  const applicationId = Cookies.get("applicationId");

  const qs = require("qs");
  const router = useRouter();
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  // page.tsx에서 일부 변경 사항

  const fileErrors = [
    saupFileError,
    corpFileError,
    ingamFileError,
    sayongIngamFileError,
    taxFilesError,
    creditReportFilesError,
    jiFileError,
  ];
  const setFileErrors = [
    setSaupFileError,
    setCorpFileError,
    setIngamFileError,
    setSayongIngamFileError,
    setTaxFilesError,
    setCreditReportFilesError,
    setJiFileError,
  ];

  const [isCorpEssential, setIsCorpEssential] = useState(false);

  useEffect(() => {
    const storedBusinessType = localStorage.getItem("businessType") || "";
    setIsCorpEssential(storedBusinessType === "CORPORATE");
  }, []);

  useEffect(() => {
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

  const createTempHandedOutList = (): TempHandedOutList[] => {
    let tempHandedOutList: TempHandedOutList[] = [];

    Object.keys(pdfUrls).forEach((key) => {
      const documentUrls = pdfUrls[key];
      const upperCategoryENUM = key.includes("CRR") ? "FINANCE" : "BUSINESS";

      documentUrls.forEach((url, index) => {
        const documentName =
          documentUrls.length > 1 ? `${key}-${index + 1}` : key;
        tempHandedOutList.push({
          documentName: documentName,
          documentUrl: url,
          requiredLevelENUM: "REQUIRED",
          upperCategoryENUM: upperCategoryENUM, //upperCategoryENUM as string,
        });
      });
    });

    return tempHandedOutList;
  };

  function excludeIdKey(obj: FetchTempHandedOutList) {
    const { id, ...rest } = obj;
    return rest;
  }

  // Fetch initial data
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
        setFetchedData(response.data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, []);

  const handleTempSave = async () => {
    if (!accessTokenApplier || !applicationId) {
      console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
      return false;
    }

    if (!fetchedData) {
      console.error("No data fetched");
      return false;
    }

    console.log("기존 녀석", fetchedData);

    // response.data.tempHandedOutList의 각 객체에서 "id" 제외
    const corporateApplication = fetchedData.corporateApplication;
    const companyPhoneNum = fetchedData.companyPhoneNum;
    const workTypeApplying = fetchedData.workTypeApplying;
    const type = fetchedData.type;
    const companyAddress = fetchedData.companyAddress;
    const companyIntro = fetchedData.companyIntro;

    const filteredTempHandedOutList =
      fetchedData.tempHandedOutList.map(excludeIdKey);
    const newTempHandedOutList = createTempHandedOutList();

    console.log("신규 임시저장 값", newTempHandedOutList);

    // API 요청을 위한 데이터 준비
    const requestBody: TempSaveRequest = {
      corporateApplication: corporateApplication,
      companyPhoneNum: companyPhoneNum,
      workTypeApplying: workTypeApplying,
      type: type,
      companyAddress: companyAddress,
      companyIntro: companyIntro,
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

    console.log("중복제거", updatedRequestBody);

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

  const validateAndNavigate = async () => {
    const hasValidCreditReport = creditReportFiles.length > 0;
    let isValid = true;
    let errorMessages = [];

    // 각 파일 필드 검증 및 에러 상태 업데이트
    if (!saupFile) {
      setSaupFileError(true);
      isValid = false;
      errorMessages.push("사업자등록증을 첨부해주세요.");
    }
    if (isCorpEssential && !corpFile) {
      setCorpFileError(true);
      isValid = false;
      errorMessages.push("법인 등기부등본을 첨부해주세요.");
    }
    if (!ingamFile) {
      setIngamFileError(true);
      isValid = false;
      errorMessages.push("인감증명서를 첨부해주세요.");
    }
    if (!sayongIngamFile) {
      setSayongIngamFileError(true);
      isValid = false;
      errorMessages.push("사용인감계를 첨부해주세요.");
    }
    if (taxFiles.length === 0) {
      setTaxFilesError(true);
      isValid = false;
      errorMessages.push("납세증명서를 첨부해주세요.");
    }
    if (!hasValidCreditReport) {
      setCreditReportFilesError(true);
      isValid = false;
      errorMessages.push("신용평가보고서를 첨부해주세요.");
    }
    if (!jiFile) {
      setJiFileError(true);
      isValid = false;
      errorMessages.push("공사 지명원을 첨부해주세요.");
    }

    if (isValid) {
      console.log("모든 필수 서류가 제출되었습니다.");
      handleTempSave();
      router.push("preferential");
    } else {
      if (errorMessages.length === 1) {
        // If there's only one error, show that specific message
        alert(errorMessages[0]);
      } else {
        // If there are multiple errors, show a general message
        alert("필수 서류 중 누락된 항목이 있습니다.");
      }
    }
  };

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
    <div className="select-none flex flex-col w-screen">
      {/* 위쪽 */}
      <ApplierTopNav
        text="지원서 작성"
        showButton={true}
        onSave={handleSave}
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
      {/* 오른쪽 */}
      <div className="h-[calc(100vh-4rem)]">
        <div className="flex flex-col">
          <Header
            titleText="3-1. 필수 서류 등록"
            additionalText="필수 서류란?"
            isHoverable={true}
            detailedIcon="✅"
            detailedText={
              <div className="textColor-focus text-paragraph-14">
                <span className="font-normal">
                  협력업체 지원을 위해 필수로 등록해야 하는 서류입니다. <br />
                </span>
                <span className="font-bold">
                  등록하지 않으면 협력업체 지원이 불가
                </span>
                <span className="font-normal">합니다</span>
              </div>
            }
          />
          {/* <Essential
            corpFile={corpFile}
            setCorpFile={setCorpFile}
            isCorpEssential={isCorpEssential}
            taxFiles={taxFiles}
            setTaxFiles={setTaxFiles}
            saupFile={saupFile}
            setSaupFile={setSaupFile}
            ingamFile={ingamFile}
            setIngamFile={setIngamFile}
            sayongIngamFile={sayongIngamFile}
            setSayongIngamFile={setSayongIngamFile}
            jiFile={jiFile}
            setJiFile={setJiFile}
            creditReport={creditReportFiles}
            setCreditReport={setCreditReportFiles}
            fileErrors={fileErrors}
            setFileErrors={setFileErrors}
            setPdfUrls={setPdfUrls}
            isTempSaved={isTempSaved}
            setIsTempSaved={setIsTempSaved}
          /> */}
        </div>
        {/* 왼쪽 */}
        <ApplierSideNav
          comp="신한종합건설"
          prev={"../info"}
          next={"preferential"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
