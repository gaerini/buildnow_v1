import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";

interface LicenseProps {
  onAddLicense: (licenseName: string, fileName: string) => void;
}

const License: React.FC<LicenseProps> = ({ onAddLicense }) => {
  const [license, setLicense] = useState("");
  const [licenseError, setLicenseError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileNameError, setFileNameError] = useState(false);
  const allInputsFilled = license.length > 0 && fileName.length > 0;

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLicense(e.target.value);
    setLicenseError(!e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setFileNameError(false);
    } else {
      setFileNameError(true);
    }
  };
  console.log(license, fileName);

  const handleRegisterLicense = () => {
    if (license && fileName) {
      onAddLicense(license, fileName);
      setLicense("");
      //   setFileName("");
      setLicenseError(false);
      setFileNameError(false);
    } else {
      setLicenseError(!license);
      setFileNameError(!fileName);
    }
  };

  return (
    <div className="flex flex-col border borderColor rounded-s w-[320px] p-4 gap-y-2">
      {/* 보유 면허 입력 폼 */}
      <div className="flex flex-col w-[286px]">
        <div className="flex justify-between items-center mb-1">
          <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
            보유 면허
          </span>
          <div
            className={
              !licenseError && license.length > 0
                ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
            }
          >
            <Icon name="SubmitCheck" width={16} height={16} />
          </div>
        </div>
        <InputStyleDefault
          type="license"
          placeholder="면허를 선택하세요"
          onChange={(e) => setLicense(e.target.value)} // managerName를 state로 관리하고, OnChange일 떄 저장
          value={license} // 상태에 바인딩
          errorMessage="면허가 선택되지 않았습니다"
          isError={licenseError} // license error의 경우에는, 입력이 되어야하는 것으로 해줘!!
          setIsError={setLicenseError}
        />
      </div>
      {/* 건설업 등록증 업로드 폼 */}
      <div className="flex flex-col w-[286px]">
        <div className="flex justify-between items-center mb-1">
          <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
            건설업 등록증
          </span>
          <div
            className={
              !fileNameError && fileName.length > 0
                ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
            }
          >
            <Icon name="SubmitCheck" width={16} height={16} />
          </div>
        </div>
        <InputStyleUploadBtn
          onChange={handleFileChange}
          errorMessage="필수 입력란입니다."
          isError={fileNameError}
          setIsError={setFileNameError}
          setFileName={setFileName}
          setFileNameError={setFileNameError}
        />
      </div>

      {/* 제출 버튼 */}

      <button
        onClick={handleRegisterLicense}
        className={`btnSize-m w-full ${
          allInputsFilled
            ? "btnStyle-main-1" // 모든 입력 폼이 채워졌을 때의 스타일
            : "bgColor-neutral textColor-low-emphasis" // 그렇지 않을 때의 스타일
        } rounded-s`}
      >
        면허 등록하기
      </button>
    </div>
  );
};

export default License;
