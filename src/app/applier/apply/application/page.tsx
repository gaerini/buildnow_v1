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
import Alert from "../../../../../common/components/Alert/Alert";
import Icon from "../../../../../common/components/Icon/Icon";

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

interface TempHandedOutList {
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

interface TempSaveRequest {
  corporateApplication: string;
  companyPhoneNum: string;
  workTypeApplying: string;
  type: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: TempHandedOutList[];
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
  let infoList = {};

  const router = useRouter();

  const accessTokenApplier = Cookies.get("accessTokenApplier");
  const applicationId = Cookies.get("applicationId");
  const axios = require("axios");
  const qs = require("qs");

  const handleTempSave = async () => {
    if (!accessTokenApplier || !applicationId) {
      console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
      return false;
    }

    const tempHandedOutList = pdfUrls["HanulApplicationFile"]?.map((url) => ({
      documentName: "한울건설협력업체등록신청서",
      documentUrl: url,
      requiredLevelENUM: "REQUIRED",
      upperCategoryENUM: "APPLICATION",
    }));

    const requestBody: TempSaveRequest = {
      corporateApplication: "",
      companyPhoneNum: "",
      workTypeApplying: "",
      type: "",
      companyAddress: "",
      companyIntro: "",
      tempHandedOutList: [...tempHandedOutList],
    };

    // Convert the entire object into x-www-form-urlencoded format
    console.log(requestBody);
    const formBody = qs.stringify(requestBody, { allowDots: true });

    console.log(formBody);

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/applier/${applicationId}`,
        formBody, // 업데이트된 tempSaveList 사용
        {
          headers: {
            Authorization: `Bearer ${accessTokenApplier}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        console.log("임시 저장 성공", response.data);
        setIsTempSaved(true); // 임시저장 성공 상태 설정
        return true;
      }
    } catch (error) {
      console.error("임시 저장 실패", error);
      return false;
    }
  };

  const validateAndNavigate = async () => {
    if (!hanulApplicationFile) {
      alert("필수 서류 중 누락된 항목이 있습니다.");
      setFileError(true);
      return;
    }

    setFileError(false);
    try {
      const tempSaveSuccessful = await handleTempSave();
      if (tempSaveSuccessful) {
        router.push("register");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생: ", error);
      alert("파일 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleSave = async () => {
    const saveSuccessful = await handleTempSave();
    if (saveSuccessful) {
      setTimeout(() => {
        setIsTempSaved(true); // 1초 후에 임시저장 완료 상태로 설정
      }, 1000);
    }
  };

  const extractFields = (data: ApiResponse) => {
    if (data.statusCode === 200) {
      // console.log(data);
      const fields = data.body.images[0].fields.map((field) => ({
        ...field,
        inferText: field.inferText.replace(/\n/g, ""), // \n 문자를 공백으로 대체
      }));

      fields.forEach((field, index) => {
        //시도1.
        infoList = {
          ...infoList,
          [`infoList[${index}].category`]: field.name,
          [`infoList[${index}].value`]: field.inferText,
        };
      });
      console.log("infoList", infoList);
    }
  };

  const fetchData = async () => {
    let result = null;
    setLoading(true); // 로딩 시작

    try {
      result = await fetchAPIData(pdfUrls["HanulApplicationFile"][0]);
      await extractFields(result);
      // console.log("infoList", infoList);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/applier/${applicationId}`,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${accessTokenApplier}`,
        },
        data: qs.stringify(infoList),
      };

      try {
        const response = await axios.request(config);
        console.log("성공 OCR 결과: ", response.data);
      } catch (error) {
        console.error("POST 요청 중 오류가 발생했습니다:", error);
      }
    } catch (error) {
      console.error("데이터 추출 중 오류가 발생했습니다:", error);
    } finally {
      setLoading(false); // 로딩 종료
      // 성공 모달 표시와 숨기기는 여기에 두어도 괜찮습니다.
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    }
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

  useEffect(() => {
    if (!isTempSaved) {
      setButtonState("default"); // isTempSaved가 false로 바뀔 때 버튼 상태를 초기화
    }
  }, [isTempSaved]);

  return (
    <div>
      <ApplierTopNav
        text="지원서 작성"
        showButton={true}
        onSave={handleSave}
        buttonState={buttonState}
        setButtonState={setButtonState}
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
          {isTempSaved && (
            <div className="h-[36px] w-full">
              <Alert
                state="neutral"
                alertIcon={<Icon name="Check" width={16} height={16} />}
                alertText={
                  <p className="text-paragraph-14 font-light">
                    {"임시저장되었습니다"}
                  </p>
                }
                onClose={() => setIsTempSaved(false)}
              />
            </div>
          )}
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
