"use client";
import React, { useState, useEffect } from "react";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import { useRouter } from "next/navigation";
import Header from "../../../../../common/components/ApplierApply/Header";
import HanulApplication from "./HanulApplication";
import fetchAPIData from "@/app/api/ocr";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import axios from "axios";
import LoadingModal from "./LoadingModal";
import SuccessModal from "./SuccessModal";

type PdfUrlsType = {
  [key: string]: string[];
};

// JSON 구조에 대한 타입 정의
interface Field {
  name: string;
  inferText: string;
}

interface Image {
  fields: Field[];
}

interface Body {
  images: Image[];
}

interface ApiResponse {
  statusCode: number;
  body: Body;
}

const Page = () => {
  const [hanulApplicationFile, setHanulApplicationFile] = useState<File | null>(
    null
  );
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});
  const [fileError, setFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [extractedFields, setExtractedFields] = useState({});

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

  const extractFields = (data: ApiResponse) => {
    if (data.statusCode === 200) {
      console.log(data);
      const fields = data.body.images[0].fields.map((field) => ({
        ...field,
        inferText: field.inferText.replace(/\n/g, ""), // \n 문자를 공백으로 대체
      }));
      const fieldNames = [
        "주업종",
        "상호",
        "사업자등록번호",
        "대표자",
        "법인등록번호",
        "사업장소재지",
        "신용평가등급",
        "전화번호",
        "Fax",
        "자본금",
        "이메일",
        "개업년월일",
        "인원보유현황 기술자명수",
        "인원보유현황 기능공명수",
        "담당자명",
        "담당자 직위",
        "담당자 번호",
        "보유업종1",
        "보유업종 면허번호1",
        "보유업종 시공능력 년도1",
        "보유업종 시공능력 평가액 1",
        "보유업종2",
        "보유업종 면허번호2",
        "보유업종 시공능력 년도2",
        "보유업종 시공능력 평가액 2",
        "보유업종 3",
        "보유업종 면허번호 3",
        "보유업종 시공능력 년도 3",
        "보유업종 시공능력 평가액 3",
      ];
      let result: Record<string, string> = {};

      fields.forEach((field) => {
        if (fieldNames.includes(field.name)) {
          result[field.name] = field.inferText;
        }
      });

      setExtractedFields(result);
    }
  };

  async function fetchData() {
    setLoading(true); // fetchData 함수 실행 시 로딩 시작
    try {
      const result = await fetchAPIData(pdfUrls["HanulApplicationFile"][0]);
      console.log("s3링크:", result);
      extractFields(result);
    } catch (error) {
      console.error("데이터 추출 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false); // fetchData 함수 종료 시 로딩 종료
      setShowSuccessModal(true);
      // 2초 후에 모달을 숨김
      const timer = setTimeout(() => setShowSuccessModal(false), 2000);
      return () => clearTimeout(timer);
    }
  }

  console.log("결과:", extractedFields);

  useEffect(() => {
    // "협력업체등록신청서" 키에 대한 pdfUrls의 값이 존재하고 빈 배열이 아닐 때
    if (
      pdfUrls["HanulApplicationFile"] &&
      pdfUrls["HanulApplicationFile"].length > 0
    ) {
      fetchData();
    }
  }, [pdfUrls]); // pdfUrls가 변경될 때마다 이 효과가 실행됨

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
      {loading && <LoadingModal />}
      {showSuccessModal && <SuccessModal />}
    </div>
  );
};

export default Page;
