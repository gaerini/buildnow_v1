"use client";
import React, { useState, useEffect } from "react";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import Preferential from "../../../../../../common/components/ApplierApply/Preferential";
import ApplierSideNav from "../../../../../../common/components/ApplierSideNav/ApplierSideNav";
import Header from "../../../../../../common/components/ApplierApply/Header";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { uploadFilesAndUpdateUrls } from "../../../../api/pdf/utils";

type PdfUrlsType = {
  [key: string]: string[];
};

interface TempHandedOutList {
  documentName: string;
  documentUrl: string;
  requiredLevelENUM: string;
  upperCategoryENUM: string;
}

interface FetchTempHandedOutList {
  id: number;
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

interface FetchTempSaveRequest {
  corporateApplication: string;
  companyPhoneNum: string;
  workTypeApplying: string;
  type: string;
  companyAddress: string;
  companyIntro: string;
  tempHandedOutList: FetchTempHandedOutList[];
}

export default function page() {
  const [isoFiles, setIsoFiles] = useState<File[]>([]);
  const [koshaFiles, setKoshaFiles] = useState<File[]>([]);
  const [KSFiles, setKSFiles] = useState<File[]>([]);
  const [PrizeFiles, setPrizeFiles] = useState<File[]>([]);
  const [PatentFiles, setPatentFiles] = useState<File[]>([]);
  const [ESGFiles, setESGFiles] = useState<File[]>([]);
  const [SHFiles, setSHFiles] = useState<File[]>([]);

  const [isTempSaved, setIsTempSaved] = useState(false);
  const [buttonState, setButtonState] = useState("default");

  const [fetchedData, setFetchedData] = useState<FetchTempSaveRequest | null>(
    null
  );

  const accessTokenApplier = Cookies.get("accessTokenApplier");
  const applicationId = Cookies.get("applicationId");

  const qs = require("qs");
  const router = useRouter();
  const [pdfUrls, setPdfUrls] = useState<PdfUrlsType>({});

  useEffect(() => {
    console.log("Updated pdfUrls:", pdfUrls);
  }, [pdfUrls]);

  const createTempHandedOutList = (): TempHandedOutList[] => {
    let tempHandedOutList: TempHandedOutList[] = [];

    Object.keys(pdfUrls).forEach((key) => {
      const documentUrls = pdfUrls[key];

      documentUrls.forEach((url, index) => {
        const documentName =
          documentUrls.length > 1 ? `${key}-${index + 1}` : key;
        tempHandedOutList.push({
          documentName: documentName,
          documentUrl: url,
          requiredLevelENUM: "PREFERRED",
          upperCategoryENUM: "PATENT",
        });
      });
    });

    return tempHandedOutList;
  };

  function excludeIdKey(obj: FetchTempHandedOutList) {
    const { id, ...rest } = obj;
    return rest;
  }

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      if (!accessTokenApplier || !applicationId) {
        console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/applier/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${accessTokenApplier}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Fetched data:", response.data);
        setFetchedData(response.data);
      } catch (error) {
        console.error("Fetch failed", error);
      }
    };

    fetchData();
  }, []);

  const handleTempSave = async () => {
    if (!accessTokenApplier || !applicationId) {
      console.error("인증 토큰 또는 지원서 ID가 존재하지 않습니다.");
      return false;
    }

    if (!fetchedData) {
      console.error("No data fetched");
      return false;
    }

    console.log("기존 녀석", fetchedData);

    // response.data.tempHandedOutList의 각 객체에서 "id" 제외
    const corporateApplication = fetchedData.corporateApplication;
    const companyPhoneNum = fetchedData.companyPhoneNum;
    const workTypeApplying = fetchedData.workTypeApplying;
    const type = fetchedData.type;
    const companyAddress = fetchedData.companyAddress;
    const companyIntro = fetchedData.companyIntro;

    const filteredTempHandedOutList =
      fetchedData.tempHandedOutList.map(excludeIdKey);
    const newTempHandedOutList = createTempHandedOutList();

    console.log("신규 임시저장 값", newTempHandedOutList);

    // API 요청을 위한 데이터 준비
    const requestBody: TempSaveRequest = {
      corporateApplication: corporateApplication,
      companyPhoneNum: companyPhoneNum,
      workTypeApplying: workTypeApplying,
      type: type,
      companyAddress: companyAddress,
      companyIntro: companyIntro,
      tempHandedOutList: [
        ...filteredTempHandedOutList,
        ...newTempHandedOutList,
      ],
    };

    // Convert the entire object into x-www-form-urlencoded format
    console.log(requestBody);
    // Filter the tempHandedOutList to keep only the last occurrence of each documentName
    const uniqueTempHandedOutList = requestBody.tempHandedOutList.reduceRight(
      (acc: TempHandedOutList[], current) => {
        if (!acc.some((item) => item.documentName === current.documentName)) {
          acc.push(current);
        }
        return acc;
      },
      [] as TempHandedOutList[]
    ); //
    // Prepare the updated requestBody
    const updatedRequestBody: TempSaveRequest = {
      ...requestBody,
      tempHandedOutList: uniqueTempHandedOutList,
    };

    const formBody = qs.stringify(updatedRequestBody, { allowDots: true });

    console.log(formBody);

    try {
      // 서버에 POST 요청을 보냅니다.
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/applier/${applicationId}`,
        formBody,
        {
          headers: {
            Authorization: `Bearer ${accessTokenApplier}`,
            "Content-Type": "application/x-www-form-urlencoded",
            // 필요한 경우, 인증 토큰 등의 헤더를 추가합니다.
          },
        }
      );

      if (response.status === 200) {
        // 성공적으로 임시저장되었을 때의 로직
        console.log("임시 저장 성공", response.data);
        return true;
        // 여기에 성공시 처리할 코드를 작성하세요.
      }
    } catch (error) {
      console.error("임시 저장 실패", error);
      return false;
      // 에러 처리 로직
    }
  };

  const validateAndNavigate = async () => {
    try {
      const tempSaveSuccessful = await handleTempSave();
      console.log("저장 여부", tempSaveSuccessful);
      // if (!tempSaveSuccessful) {
      //   alert("임시 저장 중 문제가 발생했습니다.");
      //   return;
      // }

      console.log("토근", accessTokenApplier);
      // 최종 제출 API 호출
      await axios.patch(
        `${process.env.NEXT_PUBLIC_SPRING_URL}/application/applier/submit/${applicationId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessTokenApplier}`,
          },
        }
      );

      console.log("patch는 됨");

      // 페이지 이동
      router.push("../result");
    } catch (error) {
      console.error("validateAndNavigate 오류:", error);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
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

  useEffect(() => {
    if (!isTempSaved) {
      setButtonState("default"); // isTempSaved가 false로 바뀔 때 버튼 상태를 초기화
    }
  }, [isTempSaved]);

  return (
    <div className="select-none flex flex-col w-full h-screen">
      <ApplierTopNav
        text="지원서 작성"
        showButton={true}
        onSave={handleSave}
        buttonState={buttonState}
        setButtonState={setButtonState}
      />
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
            setPdfUrls={setPdfUrls}
            isTempSaved={isTempSaved}
            setIsTempSaved={setIsTempSaved}
          />
        </div>
        <ApplierSideNav
          comp="한울건설"
          prev={"essential"}
          next={"../result"}
          onValidateAndNavigate={validateAndNavigate}
        />
      </div>
    </div>
  );
}
