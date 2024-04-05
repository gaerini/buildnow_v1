import React from "react";
import { LoadingProvider } from "../../../common/components/LoadingContext";
import List from "../../../common/components/ScoreTable/List";
import { getAccessToken } from "./action";


async function App() {
  const data = await getData();
  return (
    <LoadingProvider>
      <List fetchedData={data} />
    </LoadingProvider>
  );
}

const recruitementId = 1

async function getData() {
  const accessTokenPromise = getAccessToken();
  const accessTokenRecruiter = await accessTokenPromise;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/application/recruiter/get-application-list/${recruitementId}` ||
      "http://localhost:3001",
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessTokenRecruiter}` },
      cache: "no-cache",
    }
  );
  const body = await res.json();
  return body;
}

export default App;
