// import React from "react";
// import { LoadingProvider } from "../../../../common/components/LoadingContext";

// import TablePage from "../../../../common/components/Bn_admin/Table/TablePage";
// import ApplierTopNav from "../../../../common/components/ApplierTopNav/ApplierTopNav";
// import { getAccessToken } from "../../list/action";

// async function page() {
//   const data = await getData();
//   return (
//     <LoadingProvider>
//       <div className="flex justify-between items-center px-4 py-2">
//         <ApplierTopNav
//           text="Admin 페이지"
//           showButton={true}
//           buttonState="logout"
//         />
//       </div>
//       <TablePage adminData={data} />
//       {/* <List fetchedData={data} /> */}
//     </LoadingProvider>
//   );
// }

// async function getData() {
//   try {
//     const accessToken = await getAccessToken("Admin");
//     const resResult = await fetch(
//       `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/all-application`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${accessToken}` },
//         cache: "no-cache",
//       }
//     );
//     console.log(resResult);

//     if (!resResult.ok) {
//       throw new Error(`Server responded with status: ${resResult.status}`);
//     }
//     const responseResult = await resResult.json();
//     const filtered = await responseResult.fetchedData.filter(
//       (item: any) => item.application.submit === false
//     );
//     console.log("filtered", filtered);

//     return filtered;
//   } catch (error) {
//     console.error("Error fetching:", error);
//   }
// }

// export default page;
"use client";
import React, { useEffect, useState } from "react";
import { LoadingProvider } from "../../../../common/components/LoadingContext";
import TablePage from "../../../../common/components/Bn_admin_Hanul/Table/TablePage";
import ApplierTopNav from "../../../../common/components/ApplierTopNav/ApplierTopNav";
import { getAccessToken } from "../../list/action";

function Page() {
  // 상태를 사용하여 비동기적으로 로드된 데이터를 저장
  const [adminData, setAdminData] = useState(null);
  useEffect(() => {
    // getData 함수 내에서 비동기 로직을 실행하고, 결과를 상태에 저장
    const fetchData = async () => {
      const data = await getData();
      await setAdminData(data);
    };
    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 실행하라는 의미입니다.

  // console.log(adminData);

  return (
    <LoadingProvider>
      <div className="flex justify-between items-center px-4 py-2">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      {adminData !== null ? (
        <TablePage adminData={adminData} />
      ) : (
        <div>Loading...</div>
      )}
    </LoadingProvider>
  );
}

async function getData() {
  try {
    const accessToken = await getAccessToken("Admin");
    const resResult = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/all-application`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-cache",
      }
    );

    if (!resResult.ok) {
      throw new Error(`Server responded with status: ${resResult.status}`);
    }
    const responseResult = await resResult.json();

    const filtered = await responseResult.filter(
      (item: any) => item.application.submit === false
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching:", error);
    return []; // 오류 발생 시 빈 배열 반환
  }
}

export default Page;
