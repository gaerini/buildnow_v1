import React, { useState, useEffect } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import Icon from "../Icon/Icon";

interface OptionalProps {
  toggleOpen: (index: number) => void;
  toggleIsOpen: boolean[];
  settoggleIsOpen: (value: boolean[]) => void;
}

export default function Optional({
  toggleOpen,
  toggleIsOpen,
  settoggleIsOpen,
}: OptionalProps) {
  // const [toggleIsOpen, settoggleIsOpen] = useState([false, false, false]);

  // // isOpen 상태를 토글하는 함수
  // const toggleOpen = (index: number) => {
  //   settoggleIsOpen((prev) => {
  //     const newState = [...prev];
  //     newState[index] = !newState[index];
  //     return newState;
  //   });
  // };

  //1. 회사소개 자료 (지명원 등)
  const [JiFiles, setJiFiles] = useState("");
  const [JiFilesError, setJiFilesError] = useState(false);

  const validate_1 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setJiFilesError(!JiFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
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

  //2. 법인 인감증명서
  const [BubinFiles, setBubinFiles] = useState("");
  const [BubinFilesError, setBubinFilesError] = useState(false);

  const validate_2 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setBubinFilesError(!BubinFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

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

  //3. 사업자등록증 사본
  const [SaUpFiles, setSaUpFiles] = useState("");
  const [SaUpFilesError, setSaUpFilesError] = useState(false);

  const validate_3 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setSaUpFilesError(!SaUpFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
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

  //4. 건설업 면허 수첩
  const [LicenseNoteFiles, setLicenseNoteFiles] = useState<string[]>([]);
  const [LicenseNoteFilesError, setLicenseNoteFilesError] = useState(false);

  const validate_4 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = LicenseNoteFiles.length > 0;
    setLicenseNoteFilesError(LicenseNoteFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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

  //5. 시공능력평가, 시공능력순위 확인서 (3년)
  const [SigongFiles, setSigongFiles] = useState<string[]>([]);
  const [SigongFilesError, setSigongFilesError] = useState(false);

  const validate_5 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = SigongFiles.length > 0;
    setSigongFilesError(SigongFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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

  //6. 기업부설연구소 인증서
  const [LabFiles, setLabFiles] = useState("");
  const [LabFilesError, setLabFilesError] = useState(false);

  const validate_6 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setLabFilesError(!LabFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

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

  //7. 연구개발전담부서 인정서
  const [ResearchFiles, setResearchFiles] = useState("");
  const [ResearchFilesError, setResearchFilesError] = useState(false);

  const validate_7 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setResearchFilesError(!ResearchFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

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

  //8. 기술혁신형 중소기업 (INNO-BIZ) 확인증
  const [INNOFiles, setINNOFiles] = useState("");
  const [INNOFilesError, setINNOFilesError] = useState(false);

  const validate_8 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setINNOFilesError(!INNOFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_8 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_8()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //9. 경영혁신형 중소기업 (MAIN-BIZ) 확인증
  const [MAINFiles, setMAINFiles] = useState("");
  const [MAINFilesError, setMAINFilesError] = useState(false);

  const validate_9 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setMAINFilesError(!MAINFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_9 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_9()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  //10. 벤처기업 확인서
  const [VentureFiles, setVentureFiles] = useState("");
  const [VentureFilesError, setVentureFilesError] = useState(false);

  const validate_10 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setVentureFilesError(!VentureFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
    isValid = isValid && !fileNameError; // fileNameError가 false 즉 Error가 없어야만 isValid는 true

    return isValid;
  };

  const handleSubmit_10 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validate_10()) {
      // 모든 유효성 검사가 통과하면, 폼 제출 로직 실행
      console.log("Form Submitted");
      // 서버로 데이터 전송 로직을 여기에 추가
    }
  };

  return (
    <div className="mt-[121px] ml-[641px] flex-grow flex">
      {/* 오른쪽 영역 */}
      <div className="w-[500px] bgColor-white">
        {/* 제목 */}

        {/* 오른쪽 영역 중 input 버튼 영역 */}
        <div className="bgColor-white">
          {/* 내용 - width 고정*/}
          <div className="flex flex-col gap-2">
            <div>
              <div
                className="p-xl
                hover:bgColor-neutral"
                onClick={() => toggleOpen(0)}
              >
                <div className="flex justify-between items-center">
                  회사 소개 자료
                  <Icon
                    name="ArrowDown"
                    width={24}
                    height={24}
                    className={`transform transition ${
                      toggleIsOpen[0] ? "-rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {toggleIsOpen[0] && (
                <div className="w-[500px] bgColor-white p-xl justify-center items-center flex flex-col gap-4">
                  <InputFileLayer
                    titleText="회사소개 자료 (지명원 등)"
                    isEssential={false}
                    fileName={JiFiles}
                    fileNameError={JiFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="회사소개 자료 (지명원 등)"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setJiFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setJiFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={JiFilesError}
                        setIsError={setJiFilesError}
                        setFileName={setJiFiles}
                        setFileNameError={setJiFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="법인 인감증명서"
                    isEssential={false}
                    fileName={BubinFiles}
                    fileNameError={BubinFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="법인 인감증명서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setBubinFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setBubinFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={BubinFilesError}
                        setIsError={setBubinFilesError}
                        setFileName={setBubinFiles}
                        setFileNameError={setBubinFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="사업자등록증 사본"
                    isEssential={false}
                    fileName={SaUpFiles}
                    fileNameError={SaUpFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="사업자등록증 사본"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setSaUpFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setSaUpFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={SaUpFilesError}
                        setIsError={setSaUpFilesError}
                        setFileName={setSaUpFiles}
                        setFileNameError={setSaUpFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="건설업 면허 수첩"
                    isEssential={false}
                    fileName={LicenseNoteFiles}
                    fileNameError={LicenseNoteFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="건설업 면허 수첩"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setLicenseNoteFiles((prevFileNames) => {
                            // 새로운 파일 중에서 이전에 선택되지 않은 파일 이름만 필터링합니다.
                            const newFileNames = newFiles
                              .map((file) => file.name)
                              .filter(
                                (newFileName) =>
                                  !prevFileNames.includes(newFileName)
                              );

                            // 중복되지 않은 새 파일 이름들을 이전 파일 이름 목록에 추가합니다.
                            const updatedFileNames = [
                              ...prevFileNames,
                              ...newFileNames,
                            ];
                            // 에러 상태를 false로 설정합니다. (필요한 경우)
                            setLicenseNoteFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={LicenseNoteFilesError}
                        setIsError={setLicenseNoteFilesError}
                        setFilesName={setLicenseNoteFiles}
                        setFilesNameError={setLicenseNoteFilesError}
                      />
                    }
                  />
                </div>
              )}
            </div>

            <div>
              <div
                className="p-xl
                hover:bgColor-neutral"
                onClick={() => toggleOpen(1)}
              >
                <div className="flex justify-between items-center">
                  시공능력평가, 시공능력순위 확인서
                  <Icon
                    name="ArrowDown"
                    width={24}
                    height={24}
                    className={`transform transition ${
                      toggleIsOpen[1] ? "-rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {toggleIsOpen[1] && (
                <div className="w-[500px] bgColor-white p-xl justify-center items-center flex flex-col gap-4">
                  <InputFileLayer
                    titleText="시공능력평가, 시공능력순위 확인서 (3년)"
                    isEssential={false}
                    fileName={SigongFiles}
                    fileNameError={SigongFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="시공능력평가, 시공능력순위 확인서 (3년)"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setSigongFiles((prevFileNames) => {
                            // 새로운 파일 중에서 이전에 선택되지 않은 파일 이름만 필터링합니다.
                            const newFileNames = newFiles
                              .map((file) => file.name)
                              .filter(
                                (newFileName) =>
                                  !prevFileNames.includes(newFileName)
                              );

                            // 중복되지 않은 새 파일 이름들을 이전 파일 이름 목록에 추가합니다.
                            const updatedFileNames = [
                              ...prevFileNames,
                              ...newFileNames,
                            ];
                            // 에러 상태를 false로 설정합니다. (필요한 경우)
                            setSigongFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={SigongFilesError}
                        setIsError={setSigongFilesError}
                        setFilesName={setSigongFiles}
                        setFilesNameError={setSigongFilesError}
                      />
                    }
                  />
                </div>
              )}
            </div>

            <div>
              <div
                className="p-xl
                hover:bgColor-neutral"
                onClick={() => toggleOpen(2)}
              >
                <div className="flex justify-between items-center">
                  인정서 및 확인증
                  <Icon
                    name="ArrowDown"
                    width={24}
                    height={24}
                    className={`transform transition ${
                      toggleIsOpen[2] ? "-rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
              {toggleIsOpen[2] && (
                <div className="w-[500px] bgColor-white p-xl justify-center items-center flex flex-col gap-4">
                  <InputFileLayer
                    titleText="기업부설연구소 인정서"
                    isEssential={false}
                    fileName={LabFiles}
                    fileNameError={LabFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="기업부설연구소 인정서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setLabFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setLabFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={LabFilesError}
                        setIsError={setLabFilesError}
                        setFileName={setLabFiles}
                        setFileNameError={setLabFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="연구개발전담부서 인정서"
                    isEssential={false}
                    fileName={ResearchFiles}
                    fileNameError={ResearchFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="연구개발전담부서 인정서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setResearchFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setResearchFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={ResearchFilesError}
                        setIsError={setResearchFilesError}
                        setFileName={setResearchFiles}
                        setFileNameError={setResearchFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="기술혁신형 중소기업(INNO-BIZ) 확인증"
                    isEssential={false}
                    fileName={INNOFiles}
                    fileNameError={INNOFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="기술혁신형 중소기업(INNO-BIZ) 확인증"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setINNOFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setINNOFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={INNOFilesError}
                        setIsError={setINNOFilesError}
                        setFileName={setINNOFiles}
                        setFileNameError={setINNOFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="경영혁신형 중소기업(MAIN-BIZ) 확인증"
                    isEssential={false}
                    fileName={MAINFiles}
                    fileNameError={MAINFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="경영혁신형 중소기업(MAIN-BIZ) 확인증"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setMAINFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setMAINFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={MAINFilesError}
                        setIsError={setMAINFilesError}
                        setFileName={setMAINFiles}
                        setFileNameError={setMAINFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="벤처기업 확인서"
                    isEssential={false}
                    fileName={VentureFiles}
                    fileNameError={VentureFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="벤처기업 확인서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setVentureFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setVentureFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={VentureFilesError}
                        setIsError={setVentureFilesError}
                        setFileName={setVentureFiles}
                        setFileNameError={setVentureFilesError}
                      />
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
