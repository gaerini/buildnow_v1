import React, { useState, useEffect, ChangeEvent } from "react";
import InputForm1 from "./InputForm1";
import InputForm2 from "../FirstStep/InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";
import InputForm3 from "./InputForm3";

export default function RequirementPage({
  applicationId,
  responseOCRresult,
  sipyeong,
  sinyongPaper,
}: {
  applicationId: string;
  responseOCRresult?: any;
  sipyeong: any;
  sinyongPaper: any;
}) {
  // 예를 들어, 데이터베이스로부터 받아올 값들을 상태로 관리합니다.

  const [allChecked, setAllChecked] = useState(false);
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

  const [inputValues, setInputValues] = useState({});

  useEffect(() => {
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

  const handleButtonClick = (url: any) => {
    window.open(url, "_blank");
  };

  console.log("responseOCRresult", responseOCRresult);
  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = () => {
    if (allChecked === false) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      //     try {
      //       const accessToken = await getAccessToken("Admin");
      //       let config1 = {
      //         method: "patch",
      //         maxBodyLength: Infinity,
      //         url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempOCR/admin/update/${applicationId}`,
      //         headers: {
      //           "Content-Type": "application/x-www-form-urlencoded",
      //           Authorization: `Bearer ${accessToken}`,
      //         },
      //         data: qs.stringify(infoList),
      //       };
      //       //2. 미달여부 포스트
      //       let config2 = {
      //         method: "post",
      //         maxBodyLength: Infinity,
      //         url: `${process.env.NEXT_PUBLIC_SPRING_URL}/temp-prerequisite/admin/${applicationId}`,
      //         headers: {
      //           "Content-Type": "application/json",
      //           Authorization: `Bearer ${accessToken}`,
      //         },
      //         data: JSON.stringify({ tempPrerequisiteDTOList: midalStates }),
      //       };
      //       // 3. 서류 유효성 Patch
      //       let config3 = {
      //         method: "patch",
      //         maxBodyLength: Infinity,
      //         url: `${process.env.NEXT_PUBLIC_SPRING_URL}/tempHanded/admin/update-status/${applicationId}`,
      //         headers: {
      //           "Content-Type": "application/x-www-form-urlencoded",
      //           Authorization: `Bearer ${accessToken}`,
      //         },
      //         data: qs.stringify({ paperStates: paperStates }),
      //       };
      //       const response1 = await axios.request(config1);
      //       console.log("TempOCR 수정 성공: ", response1.data);
      //       const response2 = await axios.request(config2);
      //       console.log("Midal 수정 성공: ", response2.data);
      //       const response3 = await axios.request(config3);
      //       console.log("서류 유효성 수정 성공: ", response3.data);
      //     } catch (error) {
      //       console.error("Axios 요청 중 오류가 발생했습니다:", error);
      //     }
      router.push(`/bn_admin/${applicationId}/other_paper`);
    }
  };
  console.log("checkboxStates", checkboxStates);
  console.log("inputValues", inputValues);

  return (
    <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-8">
      <p className="text-title-28 pt-10 pl-6 font-semibold">
        Step 3/4. 제출서류 검수
      </p>
      <div className="flex flex-col pl-8 gap-8 ">
        <div className="flex flex-col gap-2 bgColor-neutral p-5">
          <div className="flex w-[410px] justify-between">
            <p className="whitespace-nowrap text-subTitle-18 font-bold">
              금융정보
            </p>
            <p>OCR값</p>
            <p>실제값</p>
          </div>

          <div className="inline-flex gap-3 ">
            <InputForm1
              inputValues={inputValues}
              keyString="신용평가등급"
              isButton={false}
            />
            <InputForm1
              isString={false}
              inputValues={inputValues}
              setInputValues={setInputValues}
              keyString={"신용평가등급_검수"}
              isButton={false}
              placeholder={"직접입력"}
            />
            <AdminStyleDropDown
              placeholder={"선택하셈"}
              dropdownItems={["일치", "불일치"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"신용평가등급"}
            />
            {sinyongPaper.map((file: any, index: any) => (
              <div key={index}>
                <div className="flex flex-col">
                  <div className="inline-flex gap-2">
                    <button
                      className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline"
                      onClick={() => handleButtonClick(file.documentUrl)}
                    >
                      <p>{file.documentName}</p>
                    </button>
                    <AdminStyleDropDown
                      placeholder={"선택하셈"}
                      dropdownItems={["유효O", "유효X"]}
                      handleCheckboxChange={handleCheckboxChange}
                      keyString={"신용평가보고서유효성"}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="inline-flex gap-3">
            <InputForm1
              inputValues={inputValues}
              keyString="자본금"
              isButton={false}
            />
            <InputForm1
              isString={false}
              inputValues={inputValues}
              setInputValues={setInputValues}
              keyString="자본금_검수"
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
          <div className="flex pt-[36px] h-[428px] flex-col justify-between bgColor-blue p-4">
            {[1, 2, 3].map((index, item) => (
              <InputForm3
                key={index}
                item={item}
                index={index}
                checkboxState={checkboxStates}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
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
