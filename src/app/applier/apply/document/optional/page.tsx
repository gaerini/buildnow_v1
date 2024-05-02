"use client";
import React, { useState } from "react";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Optional from "../../../../../../common/components/ApplierApply/Optional";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";
import DropDown from "../../../../../../common/components/ApplierApply/OptionalDropDown";
import { useRouter } from "next/navigation";

type PdfUrlsType = {
  [key: string]: string[];
};

export default function page() {
  const [JiFiles, setJiFiles] = useState<File | null>(null);
  const [BubinFiles, setBubinFiles] = useState<File | null>(null);
  const [SaUpFiles, setSaUpFiles] = useState<File | null>(null);
  const [LicenseNoteFiles, setLicenseNoteFiles] = useState<File[]>([]);
  const [SigongFiles, setSigongFiles] = useState<File[]>([]);
  const [LabFiles, setLabFiles] = useState<File | null>(null);
  const [ResearchFiles, setResearchFiles] = useState<File | null>(null);
  const [INNOFiles, setINNOFiles] = useState<File | null>(null);
  const [MAINFiles, setMAINFiles] = useState<File | null>(null);
  const [VentureFiles, setVentureFiles] = useState<File | null>(null);

  const router = useRouter();
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  const validateAndNavigate = async () => {
    try {
      // 파일 업로드 관련 로직은 제거됨
      router.push("../result");
    } catch (error) {
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="select-none flex flex-col w-full h-screen">
      <ApplierTopNav text="지원서 작성" showButton={true} />
      <div className="flex flex-grow">
        <div className="flex flex-col">
          <Header
            titleText="3-3. 선택 서류 등록"
            additionalText="선택 서류란?"
            isHoverable={true}
            detailedIcon="🙌"
            detailedText={
              <div className="textColor-focus text-paragraph-14">
                <span className="font-normal">
                  필수 서류 및 우대 서류 이외에
                </span>
                <span className="font-bold">
                  귀사에 대해 더 소개하고 싶은 <br />
                </span>
                <span className="font-bold">내용을 담은 서류</span>
                <span className="font-normal">를 등록하시면 됩니다.</span>
              </div>
            }
          />

          <Optional
            JiFiles={JiFiles}
            setJiFiles={setJiFiles}
            BubinFiles={BubinFiles}
            setBubinFiles={setBubinFiles}
            SaUpFiles={SaUpFiles}
            setSaUpFiles={setSaUpFiles}
            LicenseNoteFiles={LicenseNoteFiles}
            setLicenseNoteFiles={setLicenseNoteFiles}
            SigongFiles={SigongFiles}
            setSigongFiles={setSigongFiles}
            LabFiles={LabFiles}
            setLabFiles={setLabFiles}
            ResearchFiles={ResearchFiles}
            setResearchFiles={setResearchFiles}
            INNOFiles={INNOFiles}
            setINNOFiles={setINNOFiles}
            MAINFiles={MAINFiles}
            setMAINFiles={setMAINFiles}
            VentureFiles={VentureFiles}
            setVentureFiles={setVentureFiles}
            setPdfUrls={setPdfUrls}
          />
        </div>
        <ApplierSideNav
          comp="ㅇㅇ 종합건설"
          prev={"preferential"}
          next={"../result"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
