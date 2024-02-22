"use client";
import React, { useState } from "react";
import Icon from "../../../../../common/components/Icon/Icon";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleDefault from "../../../../../common/components/InputForm/InputStyleDefault";

const Register = () => {
  const [license, setLicense] = useState("");
  const [licenseError, setLicenseError] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileNameError, setFileNameError] = useState(false);

  const isFormValid = !licenseError && !fileNameError && license && fileName;

  return (
    <div className="bg-bgColor-white p-xl h-fit w-[500px]">
      {/* 첫 번째 영역: 면허 등록 */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-4 h-[44px]">
          <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
            면허 등록
          </span>
          <button className="h-[44px] w-[320px] flex items-center justify-center btnSize-m  bgColor-neutral textColor-low-emphasis rounded-s">
            <Icon name="Plus" height={16} width={16} />
          </button>
        </div>
        <div className="relative right-0 flex flex-col border borderColor rounded-s w-[320px] p-4 gap-y-2">
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  // 파일 이름을 상태에 설정합니다.
                  setFileName(e.target.files[0].name);
                  // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                  setFileNameError(false);
                }
              }}
              errorMessage="필수 입력란입니다."
              isError={fileNameError}
              setIsError={setFileNameError}
              setFileName={setFileName}
              setFileNameError={setFileNameError}
            />
          </div>

          {/* 제출 버튼 */}
          <div className="w-full">
            <button className="btnSize-m w-full bgColor-neutral textColor-low-emphasis rounded-s">
              면허 등록하기
            </button>
          </div>
        </div>
      </div>
      {/* 두 번째 영역: 지원 공종 선택 (이 부분은 구현 예정) */}
      {/* ... */}
    </div>
  );
};

export default Register;
