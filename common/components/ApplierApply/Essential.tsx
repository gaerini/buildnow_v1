"use client";
import React, { useState, useEffect } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import RegisterCreditReport from "../../../src/app/applier/apply/document/essential/RegisterCreditReport";
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";

interface CreditReportData {
  CRA: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface EssentialProps {
  financialStateFile: File | null;
  setFinancialStateFile: React.Dispatch<React.SetStateAction<File | null>>;

  businessStateFile: File | null;
  setBusinessStateFile: React.Dispatch<React.SetStateAction<File | null>>;

  engineerFile: File | null;
  setEngineerFile: React.Dispatch<React.SetStateAction<File | null>>;
  // isCorpEssential: boolean;

  taxFiles: File[];
  setTaxFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  performance3YRFile: File | null;
  setperformance3YRFile: React.Dispatch<React.SetStateAction<File | null>>;

  creditReport: CreditReportData[];
  setCreditReport: React.Dispatch<
    React.SetStateAction<CreditReportData[] | []>
  >;

  fileErrors: boolean[];
  setFileErrors: React.Dispatch<React.SetStateAction<boolean>>[];
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;

  isTempSaved: boolean;
  setIsTempSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Essential({
  financialStateFile,
  setFinancialStateFile,
  businessStateFile,
  setBusinessStateFile,
  engineerFile,
  setEngineerFile,
  taxFiles,
  setTaxFiles,
  performance3YRFile,
  setperformance3YRFile,
  creditReport,
  setCreditReport,
  fileErrors,
  setFileErrors,
  setPdfUrls,
  isTempSaved,
  setIsTempSaved,
}: EssentialProps) {
  const handleFinancialStateFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFinancialStateFile(e.target.files[0]);
      setIsErrorAtIndex(0)(false);
    }
  };

  const handleBusinessStateFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setBusinessStateFile(e.target.files[0]);
      setIsErrorAtIndex(1)(false);
    }
  };

  const handleEngineerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEngineerFile(e.target.files[0]);
      setIsErrorAtIndex(2)(false);
    }
  };

  const handleTaxFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setTaxFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
    setIsErrorAtIndex(4)(false); // 두 번째 인덱스(납세 증명서) 에러 상태 해제
  };

  const handlePerformance3YRFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setperformance3YRFile(e.target.files[0]);
      setIsErrorAtIndex(2)(false);
    }
  };

  // const handlecreditReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFiles = e.target.files ? Array.from(e.target.files) : [];
  //   setCreditReport((prev) => [
  //     ...prev,
  //     ...newFiles.map((file) => ({
  //       CRA: file.CRA, // Replace with your actual logic to obtain CRA
  //       file: file.file
  //     }))
  //   ]);
  //   setIsErrorAtIndex(5)(false);
  // };

  const [isCreditReportVisible, setIsCreditReportVisible] = useState(true);

  // const handleJiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files && e.target.files.length > 0) {
  //     setJiFile(e.target.files[0]);
  //     setIsErrorAtIndex(6)(false);
  //   }
  // };

  const setIsErrorAtIndex = (index: number) => {
    return setFileErrors[index];
  };

  const [error, setError] = useState(false);

  useEffect(() => {
    // fileErrors 배열에 오류가 하나라도 있는지 확인
    const hasError = fileErrors.some((e) => e);
    setError(hasError);
  }, [fileErrors]);

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

          {error && (
            <div className="h-[36px] w-full">
              <Alert
                state="negative"
                alertIcon={<Icon name="Error" width={16} height={16} />}
                alertText={
                  <p className="text-paragraph-14 font-light">
                    {"필수 입력 항목이 모두 입력되지 않았습니다"}
                  </p>
                }
                onClose={() => {
                  setError(false);
                  setIsErrorAtIndex(0)(false);
                  setIsErrorAtIndex(1)(false);
                  setIsErrorAtIndex(2)(false);
                  setIsErrorAtIndex(3)(false);
                  setIsErrorAtIndex(4)(false);
                  setIsErrorAtIndex(5)(false);
                  setIsErrorAtIndex(6)(false);
                }}
              />
            </div>
          )}
          <InputFileLayer
            titleText="재무제표"
            isEssential={true}
            fileName={financialStateFile?.name}
            fileNameError={fileErrors[0]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="재무제표"
                onChange={handleFinancialStateFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[0]}
                setIsError={setIsErrorAtIndex(0)}
                setFile={setFinancialStateFile}
                setFileNameError={setIsErrorAtIndex(0)}
                setPdfUrls={setPdfUrls}
                isToolTip={false}
                isHelp={false}
                // detailedText={
                //   <span className="textColor-mid-emphasis text-paragraph-12">
                //     본사 사업자 등록증
                //   </span>
                // }
              />
            }
          />
          <InputFileLayer
            titleText="경영상태 확인원"
            isEssential={true}
            fileName={businessStateFile?.name}
            fileNameError={fileErrors[1]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="경영상태 확인원"
                onChange={handleBusinessStateFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[1]}
                setIsError={setIsErrorAtIndex(1)}
                setFile={setBusinessStateFile}
                setFileNameError={setIsErrorAtIndex(1)}
                setPdfUrls={setPdfUrls}
                isToolTip={false}
                isHelp={false}
                // detailedText={
                //   <span className="textColor-mid-emphasis text-paragraph-12">
                //     등기소 발급원부 (접수일로부터 1개월 이내 발급)
                //   </span>
                // }
              />
            }
          />

          <InputFileLayer
            titleText="기술자 보유현황"
            isEssential={true}
            fileName={engineerFile?.name}
            fileNameError={fileErrors[2]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="기술자 보유현황"
                onChange={handleEngineerFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[2]}
                setIsError={setIsErrorAtIndex(2)}
                setFile={setEngineerFile}
                setFileNameError={setIsErrorAtIndex(2)}
                setPdfUrls={setPdfUrls}
                isToolTip={true}
                isHelp={false}
              />
            }
          />
          <InputFileLayer
            titleText="최근 3년간 시공실적 증명서"
            isEssential={true}
            fileName={performance3YRFile?.name}
            fileNameError={fileErrors[3]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="최근 3년간 시공실적 증명서"
                onChange={handlePerformance3YRFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[3]}
                setIsError={setIsErrorAtIndex(3)}
                setFile={setperformance3YRFile}
                setFileNameError={setIsErrorAtIndex(3)}
                setPdfUrls={setPdfUrls}
                isHelp={false}
              />
            }
          />
          <InputFileLayer
            titleText="납세 (시,국세 완납 증명서)"
            isEssential={true}
            fileName={taxFiles.map((file) => file.name)}
            fileNameError={fileErrors[4]}
            inputComponent={
              <InputStyleMultiUploadBtn
                titleText="납세 (시,국세 완납 증명서)"
                onChange={handleTaxFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[4]}
                setIsError={setIsErrorAtIndex(4)}
                setFiles={setTaxFiles}
                setFilesNameError={setIsErrorAtIndex(4)}
                setPdfUrls={setPdfUrls}
  
                detailedText={
                  <span className="textColor-mid-emphasis text-paragraph-12">
                    국세(세무서), 지방세(구청, 동사무소) 발급원부
                  </span>
                }
              />
            }
          />
          <RegisterCreditReport
            creditReport={creditReport}
            setCreditReport={setCreditReport}
            isCreditVisible={isCreditReportVisible}
            setIsCreditVisible={setIsCreditReportVisible}
            isError={fileErrors[5]}
            setIsError={setIsErrorAtIndex(5)}
            setPdfUrls={setPdfUrls}
            isSubmitButton={false}
          />
        </div>
      </div>
    </div>
  );
}
