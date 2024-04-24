"use client";

import React, { useState, useEffect } from "react";
import Icon from "../../../../../../common/components/Icon/Icon";
import InputStyleDefault from "../../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleUploadBtn from "../../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleDropdown from "../../../../../../common/components/InputForm/InputStyleDropdown";

interface CreditReportData {
  CRA: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface CreditReportProps {
  onAddCreditReport: (CRA: string, file: File) => void;
  onRegister?: () => void;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
  creditReportNum?: number;
  isSubmitButton?: boolean;
  essentialCreditReportNum?: number;
  isEssential?: boolean;
}

const creditReport: React.FC<CreditReportProps> = ({
  onAddCreditReport,
  onRegister,
  isError,
  setIsError,
  setPdfUrls,
  creditReportNum,
  essentialCreditReportNum,
  isSubmitButton,
  isEssential = true,
}) => {
  const [creditReport, setCreditReport] = useState("");
  const [creditReportError, setCreditReportError] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);
  const allInputsFilled = creditReport.length > 0 && file !== null;

  useEffect(() => {
    if (!isSubmitButton && creditReport && file) {
      handleRegisterCreditReport();
    }
  }, [creditReport, file, isSubmitButton]);

  const handleDropdownSelect = (selected: string) => {
    setCreditReport(selected);
    if (file) {
      onAddCreditReport(selected, file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError?.(false);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    } else {
      setFileError(true);
    }
  };

  const handleRegisterCreditReport = () => {
    if (creditReport && file) {
      onAddCreditReport(creditReport, file);
      onRegister?.();
      setCreditReport("");
      setCreditReportError(false);
      setFile(null);
      setFileError(false);
    } else {
      setCreditReportError(!creditReport);
      setFileError(!file);
    }
  };

  const getTitleText = (creditReport: string) => {
    switch (creditReport) {
      case "이크레더블":
        return "ecredible";
      case "나이스디앤비":
        return "nicednb";
      case "나이스평가정보":
        return "niceinfo";
      default:
        return "etc";
    }
  };

  return (
    <div className="flex flex-col border borderColor rounded-s w-full p-4 gap-y-2 h-fit">
      {/* 보유 면허 입력 폼 */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 font-normal textColor-high-emphasis">
              발급 기관
            </span>
            <>
              {isEssential && <Icon name="IconLight" width={16} height={16} />}
            </>
          </div>
          <div
            className={
              !creditReportError && creditReport.length > 0
                ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
            }
          >
            <Icon name="SubmitCheck" width={16} height={16} />
          </div>
        </div>

        <div className="relative">
          {" "}
          {/* 이 div 태그에 relative 위치와 높은 z-index를 추가 */}
          <InputStyleDropdown
            placeholder="선택하세요"
            inputList={["이크레더블", "나이스디앤비", "나이스평가정보"]}
            value={creditReport}
            onSelect={handleDropdownSelect}
            isError={isError}
            setIsError={setIsError}
            errorMessage="보유하신 신용평가보고서의 발급기관을 선택하세요"
            dropdownWidth={404}
            sortGroup={false}
          />
        </div>
      </div>
      {/* 신용평가보고서 업로드 폼 */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 font-normal textColor-high-emphasis">
              신용평가보고서
            </span>
            <>
              {isEssential && <Icon name="IconLight" width={16} height={16} />}
            </>
          </div>
          <div
            className={
              !fileError && file !== null
                ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
            }
          >
            <Icon name="SubmitCheck" width={16} height={16} />
          </div>
        </div>
        <InputStyleUploadBtn
          titleText={`CRR${
            creditReport ? `/${getTitleText(creditReport)}` : ""
          }`}
          onChange={handleFileChange}
          errorMessage="신용평가보고서를 첨부해주세요"
          isError={isError}
          setIsError={setIsError}
          setFile={setFile}
          setFileNameError={setFileError}
          truncateWidth="160px"
          description="신용평가보고서 (pdf)"
          isHelp={false}
          setPdfUrls={setPdfUrls}
        />
      </div>

      {/* 제출 버튼 */}

      {isSubmitButton && ( // isSubmitButton이 true일 때만 버튼 표시
        <button
          onClick={handleRegisterCreditReport}
          className={`btnSize-m w-full ${
            allInputsFilled
              ? "btnStyle-main-1" // 모든 입력 폼이 채워졌을 때의 스타일
              : "bgColor-neutral textColor-low-emphasis" // 그렇지 않을 때의 스타일
          } rounded-s`}
        >
          등록하기
        </button>
      )}
    </div>
  );
};

export default creditReport;
