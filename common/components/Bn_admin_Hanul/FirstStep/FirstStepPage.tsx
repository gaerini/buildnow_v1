"use client";

import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import InputForm1 from "./InputForm1";
import InputForm2 from "./InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getAccessToken } from "../../../../src/app/list/action";

interface inputValues {
  [key: string]: string;
}

export default function OCRPage({
  responseOCRpaper,
  responseOCRresult,
  applicationId,
  businessId,
}: {
  responseOCRpaper: any;
  responseOCRresult: any;
  applicationId: string;
  businessId: any;
}) {
  const [inputValues, setInputValues] = useState<inputValues>({});

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    사업자등록번호: false,
    신용평가등급: false,
    자본금: false,
    인원보유현황_기술자: false,
    인원보유현황_기능공: false,
    보유면허1: false,
    보유면허2: false,
    보유면허3: false,
  });
  //let infoList = {};
  useEffect(() => {
    // 여기서는 responseOCRresult의 예시 데이터를 사용합니다.
    // 실제로는 responseOCRresult 데이터를 여기에 맞게 로드하고 변환해야 합니다.

    const newInputValues = responseOCRresult.reduce((acc: any, cur: any) => {
      const key = cur.category.replace(/ /g, "_"); // 공백을 밑줄로 대체
      acc[key] = cur.value;
      return acc;
    }, {});

    setInputValues((prev) => ({ ...prev, ...newInputValues }));
  }, []);

  // 모든 체크박스 상태가 업데이트 될 때마다 allChecked 상태를 업데이트
  useEffect(() => {
    updateAllCheckedState();
  }, [checkboxStates]);

  const handleCheckboxChange = (keyString: string, checked: boolean) => {
    setCheckboxStates((prev) => ({ ...prev, [keyString]: checked }));
  };

  const updateAllCheckedState = () => {
    const allChecked = Object.values(checkboxStates).every((state) => state);
    setAllChecked(allChecked);
  };

  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = async () => {
    if (allChecked === false) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      // 근데 가기전에 새로 작성된 거 기반으로 텍스트 업데이트 해야됨
      // 근데 setInputValues 통해서 이미 될듯?
      // 다음페이지 이동 전 tempOCR 업데이트

      const qs = require("qs");
      //상태변수 patch API body 형식에 맞게 수정
      type InfoListType = { [key: string]: string };
      const infoList = Object.keys(inputValues).reduce((acc, key, index) => {
        acc[`infoList[${index}].category`] = key;
        acc[`infoList[${index}].value`] = inputValues[key];
        return acc;
      }, {} as InfoListType);
      console.log("infoList", infoList);
      try {
        const accessToken = await getAccessToken("Admin");
        console.log(accessToken);
        let config = {
          method: "patch",
          maxBodyLength: Infinity,
          url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/admin/update/${applicationId}`,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${accessToken}`,
          },
          data: qs.stringify(infoList),
        };

        const response = await axios.request(config);
        console.log("TempOCR 수정 성공: ", response.data);
      } catch (error) {
        console.error("Patch 요청 중 오류가 발생했습니다:", error);
      }
      //다음페이지 이동
      await router.push(`/bn_admin/list/${applicationId}/requirement`);
    }
  };

  return (
    <div className="flex h-screen pt-16 overflow-auto justify-center items-center gap-4">
      <div className="h-full w-1/2 ">
        <PDFViewer url={responseOCRpaper} />
      </div>
      <div className="h-full w-1/2">
        <div className="flex flex-col justify-between">
          <p className="text-title-28 pt-12 pl-6 font-semibold">
            Step 1/4. OCR 정확성 검수
          </p>
          <div className="flex pt-12 pb-12 pl-12 flex-col justify-between gap-2">
            <div className="flex gap-4 items-center">
              <InputForm1
                inputValues={inputValues}
                setInputValues={setInputValues}
                checked={checkboxStates["사업자등록번호"]}
                handleCheckboxChange={handleCheckboxChange}
                keyString={"사업자등록번호"}
              />
              <div className="bgColor-positive">
                가입된 사업자등록번호 : {businessId}
              </div>
            </div>
            <InputForm1
              inputValues={inputValues}
              setInputValues={setInputValues}
              checked={checkboxStates["신용평가등급"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"신용평가등급"}
            />
            <InputForm1
              inputValues={inputValues}
              setInputValues={setInputValues}
              checked={checkboxStates["자본금"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"자본금"}
            />
            <InputForm1
              inputValues={inputValues}
              setInputValues={setInputValues}
              checked={checkboxStates["인원보유현황_기술자"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"인원보유현황_기술자"}
            />
            <InputForm1
              inputValues={inputValues}
              setInputValues={setInputValues}
              checked={checkboxStates["인원보유현황_기능공"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"인원보유현황_기능공"}
            />
          </div>
          <div className="flex flex-col pl-12 gap-5">
            <InputForm2
              inputValues={inputValues}
              setInputValues={setInputValues}
              num={1}
              keyString={[
                "보유면허1",
                "보유면허1_업종",
                "보유면허1_등록번호",
                "보유면허1_년도",
                "보유면허1_시평액",
              ]}
              checked={checkboxStates["보유면허1"]}
              handleCheckboxChange={handleCheckboxChange}
            />
            <InputForm2
              inputValues={inputValues}
              setInputValues={setInputValues}
              num={2}
              keyString={[
                "보유면허2",
                "보유면허2_업종",
                "보유면허2_등록번호",
                "보유면허2_년도",
                "보유면허2_시평액",
              ]}
              checked={checkboxStates["보유면허2"]}
              handleCheckboxChange={handleCheckboxChange}
            />
            <InputForm2
              inputValues={inputValues}
              setInputValues={setInputValues}
              num={3}
              keyString={[
                "보유면허3",
                "보유면허3_업종",
                "보유면허3_등록번호",
                "보유면허3_년도",
                "보유면허3_시평액",
              ]}
              checked={checkboxStates["보유면허3"]}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>
          <div className="flex mb-12 mr-12 justify-end items-center">
            <button
              onClick={handleNextStep}
              className="inline-flex btnSize-l bg-pink-500 hover:bg-pink-900 text-white rounded gap-2"
            >
              <Icon name="Cat" width="32" height="32" />
              <p>다음으로~~!!</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
