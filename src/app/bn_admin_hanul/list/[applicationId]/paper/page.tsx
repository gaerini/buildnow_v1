"use client";

import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../../list/action";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import ThirdStepPage from "../../../../../../common/components/Bn_admin_Hanul/ThirdStep/ThirdStepPage";

export default function page({
  params,
}: {
  params: { applicationId: string };
}) {
  const [responseOCRresult, setresponseOCRresult] = useState<any>(null);
  const [responseSipyeong, setresponseSipyeong] = useState<any>(null);
  const [APIsipyeong, setAPISipyeong] = useState<any>({});

  const [responseSinyong, setresponseSinyong] = useState<any>(null);

  useEffect(() => {
    // getData 함수 내에서 비동기 로직을 실행하고, 결과를 상태에 저장
    const fetchData = async () => {
      try {
        const result = await getOCRResultresponse(params.applicationId);
        if (result) {
          setresponseOCRresult(result.responseResult);
          setresponseSipyeong(result.sipyeong);
        } else {
          console.error("Failed to fetch OCR results: No data returned.");
        }
      } catch (error) {
        console.error("Error fetching OCR result response:", error);
      }
      const sinyongPaper = await getSinyongPaper(params.applicationId);
      setresponseSinyong(sinyongPaper);
    };
    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 실행하라는 의미입니다.

  useEffect(() => {
    const fetchData = async () => {
      // responseSipyeong이 유효하고 객체가 비어있지 않은 경우에만 실행
      if (responseSipyeong && Object.keys(responseSipyeong).length > 0) {
        const licenseKeys = Object.keys(responseSipyeong); // 보유면허의 모든 키를 가져옴

        try {
          const results = await Promise.all(
            licenseKeys.map((key) => getSipyeong(responseSipyeong[key]))
          );
          console.log("results", results);
          setAPISipyeong(results);
        } catch (error) {
          console.error(
            "모든 면허의 Sipyeong 데이터를 가져오는데 실패했습니다:",
            error
          );
        }
      } else {
        console.log("responseSipyeong is not ready or empty.");
      }
    };
    fetchData();
  }, [responseSipyeong]); // responseSipyeong의 변화를 감지하여 useEffect를 실행

  return (
    <>
      <div className="z-10 fixed top-0">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>

      {responseOCRresult !== null &&
      responseSinyong !== null &&
      APIsipyeong !== null ? (
        <ThirdStepPage
          responseOCRresult={responseOCRresult}
          sinyongPaper={responseSinyong}
          sipyeong={APIsipyeong}
          applicationId={params.applicationId}
        />
      ) : (
        <p>데이터 없음</p>
      )}
    </>
  );
}

async function getOCRResultresponse(applicationId: string) {
  try {
    const accessToken = await getAccessToken("Admin");
    const resResult = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/admin/${applicationId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resResult.ok) {
      throw new Error(`Server responded with status: ${resResult.status}`);
    }
    const responseResult = await resResult.json();

    const extractLicenseData = (results: any) => {
      const licenses: any = {};

      results.forEach((item: any) => {
        if (
          item.category.startsWith("보유면허") &&
          (item.category.includes("_등록번호") ||
            item.category.includes("_업종"))
        ) {
          const [base, type] = item.category.split("_");
          if (!licenses[base]) {
            licenses[base] = {};
          }
          licenses[base][type] = item.value;
        }
      });

      return licenses;
    };
    const sipyeong = await extractLicenseData(responseResult);
    return { responseResult, sipyeong };
  } catch (error) {
    console.error("Error fetching OCR result response:", error);
  }
}

async function getSinyongPaper(applicationId: string) {
  try {
    const accessToken = await getAccessToken("Admin");
    const resResult = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/all-application`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resResult.ok) {
      throw new Error(`Server responded with status: ${resResult.status}`);
    }
    const responseResult = await resResult.json();
    const application = await responseResult.find(
      (item: any) => item.application.id === Number(applicationId)
    );
    // const licensePaper =
    //   await application.applier.applicationList.tempSaved.tempHandedOutList.find(
    //     (item: any) => item.upperCategoryENUM === "LICENSE"
    //   );
    const filteredDocuments =
      await application.applier.applicationList[0].tempSaved.tempHandedOutList.filter(
        (item: any) => item.documentName.includes("CRR")
      );
    const sinyongUrls = await filteredDocuments.map((item: any) => item);
    return sinyongUrls;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}

async function getSipyeong(license: any) {
  try {
    const accessToken = await getAccessToken("Admin");
    console.log("accessToken", accessToken);
    const resResult = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/capacity-value/admin&recruiter/get-capacity-value?licenseNum=${license.등록번호}&year=2023&licenseName=${license.업종}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resResult.ok) {
      throw new Error(`서버 응답 상태: ${resResult.status}`);
    }
    return await resResult.json();
  } catch (error) {
    console.error("Sipyeong 데이터를 가져오는 중 오류가 발생했습니다:", error);
  }
}
