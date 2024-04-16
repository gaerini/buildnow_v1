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

export default async function App() {
  const cookieStore = cookies();
  const accessTokenPromise = cookieStore.get("accessTokenRecruiter")?.value; //여기만 바꾸면 됨
  const accessTokenRecruiter = await accessTokenPromise;
  const data = await getData(recruitmentId, accessTokenRecruiter || "");

  const applierListData = data?.applierWithScoreDTOList.filter(
    (applier: ApplierListData) => {
      // Check if applier is not checked
      if (applier.checked === false) {
        // Check if there are no prerequisites with isPrerequisite === false
        const noUnmetPrerequisites =
          applier.tempPrerequisiteList.filter(
            (prerequisite) => prerequisite.isPrerequisite === false
          ).length === 0;
        return noUnmetPrerequisites;
      }
      return false;
    }
  );
  return (
    <LoadingProvider>
      <List fetchedData={applierListData} />
    </LoadingProvider>
  );
}
