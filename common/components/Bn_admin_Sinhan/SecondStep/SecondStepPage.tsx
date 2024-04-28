import React, { useState, useEffect } from "react";
import Input from "./Input";

interface MidalState {
  prerequisiteName: string;
  isPrerequisite: string;
  whyMidal: string;
}

export default function RequirementPage({
  Paper,
  setAllChecked,
  midalStates,
  setMidalStates,
  setAllPrerequisitesMet,
}: {
  Paper: any;
  setAllChecked: any;
  midalStates: MidalState[];
  setMidalStates: any;
  setAllPrerequisitesMet: any;
}) {
  const [checkboxStates, setCheckboxStates] = useState({
    면허보유여부: false,
    신용등급: false,
    영업기간: false,
    부정당업자: false,
  });

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
    setMidalStates((prev: any) => {
      const index = prev.findIndex(
        (state: any) => state.prerequisiteName === keyString
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
    setMidalStates((prev: any) => {
      const index = prev.findIndex(
        (state: any) => state.prerequisiteName === keyString
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

  return (
    <div>
      <div className="flex flex-col pt-20 justify-start items-start gap-3">
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
                  ? Paper[0].documentUrl
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
              midalItems={
                state.prerequisiteName === "면허보유여부"
                  ? ["미보유", "보유"]
                  : state.prerequisiteName === "신용등급"
                  ? ["B미만", "B이상"]
                  : state.prerequisiteName === "영업기간"
                  ? ["3년미만", "3년이상"]
                  : ["부정당업자", "아님"]
              }
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
    </div>
  );
}
