import React, { useState, useEffect, ChangeEvent } from "react";
import InputForm1 from "./InputForm1";
import ScoreInputForm from "./ScoreInputForm";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../../../../src/app/list/action";

interface inputValues {
  [key: string]: string;
}

interface ApplicationEvaluation {
  id: number;
  score: number;
}

interface Scores {
  categoryName: string;
  score: number;
}

interface PerfectScores {
  [categoryName: string]: number;
}

interface RecruitmentGrade {
  id: number;
  category: string;
  perfectScore: number;
  upperCategoryENUM: string;
  applicationEvaluationList: ApplicationEvaluation[];
}

export default function RequirementPage({
  applicationId,
  sinyongPaper,
  recruitmentGrading,
  licenseName,
}: {
  applicationId: string;
  sinyongPaper: any;
  recruitmentGrading: RecruitmentGrade[];
  licenseName: string[];
}) {
  const recruitmentId = 1;
  const router = useRouter();
  const [scores, setScores] = useState<Scores[]>([]);
  const [perfectScores, setPerfectScores] = useState<PerfectScores>({});
  const [inputValues, setInputValues] = useState<inputValues>({});
  const [allChecked, setAllChecked] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState({
    신용등급: false,
    현금흐름등급: false,
    부채비율: false,
    차입금의존도: false,
  });
  const inputFields = [
    { index: 3, keyString: "신용등급", placeholder: "입력하셈" },
    { index: 4, keyString: "현금흐름등급", placeholder: "입력하셈" },
    { index: 5, keyString: "부채비율", placeholder: "입력하셈" },
    { index: 6, keyString: "차입금의존도", placeholder: "입력하셈" },
  ];

  useEffect(() => {
    updateAllCheckedState();
  }, [checkboxStates]);

  const updateAllCheckedState = () => {
    const allChecked = Object.values(checkboxStates).every((state) => state);
    setAllChecked(allChecked);
  };

  // console.log("checkboxStates", checkboxStates);

  const handleButtonClick = (url: any) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    // Mapping over recruitmentGrading to initialize scores with category names and zero scores
    let initialScores: any = {};
    recruitmentGrading?.forEach((grade, index) => {
      initialScores[`applicationEvaluationDTOList[${index}].categoryName`] =
        grade.category;
      initialScores[`applicationEvaluationDTOList[${index}].score`] = 0; // 초기 점수를 0으로 설정
    });

    const initialPerfectScores: PerfectScores = {};
    recruitmentGrading?.forEach((grade) => {
      initialPerfectScores[grade.category] = grade.perfectScore;
    });

    setScores(initialScores);
    setPerfectScores(initialPerfectScores);
  }, [recruitmentGrading]);

  // const calculateTotalScore = () => {
  //   return scores.reduce((sum, score) => sum + score.score, 0);
  // // };

  async function postFinance(accessToken?: string, data?: any) {
    const axios = require("axios");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/finance/admin/${applicationId}`,
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
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("Finance 입력 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function deleteFinance(accessToken?: any) {
    const axios = require("axios");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/finance/admin/${applicationId}`,
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
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${applicationId}`,
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
        throw new Error(`Unexpected status code: ${response.status}`); // 커스텀 에러 메시지와 함께 예외를 던짐
      }
    } catch (error) {
      console.log("점수 저장 실패", error);
      throw error; // 여기에서 에러를 다시 던짐
    }
  }
  async function deleteScores(accessToken?: any) {
    const axios = require("axios");
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/application-evaluation/admin/${recruitmentId}/${applicationId}`,
      headers: {
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
  async function postSipyeong(accessToken?: any, data?: any) {
    const axios = require("axios");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}//license/admin/${applicationId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log("성공: ", response.data);
    } catch (error) {
      console.error("데이터 덤핑 중 오류가 발생했습니다:", error);
      throw new Error("데이터 덤핑 실패"); // 오류를 상위로 전파
    }
  }

  async function postDumping(accessToken?: any) {
    const axios = require("axios");
    let config4 = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempsave/admin/dump-to-application-and-applier/${applicationId}`,
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
  async function postAdminCheck(accessToken?: any) {
    const axios = require("axios");
    let config5 = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/application/admin/check-true/${applicationId}`,
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
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      const qs = require("qs");
      const applicationDTOList = qs.stringify(scores);
      let data = `{
      "financeList": [
        {
          "category": "신용등급",
          "value": "${inputValues["신용평가등급"]}"
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
      let data2 = `{
        "licensePostDTOList": [
          {
            "licenseName": ${inputValues["면허명"]},
            "licenseNum": "공란",
            "capacityValue": ${inputValues["시평액"]},
            "licenseSeq": "공란",
            "licenseYear": "2023",
            "cvRank": ${inputValues["시평액순위"]},
            "percentage": ${inputValues["시평액순위퍼센트"]}
          }
        ]
      }`;
      const accessToken = await getAccessToken("Admin");
      try {
        await handleFinanceError(accessToken, data);
        await handleScoreError(accessToken, applicationDTOList);
        await postSipyeong(accessToken, data2);
        await postDumping(accessToken);
        await postAdminCheck(accessToken);
      } catch (error) {
        console.error("Axios 요청 중 오류가 발생했습니다:", error);
      }
      router.push("/bn_admin_sinhan/list");
    }
  };

  // console.log("checkboxStates", checkboxStates);
  // console.log("inputValues", inputValues);

  return (
    <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-8">
      <p className="text-title-28 pt-10 pl-6 font-semibold">
        Step 2/2. 재무 / 실적 / 점수 입력
      </p>
      <div className="flex">
        <div className="flex justify-center bgColor-neutral p-3 gap-2">
          <p className="whitespace-nowrap text-subTitle-18 font-bold">
            재무정보
          </p>
          <button
            className="btnStyle-textOnly-s p-m m-4 bg-primary-neutral-200 hover:textColor-focus hover:underline"
            onClick={() => handleButtonClick(sinyongPaper[0].documentUrl)}
          >
            <p>신용평가보고서</p>
          </button>
          <div className="flex-col">
            {inputFields.map((field) => (
              <div key={field.keyString} className="flex gap-4">
                <InputForm1
                  width="w-[250px]"
                  inputValues={inputValues}
                  setInputValues={setInputValues}
                  checkboxStates={checkboxStates}
                  setCheckboxStates={setCheckboxStates}
                  keyString={field.keyString}
                  isButton={false}
                  placeholder={field.placeholder}
                />
                <div className="flex gap-2 items-center">
                  <ScoreInputForm
                    index={field.index}
                    setInputValues={setScores}
                    isString={false}
                    keyString={field.keyString}
                    isButton={false}
                    placeholder={"점수"}
                  />
                  <div className="flex justify-start items-center">
                    {`(${perfectScores[field.keyString] ?? "N/A"})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        {licenseName.map((item: any, index: any) => (
          <div key={index}>
            <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
              <div className="inline-flex gap-2">
                <p>{item}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex fixed bottom-12 right-12  justify-end items-center">
        <button
          onClick={handleNextStep}
          className="inline-flex btnSize-l bg-pink-500 hover:bg-pink-900 text-white rounded gap-2"
        >
          <Icon name="Cat" width="32" height="32" />
          <p>검토 완료</p>
          <Icon name="Cat" width="32" height="32" />
        </button>
      </div>
    </div>
  );
}
