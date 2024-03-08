import React, { useState, useEffect } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";

interface EssentialProps {
  corpFiles: File|null;
  setCorpFiles: React.Dispatch<React.SetStateAction<File| null>>;
  taxFiles: File[];
  setTaxFiles: React.Dispatch<React.SetStateAction<File[]| []>>;
  jejeFiles: File|null;
  setJejeFiles: React.Dispatch<React.SetStateAction<File| null>>;
  disasterFiles: File|null;
  setDisasterFiles: React.Dispatch<React.SetStateAction<File| null>>;
  bizStateFiles: File|null;
  setBizStateFiles: React.Dispatch<React.SetStateAction<File| null>>;
  constPerformFiles: File[];
  setConstPerformFiles: React.Dispatch<React.SetStateAction<File[]| []>>;
  financeReportFiles: File[];
  setFinanceReportFiles: React.Dispatch<React.SetStateAction<File[]| []>>;
  fileErrors: boolean[];
  setFileErrors: React.Dispatch<React.SetStateAction<boolean>>[];
}

export default function Essential({
  corpFiles,
  setCorpFiles,
  taxFiles,
  setTaxFiles,
  jejeFiles,
  setJejeFiles,
  disasterFiles,
  setDisasterFiles,
  bizStateFiles,
  setBizStateFiles,
  constPerformFiles,
  setConstPerformFiles,
  financeReportFiles,
  setFinanceReportFiles,
  fileErrors,
  setFileErrors,
}: EssentialProps) {
  const handleCorpFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCorpFiles(e.target.files[0]);
      setIsErrorAtIndex(0)(false); // 첫 번째 인덱스(법인 등기부등본) 에러 상태 업데이트
    }
  };

  const handleTaxFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setTaxFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
    setIsErrorAtIndex(1)(false); // 두 번째 인덱스(납세 증명서) 에러 상태 해제
  };

  const handleJejeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setJejeFiles(e.target.files[0]);
      setIsErrorAtIndex(2)(false);
    }
  };

  const handleDisasterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDisasterFiles(e.target.files[0]);
      setIsErrorAtIndex(3)(false);
    }
  };

  const handleBizStateFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBizStateFiles(e.target.files[0]);
      setIsErrorAtIndex(4)(false);
    }
  };

  const handleConstPerformFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setConstPerformFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
    setIsErrorAtIndex(5)(false);
  };

  const handleFinanceReportFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setFinanceReportFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
    setIsErrorAtIndex(6)(false);
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
            titleText="법인 등기부등본"
            isEssential={true}
            fileName={corpFiles?.name}
            fileNameError={fileErrors[0]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="법인 등기부등본"
                onChange={handleCorpFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[0]}
                setIsError={setIsErrorAtIndex(0)}
                setFile={setCorpFiles}
                setFileNameError={setIsErrorAtIndex(0)}
              />
            }
          />
          <InputFileLayer
            titleText="납세 (시, 국세 완납 증명서)"
            isEssential={true}
            fileName={taxFiles.map(file => file.name)}
            fileNameError={fileErrors[1]}
            inputComponent={
              <InputStyleMultiUploadBtn
                titleText="납세 (시, 국세 완납 증명서)"
                onChange={handleTaxFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[1]}
                setIsError={setIsErrorAtIndex(1)}
                setFiles={setTaxFiles}
                setFilesNameError={setIsErrorAtIndex(1)}
              />
            }
          />
          <InputFileLayer
            titleText="건설산업기본법에 의한 제재처분 확인서"
            isEssential={true}
            fileName={jejeFiles?.name}
            fileNameError={fileErrors[2]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="건설산업기본법에 의한 제재처분 확인서"
                onChange={handleJejeFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[2]}
                setIsError={setIsErrorAtIndex(2)}
                setFile={setJejeFiles}
                setFileNameError={setIsErrorAtIndex(2)}
              />
            }
          />
          <InputFileLayer
            titleText="중대재해 이력 확인서"
            isEssential={true}
            fileName={disasterFiles?.name}
            fileNameError={fileErrors[3]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="중대재해 이력 확인서"
                onChange={handleDisasterFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[3]}
                setIsError={setIsErrorAtIndex(3)}
                setFile={setDisasterFiles}
                setFileNameError={setIsErrorAtIndex(3)}
              />
            }
          />
          <InputFileLayer
            titleText="경영상태 확인원"
            isEssential={true}
            fileName={bizStateFiles?.name}
            fileNameError={fileErrors[4]}
            inputComponent={
              <InputStyleUploadBtn
                titleText="경영상태 확인원"
                onChange={handleBizStateFileChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[4]}
                setIsError={setIsErrorAtIndex(4)}
                setFile={setBizStateFiles}
                setFileNameError={setIsErrorAtIndex(4)}
              />
            }
          />
          <InputFileLayer
            titleText="건설 공사 실적 확인서 (3개년)"
            isEssential={true}
            fileName={constPerformFiles.map(file => file.name)}
            fileNameError={fileErrors[5]}
            inputComponent={
              <InputStyleMultiUploadBtn
                titleText="건설 공사 실적 확인서 (3개년)"
                onChange={handleConstPerformFilesChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[5]}
                setIsError={setIsErrorAtIndex(5)}
                setFiles={setConstPerformFiles}
                setFilesNameError={setIsErrorAtIndex(5)}
              />
            }
          />
          <InputFileLayer
            titleText="신용평가 보고서"
            isEssential={true}
            fileName={financeReportFiles.map(file => file.name)}
            fileNameError={fileErrors[6]}
            inputComponent={
              <InputStyleMultiUploadBtn
                titleText="신용평가 보고서"
                onChange={handleFinanceReportFilesChange}
                errorMessage="필수 입력란입니다."
                isError={fileErrors[6]}
                setIsError={setIsErrorAtIndex(6)}
                setFiles={setFinanceReportFiles}
                setFilesNameError={setIsErrorAtIndex(6)}
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
