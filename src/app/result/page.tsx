import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import Result from "../../../common/components/ScoreTable/Result";
import { getAccessToken } from "../list/action";

async function App() {
  const data = await getData();
  return (
    <LoadingProvider>
      <Result data={data} />
    </LoadingProvider>
  );
}

export async function getData() {
  const accessTokenPromise = getAccessToken();
  const accessToken = await accessTokenPromise;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/getMyApplicants` ||
      "http://localhost:3001",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  const body = await res.json();
  return body;
}

export default App;
