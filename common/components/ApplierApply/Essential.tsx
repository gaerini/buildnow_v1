"use client";
import React, { useState, useEffect } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import RegisterCreditReport from "../../../src/app/applier/apply/document/essential/RegisterCreditReport";
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import dynamic from "next/dynamic";

// 동적으로 FileInput 컴포넌트를 불러옵니다. 서버 사이드 렌더링은 비활성화됩니다.
const FileInput = dynamic(() => import("./FileInput"), {
  ssr: false,
});

interface CreditReportData {
  CRA: string;
  file: File;
}

interface FileData {
  file: File | File[] | null;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | File[] | null>>;
  isToolTip: boolean;
  detailedText: React.ReactNode;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface Document {
  name: string;
  required: boolean;
  isMultiple: boolean;
}

interface EssentialProps {
  fileStates: FileData[];
  documents: Document[];
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
  isTempSaved: boolean;
  setIsTempSaved: React.Dispatch<React.SetStateAction<boolean>>;
  creditReport?: CreditReportData[];
  setCreditReport?: React.Dispatch<
    React.SetStateAction<CreditReportData[] | []>
  >;
  creditReportFilesError?: boolean;
  setCreditReportFilesError?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Essential: React.FC<EssentialProps> = ({
  fileStates,
  documents,
  setPdfUrls,
  isTempSaved,
  setIsTempSaved,
  creditReport,
  setCreditReport,
  creditReportFilesError,
  setCreditReportFilesError,
}) => {
  const [isCreditReportVisible, setIsCreditReportVisible] = useState(true);

  // Ensure default values or handling for optional properties
  const handleCreditReport = creditReport || [];
  const handleSetCreditReport = setCreditReport || (() => {});
  const handleCreditReportFilesError = creditReportFilesError || false;
  const handleSetCreditReportFilesError =
    setCreditReportFilesError || (() => {});

  return (
    <div className="mt-[121px] ml-[641px] flex ">
      {/* 오른쪽 영역 중 input 버튼 영역 */}
      <div className="w-full bgColor-white">
        {/* 내용 - width 고정*/}
        <div className="w-[500px] bgColor-white p-xl justify-center items-center flex flex-col gap-4">
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
          {fileStates.some((fs) => fs.error) && (
            <div className="h-[36px] w-full">
              <Alert
                state="negative"
                alertIcon={<Icon name="Error" width={16} height={16} />}
                alertText={
                  <p className="text-paragraph-14 font-light">
                    {"필수 입력 항목이 모두 입력되지 않았습니다"}
                  </p>
                }
              />
            </div>
          )}

          {documents.map((doc, index) => (
            <FileInput
              key={doc.name}
              label={doc.name}
              isRequired={doc.required}
              fileData={fileStates[index]}
              isMultiple={doc.isMultiple}
              setPdfUrls={setPdfUrls}
            />
          ))}
          <RegisterCreditReport
            creditReport={handleCreditReport}
            setCreditReport={handleSetCreditReport}
            isCreditVisible={isCreditReportVisible}
            setIsCreditVisible={setIsCreditReportVisible}
            isError={handleCreditReportFilesError}
            setIsError={handleSetCreditReportFilesError}
            setPdfUrls={setPdfUrls}
            isSubmitButton={false}
          />
        </div>
      </div>
    </div>
  );
};
export default Essential;
