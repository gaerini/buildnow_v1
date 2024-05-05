"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../../common/components/ApplierApply/Essential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";
import Cookies from "js-cookie";
import axios from "axios";
import { useFile } from "../../../../../../common/components/useFiles/useFile";
import LoadingModal from "../application/LoadingModal";
import SuccessModal from "../application/SuccessModal";
import { ApplierInfo } from "../info/Interface";
import Icon from "../../../../../../common/components/Icon/Icon";
import ApplierSkeleton from "../../../../../../common/components/ApplierApply/ApplySkeleton";

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

interface FileState {
  file: File | File[] | null;
  setFile: React.Dispatch<React.SetStateAction<File | File[] | null>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const documents = [
  {
    name: "협력업체 등록신청서",
    required: true,
    isMultiple: false,
    isToolTip: false,
    detailedText: <></>,
  },
  {
    name: "사업자등록증",
    required: false,
    isMultiple: false,
    isToolTip: false,
    detailedText: <></>,
  },
  {
    name: "건설업 등록증",
    required: false,
    isMultiple: true,
    isToolTip: false,
    detailedText: <></>,
  },
  {
    name: "건설업 등록 수첩",
    required: false,
    isMultiple: true,
    isToolTip: false,
    detailedText: <></>,
  },
  {
    name: "법인등기부등본",
    required: false,
    isMultiple: false,
    isToolTip: false,
    detailedText: <></>,
  },
  {
    name: "인감증명서 및 사용인감계",
    required: true,
    isMultiple: true,
    isToolTip: false,
    detailedText: <></>,
  },
  {
    name: "시국세 완납증명서",
    required: false,
    isMultiple: true,
    isToolTip: true,
    detailedText: <>국세(세무서), 지방세(구청,동사무소) 발급원부</>,
  },
  {
    name: "지명원",
    required: false,
    isMultiple: false,
    isToolTip: true,
    detailedText: (
      <>
        재무제표, 경영상태 확인원, 기술자 보유현황 <br />
        시국세 완납증명서, 최근 3년간 시공실적 증명서, <br />
        신용평가보고서 모두 포함 1부
      </>
    ),
  },
];

export default function page() {
  const router = useRouter();
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});
  const pdfUrlsRef = useRef(pdfUrls);
  const fileStates = documents.map((doc) =>
    useFile(null, doc.isMultiple, doc.isToolTip, doc.detailedText)
  );
  const [getApplierInfo, setGetApplierInfo] = useState<ApplierInfo>();
  const [isTempSaved, setIsTempSaved] = useState(false);
  const [buttonState, setButtonState] = useState("default");
  const [fetchedData, setFetchedData] = useState<FetchTempSaveRequest | null>(
    null
  );
  const [creditReportFiles, setCreditReportFiles] = useState<
    CreditReportData[]
  >([]);
  const [creditReportFilesError, setCreditReportFilesError] = useState(false);
  const accessTokenApplier = Cookies.get("accessTokenApplier");
  const applicationId = Cookies.get("applicationId");
  const [isLoading, setIsLoading] = useState(false);
  const [pageIsLoading, setPageIsLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const qs = require("qs");

  useEffect(() => {
    pdfUrlsRef.current = pdfUrls;
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

  const createTempHandedOutList = (urls: PdfUrlsType) => {
    let tempHandedOutList: TempHandedOutList[] = [];
    console.log("Current pdfUrls in createTempHandedOutList", urls);
    Object.keys(urls).forEach((key) => {
      const documentUrls = urls[key] || [];
      const upperCategoryENUM = key.includes("CRR")
        ? "FINANCE"
        : key.includes("시공실적")
        ? "PERFORMANCE"
        : "BUSINESS";
      documentUrls.forEach((url, index) => {
        const documentName =
          documentUrls.length > 1 ? `${key}-${index + 1}` : key;
        tempHandedOutList.push({
          documentName: documentName,
          documentUrl: url,
          requiredLevelENUM: "REQUIRED",
          upperCategoryENUM: upperCategoryENUM,
        });
      });
    });
    return tempHandedOutList;
  };

  function excludeIdKey(obj: FetchTempHandedOutList) {
    const { id, ...rest } = obj;
    return rest;
  }

  useEffect(() => {
    const fetchApplierInfo = async () => {
      if (!accessTokenApplier || !applicationId) {
        setIsLoading(false);
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!accessTokenApplier || !applicationId) {
        setPageIsLoading(false);
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
        setPageIsLoading(false);
      } catch (error) {
        console.error("Fetch failed", error);
        setFetchedData(null);
        setPageIsLoading(false);
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
    const latestPdfUrls = pdfUrlsRef.current;
    const newTempHandedOutList = createTempHandedOutList(latestPdfUrls);

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
    );

    // Prepare the updated requestBody
    const updatedRequestBody: TempSaveRequest = {
      ...requestBody,
      tempHandedOutList: uniqueTempHandedOutList,
    };

    const formBody = qs.stringify(updatedRequestBody, { allowDots: true });

    console.log(formBody);
    console.log(applicationId);

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

  // Wait for pdfUrls to be populated
  const waitForPdfUrls = async () => {
    while (Object.keys(pdfUrlsRef.current).length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  };

  const validateAndNavigate = async () => {
    let isValid = true;
    let appointmentLetterSubmitted = false;
    const documentErrors: { [key: string]: boolean } = {};
    let errorMessages: string[] = [];

    // Initialize all document errors to false
    documents.forEach((doc) => {
      documentErrors[doc.name] = false;
    });

    // Check if "지명원" is submitted
    fileStates.forEach((fileState, index) => {
      if (documents[index].name === "지명원") {
        appointmentLetterSubmitted = fileState.file !== null;
      }
    });

    if (appointmentLetterSubmitted) {
      // "지명원"이 제출되었으면 다른 서류의 에러 체크를 하지 않음
      setCreditReportFilesError(false);
    } else {
      // "지명원"이 제출되지 않았으면 다른 서류들의 제출 여부를 확인
      fileStates.forEach((fileState, index) => {
        if (documents[index].name !== "지명원" && !fileState.file) {
          documentErrors[documents[index].name] = true;
          isValid = false;
          fileState.setError(true); // Set error state for missing documents
          errorMessages.push(`${documents[index].name}가 제출되지 않았습니다.`);
        }
      });

      // Also check the credit report
      if (creditReportFiles.length === 0) {
        setCreditReportFilesError(true);
        isValid = false;
        errorMessages.push("Credit Report가 제출되지 않았습니다.");
      }
    }

    if (isValid) {
      console.log("All required documents are uploaded successfully.");

      setIsLoading(true);
      await waitForPdfUrls();
      setIsLoading(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);

      const response = await handleTempSave();

      if (response) {
        const patchResponse = await axios.patch(
          `${process.env.NEXT_PUBLIC_SPRING_URL}/application/applier/submit/${applicationId}`,
          {}, // Since you mentioned no body is required for this API
          {
            headers: {
              Authorization: `Bearer ${accessTokenApplier}`,
            },
          }
        );
        if (patchResponse.status === 200) {
          router.push("/demo/applier/apply/result");
          return;
        } else {
          alert("Failed to save the documents. Please try again.");
        }
      }
    } else {
      if (errorMessages.length >= 1) {
        alert("필수 서류가 누락되었습니다");
      } else {
        alert(errorMessages[0]); // Display all error messages
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

  if (pageIsLoading) {
    return <ApplierSkeleton />;
  }

  if (!fetchedData) {
    // 로그인 페이지로 유도하는 컴포넌트 렌더링
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <div className="flex gap-y-4 w-full px-4 py-8 flex-col justify-center items-center gap-2">
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
            onClick={() => router.push("/demo/applier/account/login")}
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

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
            titleText="3. 서류 등록"
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
          <Essential
            fileStates={fileStates}
            documents={documents}
            setPdfUrls={setPdfUrls}
            isTempSaved={isTempSaved}
            setIsTempSaved={setIsTempSaved}
            creditReport={creditReportFiles}
            setCreditReport={setCreditReportFiles}
            creditReportFilesError={creditReportFilesError}
            setCreditReportFilesError={setCreditReportFilesError}
          />
        </div>
        {/* 왼쪽 */}
        <ApplierSideNav
          comp="한울건설"
          prev={"../info"}
          next={"result"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
      {isLoading && <LoadingModal />}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
}
