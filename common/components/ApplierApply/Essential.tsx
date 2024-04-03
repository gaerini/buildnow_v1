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
  saupFile: File | null;
  setSaupFile: React.Dispatch<React.SetStateAction<File | null>>;

  corpFile: File | null;
  setCorpFile: React.Dispatch<React.SetStateAction<File | null>>;
  isCorpEssential: boolean;

  ingamFile: File | null;
  setIngamFile: React.Dispatch<React.SetStateAction<File | null>>;

  sayongIngamFile: File | null;
  setSayongIngamFile: React.Dispatch<React.SetStateAction<File | null>>;

  taxFiles: File[];
  setTaxFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  creditReport: CreditReportData[];
  setCreditReport: React.Dispatch<
    React.SetStateAction<CreditReportData[] | []>
  >;

  jiFile: File | null;
  setJiFile: React.Dispatch<React.SetStateAction<File | null>>;

  fileErrors: boolean[];
  setFileErrors: React.Dispatch<React.SetStateAction<boolean>>[];
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;

  isTempSaved: boolean;
  setIsTempSaved: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Essential({
  saupFile,
  setSaupFile,
  corpFile,
  setCorpFile,
  isCorpEssential,
  ingamFile,
  setIngamFile,
  sayongIngamFile,
  setSayongIngamFile,
  taxFiles,
  setTaxFiles,
  creditReport,
  setCreditReport,
  jiFile,
  setJiFile,
  fileErrors,
  setFileErrors,
  setPdfUrls,
  isTempSaved,
  setIsTempSaved,
}: EssentialProps) {
  const handleSaupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSaupFile(e.target.files[0]);
      setIsErrorAtIndex(0)(false);
    }
  };

  const handleCorpFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCorpFile(e.target.files[0]);
      setIsErrorAtIndex(1)(false);
    }
  };

  const handleIngamFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIngamFile(e.target.files[0]);
      setIsErrorAtIndex(2)(false);
    }
  };

  const handleSayongIngamFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setSayongIngamFile(e.target.files[0]);
      setIsErrorAtIndex(3)(false);
    }
  };

  const handleTaxFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setTaxFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
    setIsErrorAtIndex(4)(false); // 두 번째 인덱스(납세 증명서) 에러 상태 해제
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

  const handleJiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setJiFile(e.target.files[0]);
      setIsErrorAtIndex(6)(false);
    }
  };

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
            titleText="사업자등록증"
            isEssential={true}
            fileName={saupFile?.name}
            fileNameError={fileErrors[0]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="SaupRegisterFile"
                onChange={handleSaupChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[0]}
                setIsError={setIsErrorAtIndex(0)}
                setFile={setSaupFile}
                setFileNameError={setIsErrorAtIndex(0)}
                setPdfUrls={setPdfUrls}
                isToolTip={true}
                detailedText={
                  <span className="textColor-mid-emphasis text-paragraph-12">
                    본사 사업자 등록증
                  </span>
                }
              />
            }
          />
          <InputFileLayer
            titleText="법인 등기부등본 (법인에 해당하는 경우에 한함)"
            isEssential={isCorpEssential}
            fileName={corpFile?.name}
            fileNameError={fileErrors[1]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="BubinRegisterFile"
                onChange={handleCorpFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[1]}
                setIsError={setIsErrorAtIndex(1)}
                setFile={setCorpFile}
                setFileNameError={setIsErrorAtIndex(1)}
                setPdfUrls={setPdfUrls}
                isToolTip={true}
                detailedText={
                  <span className="textColor-mid-emphasis text-paragraph-12">
                    등기소 발급원부 (접수일로부터 1개월 이내 발급)
                  </span>
                }
              />
            }
          />

          <InputFileLayer
            titleText="인감증명서"
            isEssential={true}
            fileName={ingamFile?.name}
            fileNameError={fileErrors[2]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="IngamCertificateFile"
                onChange={handleIngamFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[2]}
                setIsError={setIsErrorAtIndex(2)}
                setFile={setIngamFile}
                setFileNameError={setIsErrorAtIndex(2)}
                setPdfUrls={setPdfUrls}
                isToolTip={true}
                detailedText={
                  <span className="textColor-mid-emphasis text-paragraph-12">
                    등기소 발급 원부
                  </span>
                }
              />
            }
          />
          <InputFileLayer
            titleText="사용인감계"
            isEssential={true}
            fileName={sayongIngamFile?.name}
            fileNameError={fileErrors[3]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="UseIngamFile"
                onChange={handleSayongIngamFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[3]}
                setIsError={setIsErrorAtIndex(3)}
                setFile={setSayongIngamFile}
                setFileNameError={setIsErrorAtIndex(3)}
                setPdfUrls={setPdfUrls}
                isHelp={false}
              />
            }
          />
          <InputFileLayer
            titleText="납세 (시, 국세 완납 증명서)"
            isEssential={true}
            fileName={taxFiles.map((file) => file.name)}
            fileNameError={fileErrors[4]}
            inputComponent={
              <InputStyleMultiUploadBtn
                titleText="TaxPayementCertificateFile"
                onChange={handleTaxFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[4]}
                setIsError={setIsErrorAtIndex(4)}
                setFiles={setTaxFiles}
                setFilesNameError={setIsErrorAtIndex(4)}
                setPdfUrls={setPdfUrls}
                isToolTip={true}
                detailedText={
                  <span className="textColor-mid-emphasis text-paragraph-12">
                    국세(세무서), 지방세(구청, 동사무소) 발급원부
                  </span>
                }
              />
            }
          />
          {/* <InputFileLayer
            titleText="신용평가 보고서"
            isEssential={true}
            fileName={creditReport.map((file) => file.name)}
            fileNameError={fileErrors[5]}
            inputComponent={
              <InputStyleMultiUploadBtn
                titleText="신용평가 보고서"
                onChange={handlecreditReportChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[5]}
                setIsError={setIsErrorAtIndex(5)}
                setFiles={setCreditReport}
                setFilesNameError={setIsErrorAtIndex(5)}
                setPdfUrls={setPdfUrls}
                isHelp={false}
              />
            }
          />
           */}
          <RegisterCreditReport
            creditReport={creditReport}
            setCreditReport={setCreditReport}
            isCreditVisible={isCreditReportVisible}
            setIsCreditVisible={setIsCreditReportVisible}
            isError={fileErrors[5]}
            setIsError={setIsErrorAtIndex(5)}
            setPdfUrls={setPdfUrls}
          />
          <InputFileLayer
            titleText="공사 지명원"
            isEssential={true}
            fileName={jiFile?.name}
            fileNameError={fileErrors[6]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="CompanyProfileFile"
                onChange={handleJiFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[6]}
                setIsError={setIsErrorAtIndex(6)}
                setFile={setSayongIngamFile}
                setFileNameError={setIsErrorAtIndex(6)}
                setPdfUrls={setPdfUrls}
                isToolTip={true}
                detailedText={
                  <span className="textColor-mid-emphasis text-paragraph-12">
                    공사 실적, 기술자 수, 조직도 등 포함
                  </span>
                }
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
