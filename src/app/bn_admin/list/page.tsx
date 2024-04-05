import React from "react";
import { LoadingProvider } from "../../../../common/components/LoadingContext";

import TablePage from "../../../../common/components/Bn_admin/Table/TablePage";
import ApplierTopNav from "../../../../common/components/ApplierTopNav/ApplierTopNav";
import { getAccessToken } from "../../list/action";

async function page() {
  const data = await getData();
  return (
    <LoadingProvider>
      <div className="flex justify-between items-center px-4 py-2">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      <TablePage fetchedData={data} />
      {/* <List fetchedData={data} /> */}
    </LoadingProvider>
  );
}

async function getData() {
  try {
    const accessTokenPromise = await getAccessToken("Admin");
    const accessToken = await accessTokenPromise;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/all-application`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-cache",
      }
    );
    // console.log("리스폰스", res);

    if (!res.ok) {
      throw new Error(`Server responded with status ${res.status}`);
    }

    let body = {};
    if (res.status !== 204) {
      body = await res.json();
    }

    return body;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    // 적절한 오류 처리 로직을 여기에 추가하세요.
  }
}

export default page;
