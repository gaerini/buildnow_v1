import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import Result from "../../../common/components/ScoreTable/Result";
import { cookies } from "next/headers";
import { ApplierListData } from "../../../common/components/Interface/CompanyData";

const recruitmentId = 1;

async function getData(recruitmentId: number, accessToken: string) {
  try {
    const resApplierScoreList = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/application/recruiter/get-application-list/${recruitmentId}` ||
        "http://localhost:3001",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!resApplierScoreList.ok) {
      throw new Error(`HTTP error! status: ${resApplierScoreList.status}`);
    }

    const responseApplierScore = await resApplierScoreList.json();
    return responseApplierScore;
  } catch (error) {
    console.error("Error fetching applier score:", error);
    // Handle or rethrow the error as needed
  }
}

export default async function App() {
  const cookieStore = cookies();
  const accessTokenPromise = cookieStore.get("accessTokenRecruiter")?.value; // Get the recruiter's access token from cookies
  const accessTokenRecruiter = await accessTokenPromise;
  const data = await getData(recruitmentId, accessTokenRecruiter || "");

  const applierResultData = data?.applierWithScoreDTOList.filter(
    (applier: ApplierListData) => {
      // Check if applier is checked
      const isChecked = applier.checked === true;
      // Check if any prerequisites have isPrerequisite === false
      const hasUnmetPrerequisites = applier.tempPrerequisiteList.some(
        (prerequisite) => prerequisite.isPrerequisite === false
      );
      // Check if admin has checked the applier
      const isAdminChecked = applier.adminChecked === true;

      // Combine the conditions with OR for the first two, and AND for the admin check
      return (isChecked || hasUnmetPrerequisites) && isAdminChecked;
    }
  );

  return (
    <LoadingProvider>
      <Result fetchedData={applierResultData} />
    </LoadingProvider>
  );
}
