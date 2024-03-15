"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../../common/components/ApplierApply/Essential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";

type PdfUrlsType = {
  [key: string]: string[];
};

export default function page() {
  const [saupFile, setSaupFile] = useState<File | null>(null); // 사업자등록증
  const [corpFile, setCorpFile] = useState<File | null>(null); // 법인 등기부 등본
  const [ingamFile, setIngamFile] = useState<File | null>(null); // 인감증명서
  const [sayongIngamFile, setSayongIngamFile] = useState<File | null>(null); // 사용인감계
  const [taxFiles, setTaxFiles] = useState<File[]>([]); // 납세 (시, 국세 완납 증명서)
  const [financeReportFiles, setFinanceReportFiles] = useState<File[]>([]); // 신용평가보고서
  const [jiFile, setJiFile] = useState<File | null>(null); // 지명원

  const [saupFileError, setSaupFileError] = useState(false);
  const [corpFileError, setCorpFileError] = useState(false);
  const [ingamFileError, setIngamFileError] = useState(false);
  const [sayongIngamFileError, setSayongIngamFileError] = useState(false);
  const [taxFilesError, setTaxFilesError] = useState(false);
  const [financeReportFilesError, setFinanceReportFilesError] = useState(false);
  const [jiFileError, setJiFileError] = useState(false);

  const router = useRouter();

  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  const fileErrors = [
    saupFileError,
    corpFileError,
    ingamFileError,
    sayongIngamFileError,
    taxFilesError,
    financeReportFilesError,
    jiFileError,
  ];
  const setFileErrors = [
    setSaupFileError,
    setCorpFileError,
    setIngamFileError,
    setSayongIngamFileError,
    setTaxFilesError,
    setFinanceReportFilesError,
    setJiFileError,
  ];

  useEffect(() => {
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

  const validateAndNavigate = async () => {
    let isValid = true;

    // 각 파일 필드 검증 및 에러 상태 업데이트
    if (!saupFile) {
      setSaupFileError(true);
      isValid = false;
    }
    if (!corpFile) {
      setCorpFileError(true);
      isValid = false;
    }

    if (!saupFile) {
      setSaupFileError(true);
      isValid = false;
    }
    if (!ingamFile) {
      setIngamFileError(true);
      isValid = false;
    }
    if (!sayongIngamFile) {
      setSayongIngamFileError(true);
      isValid = false;
    }

    if (taxFiles.length === 0) {
      setTaxFilesError(true);
      isValid = false;
    }
    if (financeReportFiles.length === 0) {
      setFinanceReportFilesError(true);
      isValid = false;
    }
    if (!jiFile) {
      setJiFileError(true);
      isValid = false;
    }
    if (isValid) {
      console.log("모든 필수 서류가 제출되었습니다.");
      router.push("preferential");
    } else {
      alert("필수 서류 중 누락된 항목이 있습니다.");
      // 필요한 경우 추가적인 오류 처리를 여기에 추가
    }
  };

  return (
    <div className="select-none flex flex-col w-screen">
      {/* 위쪽 */}
      <ApplierTopNav text="지원서 작성" showButton={true} />
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
            financeReportFiles={financeReportFiles}
            setFinanceReportFiles={setFinanceReportFiles}
            fileErrors={fileErrors}
            setFileErrors={setFileErrors}
            setPdfUrls={setPdfUrls}
          />
        </div>
        {/* 왼쪽 */}
        <ApplierSideNav
          comp="(주)한울건설"
          prev={"../info"}
          next={"preferential"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
