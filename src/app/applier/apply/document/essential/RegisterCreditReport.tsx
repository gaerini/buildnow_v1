// RegisterCreditReport.tsx

import React, { useState } from "react";
import Icon from "../../../../../../common/components/Icon/Icon";
import CreditReport from "./CreditReport";
import FileBadge from "../../../../../../common/components/InputForm/FileBadge";

interface CreditReportData {
  CRA: string;
  file: File;
}

type PdfUrlsType = {
  [key: string]: string[];
};

interface RegisterCreditReportProps {
  creditReport: CreditReportData[];
  setCreditReport: React.Dispatch<React.SetStateAction<CreditReportData[]>>;
  isCreditVisible: boolean;
  setIsCreditVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isError: boolean;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

const RegisterCreditReport: React.FC<RegisterCreditReportProps> = ({
  creditReport,
  setCreditReport,
  isCreditVisible,
  setIsCreditVisible,
  isError,
  setIsError,
  setPdfUrls,
}) => {
  const handleAddCreditReport = (CRA: string, file: File) => {
    setCreditReport([...creditReport, { CRA, file }]);
  };

  const handleRemoveFile = (CRA: string) => {
    setCreditReport(creditReport.filter((data) => data.CRA !== CRA));
  };

  const toggleCreditReportVisibility = () => {
    setIsCreditVisible(!isCreditVisible);
  };

  return (
    <div className="w-[436px]">
      <div className="flex justify-between items-center mb-1">
        <div className="flex justify-start items-center gap-1">
          <span className="text-paragraph-14 font-normal textColor-high-emphasis">
            신용평가보고서 &nbsp;
            <span className="textColor-mid-emphasis font-normal">
              (발급기관 상관 없이
              <span className="textColor-mid-emphasis font-bold">
                1개 이상 필수 제출
              </span>
              )
            </span>
          </span>
          <Icon name="IconLight" width={16} height={16} />
        </div>
      </div>
      <button
        className={`h-[44px] w-full flex items-center justify-center btnSize-m mb-2 ${
          isCreditVisible
            ? "bgColor-neutral textColor-low-emphasis"
            : "bgColor-white border borderColor textColor-low-emphasis hover:bgColor-neutral hover:textColor-high-emphasis"
        } rounded-s`}
        onClick={toggleCreditReportVisibility}
      >
        <Icon name="Plus" height={16} width={16} />
      </button>
      {isCreditVisible && (
        <div className="flex justify-end">
          <CreditReport
            onAddCreditReport={handleAddCreditReport}
            onRegister={() => setIsCreditVisible(false)}
            isError={isError}
            setIsError={setIsError}
            setPdfUrls={setPdfUrls}
            isSubmitButton={true}
          />
        </div>
      )}

      <div className="flex justify-start my-4">
        <div className="w-[full] flex flex-col gap-y-2">
          {creditReport.map((file, index) => (
            <FileBadge
              key={index}
              filename={`${file.CRA} | ${file.file.name}`}
              title={file.file.name}
              handleRemoveFile={() => handleRemoveFile(file.CRA)}
              badgeWidth="100"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegisterCreditReport;
