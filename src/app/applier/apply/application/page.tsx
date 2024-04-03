"use client";
import React, { useState, useEffect } from "react";
import ApplierSideNav from "../../../../../common/components/ApplierSideNav/ApplierSideNav";
import { useRouter } from "next/navigation";
import Header from "../../../../../common/components/ApplierApply/Header";
import HanulApplication from "./HanulApplication";
import fetchAPIData from "@/app/api/ocr";
import ApplierTopNav from "../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Cookies from "js-cookie";
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

interface FieldResult {
  category: string;
  value: string;
}

const Page = () => {
  const [hanulApplicationFile, setHanulApplicationFile] = useState<File | null>(
    null
  );
  const [isTempSaved, setIsTempSaved] = useState(false);
  const [buttonState, setButtonState] = useState("default");
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});
  const [fileError, setFileError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [InfoList, setInfoList] = useState<FieldResult[]>([]);

  const router = useRouter();

  const accessToken = Cookies.get("accessToken");
  const applicationId = Cookies.get("applicationId");

  const handleTempSave = async () => {
    if (!accessToken || !applicationId) {
      console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
      return;
    }

    // tempHandedOutList 생성
    const tempHandedOutList = pdfUrls["HanulApplicationFile"]?.map((url) => ({
      documentName: "한울건설협력업체등록신청서",
      documentUrl: url,
      requiredLevelENUM: "REQUIRED",
      upperCategoryENUM: "APPLICATION",
    }));

    // console.log(tempHandedOutList);

    try {
      // 서버에 임시저장 요청 보내기
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/${applicationId}`,
        {
          tempHandedOutList,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.status === 200) {
        // 성공적으로 임시저장되었을 때의 로직
        console.log("임시 저장 성공", response.data);
        // 여기에 성공시 처리할 코드를 작성하세요.
      }
    } catch (error) {
      console.error("임시 저장 실패", error);
      // 에러 처리 로직
    }
  };

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
    handleTempSave();
    router.push("register");
  };

  const extractFields = (data: ApiResponse) => {
    const OCRresult: FieldResult[] = [];
    if (data.statusCode === 200) {
      // console.log(data);
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

      fields.forEach((field) => {
        if (fieldNames.includes(field.name)) {
          OCRresult.push({ category: field.name, value: field.inferText });
          // console.log("OCRresult", OCRresult);
        }
      });
      setInfoList(OCRresult);
    }
  };

  const fetchData = async () => {
    let result = null; // 'result'를 'try' 블록 외부에 선언하여 스코프 확장
    setLoading(true); // 로딩 시작

    try {
      result = await fetchAPIData(pdfUrls["HanulApplicationFile"][0]);
      // console.log("s3링크:", result);
      extractFields(result);
    } catch (error) {
      console.error("데이터 추출 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false); // 로딩 종료
      // 성공 모달 표시와 숨기기는 여기에 두어도 괜찮습니다.
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }

    // 'result'가 정상적으로 받아졌고, 오류가 발생하지 않은 경우에만 POST 요청을 수행
    // if (OCRresult) {
    //   setInfoList(OCRresult);
    //   try {
    //     const accessToken = Cookies.get("accessToken");

    //     // axios 요청에 사용할 설정 객체
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     };
    //     const response = await axios.post(
    //       `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/applier/${applicationId}`,
    //       { infoList: InfoList },
    //       config
    //     );
    //     console.log("OCR포스트 결과: ", response.data);
    //   } catch (postError) {
    //     console.error("POST 요청 중 오류가 발생했습니다:", postError);
    //   }
    // }
  };

  useEffect(() => {
    // "협력업체등록신청서" 키에 대한 pdfUrls의 값이 존재하고 빈 배열이 아닐 때
    if (
      pdfUrls["HanulApplicationFile"] &&
      pdfUrls["HanulApplicationFile"].length > 0
    ) {
      fetchData();
    }
  }, [pdfUrls]); // pdfUrls가 변경될 때마다 이 효과가 실행됨

  const handleSave = () => {
    // 저장 로직 작성
    // 예를 들어, 서버에 데이터를 저장하는 로직 등
    handleTempSave();
    setTimeout(() => {
      setIsTempSaved(true); // 1초 후에 임시저장 완료 상태로 설정
    }, 1000);
  };

  useEffect(() => {
    if (!isTempSaved) {
      setButtonState("default"); // isTempSaved가 false로 바뀔 때 버튼 상태를 초기화
    }
  }, [isTempSaved]);

  useEffect(() => {
    // InfoList 상태가 변경될 때만 POST 요청을 실행합니다.
    const sendPostRequest = async () => {
      if (InfoList.length > 0) {
        try {
          const accessToken = Cookies.get("accessToken");
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/applier/${applicationId}`,
            { infoList: InfoList },
            config
          );
          console.log("성공 성공 OCR포스트 결과: ", response.data);
        } catch (error) {
          console.error("POST 요청 중 오류가 발생했습니다:", error);
        }
      }
    };
    sendPostRequest();
  }, [InfoList]);

  console.log("InfoList:", InfoList);

  return (
    <div>
      <ApplierTopNav
        text="지원서 작성"
        showButton={true}
        buttonState="saving"
      />

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
            isTempSaved={isTempSaved}
            setIsTempSaved={setIsTempSaved}
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
