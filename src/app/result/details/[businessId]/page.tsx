import { access } from "fs";
import Home from "./Home";
import { cookies } from "next/headers";
import { LoadingProvider } from "../../../../../common/components/LoadingContext";

// `as string`을 사용하여 TypeScript에게 businessId의 타입이 'string'임을 단언합니다.

let accessToken;

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

async function getResponseApplier(businessId: string, accessToken: string) {
  const resApplier = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/getApplierInfo/${businessId}` ||
      "http://localhost:3001",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const responseApplier = await resApplier.json();
  return responseApplier;
}

export default async function Detail({
  params,
}: {
  params: { businessId: string };
}) {
  const cookieStore = cookies();
  const accessTokenPromise = cookieStore.get("accessToken")?.value;
  accessToken = await accessTokenPromise;
  const responseTotalScore = await getResponseTotal(accessToken || "");
  const responseApplier = await getResponseApplier(
    params.businessId,
    accessToken || ""
  );

  return (
    <LoadingProvider>
      <Home
        businessId={params.businessId}
        responseApplier={responseApplier}
        responseTotalScore={responseTotalScore}
      />
    </LoadingProvider>
  );
}
