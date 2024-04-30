"use client";

import React, { useEffect, useState } from "react";
import { getAccessToken } from "../../../../../../list/action";
import ApplierTopNav from "../../../../../../../../common/components/ApplierTopNav/ApplierTopNav";
import AdminAddTop from "../../../../../../../../common/components/AdminAddTop/AdminAddTop";
import ThirdStepPage from "../../../../../../../../common/components/Bn_admin_Sinhan/ThirdStep/ThirdStepPage";
import { LoadingProvider } from "../../../../../../../../common/components/LoadingContext";
import Icon from "../../../../../../../../common/components/Icon/Icon";
import { useRouter } from "next/navigation";

interface inputValues {
  [key: string]: string;
}

interface Scores {
  categoryName: string;
  score: number | string;
}

export default function page({
  params,
}: {
  params: { applicationId: string; companyName: string; workType: string };
}) {
  const [paper, setPaper] = useState<any>(null);
  const [recruitmentGrading, setRecruitmentGrading] = useState<any>([]);
  const [licenseName, setLicenseName] = useState<any>("");
  const [inputValues, setInputValues] = useState<inputValues>({
    면허명: licenseName,
  });
  const [allChecked, setAllChecked] = useState(false);
  const [scores, setScores] = useState<Scores>();
  const router = useRouter();

  const recruitmentId = 1;

  // console.log("allChecked", allChecked);

  useEffect(() => {
    // getData 함수 내에서 비동기 로직을 실행하고, 결과를 상태에 저장
    const fetchData = async () => {
      const paper = await getPaper(params.applicationId);
      setPaper(paper);
      const recruitmentGrading = await getRecruitmentGrading(recruitmentId);
      setRecruitmentGrading(recruitmentGrading);
      console.log(recruitmentGrading);

      const licenseName = await getLicenseName(params.applicationId);
      setInputValues((prev) => ({ ...prev, 면허명: licenseName }));
    };
    fetchData();
  }, []); // 빈 의존성 배열은 컴포넌트가 마운트될 때 이 효과를 실행하라는 의미입니다.

  async function postExtra(accessToken?: string, data?: any) {
    const axios = require("axios");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/extra-value/admin/${params.applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 201) {
        console.log("Extra 입력 성공", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("Extra 입력 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }

  async function patchExtra(accessToken?: string, data?: any) {
    const axios = require("axios");

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/extra-value/admin/${params.applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log("Extra 수정 성공", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("Extra 수정 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function handleExtraError(accessToken?: string, data?: any) {
    const axios = require("axios");

    try {
      const response = await postExtra(accessToken, data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || "";
        if (
          errorMessage ===
          "Error Occurred: 이미 해당 applier에 동일한 category가 저장되어있습니다."
        ) {
          try {
            console.log("Extra 재시도");
            const retryResult = await patchExtra(accessToken, data);
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

  async function postFinance(accessToken?: string, data?: any) {
    const axios = require("axios");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/finance/admin/${params.applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 201) {
        console.log("Finance 입력 성공", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        alert("재무부문에 정확한 입력값 넣으삼");

        // throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("Finance 입력 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function deleteFinance(accessToken?: string) {
    const axios = require("axios");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/finance/admin/${params.applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log("성공 :", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("Finance 삭제 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function handleFinanceError(accessToken?: string, data?: any) {
    const axios = require("axios");

    try {
      const response = await postFinance(accessToken, data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || "";
        if (
          errorMessage ===
          "Error Occurred: 이미 존재하는 finance 정보이기 때문에 입력할 수 없습니다."
        ) {
          try {
            await deleteFinance(accessToken);
            console.log("Finance 재시도");
            const retryResult = await postFinance(accessToken, data);
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
  async function postScores(accessToken?: string, applicationDTOList?: any) {
    const axios = require("axios");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${params.applicationId}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
      data: applicationDTOList,
    };

    try {
      const response = await axios.request(config);
      if (response.status === 201) {
        console.log("점수 저장 성공", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        console.log("어떤에러", response.status);
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("점수 저장 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function deleteScores(accessToken?: string) {
    const axios = require("axios");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${params.applicationId}`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log("점수 삭제 성공 :", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("점수 삭제 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function handleScoreError(accessToken?: string, data?: any) {
    const axios = require("axios");

    try {
      const response = await postScores(accessToken, data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || "";
        if (
          errorMessage ===
          "Error Occurred: 이미 해당 category에 점수가 들어가있습니다."
        ) {
          try {
            await deleteScores(accessToken);
            console.log("Score 재시도");
            const retryResult = await postScores(accessToken, data);
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

  async function postLicense(accessToken?: string, data?: any) {
    const axios = require("axios");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/license/admin/${params.applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        console.log("License 입력 성공", response.data);
        return true; // 성공 시 true 반환
      } else {
        // 응답은 받았으나 예상한 성공 코드가 아님
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("License 입력 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }

  async function patchLicense(accessToken?: string, data?: any) {
    const axios = require("axios");

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/license/admin/${params.applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };
    try {
      const response = await axios.request(config);
      console.log("License 수정 성공: ", response.data);
    } catch (error) {
      console.error("License 수정 중 오류가 발생했습니다:", error);
      throw new Error("License 수정 실패"); // 오류를 상위로 전파
    }
  }

  async function handleLicenseError(accessToken?: string, data?: any) {
    const axios = require("axios");

    try {
      const response = await postLicense(accessToken, data);
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage = error.response.data || "";
        if (
          errorMessage ===
          "Error Occurred: 이미 해당 applier에 동일한 category가 저장되어있습니다."
        ) {
          try {
            console.log("License 재시도");
            const retryResult = await patchLicense(accessToken, data);
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
  async function postAdminCheck(accessToken?: string) {
    const axios = require("axios");
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

  const handleNextStep = async () => {
    if (allChecked === false) {
      alert("모든 입력값을 정상적으로 입력해주세요.");
    } else {
      const qs = require("qs");
      const applicationDTOList = qs.stringify(scores);
      let data1 = `{
        "extraValueList": [
          {"category": "기술자수", "value": ${inputValues["기술자수"]}},
          {"category": "회사설립경과년수" , "value": ${inputValues["회사설립경과년수"]}},
          {"category": "직전년도시공능력평가액순위", "value": ${inputValues["직전년도시공능력평가액순위"]}},
          {"category": "최근3년간공사실적" , "value": ${inputValues["최근3년간공사실적"]}}
        ]
      }`;
      let data2 = `{
      "financeList": [
        {
          "category": "신용등급",
          "value": "${inputValues["신용등급"]}"
        },
        {
          "category": "현금흐름등급",
          "value": "${inputValues["현금흐름등급"]}"
        },
        {
          "category": "부채비율",
          "value": ${inputValues["부채비율"]}
        },
        {
          "category": "차입금의존도",
          "value": ${inputValues["차입금의존도"]}
        }
      ]
    }`;
      let data3 = `{
        "licensePostDTOList": [
          {
            "licenseName": "${inputValues["면허명"]}",
            "licenseNum": "공란",
            "capacityValue": ${inputValues["시평액"]},
            "licenseSeq": "공란",
            "licenseYear": "2023",
            "cvRank": ${inputValues["시평액순위"]},
            "percentage": ${inputValues["시평액순위(%)"]}
          }
        ]
      }`;

      const accessToken = await getAccessToken("Admin");
      console.log(data1);
      try {
        await handleExtraError(accessToken, data1);
        await handleFinanceError(accessToken, data2);
        await handleScoreError(accessToken, applicationDTOList);
        await handleLicenseError(accessToken, data3);
        await postDumping(accessToken);
        await postAdminCheck(accessToken);
      } catch (error) {
        console.error("Axios 요청 중 오류가 발생했습니다:", error);
      }
      router.push("/bn_admin_sinhan/list");
    }
  };

  return (
    <LoadingProvider>
      <div className="flex-col">
        <div className="z-10">
          <ApplierTopNav
            text="Admin 페이지"
            showButton={true}
            showButton2={false}
            buttonState="logout"
          />
          <AdminAddTop
            step="(2) 재무,실적,점수 입력"
            companyName={params.companyName}
            workType={params.workType}
            applicationId={params.applicationId}
            handleButton={handleNextStep}
            ButtonText="검토 완료"
          />
        </div>
        <div className="pt-10">
          {paper !== null ? (
            // recruitmentGrading !== null &&
            <ThirdStepPage
              paper={paper}
              applicationId={params.applicationId}
              recruitmentGrading={recruitmentGrading}
              setScores={setScores}
              setAllChecked={setAllChecked}
              inputValues={inputValues}
              setInputValues={setInputValues}
            />
          ) : (
            <p>데이터 없음</p>
          )}
        </div>
      </div>
    </LoadingProvider>
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
    const filteredDocuments = await application.application.tempSaved
      .tempHandedOutList;
    // console.log(filteredDocuments);

    const paperUrls = await filteredDocuments.map((item: any) => item);
    return paperUrls;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}

async function getRecruitmentGrading(recruitmentId: number) {
  try {
    const accessToken = await getAccessToken("Admin");
    const resRecruitment = await fetch(
      `${process.env.NEXT_PUBLIC_SPRING_URL}/grading/admin/${recruitmentId}` ||
        "http://localhost:3000",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!resRecruitment.ok) {
      throw new Error(`HTTP error! status: ${resRecruitment.status}`);
    }

    const responseRecruitment = await resRecruitment.json();

    return responseRecruitment;
  } catch (error) {
    console.error("Error fetching applier score:", error);
    // Handle or rethrow the error as needed
  }
}

async function getLicenseName(applicationId: string) {
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
    const licenseName = await application.application.tempSaved.licenseName;
    // console.log("licenseName", licenseName);
    // const paperUrls = await filteredDocuments.map((item: any) => item);
    return licenseName;
  } catch (error) {
    console.error("Error fetching All application result response:", error);
  }
}
