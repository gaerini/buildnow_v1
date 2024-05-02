"use client";

import React, { useEffect, useState } from "react";
import ApplierTopNav from "../../../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import AdminAddTop from "../../../../../../../../common/components/AdminAddTop/AdminAddTop";
import SecondStepPage from "../../../../../../../../common/components/Bn_admin_Sinhan/SecondStep/SecondStepPage";
import { getAccessToken } from "../../../../../../list/action";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

export default function page({
  params,
}: {
  params: { applicationId: string; companyName: string; workType: string };
}) {
  const [responsePaper, setresponsePaper] = useState<any>(null);
  const [allChecked, setAllChecked] = useState(false);
  const [allPrerequisitesMet, setAllPrerequisitesMet] = useState(false);
  const router = useRouter();

  const [midalStates, setMidalStates] = useState([
    { prerequisiteName: "면허보유여부", isPrerequisite: "false", whyMidal: "" },
    { prerequisiteName: "신용등급", isPrerequisite: "false", whyMidal: "" },
    { prerequisiteName: "영업기간", isPrerequisite: "false", whyMidal: "" },
    { prerequisiteName: "부정당업자", isPrerequisite: "false", whyMidal: "" },
  ]);
  async function postAdminCheck(accessToken?: string) {
    let config5 = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/check-true/${params.applicationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.request(config5);
      console.log("성공: ", response.data);
    } catch (error) {
      console.error("검수완료 체크 중 오류가 발생했습니다:", error);
      throw new Error("검수완료 체크 실패"); // 오류를 상위로 전파
    }
  }

  async function postMidal(accessToken?: string) {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/temp-prerequisite/admin/${params.applicationId}`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({ tempPrerequisiteDTOList: midalStates }),
    };
    try {
      const response = await axios.request(config);
      console.log("Midal 입력 성공: ", response.data);
    } catch (error) {
      console.error("Midal 입력 중 오류가 발생했습니다:", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }

  async function patchMidal(accessToken?: string) {
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/temp-prerequisite/admin/${params.applicationId}`,

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: JSON.stringify({ tempPrerequisiteDTOList: midalStates }),
    };
    try {
      const response = await axios.request(config);
      console.log("Midal 수정 성공: ", response.data);
    } catch (error) {
      console.log("Midal 수정 실패");
      console.error("Midal 수정 중 오류가 발생했습니다:", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }

  async function handleMidalError(accessToken?: string) {
    try {
      const response = await postMidal(accessToken);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || "";
        if (
          errorMessage ===
          "Error Occurred: 동일한 prerequisiteName 존재, 중복 제거해야함."
        ) {
          try {
            console.log("Midal 재시도");
            const retryResult = await patchMidal(accessToken);
            return retryResult; // 재시도 결과 반환
          } catch (retryError) {
            console.error("Error on retry", retryError);
            return false; // 재시도 실패
          }
        }
      }
      return false; // 점수 저장 초기 시도 실패
    }
    return true; // 점수 저장 초기 시도 성공
  }

  async function postDumping(accessToken?: string) {
    const axios = require("axios");
    let config4 = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/admin/dump-to-application-and-applier/${params.applicationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    try {
      const response = await axios.request(config4);
      console.log("성공: ", response.data);
    } catch (error) {
      console.error("데이터 덤핑 중 오류가 발생했습니다:", error);
      throw new Error("데이터 덤핑 실패"); // 오류를 상위로 전파
    }
  }

  // console.log("midalStates", midalStates);

  const handleNextStep = async () => {
    if (!allChecked) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      try {
        const accessToken = await getAccessToken("Admin");
        await handleMidalError(accessToken);
        if (allPrerequisitesMet) {
          router.push(
            `/bn_admin_sinhan/list/${params.applicationId}/${params.companyName}/${params.workType}/score`
          );
        } else {
          await postAdminCheck(accessToken);
          await postDumping(accessToken);
          router.push(`/bn_admin_sinhan/list`);
        }
      } catch (error) {
        console.error("Axios 요청 중 오류가 발생했습니다:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const Paper = await getPaper(params.applicationId);
      // console.log("Paper", Paper);
      await setresponsePaper(Paper);
    };
    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 실행하라는 의미입니다.

  return (
    <div className="flex-col">
      <ApplierTopNav
        text="Admin 페이지"
        showButton={true}
        showButton2={false}
        buttonState="logout"
      />
      {handleNextStep !== null ? (
        <AdminAddTop
          step="(1) 미달 여부 체크"
          companyName={params.companyName}
          workType={params.workType}
          applicationId={params.applicationId}
          handleButton={handleNextStep}
          ButtonText="다음으로~!!"
        />
      ) : (
        <div>Loading...</div>
      )}

      <div className="pt-20">
        {responsePaper !== null ? (
          <SecondStepPage
            Paper={responsePaper}
            setAllChecked={setAllChecked}
            midalStates={midalStates}
            setMidalStates={setMidalStates}
            setAllPrerequisitesMet={setAllPrerequisitesMet}
          />
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
    </div>
  );
}

async function getPaper(applicationId: string) {
  try {
    const accessToken = await getAccessToken("Admin");
    const resResult = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/all-application`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!resResult.ok) {
      throw new Error(`Server responded with status: ${resResult.status}`);
    }
    const responseResult = await resResult.json();
    const application = await responseResult.find(
      (item: any) => item.application.id === Number(applicationId)
    );
    const filteredDocuments =
      await application.application.tempSaved.tempHandedOutList.filter(
        (item: any) =>
          item.documentName.includes("지명원") ||
          item.documentName.includes("CRR")
      );
    // console.log(application);
    // console.log(filteredDocuments);

    const paperUrls = await filteredDocuments.map((item: any) => item);
    return paperUrls;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}
