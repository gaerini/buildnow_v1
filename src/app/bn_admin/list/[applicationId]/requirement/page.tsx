"use client";

import React, { useEffect, useState } from "react";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import SecondStepPage from "../../../../../../common/components/Bn_admin/SecondStep/SecondStepPage";
import { getAccessToken } from "../../../../list/action";
import { access } from "fs";
import { NoItem } from "../../../../../../common/components/Icon/svgs";

export default function page({
  params,
}: {
  params: { applicationId: string };
}) {
  const [responseOCRresult, setresponseOCRresult] = useState<any>(null);
  const [responseLicense, setresponseLicense] = useState<any>(null);

  useEffect(() => {
    // getData 함수 내에서 비동기 로직을 실행하고, 결과를 상태에 저장
    const fetchData = async () => {
      const OCRresult = await getOCRResultresponse(params.applicationId);
      await setresponseOCRresult(OCRresult);
      const LicensePaper = await getLicensePaper(params.applicationId);
      await setresponseLicense(LicensePaper);
    };
    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 실행하라는 의미입니다.

  return (
    <>
      <div className="z-10 fixed top-0">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>

      {responseOCRresult !== null && responseLicense !== null ? (
        <SecondStepPage
          responseOCRresult={responseOCRresult}
          LicensePaper={responseLicense}
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
    console.log(responseResult);
    return responseResult;
  } catch (error) {
    console.error("Error fetching OCR result response:", error);
  }
}

async function getLicensePaper(applicationId: string) {
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
        (item: any) => item.documentName.includes("면허")
      );
    const licenseUrls = await filteredDocuments.map((item: any) => item);
    return licenseUrls;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}
