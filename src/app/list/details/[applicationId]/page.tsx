import Home from "./Home";
import { cookies } from "next/headers";
import { LoadingProvider } from "../../../../../common/components/LoadingContext";

// `as string`을 사용하여 TypeScript에게 businessId의 타입이 'string'임을 단언합니다.

let accessTokenRecruiter;

async function getResponseTotal(accessToken: string) {
  const resTotal = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/getMyApplicants` ||
      " http://localhost:3001",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const responseTotalScore = await resTotal.json();
  return responseTotalScore;
}

async function getResponseApplier(applicationId: string, accessToken: string) {
  const resApplier = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/getApplierInfo/${applicationId}` ||
      "http://localhost:3001",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const responseApplier = await resApplier.json();
  return responseApplier;
}

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

export default async function Detail({
  params,
}: {
  params: { applicationId: string };
}) {
  const cookieStore = cookies();
  const accessTokenPromise = cookieStore.get("accessTokenRecruiter")?.value; //여기만 바꾸면 됨
  accessTokenRecruiter = await accessTokenPromise;
  const responseTotalScore = await getResponseTotal(accessTokenRecruiter || "");
  const responseApplier = await getResponseApplier(
    params.applicationId,
    accessTokenRecruiter || ""
  );
  const applierInfo = await getApplierInfo(
    params.applicationId,
    accessTokenRecruiter || ""
  );

  return (
    <LoadingProvider>
      <Home
        applicationId={params.applicationId}
        responseApplier={responseApplier}
        responseTotalScore={responseTotalScore}
        applierInfoData={applierInfo}
      />
    </LoadingProvider>
  );
}
