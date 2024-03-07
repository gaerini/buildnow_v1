"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Essential from "../../../../../../common/components/ApplierApply/Essential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";
import { uploadFilesAndUpdateUrls } from "../../../../api/pdf/utils";

type PdfUrlsType = {
  [key: string]: string[];
};

export default function page() {
  const [corpFiles, setCorpFiles] = useState<File | null>(null);
  const [taxFiles, setTaxFiles] = useState<File[]>([]);
  const [jejeFiles, setJejeFiles] = useState<File | null>(null);
  const [disasterFiles, setDisasterFiles] = useState<File | null>(null);
  const [bizStateFiles, setBizStateFiles] = useState<File | null>(null);
  const [constPerformFiles, setConstPerformFiles] = useState<File[]>([]);
  const [financeReportFiles, setFinanceReportFiles] = useState<File[]>([]);

  const [corpFilesError, setCorpFilesError] = useState(false);
  const [taxFilesError, setTaxFilesError] = useState(false);
  const [jejeFilesError, setJejeFilesError] = useState(false);
  const [disasterFilesError, setDisasterFilesError] = useState(false);
  const [bizStateFilesError, setBizStateFilesError] = useState(false);
  const [constPerformFilesError, setConstPerformFilesError] = useState(false);
  const [financeReportFilesError, setFinanceReportFilesError] = useState(false);

  const router = useRouter();

  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  const fileErrors = [
    corpFilesError,
    taxFilesError,
    jejeFilesError,
    disasterFilesError,
    bizStateFilesError,
    constPerformFilesError,
    financeReportFilesError,
  ];
  const setFileErrors = [
    setCorpFilesError,
    setTaxFilesError,
    setJejeFilesError,
    setDisasterFilesError,
    setBizStateFilesError,
    setConstPerformFilesError,
    setFinanceReportFilesError,
  ];

  useEffect(() => {
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

  const validateAndNavigate = async () => {
    let isValid = true;

    // 각 파일 필드 검증 및 에러 상태 업데이트
    if (!corpFiles) {
      setCorpFilesError(true);
      isValid = false;
    }
    if (taxFiles.length === 0) {
      setTaxFilesError(true);
      isValid = false;
    }
    if (!jejeFiles) {
      setJejeFilesError(true);
      isValid = false;
    }
    if (!disasterFiles) {
      setDisasterFilesError(true);
      isValid = false;
    }
    if (!bizStateFiles) {
      setBizStateFilesError(true);
      isValid = false;
    }
    if (constPerformFiles.length === 0) {
      setConstPerformFilesError(true);
      isValid = false;
    }
    if (financeReportFiles.length === 0) {
      setFinanceReportFilesError(true);
      isValid = false;
    }

    // 모든 필수 파일이 업로드되었고, 에러가 없는 경우 다음 페이지로 이동
    if (isValid) {
      const filesToUpload = [
        { file: corpFiles, type: "application/pdf", doc: "법인 등기부등본" },
        ...taxFiles.map((file) => ({
          file,
          type: "application/pdf",
          doc: "납세 증명서",
        })),
        { file: jejeFiles, type: "application/pdf", doc: "제재처분 확인서" },
        {
          file: disasterFiles,
          type: "application/pdf",
          doc: "중대재해 이력 확인서",
        },
        {
          file: bizStateFiles,
          type: "application/pdf",
          doc: "경영상태 확인원",
        },
        ...constPerformFiles.map((file) => ({
          file,
          type: "application/pdf",
          doc: "건설 공사 실적 확인원",
        })),
        ...financeReportFiles.map((file) => ({
          file,
          type: "application/pdf",
          doc: "신용평가 보고서",
        })),
      ].flat();

      try {
        await uploadFilesAndUpdateUrls(filesToUpload, pdfUrls, setPdfUrls);
        console.log("모든 파일이 성공적으로 업로드되었습니다.");
        router.push("preferential");
      } catch (error) {
        console.error("업로드 중 오류 발생: ", error);
        alert("파일 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } else {
      alert("필수 서류 중 누락된 항목이 있습니다.");
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
            corpFiles={corpFiles}
            setCorpFiles={setCorpFiles}
            taxFiles={taxFiles}
            setTaxFiles={setTaxFiles}
            jejeFiles={jejeFiles}
            setJejeFiles={setJejeFiles}
            disasterFiles={disasterFiles}
            setDisasterFiles={setDisasterFiles}
            bizStateFiles={bizStateFiles}
            setBizStateFiles={setBizStateFiles}
            constPerformFiles={constPerformFiles}
            setConstPerformFiles={setConstPerformFiles}
            financeReportFiles={financeReportFiles}
            setFinanceReportFiles={setFinanceReportFiles}
            fileErrors={fileErrors}
            setFileErrors={setFileErrors}
          />
        </div>
        {/* 왼쪽 */}
        <ApplierSideNav
          comp={"한양이엔지(주)"}
          prev={"../info"}
          next={"preferential"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
