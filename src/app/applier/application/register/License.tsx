import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleDropdown from "../../../../../common/components/InputForm/InputStyleDropdown";

interface LicenseProps {
  onAddLicense: (licenseName: string, fileName: string) => void;
  onRegister: () => void;
}

const License: React.FC<LicenseProps> = ({ onAddLicense, onRegister }) => {
  const [license, setLicense] = useState("");
  const [licenseError, setLicenseError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileNameError, setFileNameError] = useState(false);
  const allInputsFilled = license.length > 0 && fileName.length > 0;

  const handleDropdownSelect = (selected: string) => {
    setLicense(selected); // Dropdown에서 선택된 항목을 license 상태로 설정
    setLicenseError(false); // 선택되었으므로 오류 상태를 해제
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
      onRegister();
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
        <div className="z-10">
          <InputStyleDropdown
            placeholder="선택하세요"
            inputList={[
              "지반조성 포장공사업",
              "실내건축공사업",
              "금속창호 지붕건축물 조립공사업",
              "도장 습식 방수 석공사업",
              "조경식재 시설물공사업",
              "철근 콘크리트 공사업",
              "구조물해체 비계 공사업",
              "상하수도 설비공사업",
              "철도 궤도공사업",
              "철강구조물공사업",
              "수중 준설공사업",
              "승강기 삭도 공사업",
              "기계가스설비 공사업",
              "가스난방공사업",
              "전기공사업",
              "정보통신공사업",
              "소방시설공사업",
            ]}
            value={license} // 현재 선택된 값을 전달
            onSelect={handleDropdownSelect} // 항목 선택 핸들러 전달
          />
        </div>
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
          titleText="licencse"
          onChange={handleFileChange}
          errorMessage="필수 입력란입니다."
          isError={fileNameError}
          setIsError={setFileNameError}
          setFileName={setFileName}
          setFileNameError={setFileNameError}
          truncateWidth="140"
          description="면허 인증 가능한 건설업 등록증 (pdf, 5mb)"
          isHelp={false}
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
