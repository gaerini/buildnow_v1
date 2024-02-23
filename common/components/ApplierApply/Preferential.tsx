import React, { useState } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import Icon from "../Icon/Icon";

export default function Preferential() {
  const [toggleIsOpen, settoggleIsOpen] = useState([false, false, false]);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = (index: number) => {
    settoggleIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  //1. ISO 인증서
  const [isoFiles, setIsoFiles] = useState<string[]>([]);
  const [IsoFilesError, setIsoFilesError] = useState(false);

  const validate_1 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = isoFiles.length > 0;
    setIsoFilesError(isoFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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

  //2. KOSHA 인증서
  const [koshaFiles, setKoshaFiles] = useState<string[]>([]);
  const [koshaFilesError, setKoshaFilesError] = useState(false);

  const validate_2 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = koshaFiles.length > 0;
    setKoshaFilesError(koshaFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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

  //3. KS 인증서
  const [KSFiles, setKSFiles] = useState("");
  const [KSFilesError, setKSFilesError] = useState(false);

  const validate_3 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setKSFilesError(!KSFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
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

  //4. 포상 증명서 및 표창장
  const [PrizeFiles, setPrizeFiles] = useState<string[]>([]);
  const [PrizeFilesError, setPrizeFilesError] = useState(false);

  const validate_4 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = PrizeFiles.length > 0;
    setPrizeFilesError(PrizeFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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

  //5. 특허 및 신기술 인증서
  const [PatentFiles, setPatentFiles] = useState<string[]>([]);
  const [PatentFilesError, setPatentFilesError] = useState(false);

  const validate_5 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = PatentFiles.length > 0;
    setPatentFilesError(PatentFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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

  //6. ESG 평가보고서
  const [ESGFiles, setESGFiles] = useState("");
  const [ESGFilesError, setESGFilesError] = useState(false);

  const validate_6 = () => {
    let isValid = true;
    let fileNameError = true; // 이게 있어야 첫 submit에서 유효성검사가 실행됨

    setESGFilesError(!ESGFiles); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트
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

  //7. 안전보건평가서 (SH/SA)
  const [SHFiles, setSHFiles] = useState<string[]>([]);
  const [SHFilesError, setSHFilesError] = useState(false);

  const validate_7 = () => {
    // 파일이 하나 이상 있으면 유효
    let isValid = SHFiles.length > 0;
    setSHFilesError(SHFiles.length === 0); // 빈 문자열이면 falsy의 반대니까 true 즉 오류가있으면 true : 파일 이름 유효성 검사 결과에 따라 오류 상태 업데이트

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
      <div className="w-[500px] bgColor-white">
        {/* 제목 */}

        {/* 오른쪽 영역 중 input 버튼 영역 */}
        <div className="bgColor-white">
          {/* 내용 - width 고정*/}
          <div className="flex flex-col">
            <div>
              <div
                className="p-xl
                hover:bgColor-neutral"
                onClick={() => toggleOpen(0)}
              >
                <div className="flex justify-between items-center">
                  ISO, KOSHA 인증서
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
                    titleText="ISO 인증서 (9001, 14001, 45001, 19650)"
                    isEssential={true}
                    fileName={isoFiles}
                    fileNameError={IsoFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="ISO 인증서 (9001, 14001, 45001, 19650)"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setIsoFiles((prevFileNames) => {
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
                            setIsoFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={IsoFilesError}
                        setIsError={setIsoFilesError}
                        setFilesName={setIsoFiles}
                        setFilesNameError={setIsoFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="KOSHA 인증서 (MS, 18001)"
                    isEssential={true}
                    fileName={koshaFiles}
                    fileNameError={koshaFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="KOSHA 인증서 (MS, 18001)"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setKoshaFiles((prevFileNames) => {
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
                            setKoshaFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={koshaFilesError}
                        setIsError={setKoshaFilesError}
                        setFilesName={setKoshaFiles}
                        setFilesNameError={setKoshaFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="KS 인증서"
                    isEssential={true}
                    fileName={KSFiles}
                    fileNameError={KSFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="KS 인증서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setKSFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setKSFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={KSFilesError}
                        setIsError={setKSFilesError}
                        setFileName={setKSFiles}
                        setFileNameError={setKSFilesError}
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
                  표창장 및 특허증
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
                    titleText="포상 증명서 및 표창장"
                    isEssential={true}
                    fileName={PrizeFiles}
                    fileNameError={PrizeFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="포상 증명서 및 표창장"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setPrizeFiles((prevFileNames) => {
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
                            setPrizeFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={PrizeFilesError}
                        setIsError={setPrizeFilesError}
                        setFilesName={setPrizeFiles}
                        setFilesNameError={setPrizeFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="특허 및 신기술 인증서"
                    isEssential={true}
                    fileName={PatentFiles}
                    fileNameError={PatentFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="특허 및 신기술 인증서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setPatentFiles((prevFileNames) => {
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
                            setPatentFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={PatentFilesError}
                        setIsError={setPatentFilesError}
                        setFilesName={setPatentFiles}
                        setFilesNameError={setPatentFilesError}
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
                  기타
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
                    titleText="ESG 평가 보고서"
                    isEssential={true}
                    fileName={ESGFiles}
                    fileNameError={ESGFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="ESG 평가 보고서"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            // 파일 이름을 상태에 설정합니다.
                            setESGFiles(e.target.files[0].name);
                            // 에러 상태를 false로 설정할 수 있습니다. (필요한 경우)
                            setESGFilesError(false);
                          }
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={ESGFilesError}
                        setIsError={setESGFilesError}
                        setFileName={setESGFiles}
                        setFileNameError={setESGFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="안전보건평가서 (SH/SA)"
                    isEssential={true}
                    fileName={SHFiles}
                    fileNameError={SHFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="안전보건평가서 (SH/SA)"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          const newFiles = e.target.files
                            ? Array.from(e.target.files)
                            : [];
                          setSHFiles((prevFileNames) => {
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
                            setSHFilesError(false);

                            return updatedFileNames;
                          });
                        }}
                        errorMessage="필수 입력란입니다."
                        isError={SHFilesError}
                        setIsError={setSHFilesError}
                        setFilesName={setSHFiles}
                        setFilesNameError={setSHFilesError}
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
