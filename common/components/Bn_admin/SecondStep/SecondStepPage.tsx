import React, { useState, useEffect } from "react";
import PDFViewer from "./PDFViewer";
import InputForm1 from "./InputForm1";
import InputForm2 from "./InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";

export default function RequirementPage() {
  // 예를 들어, 데이터베이스로부터 받아올 값들을 상태로 관리합니다.

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    면허유효성1: false,
    면허유효성2: false,
    면허유효성3: false,
    제재처분이력: false,
    사업자상태: false,
  });

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
    사업자등록번호: "123-45-67890",
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
      router.push("/bn_admin/papers");
    }
  };

  const [same, setSame] = useState("");

  const handleDropdownSelect = (selected: string) => {
    setSame(selected);
  };

  return (
    <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-4">
      <p className="text-title-28 pt-10 pl-6 font-semibold">
        Step 2/4. 자격 요건 체크
      </p>
      <div className="flex flex-col pl-8">
        <InputForm1
          inputValues={inputValues}
          keyString={"사업자등록번호"}
          isButton={true}
          ButtonText={"조회"}
        />

        <p className="text-subTitle-20 font-bold pt-6 pb-2"> [면허 유효성] </p>

        <div className="flex flex-col gap-2">
          <div className="inline-flex gap-1">
            <div className="bg-primary-neutral-100 rounded-s p-4">
              <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
              <div className="inline-flex">
                <InputForm2
                  num={1}
                  inputValues={inputValues}
                  keyString={["보유면허1_업종", "보유면허1_등록번호"]}
                />
              </div>
            </div>

            <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
              <div className="flex flex-col">
                <p className="text-subTitle-18 font-bold">파일</p>
                <div className="inline-flex gap-2">
                  <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
                    <p>면허파일 1</p>
                  </button>
                  <AdminStyleDropDown
                    placeholder={"선택하셈"}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-subTitle-18 font-bold">키스콘API</p>
                <div className="inline-flex gap-2">
                  <InputForm1
                    inputValues={inputValues}
                    keyString={"보유면허1_등록번호"}
                    isButton={false}
                  />
                  <AdminStyleDropDown
                    placeholder={"선택하셈"}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex gap-1">
            <div className="bg-primary-neutral-100 rounded-s p-4">
              <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
              <div className="inline-flex">
                <InputForm2
                  num={2}
                  inputValues={inputValues}
                  keyString={["보유면허2_업종", "보유면허2_등록번호"]}
                />
              </div>
            </div>

            <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
              <div className="flex flex-col">
                <p className="text-subTitle-18 font-bold">파일</p>
                <div className="inline-flex gap-2">
                  <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
                    <p>면허파일 2</p>
                  </button>
                  <AdminStyleDropDown
                    placeholder={"선택하셈"}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-subTitle-18 font-bold">키스콘API</p>
                <div className="inline-flex gap-2">
                  <InputForm1
                    inputValues={inputValues}
                    keyString={"보유면허2_등록번호"}
                    isButton={false}
                  />
                  <AdminStyleDropDown
                    placeholder={"선택하셈"}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="inline-flex gap-1">
            <div className="bg-primary-neutral-100 rounded-s p-4">
              <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
              <div className="inline-flex">
                <InputForm2
                  num={3}
                  inputValues={inputValues}
                  keyString={["보유면허3_업종", "보유면허3_등록번호"]}
                />
              </div>
            </div>

            <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
              <div className="flex flex-col">
                <p className="text-subTitle-18 font-bold">파일</p>
                <div className="inline-flex gap-2">
                  <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
                    <p>면허파일 3</p>
                  </button>
                  <AdminStyleDropDown
                    placeholder={"선택하셈"}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-subTitle-18 font-bold">키스콘API</p>
                <div className="inline-flex gap-2">
                  <InputForm1
                    inputValues={inputValues}
                    keyString={"보유면허3_등록번호"}
                    isButton={false}
                  />
                  <AdminStyleDropDown
                    placeholder={"선택하셈"}
                    onSelect={handleDropdownSelect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex gap-2">
          <p className="text-subTitle-20 font-bold pt-6 pb-2">
            [제재 처분 이력]
          </p>
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            onSelect={handleDropdownSelect}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            onSelect={handleDropdownSelect}
          />
        </div>
        <div className="inline-flex gap-2">
          <p className="text-subTitle-20 font-bold pt-6 pb-2">[사업자 상태]</p>
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            onSelect={handleDropdownSelect}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            onSelect={handleDropdownSelect}
          />
        </div>
      </div>

      <div className="flex pt-12 pr-12 justify-end items-center">
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
