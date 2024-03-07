import React, { useState, useEffect } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import Icon from "../Icon/Icon";

interface OptionalProps {
  JiFiles: File | null;
  setJiFiles: React.Dispatch<React.SetStateAction<File | null>>;
  BubinFiles: File | null;
  setBubinFiles: React.Dispatch<React.SetStateAction<File | null>>;
  SaUpFiles: File | null;
  setSaUpFiles: React.Dispatch<React.SetStateAction<File | null>>;
  LicenseNoteFiles: File[];
  setLicenseNoteFiles: React.Dispatch<React.SetStateAction<File[] | []>>;
  SigongFiles: File[];
  setSigongFiles: React.Dispatch<React.SetStateAction<File[] | []>>;
  LabFiles: File | null;
  setLabFiles: React.Dispatch<React.SetStateAction<File | null>>;
  ResearchFiles: File | null;
  setResearchFiles: React.Dispatch<React.SetStateAction<File | null>>;
  INNOFiles: File | null;
  setINNOFiles: React.Dispatch<React.SetStateAction<File | null>>;
  MAINFiles: File | null;
  setMAINFiles: React.Dispatch<React.SetStateAction<File | null>>;
  VentureFiles: File | null;
  setVentureFiles: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function Optional({
  JiFiles,
  setJiFiles,
  BubinFiles,
  setBubinFiles,
  SaUpFiles,
  setSaUpFiles,
  LicenseNoteFiles,
  setLicenseNoteFiles,
  SigongFiles,
  setSigongFiles,
  LabFiles,
  setLabFiles,
  ResearchFiles,
  setResearchFiles,
  INNOFiles,
  setINNOFiles,
  MAINFiles,
  setMAINFiles,
  VentureFiles,
  setVentureFiles,
}: OptionalProps) {
  const [toggleIsOpen, settoggleIsOpen] = useState([false, false, false]);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = (index: number) => {
    settoggleIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  const handleJiFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setJiFiles(e.target.files[0]);
    }
  };
  const handleBubinFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBubinFiles(e.target.files[0]);
    }
  };
  const handleSaUpFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSaUpFiles(e.target.files[0]);
    }
  };
  const handleLicenseNoteFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setLicenseNoteFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handleSigongFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setSigongFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handleLabFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setLabFiles(e.target.files[0]);
    }
  };
  const handleResearchFilesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setResearchFiles(e.target.files[0]);
    }
  };
  const handleInnoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setINNOFiles(e.target.files[0]);
    }
  };
  const handleMainFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMAINFiles(e.target.files[0]);
    }
  };
  const handleVentureFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVentureFiles(e.target.files[0]);
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
                    fileName={JiFiles?.name}
                    // fileNameError={JiFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="회사소개 자료 (지명원 등)"
                        onChange={handleJiFileChange}
                        // errorMessage="필수 입력란입니다."
                        // isError={JiFilesError}
                        // setIsError={setJiFilesError}
                        setFile={setJiFiles}
                        // setFileNameError={setJiFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="법인 인감증명서"
                    isEssential={false}
                    fileName={BubinFiles?.name}
                    // fileNameError={BubinFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="법인 인감증명서"
                        onChange={handleBubinFileChange}
                        errorMessage="필수 입력란입니다."
                        // isError={BubinFilesError}
                        // setIsError={setBubinFilesError}
                        setFile={setBubinFiles}
                        // setFileNameError={setBubinFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="사업자등록증 사본"
                    isEssential={false}
                    fileName={SaUpFiles?.name}
                    // fileNameError={SaUpFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="사업자등록증 사본"
                        onChange={handleSaUpFileChange}
                        errorMessage="필수 입력란입니다."
                        // isError={SaUpFilesError}
                        // setIsError={setSaUpFilesError}
                        setFile={setSaUpFiles}
                        // setFileNameError={setSaUpFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="건설업 면허 수첩"
                    isEssential={false}
                    fileName={LicenseNoteFiles.map((file) => file.name)}
                    // fileNameError={LicenseNoteFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="건설업 면허 수첩"
                        onChange={handleLicenseNoteFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={LicenseNoteFilesError}
                        // setIsError={setLicenseNoteFilesError}
                        setFiles={setLicenseNoteFiles}
                        // setFilesNameError={setLicenseNoteFilesError}
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
                    fileName={SigongFiles.map((file) => file.name)}
                    // fileNameError={SigongFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="시공능력평가, 시공능력순위 확인서 (3년)"
                        onChange={handleSigongFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={SigongFilesError}
                        // setIsError={setSigongFilesError}
                        setFiles={setSigongFiles}
                        // setFilesNameError={setSigongFilesError}
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
                    fileName={LabFiles?.name}
                    // fileNameError={LabFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="기업부설연구소 인정서"
                        onChange={handleLabFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={LabFilesError}
                        // setIsError={setLabFilesError}
                        setFile={setLabFiles}
                        // setFileNameError={setLabFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="연구개발전담부서 인정서"
                    isEssential={false}
                    fileName={ResearchFiles?.name}
                    // fileNameError={ResearchFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="연구개발전담부서 인정서"
                        onChange={handleResearchFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={ResearchFilesError}
                        // setIsError={setResearchFilesError}
                        setFile={setResearchFiles}
                        // setFileNameError={setResearchFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="기술혁신형 중소기업(INNO-BIZ) 확인증"
                    isEssential={false}
                    fileName={INNOFiles?.name}
                    // fileNameError={INNOFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="기술혁신형 중소기업(INNO-BIZ) 확인증"
                        onChange={handleInnoFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={INNOFilesError}
                        // setIsError={setINNOFilesError}
                        setFile={setINNOFiles}
                        // setFileNameError={setINNOFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="경영혁신형 중소기업(MAIN-BIZ) 확인증"
                    isEssential={false}
                    fileName={MAINFiles?.name}
                    // fileNameError={MAINFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="경영혁신형 중소기업(MAIN-BIZ) 확인증"
                        onChange={handleMainFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={MAINFilesError}
                        // setIsError={setMAINFilesError}
                        setFile={setMAINFiles}
                        // setFileNameError={setMAINFilesError}
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="벤처기업 확인서"
                    isEssential={false}
                    fileName={VentureFiles?.name}
                    // fileNameError={VentureFilesError}
                    inputComponent={
                      <InputStyleUploadBtn
                        titleText="벤처기업 확인서"
                        onChange={handleVentureFilesChange}
                        errorMessage="필수 입력란입니다."
                        // isError={VentureFilesError}
                        // setIsError={setVentureFilesError}
                        setFile={setVentureFiles}
                        // setFileNameError={setVentureFilesError}
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
