import React from "react";

import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import FifthStepPage from "../../../../../../common/components/Bn_admin_Hanul/FifthStep/FifthStepPage";
import { cookies } from "next/headers";

const recruitmentId = 1;
let accessTokenAdmin;

async function getRecruitmentGrading(
  recruitmentId: number,
  accessToken: string
) {
  try {
    const resRecruitment = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/grading/admin/${recruitmentId}` ||
        "http://localhost:3001",
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

export default async function Detail({
  params,
}: {
  params: { applicationId: string };
}) {
  const cookieStore = cookies();
  const accessTokenPromise = cookieStore.get("accessTokenAdmin")?.value; //여기만 바꾸면 됨
  accessTokenAdmin = await accessTokenPromise;

  const recruitmentGrading = await getRecruitmentGrading(
    recruitmentId,
    accessTokenAdmin || ""
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
      <FifthStepPage
        applicationId={params.applicationId}
        recruitmentGrading={recruitmentGrading}
      />
    </>
  );
}
