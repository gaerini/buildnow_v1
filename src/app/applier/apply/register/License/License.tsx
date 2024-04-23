"use client";

import React, { useState } from "react";
import Icon from "../../../../../../common/components/Icon/Icon";
import InputStyleDefault from "../../../../../../common/components/InputForm/InputStyleDefault";
import InputStyleUploadBtn from "../../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleDropdown from "../../../../../../common/components/InputForm/InputStyleDropdown";

type PdfUrlsType = {
  [key: string]: string[];
};

interface LicenseProps {
  onAddLicense: (licenseName: string, file: File) => void;
  onRegister?: () => void;
  isError?: boolean;
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
  licenseNum?: number;
  isSubmitButton: boolean;
  essentialLicenseNum?: number;
  isEssential?: boolean;
}

const License: React.FC<LicenseProps> = ({
  onAddLicense,
  onRegister,
  isError,
  setIsError,
  setPdfUrls,
  licenseNum,
  isSubmitButton,
  isEssential = true,
}) => {
  const [license, setLicense] = useState("");
  const [licenseError, setLicenseError] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState(false);

  const [licenseNote, setLicenseNote] = useState<File | null>(null);
  const [licenseNoteError, setLicenseNoteError] = useState(false);

  const allInputsFilled = license.length > 0 && file !== null;

  const handleDropdownSelect = (selected: string) => {
    setLicense(selected);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError?.(false);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      if (license) {
        onAddLicense(`${license} 면허 수첩`, selectedFile); // 파일 선택 시 onAddLicense 호출
      }
    } else {
      setFileError(true);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsError?.(false);
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setLicenseNote(selectedFile);
      if (license) {
        onAddLicense(`${license} 등록증`, selectedFile); // 파일 선택 시 onAddLicense 호출
      }
    } else {
      setLicenseNoteError(true);
    }
  };

  const handleRegisterLicense = () => {
    if (license && file) {
      onAddLicense(license, file);
      onRegister?.();
      setLicense("");
      setLicenseError(false);
      setFileError(false);
    } else {
      setLicenseError(!license);
      setFileError(!file?.name);
    }
  };

  return (
    <div className="flex flex-col border borderColor rounded-s w-full p-4 gap-y-2 h-fit">
      {/* 보유 면허 입력 폼 */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 font-normal textColor-high-emphasis">
              보유 면허 {licenseNum}
            </span>
            <>
              {isEssential && <Icon name="IconLight" width={16} height={16} />}
            </>
          </div>
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
          isError={isError}
          setIsError={setIsError}
          errorMessage="보유 면허를 선택해주세요"
          dropdownWidth={404}
        />
      </div>
      {/* 건설업 등록증 업로드 폼 */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 font-normal textColor-high-emphasis">
              건설업 등록증 {licenseNum}
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
          titleText={`${license} 등록증`}
          onChange={handleFileChange}
          errorMessage="건설업 등록증을 첨부해주세요"
          isError={isError}
          setIsError={setIsError}
          setFile={setFile}
          setFileNameError={setFileError}
          truncateWidth="160px"
          description="면허 인증 가능한 건설업 등록증 (pdf, 5mb)"
          isHelp={false}
          setPdfUrls={setPdfUrls}
        />
      </div>

      {/* 건설업 면허 수첩 업로드 폼 */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <div className="flex justify-start items-center gap-1">
            <span className="text-paragraph-14 font-normal textColor-high-emphasis">
              건설업 면허 수첩 {licenseNum}
            </span>
            <>
              {isEssential && <Icon name="IconLight" width={16} height={16} />}
            </>
          </div>
          <div
            className={
              !licenseNoteError && licenseNote !== null
                ? "textColor-positive" // 이 조건이 참일 때 적용할 Tailwind CSS 클래스
                : "textColor-low-emphasis" // 조건이 거짓일 때 적용할 Tailwind CSS 클래스
            }
          >
            <Icon name="SubmitCheck" width={16} height={16} />
          </div>
        </div>
        <InputStyleUploadBtn
          titleText={`${license} 면허 수첩`}
          onChange={handleNoteChange}
          errorMessage="건설업 면허 수첩을 첨부해주세요"
          isError={isError}
          setIsError={setIsError}
          setFile={setFile}
          setFileNameError={setFileError}
          truncateWidth="160px"
          description="면허 인증 가능한 건설업 면허 수첩 (pdf, 5mb)"
          isHelp={false}
          setPdfUrls={setPdfUrls}
        />
      </div>

      {/* 제출 버튼 */}
      {isSubmitButton && ( // isSubmitButton이 true일 때만 버튼 표시
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
      )}
    </div>
  );
};

export default License;
