"use client";
import React, { useState } from "react";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Preferential from "../../../../../../common/components/ApplierApply/Preferential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";
import { useRouter } from "next/navigation";
import { fetchPresignedUrl, uploadFileToS3 } from "../../../../api/pdf/utils";

export default function page() {
  const [isoFiles, setIsoFiles] = useState<File[]>([]);
  const [koshaFiles, setKoshaFiles] = useState<File[]>([]);
  const [KSFiles, setKSFiles] = useState<File[]>([]);
  const [PrizeFiles, setPrizeFiles] = useState<File[]>([]);
  const [PatentFiles, setPatentFiles] = useState<File[]>([]);
  const [ESGFiles, setESGFiles] = useState<File[]>([]);
  const [SHFiles, setSHFiles] = useState<File[]>([]);

  const router = useRouter();

  const validateAndNavigate = async () => {
    const filesToUpload = [
      ...isoFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "ISO",
      })),
      ...koshaFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "KOSHA",
      })),
      ...KSFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "KS",
      })),
      ...PrizeFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "표창",
      })),
      ...PatentFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "특허",
      })),
      ...ESGFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "ESG",
      })),
      ...SHFiles.map((file) => ({
        file,
        type: "application/pdf",
        doc: "SH",
      })),
    ];
    try {
      for (const fileData of filesToUpload) {
        if (fileData.file) {
          const presignedData = await fetchPresignedUrl(
            fileData.file,
            fileData.type,
            fileData.doc
          );
          if (presignedData) {
            const uploadSuccess = await uploadFileToS3(
              fileData.file,
              presignedData.url
            );
            if (!uploadSuccess) {
              throw new Error("File upload failed");
            }
          } else {
            throw new Error("Failed to get presigned URL");
          }
        } else {
          console.error("파일이 없음");
        }
      }
      console.log("모든 파일이 성공적으로 업로드되었습니다.");
      router.push("optional");
    } catch (error) {
      console.error("업로드 중 오류 발생: ", error);
      alert("파일 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  return (
    <div className="select-none flex flex-col w-full h-screen">
      <ApplierTopNav text="지원서 작성" showButton={true} />
      <div className="flex flex-grow">
        <div className="flex flex-col">
          <Header
            titleText="3-2. 우대 서류 등록"
            additionalText="우대 서류란?"
            isHoverable={true}
            detailedIcon="😎"
            detailedText={
              <div className="textColor-focus text-paragraph-14">
                <span className="font-bold">
                  등록 시 우대 점수를 받을 수 있는 서류
                </span>
                <span className="font-normal">
                  들입니다. <br />
                </span>
                <span className="font-normal">
                  우대서류를 등록하지 않아도 협력업체 지원은 가능합니다.
                </span>
              </div>
            }
          />
          <Preferential
            isoFiles={isoFiles}
            setIsoFiles={setIsoFiles}
            koshaFiles={koshaFiles}
            setKoshaFiles={setKoshaFiles}
            KSFiles={KSFiles}
            setKSFiles={setKSFiles}
            PrizeFiles={PrizeFiles}
            setPrizeFiles={setPrizeFiles}
            PatentFiles={PatentFiles}
            setPatentFiles={setPatentFiles}
            ESGFiles={ESGFiles}
            setESGFiles={setESGFiles}
            SHFiles={SHFiles}
            setSHFiles={setSHFiles}
          />
        </div>
        <ApplierSideNav
          comp={"한양이엔지"}
          prev={"essential"}
          next={"optional"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
