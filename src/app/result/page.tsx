import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import Result from "../../../common/components/ScoreTable/Result";
import { cookies } from "next/headers";
import { ApplierListData } from "../../../common/components/Interface/CompanyData";

import Cookies from "js-cookie";

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

async function getScoreCategory(recruitmentId: number, accessToken: string) {
  try {
    const resScoreCategory = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/grading/recruiter/${recruitmentId}` ||
        "http://localhost:3001",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!resScoreCategory.ok) {
      throw new Error(`HTTP error! status: ${resScoreCategory.status}`);
    }

    const responseScoreCategory = await resScoreCategory.json();
    console.log("배점기준", responseScoreCategory);
    return responseScoreCategory;
  } catch (error) {
    console.error("Error fetching score category:", error);
  }
}

export default async function App() {
  const cookieStore = cookies();
  const accessTokenPromise = cookieStore.get("accessTokenRecruiter")?.value; // Get the recruiter's access token from cookies
  const accessTokenRecruiter = await accessTokenPromise;
  const recruitmentIPromise = cookieStore.get("recruitmentId")?.value; // Get the recruiter's access token from cookies
  const recruitmentIdString = await recruitmentIPromise;
  const recruitmentId = recruitmentIdString
    ? parseInt(recruitmentIdString, 10)
    : undefined;
  // Check if recruitmentId is defined
  if (recruitmentId === undefined) {
    console.error("Invalid recruitmentId");
    return null;
  }
  const data = await getData(recruitmentId, accessTokenRecruiter || "");
  const scoreCategory = await getScoreCategory(
    recruitmentId,
    accessTokenRecruiter || ""
  );

  const applierResultData = data?.applierWithScoreDTOList.filter(
    (applier: ApplierListData) => {
      // Check if applier is checked
      const isChecked = applier.checked === true;
      // Check if any prerequisites have isPrerequisite === false
      const hasUnmetPrerequisites = applier.tempPrerequisiteList.some(
        (prerequisite) => prerequisite.isPrerequisite === false
      );

      // Combine the conditions with OR for the first two, and AND for the admin check
      return isChecked || hasUnmetPrerequisites;
    }
  );

  return (
    <LoadingProvider>
      <Result fetchedData={applierResultData} scoreCategory={scoreCategory} />
    </LoadingProvider>
  );
}
