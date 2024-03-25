"use client";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../../common/components/ApplierApply/Essential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";

import "nprogress/nprogress.css";

interface CreditReportData {
  CRA: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

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
    setIsCorpEssential(storedBusinessType === "법인 사업자");
  }, []);

  useEffect(() => {
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

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

  const handleSave = () => {
    // 저장 로직 작성
    // 예를 들어, 서버에 데이터를 저장하는 로직 등
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
          <Essential
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
          />
        </div>
        {/* 왼쪽 */}
        <ApplierSideNav
          comp="한울건설"
          prev={"../info"}
          next={"preferential"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
