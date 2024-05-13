import Home from "./Home";
import { cookies } from "next/headers";
import { LoadingProvider } from "../../../../../../common/components/LoadingContext";

let accessTokenRecruiter;

async function getApplierInfo(applicationId: string, accessToken: string) {
  try {
    const resApplierInfo = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/applier/recruiter/get-by-applicationId/${applicationId}` ||
        "http://localhost:3001",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!resApplierInfo.ok) {
      throw new Error(`HTTP error! status: ${resApplierInfo.status}`);
    }

    const responseApplierInfo = await resApplierInfo.json();
    return responseApplierInfo;
  } catch (error) {
    console.error("Error fetching applier info:", error);
    // Handle or rethrow the error as needed
  }
}

async function getApplierScore(
  recruitmentId: number,
  applicationId: string,
  accessToken: string
) {
  try {
    const resApplierScore = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/recruiter/${recruitmentId}/${applicationId}` ||
        "http://localhost:3001",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!resApplierScore.ok) {
      throw new Error(`HTTP error! status: ${resApplierScore.status}`);
    }

    const responseApplierScore = await resApplierScore.json();
    return responseApplierScore;
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
  const accessTokenPromise = cookieStore.get("accessTokenRecruiter")?.value; //여기만 바꾸면 됨
  accessTokenRecruiter = await accessTokenPromise;
  const recruitmentIPromise = cookieStore.get("recruitmentId")?.value; // Get the recruiter's access token from cookies
  const recruitmentIdString = await recruitmentIPromise;

  const recruitmentId = recruitmentIdString
    ? parseInt(recruitmentIdString, 10)
    : undefined;

  if (recruitmentId === undefined) {
    console.error("Invalid recruitmentId");
    return null;
  }
  const applierInfo = await getApplierInfo(
    params.applicationId,
    accessTokenRecruiter || ""
  );
  const applierScore = await getApplierScore(
    recruitmentId,
    params.applicationId,
    accessTokenRecruiter || ""
  );

  return (
    <LoadingProvider>
      <Home
        applicationId={params.applicationId}
        applierInfoData={applierInfo}
        applierScoreData={applierScore}
      />
    </LoadingProvider>
  );
}
