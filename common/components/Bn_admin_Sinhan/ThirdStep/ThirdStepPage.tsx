import React, { useState, useEffect, ChangeEvent } from "react";
import InputForm1 from "./InputForm1";
import InputForm2 from "../FirstStep/InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";

import { getAccessToken } from "../../../../src/app/list/action";

interface inputValues {
  [key: string]: string;
}

export default function RequirementPage({
  applicationId,
  sinyongPaper,
}: {
  applicationId: string;
  sinyongPaper: any;
}) {
  // 예를 들어, 데이터베이스로부터 받아올 값들을 상태로 관리합니다.

  const [allChecked, setAllChecked] = useState(true);
  const [checkboxStates, setCheckboxStates] = useState({
    신용평가등급: false,
    신용평가보고서유효성: false,
    자본금: false,

    현금흐름등급: false,
    부채비율: false,
    차입금의존도: false,

    인원보유현황_기술자: false,
    인원보유현황_기능공: false,

    시평액유효성1: false,
    시평액유효성2: false,
    시평액유효성3: false,
    등록수첩유효성: false,
  });

  const [inputValues, setInputValues] = useState<inputValues>({});

  // 모든 체크박스 상태가 업데이트 될 때마다 allChecked 상태를 업데이트
  useEffect(() => {
    updateAllCheckedState();
  }, [checkboxStates]);

  const handleCheckboxChange = (keyString: string) => {
    setCheckboxStates((prev) => ({ ...prev, [keyString]: true }));
  };

  const updateAllCheckedState = () => {
    const allChecked = Object.values(checkboxStates).every((state) => state);
    setAllChecked(allChecked);
  };

  const handleButtonClick = (url: any) => {
    window.open(url, "_blank");
  };

  console.log("inputValues", inputValues["신용평가등급"]);

  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = async () => {
    // if (allChecked === false) {
    //   alert("모든 체크박스를 클릭해주세요.");
    // } else {
    try {
      const accessToken = await getAccessToken("Admin");
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
      let config1 = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SPRING_URL}/finance/admin/${applicationId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        data: data,
      };

      const axios = require("axios");

      // //2. 미달여부 포스트
      // let config2 = {
      //   method: "post",
      //   maxBodyLength: Infinity,
      //   url: `${process.env.NEXT_PUBLIC_SPRING_URL}/temp-prerequisite/admin/${applicationId}`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   data: JSON.stringify({ tempPrerequisiteDTOList: midalStates }),
      // };
      // // 3. 서류 유효성 Patch
      // let config3 = {
      //   method: "patch",
      //   maxBodyLength: Infinity,
      //   url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempHanded/admin/update-status/${applicationId}`,
      //   headers: {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      //   data: qs.stringify({ paperStates: paperStates }),
      // };
      const response1 = await axios.request(config1);
      console.log("Finance 입력 성공: ", response1.data);
      // const response2 = await axios.request(config2);
      // console.log("Midal 수정 성공: ", response2.data);
      // const response3 = await axios.request(config3);
      // console.log("서류 유효성 수정 성공: ", response3.data);
    } catch (error) {
      console.error("Axios 요청 중 오류가 발생했습니다:", error);
    }
    // router.push(`/bn_admin/${applicationId}/list`);
    // }
  };
  console.log("checkboxStates", checkboxStates);
  console.log("inputValues", inputValues);

  return (
    <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-8">
      <p className="text-title-28 pt-10 pl-6 font-semibold">
        Step 2/2. 재무 / 실적 / 점수 입력
      </p>
      <div className="flex justify-center bgColor-neutral p-3 gap-2">
        <p className="whitespace-nowrap text-subTitle-18 font-bold">재무정보</p>
        <button
          className="btnStyle-textOnly-s p-m m-4 bg-primary-neutral-200 hover:textColor-focus hover:underline"
          onClick={() => handleButtonClick(sinyongPaper[0].documentUrl)}
        >
          <p>신용평가보고서</p>
        </button>
        <div className="flex-col">
          <InputForm1
            width="w-[250px]"
            inputValues={inputValues}
            setInputValues={setInputValues}
            setCheckboxStates={setCheckboxStates}
            keyString="신용평가등급"
            isButton={false}
            placeholder={"입력하셈"}
          />
          <InputForm1
            width="w-[250px]"
            inputValues={inputValues}
            setInputValues={setInputValues}
            setCheckboxStates={setCheckboxStates}
            keyString="현금흐름등급"
            isButton={false}
            placeholder={"입력하셈"}
          />
          <InputForm1
            width="w-[250px]"
            inputValues={inputValues}
            setInputValues={setInputValues}
            setCheckboxStates={setCheckboxStates}
            keyString="부채비율"
            isButton={false}
            placeholder={"입력하셈"}
          />
          <InputForm1
            width="w-[250px]"
            inputValues={inputValues}
            setInputValues={setInputValues}
            setCheckboxStates={setCheckboxStates}
            keyString="차입금의존도"
            isButton={false}
            placeholder={"입력하셈"}
          />
        </div>
      </div>

      <button
        className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline"
        onClick={() => handleButtonClick(sinyongPaper.documentUrl)}
      >
        <p>{sinyongPaper.documentName}</p>
      </button>

      <div className="flex flex-col gap-3 bgColor-neutral p-2">
        <p className="whitespace-nowrap text-subTitle-18 font-bold mt-2">
          인원보유현황
        </p>
        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="인원보유현황_기술자"
            isButton={false}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["일치", "불일치"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"인원보유현황_기술자"}
          />
        </div>
        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="인원보유현황_기능공"
            isButton={false}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["일치", "불일치"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"인원보유현황_기능공"}
          />
        </div>
      </div>
      <div className="inline-flex gap-10 bgColor-neutral">
        <InputForm2
          inputValues={inputValues}
          setInputValues={setInputValues}
          checkbox={false}
          num={3}
          keyString={[
            "보유면허3",
            "보유면허3_업종",
            "보유면허3_등록번호",
            "보유면허3_년도",
            "보유면허3_시평액",
          ]}
        />
      </div>
      <div className="flex fixed bottom-12 right-12  justify-end items-center">
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
