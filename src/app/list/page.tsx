import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import List from "../../../common/components/ScoreTable/List";
import { getAccessToken } from "./action";
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
    console.log("데이터", responseApplierScore);
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
  const data = await getData(recruitmentId, accessTokenRecruiter || "");
  const scoreCategory = await getScoreCategory(recruitmentId, accessTokenRecruiter || "");

  const applierListData = data?.applierWithScoreDTOList.filter(
    (applier: ApplierListData) => {
      // Check if applier is not checked
      const isNotChecked = applier.checked === false;
      // Check if all prerequisites have isPrerequisite === true
      const hasMetAllPrerequisites = applier.tempPrerequisiteList.every(
        (prerequisite) => prerequisite.isPrerequisite === true
      );
      // Check if admin has checked the applier
      const isAdminChecked = applier.adminChecked === true;

      // Combine the conditions with AND to ensure all conditions are met
      return isNotChecked && hasMetAllPrerequisites && isAdminChecked;
    }
  );


  return (
    <LoadingProvider>
      <List fetchedData= {applierListData} scoreCategory={scoreCategory} />
    </LoadingProvider>
  );
}
