import React, { useState } from "react";
import Header from "./Header";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";

export default function Essential() {
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
    <div>
      {/* 좌측 네비게이터 */}
      {/* 오른쪽 영역 */}
      <div>
        {/* 제목 */}
        <Header
          titleText="3-1. 필수 서류 등록"
          additionalText="필수 서류란?"
          isHoverable={true}
          detailedIcon="✅"
          detailedText={
            <div>
              <span className="text-blue-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
                협력업체 지원을 위해 필수로 등록해야 하는 서류입니다. <br />
              </span>
              <span className="text-blue-500 text-sm font-bold font-['Pretendard Variable'] leading-tight">
                등록하지 않으면 협력업체 지원이 불가
              </span>
              <span className="text-blue-500 text-sm font-normal font-['Pretendard Variable'] leading-tight">
                합니다
              </span>
            </div>
          }
        />
        {/* 내용 - width 고정*/}
        <div className="w-[500px] bgColor-white p-xl justify-center items-center flex-col gap-4">
          <InputFileLayer
            titleText="법인 등기부등본"
            isEssential={true}
            inputComponent={
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
            }
          />
        </div>
      </div>
    </div>
  );
}
