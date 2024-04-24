import React, { useState, useEffect } from "react";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAccessToken } from "../../../../src/app/list/action";
import Input from "./Input";

export default function RequirementPage({
  applicationId,
  Paper,
}: {
  applicationId: string;
  Paper: any;
}) {
  const router = useRouter();
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    면허보유여부: false,
    신용등급: false,
    영업기간: false,
    부정당업자: false,
  });
  const [midalStates, setMidalStates] = useState([
    { prerequisiteName: "면허보유여부", isPrerequisite: "false", whyMidal: "" },
    { prerequisiteName: "신용등급", isPrerequisite: "false", whyMidal: "" },
    { prerequisiteName: "영업기간", isPrerequisite: "false", whyMidal: "" },
    { prerequisiteName: "부정당업자", isPrerequisite: "false", whyMidal: "" },
  ]);
  const [allPrerequisitesMet, setAllPrerequisitesMet] = useState(true);

  // 모든 체크박스 상태가 업데이트 될 때마다 allChecked 상태를 업데이트
  const updateAllCheckedState = () => {
    const allChecked = Object.values(checkboxStates).every((state) => state);
    setAllChecked(allChecked);
  };

  useEffect(() => {
    updateAllCheckedState();
  }, [checkboxStates]);

  useEffect(() => {
    const isAllMet = midalStates.every(
      (state) => state.isPrerequisite !== "false"
    );
    setAllPrerequisitesMet(isAllMet);
  }, [midalStates]);

  const midalStatesChange = (keyString: string, item: string) => {
    // console.log("미달 상태 변경: ", item);
    setCheckboxStates((prev) => ({ ...prev, [keyString]: true }));
    setMidalStates((prev) => {
      const index = prev.findIndex(
        (state) => state.prerequisiteName === keyString
      );

      if (index !== -1) {
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            isPrerequisite: item === "미달" ? "false" : "true",
          },
          ...prev.slice(index + 1),
        ];
      }
      return prev;
    });
  };

  const whyMidalChange = (keyString: string, item: string) => {
    // console.log("미달 사유 선택: ", item);

    setCheckboxStates((prev) => ({ ...prev, [keyString]: true }));
    setMidalStates((prev) => {
      const index = prev.findIndex(
        (state) => state.prerequisiteName === keyString
      );

      if (index !== -1) {
        return [
          ...prev.slice(0, index),
          {
            ...prev[index],
            whyMidal: item,
          },
          ...prev.slice(index + 1),
        ];
      }

      return prev;
    });
  };

  async function postAdminCheck(accessToken?: string) {
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

  async function postMidal(accessToken?: string) {
    const axios = require("axios");
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SPRING_URL}/temp-prerequisite/admin/${applicationId}`,

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
      console.error("Midal 수정 중 오류가 발생했습니다:", error);
      throw new Error("Midal 정보 입력 실패"); // 오류를 상위로 전파
    }
  }

  const handleNextStep = async () => {
    if (allChecked === false) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      const accessToken = await getAccessToken("Admin");

      try {
        postMidal(accessToken);
      } catch (error) {
        console.error("Axios 요청 중 오류가 발생했습니다:", error);
      }
      if (allPrerequisitesMet) {
        router.push(`/bn_admin_sinhan/list/${applicationId}/paper`);
      } else {
        postAdminCheck(accessToken);
        router.push(`/bn_admin_sinhan/list`);
      }

      // 다음페이지 이동
    }
  };

  return (
    <div>
      <div className="flex flex-col pt-16 justify-start items-start gap-3">
        <p className="text-title-28 pt-10 pl-6 font-semibold">
          Step 1/2. 미달 요건 체크
        </p>
        <div className="flex-col pl-8">
          {midalStates.map((state) => (
            <Input
              key={state.prerequisiteName}
              buttonUrl={
                state.prerequisiteName === "면허보유여부"
                  ? "https://www.kiscon.net/gongsi/ksc_dft.asp"
                  : state.prerequisiteName === "신용등급"
                  ? Paper[0].documentUrl
                  : state.prerequisiteName === "영업기간"
                  ? "Paper[0].documentUrl"
                  : "https://www.g2b.go.kr:8070/um/injustice/injusticeBizerList.do?whereAreYouFrom=ALL"
              }
              buttonText={
                state.prerequisiteName === "면허보유여부"
                  ? "키스콘 면허 조회"
                  : state.prerequisiteName === "신용등급"
                  ? "신용평가보고서"
                  : state.prerequisiteName === "영업기간"
                  ? "신용평가보고서"
                  : "조달청 조회"
              }
              title={state.prerequisiteName}
              dropDownKeyString={state.prerequisiteName}
              midalStatesChange={midalStatesChange}
              whyMidalChange={whyMidalChange}
              whyMidalItems={
                state.prerequisiteName === "면허보유여부"
                  ? ["면허유효기간 만료"]
                  : state.prerequisiteName === "신용등급"
                  ? ["신용평가등급 B 미만"]
                  : state.prerequisiteName === "영업기간"
                  ? ["영업기간 3년 미만"]
                  : ["부정당업자 제제 이력 보유"]
              }
              isDisabled={state.isPrerequisite === "false"} // isPrerequisite이 "false"인 경우 입력 필드를 비활성화
            />
          ))}
        </div>

        {/* <div className="flex-col pl-8">
          <Input
            buttonUrl={"https://www.kiscon.net/gongsi/ksc_dft.asp"}
            buttonText={"키스콘 면허 조회"}
            title={"면허보유여부"}
            dropDownKeyString={"면허보유여부"}
            midalStatesChange={midalStatesChange}
            whyMidalChange={whyMidalChange}
            whyMidalItems={["면허유효기간 만료"]}
          />
          <Input
            buttonUrl={Paper[0].documentUrl}
            buttonText={"신용평가보고서"}
            title={"신용등급"}
            dropDownKeyString={"신용등급"}
            midalStatesChange={midalStatesChange}
            whyMidalChange={whyMidalChange}
            whyMidalItems={["신용평가등급 B 미만"]}
          />
          <Input
            buttonUrl={"Paper[0].documentUrl"}
            buttonText={"신용평가보고서"}
            title={"영업기간"}
            dropDownKeyString={"영업기간"}
            midalStatesChange={midalStatesChange}
            whyMidalChange={whyMidalChange}
            whyMidalItems={["영업기간 3년 미만"]}
          />
          <Input
            buttonUrl={
              "https://www.g2b.go.kr:8070/um/injustice/injusticeBizerList.do?whereAreYouFrom=ALL"
            }
            buttonText={"조달청 조회"}
            title={"부정당업자"}
            dropDownKeyString={"부정당업자"}
            midalStatesChange={midalStatesChange}
            whyMidalChange={whyMidalChange}
            whyMidalItems={["부정당업자 제제 이력 보유"]}
          />
        </div> */}
      </div>

      <div className="flex fixed bottom-12 right-12 justify-end items-center">
        <button
          onClick={handleNextStep}
          className="inline-flex btnSize-l bg-pink-500 hover:bg-pink-900 text-white rounded gap-2"
        >
          <Icon name="Cat" width="32" height="32" />
          <p>다음으로~~!!</p>
        </button>
      </div>
    </div>
  );
}
