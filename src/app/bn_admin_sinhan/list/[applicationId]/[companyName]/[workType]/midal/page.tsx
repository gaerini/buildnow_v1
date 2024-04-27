"use client";

import React, { useEffect, useState } from "react";
import ApplierTopNav from "../../../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import AdminAddTop from "../../../../../../../../common/components/AdminAddTop/AdminAddTop";
import SecondStepPage from "../../../../../../../../common/components/Bn_admin_Sinhan/SecondStep/SecondStepPage";
import { getAccessToken } from "../../../../../../list/action";

export default function page({
  params,
}: {
  params: { applicationId: string; companyName: string; workType: string };
}) {
  const [responsePaper, setresponsePaper] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const Paper = await getPaper(params.applicationId);
      console.log("Paper", Paper);
      await setresponsePaper(Paper);
    };
    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 실행하라는 의미입니다.

  return (
    <div className="flex-col">
      <ApplierTopNav
        text="Admin 페이지"
        showButton={true}
        showButton2={false}
        buttonState="logout"
      />
      <AdminAddTop
        step="(1) 미달 여부 체크"
        companyName={params.companyName}
        workType={params.workType}
        applicationId={params.applicationId}
      />
      <div className="pt-20">
        {responsePaper !== null ? (
          <SecondStepPage
            Paper={responsePaper}
            applicationId={params.applicationId}
          />
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
    </div>
  );
}

async function getPaper(applicationId: string) {
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
      await application.application.tempSaved.tempHandedOutList.filter(
        (item: any) => item.documentName.includes("지명원")
      );
    console.log(application);
    const paperUrls = await filteredDocuments.map((item: any) => item);
    return paperUrls;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}
