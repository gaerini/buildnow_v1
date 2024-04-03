// HanulApplication.tsx
import React from "react";
import Image from "next/image";
import ApplicationImage from "../../../../../common/components/Icon/imgs/HanulApplication.png";
import InputFileLayer from "../../../../../common/components/InputForm/InputFileLayer";
import InputStyleUploadBtn from "../../../../../common/components/InputForm/InputStyleUploadBtn";

type PdfUrlsType = {
  [key: string]: string[];
};

interface HanulApplicationProps {
  hanulApplicationFile: File | null;
  setHanulApplicationFile: React.Dispatch<React.SetStateAction<File | null>>;

  fileError: boolean;
  setFileError: React.Dispatch<React.SetStateAction<boolean>>;
  setPdfUrls: React.Dispatch<React.SetStateAction<PdfUrlsType>>;
}

export default function HanulApplication({
  hanulApplicationFile,
  setHanulApplicationFile,
  fileError,
  setFileError,
  setPdfUrls,
}: HanulApplicationProps) {
  const handleHanulApplicationFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setHanulApplicationFile(e.target.files[0]);
      setFileError(false);
    }
  };

  const handleDownloadClick = () => {
    window.open(
      "http://www.hanulenc.com/kr/cooperation/cooperation.php",
      "_blank"
    );
  };

  return (
    <div className="flex flex-col w-full h-fit gap-y-8">
      <div className="w-full h-fit bgColor-navy border border-primary-navy-original rounded-s py-4 gap-y-4 flex flex-col justify-center">
        <div className="text-paragraph-600 font-bold flex justify-center">
          예시
        </div>
        <div className="flex justify-center">
          <Image
            src={ApplicationImage}
            alt="HanulApplication"
            width={251}
            height={353}
          />
        </div>
        <div>
          <div className="flex justify-center text-paragraph-14">
            위 협력업체등록신청서 양식을 &nbsp;
            <span className="font-bold">한울건설 홈페이지에서</span>
          </div>
          <div className="flex justify-center text-paragraph-14">
            다운로드 후 작성하여 업로드해 주십시오
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="btnStyle-textOnly-xs hover:border-b"
            onClick={handleDownloadClick}
          >
            등록 신청서 양식 다운받으러 가기
          </button>
        </div>
      </div>
      <InputFileLayer
        titleText="협력업체등록신청서"
        isEssential={true}
        fileName={hanulApplicationFile?.name}
        fileNameError={fileError}
        inputComponent={
          <InputStyleUploadBtn
            titleText="HanulApplicationFile"
            onChange={handleHanulApplicationFileChange}
            errorMessage="필수 입력란입니다."
            isError={fileError}
            setIsError={setFileError}
            setFile={setHanulApplicationFile}
            setFileNameError={setFileError}
            setPdfUrls={setPdfUrls}
            isToolTip={true}
            detailedText={
              <span className="textColor-mid-emphasis text-paragraph-12">
                한울건설 홈페이지에서 다운로드 받은 협력업체등록신청서
              </span>
            }
          />
        }
      />
    </div>
  );
}
