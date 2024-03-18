"use client";
import React, { useState } from "react";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import { useRouter } from "next/navigation";
import Header from "../../../../../common/components/ApplierApply/Header";
import HanulApplication from "./HanulApplication";

import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";

type PdfUrlsType = {
  [key: string]: string[];
};

const Page = () => {
  const [hanulApplicationFile, setHanulApplicationFile] = useState<File | null>(
    null
  );
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});
  const [fileError, setFileError] = useState(false);

  const router = useRouter();
  const validateAndNavigate = () => {
    // 파일이 업로드되었는지 확인
    if (!hanulApplicationFile) {
      // 파일이 없다면 오류를 표시하고 함수 실행을 중단
      alert("필수 서류 중 누락된 항목이 있습니다.");
      setFileError(true);
      return;
    }

    // 파일이 있다면 오류 상태를 해제하고 다음 페이지로 이동
    setFileError(false);
    router.push("register");
  };

  return (
    <div>
      <ApplierTopNav text="지원서 작성" showButton={true} />

      <div className="flex flex-col w-full mt-[120px]">
        <Header
          titleText="1. 협력업체 등록 신청서 업로드"
          additionalText={
            <span className="relative ml-4 after:content-[''] after:block after:w-[7px] after:h-[7px] after:bg-primary-neutral-200 after:rounded-full after:absolute after:left-[-12px] after:top-1/2 after:transform after:-translate-y-1/2">
              표시가 붙은 항목들은 필수 입력 항목입니다.
            </span>
          }
        />

        <div className="flex flex-col bg-bgColor-white p-xl h-fit ml-[641px] w-[500px] gap-y-2">
          <HanulApplication
            hanulApplicationFile={hanulApplicationFile}
            setHanulApplicationFile={setHanulApplicationFile}
            fileError={fileError}
            setFileError={setFileError}
            setPdfUrls={setPdfUrls}
          />
        </div>
        <ApplierSideNav
          comp="한울건설"
          prev=""
          next="register"
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
};

export default Page;
