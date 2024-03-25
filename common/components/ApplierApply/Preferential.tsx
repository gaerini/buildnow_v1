import React, { useState } from "react";
import InputFileLayer from "../InputForm/InputFileLayer";
import InputStyleUploadBtn from "../InputForm/InputStyleUploadBtn";
import InputStyleMultiUploadBtn from "../InputForm/InputStyleMultiUploadBtn";
import Icon from "../Icon/Icon";

type PdfUrlsType = {
  [key: string]: string[];
};

interface PreferentialProps {
  isoFiles: File[];
  setIsoFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  koshaFiles: File[];
  setKoshaFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  KSFiles: File[];
  setKSFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  PrizeFiles: File[];
  setPrizeFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  PatentFiles: File[];
  setPatentFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  ESGFiles: File[];
  setESGFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  SHFiles: File[];
  setSHFiles: React.Dispatch<React.SetStateAction<File[] | []>>;

  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

export default function Preferential({
  isoFiles,
  setIsoFiles,
  koshaFiles,
  setKoshaFiles,
  KSFiles,
  setKSFiles,
  PrizeFiles,
  setPrizeFiles,
  PatentFiles,
  setPatentFiles,
  ESGFiles,
  setESGFiles,
  SHFiles,
  setSHFiles,
  setPdfUrls,
}: PreferentialProps) {
  const [toggleIsOpen, settoggleIsOpen] = useState([false, false, false]);

  // isOpen 상태를 토글하는 함수
  const toggleOpen = (index: number) => {
    settoggleIsOpen((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  const handleIsoFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setIsoFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handleKoshaFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setKoshaFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handleKSFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setKSFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handlePrizeFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setPrizeFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handlePatentFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setPatentFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handleESGFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setESGFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
  };
  const handleSHFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setSHFiles((prev) => [...prev, ...newFiles.map((f) => f)]);
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
                    isEssential={false}
                    fileName={isoFiles.map((file) => file.name)}
                    // fileNameError={IsoFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="ISOCertificateFile"
                        onChange={handleIsoFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setIsoFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            보유한 ISO 인증서의 취득 현황을 첨부
                          </span>
                        }
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="KOSHA 인증서 (MS, 18001)"
                    isEssential={false}
                    fileName={koshaFiles.map((file) => file.name)}
                    // fileNameError={koshaFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="KOSHACertificateFile"
                        onChange={handleKoshaFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setKoshaFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            보유한 KOSHA 인증서의 취득 현황을 첨부
                          </span>
                        }
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="KS 인증서"
                    isEssential={false}
                    fileName={KSFiles.map((file) => file.name)}
                    // fileNameError={KSFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="KSCertificateFile"
                        onChange={handleKSFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setKSFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            보유한 KS 인증서 취득 현황을 첨부
                          </span>
                        }
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
                    isEssential={false}
                    fileName={PrizeFiles.map((file) => file.name)}
                    // fileNameError={PrizeFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="PrizeFiles"
                        onChange={handlePrizeFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setPrizeFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            <p>관공서, 광역자치단체장, 1군건설사,</p>
                            <p>
                              공사기관 등에서 시공과 관련된 각종 포상 실적
                              (표창장, 상장, 감사패 등)
                            </p>
                          </span>
                        }
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="특허 및 신기술 인증서"
                    isEssential={false}
                    fileName={PatentFiles.map((file) => file.name)}
                    // fileNameError={PatentFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="PatentTechnologyFile"
                        onChange={handlePatentFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setPatentFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            <p>
                              실용신안, 의장등록은 불인정 (원본대조필 날인분)
                            </p>
                            <p>
                              환경부 공인인증, 건설신기술 활용실적 증명서 등
                            </p>
                          </span>
                        }
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
                    isEssential={false}
                    fileName={ESGFiles.map((file) => file.name)}
                    // fileNameError={ESGFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="ESGEvaluationFile"
                        onChange={handleESGFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setESGFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            신용평가사 ESG 평가, 동반성장위원회 ESG 우수
                            중소기업 인증 확인서 보유 현황 등
                          </span>
                        }
                      />
                    }
                  />
                  <InputFileLayer
                    titleText="안전보건평가서 (SH/SA)"
                    isEssential={false}
                    fileName={SHFiles.map((file) => file.name)}
                    // fileNameError={SHFilesError}
                    inputComponent={
                      <InputStyleMultiUploadBtn
                        titleText="SH/SAFiles"
                        onChange={handleSHFilesChange}
                        errorMessage="필수 입력란입니다."
                        setFiles={setSHFiles}
                        setPdfUrls={setPdfUrls}
                        isToolTip={true}
                        detailedText={
                          <span className="textColor-mid-emphasis text-paragraph-12">
                            이크레더블 / 나이스디앤비 발급
                          </span>
                        }
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
