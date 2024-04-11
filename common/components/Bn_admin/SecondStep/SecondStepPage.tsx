import React, { useState, useEffect } from "react";
import InputForm1 from "./InputForm1";
import InputForm2 from "./InputForm2";
import Icon from "../../Icon/Icon";
import { useRouter } from "next/navigation";
import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";

export default function RequirementPage({
  applicationId,
  responseOCRresult,
  LicensePaper,
}: {
  applicationId: string;
  responseOCRresult?: any;
  LicensePaper: any;
}) {
  // 예를 들어, 데이터베이스로부터 받아올 값들을 상태로 관리합니다.

  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState({
    면허번호유효성1: false,
    면허번호유효성2: false,
    면허번호유효성3: false,
    면허증유효성1: false,
    면허증유효성2: false,
    면허증유효성3: false,
    제재처분이력: false,
    제재처분사유: false,

    사업자상태: false,
    사업자사유: false,
  });

  const [inputValues, setInputValues] = useState({
    신용평가등급: "",
    자본금: "",
    인원보유현황_기술자: "",
    인원보유현황_기능공: "",
    보유면허1_업종: "",
    보유면허1_년도: "",
    보유면허1_등록번호: "",
    보유면허1_시평액: "",
    보유면허2_업종: "",
    보유면허2_년도: "",
    보유면허2_등록번호: "",
    보유면허2_시평액: "",
    보유면허3_업종: "",
    보유면허3_년도: "",
    보유면허3_등록번호: "",
    보유면허3_시평액: "",
    사업자등록번호: "",
    제재처분이력: "없음",
    사업자상태: "정상",
  });

  const [OCRValues, setOCRValues] = useState<any[]>([]);

  useEffect(() => {
    // 여기서는 responseOCRresult의 예시 데이터를 사용합니다.
    // 실제로는 responseOCRresult 데이터를 여기에 맞게 로드하고 변환해야 합니다.

    const newInputValues = responseOCRresult.reduce((acc: any, cur: any) => {
      const key = cur.category.replace(/ /g, "_"); // 공백을 밑줄로 대체
      acc[key] = cur.value;
      return acc;
    }, {});

    setInputValues((prev) => ({ ...prev, ...newInputValues }));

    // const newOCRValues: any[] = responseOCRresult.reduce(
    //   (acc: any, cur: any) => {
    //     const matches = cur.category.match(/^보유면허(\d+)_(업종|등록번호)$/); // "보유면허숫자_업종" 또는 "보유면허숫자_등록번호" 부분을 추출
    //     if (matches) {
    //       const number = matches[1]; // 보유면허의 번호 추출
    //       const key = `보유면허${number}`; // 새로운 키 생성
    //       console.log("matches", matches);
    //       if (!acc[number]) {
    //         acc[number] = {}; // 해당 보유면허의 정보를 담을 객체 생성
    //       }
    //       acc[number][matches[2]] = cur.value; // 보유면허 정보 추가
    //     }
    //     return acc;
    //   },
    //   {}
    // );

    // setOCRValues((prev) => [...prev, ...newOCRValues]);
    const newOCRValues = responseOCRresult.reduce((acc: any[], cur: any) => {
      const matches = cur.category.match(/^보유면허(\d+)_(업종|등록번호)$/);
      if (matches) {
        const number = matches[1];
        const key = `보유면허${number}`;
        if (!acc[number - 1]) {
          acc[number - 1] = {}; // 해당 보유면허의 정보를 담을 객체 생성
        }
        acc[number - 1][matches[2]] = cur.value;
      }
      return acc;
    }, []);

    setOCRValues(newOCRValues);
  }, []);

  console.log("OCRValues", OCRValues);
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

  const router = useRouter();
  // 다음 단계로 이동하는 함수
  const handleNextStep = () => {
    if (allChecked === false) {
      alert("모든 체크박스를 클릭해주세요.");
    } else {
      router.push(`/bn_admin/list/${applicationId}/paper`);
    }
  };

  return (
    <div>
      <div className="flex flex-col pt-16 overflow-auto justify-start items-start gap-3">
        <p className="text-title-28 pt-10 pl-6 font-semibold">
          Step 2/4. 자격 요건 체크
        </p>
        <div className="flex flex-col pl-8">
          <InputForm1
            inputValues={inputValues}
            keyString={"사업자등록번호"}
            isButton={false}
          />
          <p className="text-subTitle-20 font-bold pt-6 pb-2">면허 유효성</p>

          <div className="flex flex-col gap-4">
            <div className="inline-flex gap-2">
              <div className="bg-primary-neutral-100 rounded-s p-4">
                <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
                <div className="inline-flex gap-5 ">
                  {OCRValues.length !== 0 ? (
                    OCRValues.map((license, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-4 justify-center"
                      >
                        <div className="inline-flex">
                          <InputForm2
                            num={index + 1}
                            inputValues={license}
                            keyString={[
                              `보유면허${index + 1}_업종`,
                              `보유면허${index + 1}_등록번호`,
                            ]}
                          />
                        </div>
                        <AdminStyleDropDown
                          placeholder={"선택하셈"}
                          width={"w-80"}
                          dropdownItems={["유효 O", "유효 X"]}
                          handleCheckboxChange={handleCheckboxChange}
                          keyString={`면허번호유효성${index + 1}`}
                        />
                      </div>
                    ))
                  ) : (
                    <p>보유면허 정보가 없습니다.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="inline-flex gap-4">
              <div className="inline-flex gap-2">
                {LicensePaper.map((file: any, index: any) => (
                  <div key={index}>
                    <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
                      <div className="flex flex-col">
                        <p className="text-subTitle-18 font-bold">면허파일</p>
                        <div className="inline-flex gap-2">
                          <button
                            className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline"
                            onClick={() => handleButtonClick(file.documentUrl)}
                          >
                            <p>{file.documentName}</p>
                          </button>
                          <AdminStyleDropDown
                            placeholder={"선택하셈"}
                            handleCheckboxChange={handleCheckboxChange}
                            keyString={`면허증유효성${index + 1}`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inline-flex pl-12 pr-12 justify-between">
        <div className="flex flex-col">
          <div className="pl-[160px] pt-6 w-[600px] inline-flex items-center justify-between">
            <p className="pl-[50px]">미달 여부</p>
            <p className="pr-[60px]">미달 사유</p>
          </div>
          <div className="inline-flex pt-2 pb-6 items-center gap-2">
            <p className="w-[150px] text-subTitle-20 font-bold">
              [제재 처분 이력]
            </p>
            <p>키스콘 보고 하셈</p>
            <AdminStyleDropDown
              placeholder={"선택하셈"}
              dropdownItems={["미달", "미달아님"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"제재처분이력"}
            />
            <AdminStyleDropDown
              placeholder={"선택하셈"}
              width={"w-64"}
              dropdownItems={["미달사유1", "미달사유2", "미달사유3"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"제재처분사유"}
            />
          </div>
          <div className="inline-flex pb-6 items-center gap-2">
            <p className="w-[150px] text-subTitle-20 font-bold">
              [사업자 상태]
            </p>
            <p>키스콘 보고 하셈</p>
            <AdminStyleDropDown
              placeholder={"선택하셈"}
              dropdownItems={["미달", "미달아님"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"사업자상태"}
            />
            <AdminStyleDropDown
              placeholder={"선택하셈"}
              width={"w-64"}
              dropdownItems={["미달사유1", "미달사유2", "미달사유3"]}
              handleCheckboxChange={handleCheckboxChange}
              keyString={"사업자사유"}
            />
          </div>
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
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import InputForm1 from "./InputForm1";
// import InputForm2 from "./InputForm2";
// import Icon from "../../Icon/Icon";
// import { useRouter } from "next/navigation";
// import AdminStyleDropDown from "../../InputForm/AdminStyleDropDown";
// import InputStyleBtn from "../../InputForm/InputStyleBtn";

// export default function RequirementPage({
//   applicationId,
//   responseOCRresult,
// }: {
//   applicationId: string;
//   responseOCRresult?: any;
// }) {
//   // 예를 들어, 데이터베이스로부터 받아올 값들을 상태로 관리합니다.

//   const [allChecked, setAllChecked] = useState(false);
//   const [checkboxStates, setCheckboxStates] = useState({
//     면허유효성11: false,
//     면허유효성12: false,

//     면허유효성21: false,
//     면허유효성22: false,

//     면허유효성31: false,
//     면허유효성32: false,

//     제재처분이력: false,
//     제재처분사유: false,

//     사업자상태: false,
//     사업자사유: false,
//   });

//   const [inputValues, setInputValues] = useState({
//     신용평가등급: "",
//     자본금: "",
//     인원보유현황_기술자: "",
//     인원보유현황_기능공: "",
//     보유면허1_업종: "",
//     보유면허1_년도: "",
//     보유면허1_등록번호: "",
//     보유면허1_시평액: "",
//     보유면허2_업종: "",
//     보유면허2_년도: "",
//     보유면허2_등록번호: "",
//     보유면허2_시평액: "",
//     보유면허3_업종: "",
//     보유면허3_년도: "",
//     보유면허3_등록번호: "",
//     보유면허3_시평액: "",
//     사업자등록번호: "",
//     제재처분이력: "없음",
//     사업자상태: "정상",
//   });

//   useEffect(() => {
//     // 여기서는 responseOCRresult의 예시 데이터를 사용합니다.
//     // 실제로는 responseOCRresult 데이터를 여기에 맞게 로드하고 변환해야 합니다.

//     const newInputValues = responseOCRresult.reduce((acc: any, cur: any) => {
//       const key = cur.category.replace(/ /g, "_"); // 공백을 밑줄로 대체
//       acc[key] = cur.value;
//       return acc;
//     }, {});

//     setInputValues((prev) => ({ ...prev, ...newInputValues }));
//   }, []);

//   // 모든 체크박스 상태가 업데이트 될 때마다 allChecked 상태를 업데이트
//   useEffect(() => {
//     updateAllCheckedState();
//   }, [checkboxStates]);

//   const handleCheckboxChange = (keyString: string) => {
//     setCheckboxStates((prev) => ({ ...prev, [keyString]: true }));
//   };

//   const updateAllCheckedState = () => {
//     const allChecked = Object.values(checkboxStates).every((state) => state);
//     setAllChecked(allChecked);
//   };

//   const router = useRouter();
//   // 다음 단계로 이동하는 함수
//   const handleNextStep = () => {
//     if (allChecked === false) {
//       alert("모든 체크박스를 클릭해주세요.");
//     } else {
//       router.push(`/bn_admin/list/${applicationId}/paper`);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen pt-16 overflow-auto justify-start items-start gap-4">
//       <p className="text-title-28 pt-10 pl-6 font-semibold">
//         Step 2/4. 자격 요건 체크
//       </p>
//       <div className="flex flex-col pl-8">
//         <InputForm1
//           inputValues={inputValues}
//           keyString={"사업자등록번호"}
//           isButton={true}
//           ButtonText={"조회"}
//         />

//         <p className="text-subTitle-20 font-bold pt-6 pb-2"> [면허 유효성] </p>

//         <div className="flex flex-col gap-2">
//           <div className="inline-flex gap-1">
//             <div className="bg-primary-neutral-100 rounded-s p-4">
//               <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
//               <div className="inline-flex">
//                 <InputForm2
//                   num={1}
//                   inputValues={inputValues}
//                   keyString={["보유면허1_업종", "보유면허1_등록번호"]}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
//               <div className="flex flex-col">
//                 <p className="text-subTitle-18 font-bold">파일</p>
//                 <div className="inline-flex gap-2">
//                   <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
//                     <p>면허파일 1</p>
//                   </button>
//                   <AdminStyleDropDown
//                     placeholder={"선택하셈"}
//                     handleCheckboxChange={handleCheckboxChange}
//                     keyString={"면허유효성11"}
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-subTitle-18 font-bold">키스콘API</p>
//                 <div className="inline-flex gap-2">
//                   <InputForm1
//                     inputValues={inputValues}
//                     keyString={"보유면허1_등록번호"}
//                     isButton={false}
//                   />
//                   <AdminStyleDropDown
//                     placeholder={"선택하셈"}
//                     dropdownItems={["유효 O", "유효 X"]}
//                     handleCheckboxChange={handleCheckboxChange}
//                     keyString={"면허유효성12"}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="inline-flex gap-1">
//             <div className="bg-primary-neutral-100 rounded-s p-4">
//               <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
//               <div className="inline-flex">
//                 <InputForm2
//                   num={2}
//                   inputValues={inputValues}
//                   keyString={["보유면허2_업종", "보유면허2_등록번호"]}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
//               <div className="flex flex-col">
//                 <p className="text-subTitle-18 font-bold">파일</p>
//                 <div className="inline-flex gap-2">
//                   <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
//                     <p>면허파일 2</p>
//                   </button>
//                   <AdminStyleDropDown
//                     placeholder={"선택하셈"}
//                     handleCheckboxChange={handleCheckboxChange}
//                     keyString={"면허유효성21"}
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-subTitle-18 font-bold">키스콘API</p>
//                 <div className="inline-flex gap-2">
//                   <InputForm1
//                     inputValues={inputValues}
//                     keyString={"보유면허2_등록번호"}
//                     isButton={false}
//                   />
//                   <AdminStyleDropDown
//                     placeholder={"선택하셈"}
//                     dropdownItems={["유효 O", "유효 X"]}
//                     handleCheckboxChange={handleCheckboxChange}
//                     keyString={"면허유효성22"}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="inline-flex gap-1">
//             <div className="bg-primary-neutral-100 rounded-s p-4">
//               <p className="text-subTitle-20 font-bold pb-2">OCR 값</p>
//               <div className="inline-flex">
//                 <InputForm2
//                   num={3}
//                   inputValues={inputValues}
//                   keyString={["보유면허3_업종", "보유면허3_등록번호"]}
//                 />
//               </div>
//             </div>

//             <div className="flex flex-col bg-primary-blue-100 rounded-s justify-between p-3.5">
//               <div className="flex flex-col">
//                 <p className="text-subTitle-18 font-bold">파일</p>
//                 <div className="inline-flex gap-2">
//                   <button className="btnStyle-textOnly-s w-[350px] bg-primary-neutral-200 hover:textColor-focus hover:underline">
//                     <p>면허파일 3</p>
//                   </button>
//                   <AdminStyleDropDown
//                     placeholder={"선택하셈"}
//                     handleCheckboxChange={handleCheckboxChange}
//                     keyString={"면허유효성31"}
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-col">
//                 <p className="text-subTitle-18 font-bold">키스콘API</p>
//                 <div className="inline-flex gap-2">
//                   <InputForm1
//                     inputValues={inputValues}
//                     keyString={"보유면허3_등록번호"}
//                     isButton={false}
//                   />
//                   <AdminStyleDropDown
//                     placeholder={"선택하셈"}
//                     dropdownItems={["유효 O", "유효 X"]}
//                     handleCheckboxChange={handleCheckboxChange}
//                     keyString={"면허유효성32"}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="inline-flex pr-12 justify-between">
//           <div className="flex flex-col">
//             <div className="pl-[160px] pt-6 w-[600px] inline-flex items-center justify-between">
//               <p className="pr-[50px]">API 조회값</p>
//               <p className="pl-[50px]">미달 여부</p>
//               <p className="pr-[60px]">미달 사유</p>
//             </div>
//             <div className="inline-flex pt-2 pb-6 items-center gap-2">
//               <p className="w-[150px] text-subTitle-20 font-bold">
//                 [제재 처분 이력]
//               </p>
//               <InputStyleBtn
//                 name={"제재처분이력"}
//                 type="text"
//                 value={inputValues["제재처분이력"]}
//                 isButton={false}
//               />
//               <AdminStyleDropDown
//                 placeholder={"선택하셈"}
//                 dropdownItems={["미달", "미달아님"]}
//                 handleCheckboxChange={handleCheckboxChange}
//                 keyString={"제재처분이력"}
//               />
//               <AdminStyleDropDown
//                 placeholder={"선택하셈"}
//                 width={"w-64"}
//                 dropdownItems={["미달사유1", "미달사유2", "미달사유3"]}
//                 handleCheckboxChange={handleCheckboxChange}
//                 keyString={"제재처분사유"}
//               />
//             </div>
//             <div className="inline-flex pb-6 items-center gap-2">
//               <p className="w-[150px] text-subTitle-20 font-bold">
//                 [사업자 상태]
//               </p>
//               <InputStyleBtn
//                 name={"사업자상태"}
//                 type="text"
//                 value={inputValues["사업자상태"]}
//                 isButton={false}
//               />
//               <AdminStyleDropDown
//                 placeholder={"선택하셈"}
//                 dropdownItems={["미달", "미달아님"]}
//                 handleCheckboxChange={handleCheckboxChange}
//                 keyString={"사업자상태"}
//               />
//               <AdminStyleDropDown
//                 placeholder={"선택하셈"}
//                 width={"w-64"}
//                 dropdownItems={["미달사유1", "미달사유2", "미달사유3"]}
//                 handleCheckboxChange={handleCheckboxChange}
//                 keyString={"사업자사유"}
//               />
//             </div>
//           </div>
//           <div className="flex fixed bottom-12 right-12 justify-end items-center">
//             <button
//               onClick={handleNextStep}
//               className="inline-flex btnSize-l bg-pink-500 hover:bg-pink-900 text-white rounded gap-2"
//             >
//               <Icon name="Cat" width="32" height="32" />
//               <p>다음으로~~!!</p>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
