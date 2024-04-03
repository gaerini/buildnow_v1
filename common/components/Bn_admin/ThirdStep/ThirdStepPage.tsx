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
    신용평가등급: false,
    신용평가보고서유효성: false,
    자본금: false,

    인원보유현황_기술자: false,
    인원보유현황_기능공: false,

    시평액유효성1: false,
    시평액유효성2: false,
    시평액유효성3: false,
    등록수첩유효성: false,
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
  });
  // 모든 체크박스 상태가 업데이트 될 때마다 allChecked 상태를 업데이트
  useEffect(() => {
    updateAllCheckedState();
  }, [checkboxStates]);

  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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
      router.push("/bn_admin/other_paper");
    }
  };
  console.log(checkboxStates);

  return (
    <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-4">
      <p className="text-title-28 pt-10 pl-6 font-semibold">
        Step 3/4. 제출서류 검수
      </p>
      <div className="flex flex-col pl-8 gap-4">
        <div className="flex pl-[210px] w-[410px] justify-between">
          <p>OCR값</p>
          <p>실제값</p>
        </div>
        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="신용평가등급"
            isButton={false}
          />
          <InputForm1
            isString={false}
            keyString="신용평가등급"
            isButton={false}
            placeholder={"직접입력"}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["일치", "불일치"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"신용평가등급"}
          />
          <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
            <p>신 용 평 가 보 고 서 파일</p>
          </button>
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["유효O", "유효X"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"신용평가보고서유효성"}
          />
        </div>

        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="자본금"
            isButton={false}
          />
          <InputForm1
            isString={false}
            keyString="자본금"
            isButton={false}
            placeholder={"직접입력"}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["일치", "불일치"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"자본금"}
          />
        </div>
        <div className="inline-flex gap-3">
          <InputForm1
            inputValues={inputValues}
            keyString="인원보유현황_기술자"
            isButton={false}
          />
          <InputForm1
            isString={false}
            keyString="인원보유현황_기술자"
            isButton={false}
            placeholder={"API조회값"}
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
          <InputForm1
            isString={false}
            keyString="인원보유현황_기능공"
            isButton={false}
            placeholder={"API조회값"}
          />
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["일치", "불일치"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"인원보유현황_기능공"}
          />
        </div>

        <div className="inline-flex">
          <div className="flex-col"></div>
          <div></div>
        </div>

        <div className="inline-flex gap-10">
          <div className="flex flex-col gap-4">
            <InputForm2
              inputValues={inputValues}
              setInputValues={setInputValues}
              checkbox={false}
              num={1}
              keyString={[
                "보유면허1",
                "보유면허1_업종",
                "보유면허1_등록번호",
                "보유면허1_년도",
                "보유면허1_시평액",
              ]}
            />
            <InputForm2
              inputValues={inputValues}
              setInputValues={setInputValues}
              checkbox={false}
              num={2}
              keyString={[
                "보유면허2",
                "보유면허2_업종",
                "보유면허2_등록번호",
                "보유면허2_년도",
                "보유면허2_시평액",
              ]}
            />
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
          <div className="flex pt-[36px] h-[428px] flex-col justify-between">
            <div className="inline-flex items-center gap-4">
              <div className="flex flex-col gap-2 justify-start">
                <div className="inline-flex items-center">
                  <p className="w-[64px] flex whitespace-nowrap">년도</p>
                  <div className="mx-2 w-[250px]">
                    <InputStyleBtn
                      name={"1차년도"}
                      type="text"
                      value={"API조회"}
                      onChange={handleInputChange}
                      isButton={false}
                    />
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <p className="w-[64px] flex whitespace-nowrap">시평액</p>
                  <div className="mx-2 w-[250px]">
                    <InputStyleBtn
                      name={"2차년도"}
                      type="text"
                      value={"API조회"}
                      onChange={handleInputChange}
                      isButton={false}
                    />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  className={`form-checkbox w-5 h-5 border-gray-300 focus:ring-0 rounded text-green-500 ${
                    checkboxStates["시평액유효성1"]
                      ? "bg-green-500"
                      : "bg-white"
                  }`}
                  onChange={(e) => handleCheckboxChange("시평액유효성1")}
                />
              </div>
            </div>
            <div className="inline-flex items-center gap-4">
              <div className="flex flex-col gap-2 justify-start">
                <div className="inline-flex items-center">
                  <p className="w-[64px] flex whitespace-nowrap">년도</p>
                  <div className="mx-2 w-[250px]">
                    <InputStyleBtn
                      name={"1차년도"}
                      type="text"
                      value={"API조회"}
                      onChange={handleInputChange}
                      isButton={false}
                    />
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <p className="w-[64px] flex whitespace-nowrap">시평액</p>
                  <div className="mx-2 w-[250px]">
                    <InputStyleBtn
                      name={"2차년도"}
                      type="text"
                      value={"API조회"}
                      onChange={handleInputChange}
                      isButton={false}
                    />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  className={`form-checkbox w-5 h-5 border-gray-300 focus:ring-0 rounded text-green-500 ${
                    checkboxStates["시평액유효성2"]
                      ? "bg-green-500"
                      : "bg-white"
                  }`}
                  onChange={(e) => handleCheckboxChange("시평액유효성2")}
                />
              </div>
            </div>
            <div className="inline-flex items-center gap-4">
              <div className="flex flex-col gap-2 justify-start">
                <div className="inline-flex items-center">
                  <p className="w-[64px] flex whitespace-nowrap">년도</p>
                  <div className="mx-2 w-[250px]">
                    <InputStyleBtn
                      name={"1차년도"}
                      type="text"
                      value={"API조회"}
                      onChange={handleInputChange}
                      isButton={false}
                    />
                  </div>
                </div>
                <div className="inline-flex items-center">
                  <p className="w-[64px] flex whitespace-nowrap">시평액</p>
                  <div className="mx-2 w-[250px]">
                    <InputStyleBtn
                      name={"2차년도"}
                      type="text"
                      value={"API조회"}
                      onChange={handleInputChange}
                      isButton={false}
                    />
                  </div>
                </div>
              </div>
              <div>
                <input
                  type="checkbox"
                  className={`form-checkbox w-5 h-5 border-gray-300 focus:ring-0 rounded text-green-500 ${
                    checkboxStates["시평액유효성3"]
                      ? "bg-green-500"
                      : "bg-white"
                  }`}
                  onChange={(e) => handleCheckboxChange("시평액유효성3")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex gap-2 pt-5">
          <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
            <p>등 록 수 첩 사 본 파 일</p>
          </button>
          <AdminStyleDropDown
            placeholder={"선택하셈"}
            dropdownItems={["유효O", "유효X"]}
            handleCheckboxChange={handleCheckboxChange}
            keyString={"등록수첩유효성"}
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
