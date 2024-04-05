// "use client";

// import React, { useEffect, useState } from "react";

// import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
// import FirstStepPage from "../../../../../../common/components/Bn_admin/FirstStep/FirstStepPage";
// import { getAccessToken } from "../../../../list/action";

// export default async function Page({
//   params,
// }: {
//   params: { applicationId: string };
// }) {
//   const [responseOCRpaper, setResponseOCRpaper] = useState<any>(null);
//   const [responseOCRresult, setResponseOCRresult] = useState<any>(null);
//   const [accessToken, setAccessToken] = useState("");

//   useEffect(() => {
//     async function fetchAccessToken() {
//       const token = await getAccessToken("Admin");
//       setAccessToken(token);
//     }
//     fetchAccessToken();
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       if (!accessToken) return;

//       try {
//         const paperResponse = await getOCRPaperresponse(
//           params.applicationId,
//           accessToken
//         );
//         const resultResponse = await getOCRResultresponse(
//           params.applicationId,
//           accessToken
//         );

//         setResponseOCRpaper(paperResponse);
//         setResponseOCRresult(resultResponse);
//       } catch (error) {
//         console.error("Failed to fetch data:", error);
//       }
//     }

//     fetchData();
//   }, [accessToken, params.applicationId]);

//   return (
//     <>
//       <div className="z-10 fixed top-0">
//         <ApplierTopNav
//           text="Admin 페이지"
//           showButton={true}
//           buttonState="logout"
//         />
//       </div>
//       <FirstStepPage
//         responseOCRpaper={responseOCRpaper}
//         responseOCRresult={responseOCRresult}
//       />
//     </>
//   );
// }

// async function getOCRPaperresponse(
//   params: any,
//   accessToken: string | undefined
// ) {
//   try {
//     const resPaper = await fetch(
//       `${process.env.NEXT_PUBLIC_SPRING_URL}/tempHanded/${params.applicationId}?documentName=한울건설협력업체등록신청서`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     if (!resPaper.ok) {
//       throw new Error(`Server responded with status: ${resPaper.status}`);
//     }
//     console.log("resPaper", resPaper);
//     const text = await resPaper.text(); // 응답을 텍스트로 읽습니다.
//     const responsePaper = text ? JSON.parse(text) : {}; // 텍스트가 비어 있지 않다면 JSON으로 파싱합니다.
//     return responsePaper;
//   } catch (error) {
//     console.error("Error fetching OCR paper response:", error);
//   }
// }

// async function getOCRResultresponse(
//   params: any,
//   accessToken: string | undefined
// ) {
//   try {
//     const resResult = await fetch(
//       `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/admin/${params.applicationId}`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${accessToken}` },
//       }
//     );
//     if (!resResult.ok) {
//       throw new Error(`Server responded with status: ${resResult.status}`);
//     }
//     console.log("resResult", resResult);

//     const responseResult = await resResult.json();
//     const filtered = responseResult.filter(
//       (item: any) => item.application.id === params.applicationId
//     );

//     return filtered;
//   } catch (error) {
//     console.error("Error fetching OCR result response:", error);
//   }
// }

"use client";

import React, { useEffect, useState } from "react";

import ApplierTopNav from "../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import FirstStepPage from "../../../../../../common/components/Bn_admin/FirstStep/FirstStepPage";
import { getAccessToken } from "../../../../list/action";

async function getOCRPaperresponse(
  applicationId: string,
  accessToken: string | undefined
) {
  try {
    const resPaper = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/tempHanded/${applicationId}?documentName=한울건설협력업체등록신청서`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resPaper.ok) {
      throw new Error(`Server responded with status: ${resPaper.status}`);
    }
    const text = await resPaper.text(); // 응답을 텍스트로 읽습니다.
    const responsePaper = text ? JSON.parse(text) : {}; // 텍스트가 비어 있지 않다면 JSON으로 파싱합니다.
    console.log("responsePaper", responsePaper);
    return responsePaper;
  } catch (error) {
    console.error("Error fetching OCR paper response:", error);
  }
}

async function getOCRResultresponse(
  applicationId: string,
  accessToken: string | undefined
) {
  try {
    const resResult = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/admin/${applicationId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resResult.ok) {
      throw new Error(`Server responded with status: ${resResult.status}`);
    }
    const responseResult = await resResult.json();
    const filtered = responseResult.filter(
      (item: any) => item.application.id === applicationId
    );

    return filtered;
  } catch (error) {
    console.error("Error fetching OCR result response:", error);
  }
}

export default async function page({
  params,
}: {
  params: { applicationId: string };
}) {
  const accessTokenPromise = getAccessToken("Admin");
  const accessToken = await accessTokenPromise;
  const responseOCRpaper = await getOCRPaperresponse(
    params.applicationId,
    accessToken
  );
  const responseOCRresult = await getOCRResultresponse(
    params.applicationId,
    accessToken
  );

  // 쿠키 불러올 때 서버함수 실행해서 오류 계속나는듯?
  //  Error: Server Functions cannot be called during initial render. This would create a fetch waterfall. Try to use a Server Component to pass data to Client Components instead.
  // at page (./src/app/bn_admin/list/[applicationId]/ocr/page.tsx:159:92)
  return (
    <>
      <div className="z-10 fixed top-0">
        <ApplierTopNav
          text="Admin 페이지"
          showButton={true}
          buttonState="logout"
        />
      </div>
      <FirstStepPage
        responseOCRpaper={responseOCRpaper}
        responseOCRresult={responseOCRresult}
      />
    </>
  );
}
