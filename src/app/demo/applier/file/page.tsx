"use client";

import React, { useState, useEffect } from "react";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";
import InputStyleBtn from "../../../../../common/components/InputForm/InputStyleBtn";
import Icon from "../../../../../common/components/Icon/Icon";

const JoinPage = () => {
  // 각 입력 필드에 대한 상태 관리
  const [fileName, setFileName] = useState("");
  const [fileNameError, setFileNameError] = useState(false);

  // 유효성 검사 함수
  const validate = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setFileNameError(!fileName); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  console.log(fileName);

  // 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center gap-y-8 w-[375px] px-8"
    >
      {/* 회원정보 섹션 */}
      <div>
        <div className="flex items-center w-[311px] h-[56px] text-subTitle-20 textColor-high-emphasis">
          회원정보
        </div>
        <div className="flex flex-col gap-y-4">
          {/* 회사명 입력 필드 */}
          <div className="flex flex-col w-[311px]">
            <div className="flex justify-between items-center mb-1">
              <span className="relative after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:right-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
                회사명
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
            {/* <InputStyleUploadBtn
              title="test"
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
            /> */}
          </div>
        </div>
      </div>

      <div>
        <button className="btnStyle-main-1 btnSize-xl w-[311px] hover:bg-primary-blue-400">
          회원가입 완료
        </button>
      </div>
    </form>
  );
};

export default JoinPage;
