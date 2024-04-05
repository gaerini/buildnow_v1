"use client";

import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import InputForm1 from "./InputForm1";
import InputForm2 from "./InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";

export default function OCRPage({
  responseOCRpaper,
  responseOCRresult,
}: {
  responseOCRpaper: string;
  responseOCRresult: any;
}) {
  const [inputValues, setInputValues] = useState({
    신용평가등급: "AA+",
    자본금: "500만원",
    인원보유현황_기술자: "10명",
    인원보유현황_기능공: "5명",
    보유면허1_업종: "철근콘크리트",
    보유면허1_년도: "2023",
    보유면허1_등록번호: "21-424-242-534",
    보유면허1_시평액: "5천만원",
    보유면허2_업종: "철근콘크리트",
    보유면허2_년도: "2023",
    보유면허2_등록번호: "21-424-242-534",
    보유면허2_시평액: "5천만원",
    보유면허3_업종: "철근콘크리트",
    보유면허3_년도: "2023",
    보유면허3_등록번호: "21-424-242-534",
    보유면허3_시평액: "5천만원",
  });

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    신용평가등급: false,
    자본금: false,
    인원보유현황_기술자: false,
    인원보유현황_기능공: false,
    보유면허1: false,
    보유면허2: false,
    보유면허3: false,
  });

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
  const handleNextStep = () => {
    if (allChecked === false) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      router.push("/bn_admin/requirement");
    }
  };

  return (
    <div className="flex h-screen pt-16 overflow-auto justify-center items-center gap-4">
      <div className="h-full w-1/2">
        <PDFViewer url={responseOCRpaper} />
      </div>
      <div className="h-full w-1/2">
        <div className="flex flex-col justify-between">
          <p className="text-title-28 pt-12 pl-6 font-semibold">
            Step 1/4. OCR 정확성 검수
          </p>
          <div className="flex pt-12 pb-12 pl-12 flex-col justify-between gap-2">
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
      </div>
    </div>
  );
}
