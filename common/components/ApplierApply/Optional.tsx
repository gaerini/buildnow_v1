import React, { useState } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";

export default function Optional() {
  //법인 등기부등본
  const [corpFiles, setCorpFiles] = useState("");
  const [corpFilesError, setCorpFilesError] = useState(false);

  //1. 유효성 검사 함수
  const validate_1 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setCorpFilesError(!corpFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_1()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //2. 납세 증명서
  const [taxFiles, setTaxFiles] = useState<string[]>([]);
  const [taxFilesError, setTaxFilesError] = useState(false);

  const validate_2 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = taxFiles.length > 0;
    setTaxFilesError(taxFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

    return isValid;
  };

  const handleSubmit_2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_2()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //3. 제재처분 확인서
  const [jejeFiles, setJejeFiles] = useState("");
  const [jejeFilesError, setJejeFilesError] = useState(false);

  const validate_3 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setJejeFilesError(!jejeFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_3()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //4. 중대재해 이력 확인서
  const [disasterFiles, setDisasterFiles] = useState("");
  const [disasterFilesError, setDisasterFilesError] = useState(false);

  const validate_4 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setDisasterFilesError(!disasterFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_4 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_4()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //5. 경영상태 확인원
  const [bizStateFiles, setBizStateFiles] = useState("");
  const [bizStateFilesError, setBizStateFilesError] = useState(false);

  const validate_5 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setBizStateFilesError(!bizStateFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_5 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_5()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //6. 건설공사 실적 확인서
  const [constPerformFiles, setConstPerformFiles] = useState<string[]>([]);
  const [constPerformFilesError, setConstPerformFilesError] = useState(false);

  const validate_6 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = constPerformFiles.length > 0;
    setConstPerformFilesError(constPerformFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

    return isValid;
  };

  const handleSubmit_6 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_6()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //7. 신용평가보고서
  const [financeReportFiles, setFinanceReportFiles] = useState<string[]>([]);
  const [financeReportFilesError, setFinanceReportFilesError] = useState(false);

  const validate_7 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = financeReportFiles.length > 0;
    setFinanceReportFilesError(financeReportFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

    return isValid;
  };

  const handleSubmit_7 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_7()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  return (
    <div className="mt-[121px] ml-[641px] flex-grow flex">
      {/* 오른쪽 영역 */}
      <div className="w-full bgColor-white">
        {/* 제목 */}

        {/* 오른쪽 영역 중 input 버튼 영역 */}
        <div className="bgColor-white">
          {/* 내용 - width 고정*/}
          <div className="w-[500px] bgColor-white p-xl justify-center items-center flex flex-col gap-4">
            <InputFileLayer
              titleText="법인 등기부등본"
              isEssential={true}
              fileName={corpFiles}
              fileNameError={corpFilesError}
              inputComponent={
                <InputStyleUploadBtn
                  titleText="법인 등기부등본"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      // 파일 이름을 상태에 설정합니다.
                      setCorpFiles(e.target.files[0].name);
                      // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                      setCorpFilesError(false);
                    }
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={corpFilesError}
                  setIsError={setCorpFilesError}
                  setFileName={setCorpFiles}
                  setFileNameError={setCorpFilesError}
                />
              }
            />
            <InputFileLayer
              titleText="납세 (시, 국세 완납 증명서)"
              isEssential={true}
              fileName={taxFiles}
              fileNameError={taxFilesError}
              inputComponent={
                <InputStyleMultiUploadBtn
                  titleText="납세 (시, 국세 완납 증명서)"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    setTaxFiles((prevFileNames) => {
                      // 새로운 파일 중에서 이전에 선택되지 않은 파일 이름만 필터링합니다.
                      const newFileNames = newFiles
                        .map((file) => file.name)
                        .filter(
                          (newFileName) => !prevFileNames.includes(newFileName)
                        );

                      // 중복되지 않은 새 파일 이름들을 이전 파일 이름 목록에 추가합니다.
                      const updatedFileNames = [
                        ...prevFileNames,
                        ...newFileNames,
                      ];
                      // 에러 상태를 false로 설정합니다. (필요한 경우)
                      setTaxFilesError(false);

                      return updatedFileNames;
                    });
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={taxFilesError}
                  setIsError={setTaxFilesError}
                  setFilesName={setTaxFiles}
                  setFilesNameError={setTaxFilesError}
                />
              }
            />
            <InputFileLayer
              titleText="건설산업기본법에 의한 제재처분 확인서"
              isEssential={true}
              fileName={jejeFiles}
              fileNameError={jejeFilesError}
              inputComponent={
                <InputStyleUploadBtn
                  titleText="건설산업기본법에 의한 제재처분 확인서"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      // 파일 이름을 상태에 설정합니다.
                      setJejeFiles(e.target.files[0].name);
                      // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                      setJejeFilesError(false);
                    }
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={jejeFilesError}
                  setIsError={setJejeFilesError}
                  setFileName={setJejeFiles}
                  setFileNameError={setJejeFilesError}
                />
              }
            />
            <InputFileLayer
              titleText="중대재해 이력 확인서"
              isEssential={true}
              fileName={disasterFiles}
              fileNameError={corpFilesError}
              inputComponent={
                <InputStyleUploadBtn
                  titleText="중대재해 이력 확인서"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      // 파일 이름을 상태에 설정합니다.
                      setDisasterFiles(e.target.files[0].name);
                      // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                      setDisasterFilesError(false);
                    }
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={disasterFilesError}
                  setIsError={setDisasterFilesError}
                  setFileName={setDisasterFiles}
                  setFileNameError={setDisasterFilesError}
                />
              }
            />
            <InputFileLayer
              titleText="경영상태 확인원"
              isEssential={true}
              fileName={bizStateFiles}
              fileNameError={bizStateFilesError}
              inputComponent={
                <InputStyleUploadBtn
                  titleText="경영상태 확인원"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files.length > 0) {
                      // 파일 이름을 상태에 설정합니다.
                      setBizStateFiles(e.target.files[0].name);
                      // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                      setBizStateFilesError(false);
                    }
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={bizStateFilesError}
                  setIsError={setBizStateFilesError}
                  setFileName={setBizStateFiles}
                  setFileNameError={setBizStateFilesError}
                />
              }
            />
            <InputFileLayer
              titleText="건설 공사 실적 확인서 (3개년)"
              isEssential={true}
              fileName={constPerformFiles}
              fileNameError={constPerformFilesError}
              inputComponent={
                <InputStyleMultiUploadBtn
                  titleText="건설 공사 실적 확인서 (3개년)"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    setConstPerformFiles((prevFileNames) => {
                      // 새로운 파일 중에서 이전에 선택되지 않은 파일 이름만 필터링합니다.
                      const newFileNames = newFiles
                        .map((file) => file.name)
                        .filter(
                          (newFileName) => !prevFileNames.includes(newFileName)
                        );

                      // 중복되지 않은 새 파일 이름들을 이전 파일 이름 목록에 추가합니다.
                      const updatedFileNames = [
                        ...prevFileNames,
                        ...newFileNames,
                      ];
                      // 에러 상태를 false로 설정합니다. (필요한 경우)
                      setConstPerformFilesError(false);

                      return updatedFileNames;
                    });
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={constPerformFilesError}
                  setIsError={setConstPerformFilesError}
                  setFilesName={setConstPerformFiles}
                  setFilesNameError={setConstPerformFilesError}
                />
              }
            />
            <InputFileLayer
              titleText="신용평가 보고서"
              isEssential={true}
              fileName={financeReportFiles}
              fileNameError={financeReportFilesError}
              inputComponent={
                <InputStyleMultiUploadBtn
                  titleText="신용평가 보고서"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const newFiles = e.target.files
                      ? Array.from(e.target.files)
                      : [];
                    setFinanceReportFiles((prevFileNames) => {
                      // 새로운 파일 중에서 이전에 선택되지 않은 파일 이름만 필터링합니다.
                      const newFileNames = newFiles
                        .map((file) => file.name)
                        .filter(
                          (newFileName) => !prevFileNames.includes(newFileName)
                        );

                      // 중복되지 않은 새 파일 이름들을 이전 파일 이름 목록에 추가합니다.
                      const updatedFileNames = [
                        ...prevFileNames,
                        ...newFileNames,
                      ];
                      // 에러 상태를 false로 설정합니다. (필요한 경우)
                      setFinanceReportFilesError(false);

                      return updatedFileNames;
                    });
                  }}
                  errorMessage="필수 입력란입니다."
                  isError={financeReportFilesError}
                  setIsError={setFinanceReportFilesError}
                  setFilesName={setFinanceReportFiles}
                  setFilesNameError={setFinanceReportFilesError}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
