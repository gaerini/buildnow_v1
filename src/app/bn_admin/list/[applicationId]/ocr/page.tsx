"use client";

import React from "react";

import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import FirstStepPage from "../../../../../../common/components/Bn_admin/FirstStep/FirstStepPage";
import { getAccessToken } from "../../../../list/action";

async function getOCRPaperresponse(
  applicationId: string,
  accessToken: string | undefined
) {
  try {
    const resPaper = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/tempHanded/${applicationId}?documentName=한울건설협력업체등록신청서`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resPaper.ok) {
      throw new Error(`Server responded with status: ${resPaper.status}`);
    }
    const text = await resPaper.text(); // 응답을 텍스트로 읽습니다.
    const responsePaper = text ? JSON.parse(text) : {}; // 텍스트가 비어 있지 않다면 JSON으로 파싱합니다.
    console.log(responsePaper);
    return responsePaper;
  } catch (error) {
    console.error("Error fetching OCR paper response:", error);
  }
}

async function getOCRResultresponse(
  applicationId: string,
  accessToken: string | undefined
) {
  try {
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
    const filtered = responseResult.filter(
      (item: any) => item.application.id === applicationId
    );
    return filtered;
  } catch (error) {
    console.error("Error fetching OCR result response:", error);
  }
}

export default async function page({
  params,
}: {
  params: { applicationId: string };
}) {
  const accessTokenPromise = getAccessToken();
  const accessToken = await accessTokenPromise;

  const responseOCRpaper = await getOCRPaperresponse(
    params.applicationId,
    accessToken
  );
  const responseOCRresult = await getOCRResultresponse(
    params.applicationId,
    accessToken
  );

  return (
    <>
      <div className="z-10 fixed top-0">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      <FirstStepPage
        responseOCRpaper={responseOCRpaper}
        responseOCRresult={responseOCRresult}
      />
    </>
  );
}
