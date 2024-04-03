import React, { useState, useEffect, ChangeEvent } from "react";
import InputForm1 from "./InputForm1";
import InputForm2 from "../FirstStep/InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";
import InputStyleBtn from "../../InputForm/InputStyleBtn";

export default function RequirementPage() {
  // 예를 들어, 데이터베이스로부터 받아올 값들을 상태로 관리합니다.

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    사업자등록증사본유효성: false,
    시국세완납증명서유효성: false,
  });

  const [inputValues, setInputValues] = useState({
    사업자등록번호: "123-45-67890",
    시국세완납증명내역: "솰라솰라",
  });
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

  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = () => {
    if (allChecked === false) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      router.push("/bn_admin/score");
    }
  };
  console.log(checkboxStates);

  return (
    <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-4">
      <p className="text-title-28 pt-10 pl-6 font-semibold">
        Step 3/4. 제출서류 검수 - 그외
      </p>
      <div className="flex flex-col pl-8 gap-4">
        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="사업자등록번호"
            isButton={false}
          />

          <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
            <p>사 업 자 등 록 증 사 본</p>
          </button>
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["유효O", "유효X"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"사업자등록증사본유효성"}
          />
        </div>
        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="시국세완납증명내역"
            isButton={false}
          />

          <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
            <p>시 국 세 완 납 증 명 서</p>
          </button>
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["유효O", "유효X"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"시국세완납증명서유효성"}
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
  );
}
