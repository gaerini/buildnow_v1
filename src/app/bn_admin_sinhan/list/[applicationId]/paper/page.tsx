"use client";

import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../../list/action";
import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import ThirdStepPage from "../../../../../../common/components/Bn_admin_Sinhan/ThirdStep/ThirdStepPage";

export default function page({
  params,
}: {
  params: { applicationId: string };
}) {
  const [responseSinyong, setresponseSinyong] = useState<any>(null);
  const [recruitmentGrading, setRecruitmentGrading] = useState<any>(null);
  const [licenseName, setLicenseName] = useState<any>(null);

  const recruitmentId = 1;

  useEffect(() => {
    // getData 함수 내에서 비동기 로직을 실행하고, 결과를 상태에 저장
    const fetchData = async () => {
      const sinyongPaper = await getSinyongPaper(params.applicationId);
      setresponseSinyong(sinyongPaper);
      const recruitmentGrading = await getRecruitmentGrading(recruitmentId);
      setRecruitmentGrading(recruitmentGrading);
      const licenseName = await getLicenseName(params.applicationId);
      setLicenseName(licenseName);
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

      {responseSinyong !== null &&
      recruitmentGrading !== null &&
      licenseName !== null ? (
        <ThirdStepPage
          sinyongPaper={responseSinyong}
          applicationId={params.applicationId}
          recruitmentGrading={recruitmentGrading}
          licenseName={licenseName}
        />
      ) : (
        <p>데이터 없음</p>
      )}
    </>
  );
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

async function getRecruitmentGrading(recruitmentId: number) {
  try {
    const accessToken = await getAccessToken("Admin");
    const resRecruitment = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/grading/admin/${recruitmentId}` ||
        "http://localhost:3000",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!resRecruitment.ok) {
      throw new Error(`HTTP error! status: ${resRecruitment.status}`);
    }

    const responseRecruitment = await resRecruitment.json();

    return responseRecruitment;
  } catch (error) {
    console.error("Error fetching applier score:", error);
    // Handle or rethrow the error as needed
  }
}

async function getLicenseName(applicationId: string) {
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
    const licenseName = await application.application.tempSaved.licenseName;
    console.log("licenseName", licenseName);
    // const paperUrls = await filteredDocuments.map((item: any) => item);
    return licenseName;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}
