import React, { useState, useEffect, ChangeEvent } from "react";
import InputForm1 from "./InputForm1";
import ScoreInputForm from "./ScoreInputForm";
import DocDetail from "../../DocDetail/DocDetail";

interface ApplicationEvaluation {
  id: number;
  score: number;
}

interface PerfectScores {
  [categoryName: string]: number;
}

interface RecruitmentGrade {
  id: number;
  category: string;
  perfectScore: number;
  upperCategoryENUM: string;
  applicationEvaluationList: ApplicationEvaluation[];
}

export default function RequirementPage({
  paper,
  recruitmentGrading,
  setScores,
  setAllChecked,
  inputValues,
  setInputValues,
}: {
  applicationId: string;
  paper: any;
  recruitmentGrading: RecruitmentGrade[];
  setScores: any;
  setAllChecked: any;
  inputValues: any;
  setInputValues: any;
}) {
  const [perfectScores, setPerfectScores] = useState<PerfectScores>({});

  const [checkboxStates, setCheckboxStates] = useState({
    면허명: true,
    기술자수: false,
    회사설립경과년수: false,
    신용등급: false,
    현금흐름등급: false,
    부채비율: false,
    차입금의존도: false,
    직전년도시공능력평가액순위: false,
    최근3년간공사실적: false,
    시평액: false,
    시평액순위: false,
    "시평액순위(%)": false,
    기술자수점수: false,
    회사설립경과년수점수: false,
    신용등급점수: false,
    현금흐름등급점수: false,
    부채비율점수: false,
    차입금의존도점수: false,
    직전년도시공능력평가액순위점수: false,
    최근3년간공사실적점수: false,
  });
  // console.log("checkboxStates", checkboxStates);

  const inputFields1 = [
    {
      index: 0,
      keyString: "기술자수",
      checkString: "기술자수점수",
      inputType: "number",
      scoreType: "number",
      scoreTable: { 5: 5, 4: 4, 3: 3, 2: 2, "-1": 1 },
      scoreTableType: "number",
      placeholder: "입력하셈",
    },
    {
      index: 1,
      keyString: "회사설립경과년수",
      checkString: "회사설립경과년수점수",
      inputType: "number",
      scoreType: "number",
      scoreTable: { 19: 5, 14: 4, 9: 3, 4: 2, 2: 1, "-1": 0 },
      scoreTableType: "number",
      placeholder: "입력하셈",
    },
  ];
  const inputFields2 = [
    {
      index: 2,
      keyString: "신용등급",
      checkString: "신용등급점수",
      inputType: "text",
      scoreType: "number",
      scoreTable: {
        AAA: 15,
        "AAA-": 15,
        "AAA+": 15,
        AA: 15,
        "AA-": 15,
        "AA+": 15,
        A: 15,
        "A-": 15,
        "A+": 15,
        "BBB+": 15,
        BBB: 12,
        "BBB-": 12,
        BB: 9,
        "BB+": 9,
        "BB-": 6,
        "B+": 6,
        B: 3,
        "B-": 3,
        CCC: 0,
        "CCC-": 0,
        "CCC+": 0,
        CC: 0,
        "CC-": 0,
        "CC+": 0,
        C: 0,
        "C-": 0,
        "C+": 0,
        D: 0,
        "D-": 0,
        "D+": 0,
        NR: 0,
      },
      scoreTableType: "finance",
      perfectScore: "신용평가등급",
      placeholder: "입력하셈",
    },
    {
      index: 3,
      keyString: "현금흐름등급",
      checkString: "현금흐름등급점수",
      inputType: "text",
      scoreType: "number",
      scoreTable: {
        A: 15,
        B: 11,
        "C+": 7,
        "C-": 3,
        D: 0,
        E: 0,
        NF: 0,
        NR: 0,
      },
      scoreTableType: "finance",
      placeholder: "입력하셈",
    },
    {
      index: 4,
      keyString: "부채비율",
      checkString: "부채비율점수",
      inputType: "number",
      scoreType: "number",
      scoreTable: { 0: 10, 50: 8, 100: 6, 150: 4, 200: 0 },
      scoreTableType: "number",
      placeholder: "입력하셈",
    },
    {
      index: 5,
      keyString: "차입금의존도",
      checkString: "차입금의존도점수",
      inputType: "number",
      scoreType: "number",
      scoreTable: { "-1": 10, 5: 8, 10: 6, 20: 4, 30: 2 },
      scoreTableType: "number",
      placeholder: "입력하셈",
    },
  ];
  const inputFields3 = [
    {
      index: 6,
      keyString: "직전년도시공능력평가액순위",
      checkString: "직전년도시공능력평가액순위점수",
      inputType: "number",
      scoreType: "number",
      scoreTable: { 100: 0, 40: 4, 30: 8, 20: 12, 10: 16, 0: 20 },
      scoreTableType: "number",
      placeholder: "입력하셈",
    },
    {
      index: 7,
      keyString: "최근3년간공사실적",
      checkString: "최근3년간공사실적점수",
      inputType: "number",
      scoreType: "number",
      scoreTable: { 3: 20, 2: 16, 1.5: 12, 1: 8, 0: 4, 확인불가: 0 },
      scoreTableType: "sigong",
      placeholder: "입력하셈",
    },
  ];
  const inputFields4 = [
    { keyString: "면허명", width2: "w-[240px]" },
    {
      keyString: "시평액",
      inputType: "number",
      scoreType: "number",
      placeholder: "입력하셈",
      width2: "w-[150px]",
    },
    {
      keyString: "시평액순위",
      inputType: "number",
      scoreType: "number",
      placeholder: "입력하셈",
      width2: "w-[100px]",
    },
    {
      keyString: "시평액순위(%)",
      inputType: "number",
      scoreType: "number",
      placeholder: "입력하셈",
      width2: "w-[100px]",
    },
  ];

  useEffect(() => {
    updateAllCheckedState();
  }, [checkboxStates]);

  const updateAllCheckedState = () => {
    const allChecked = Object.values(checkboxStates).every((state) => state);
    setAllChecked(allChecked);
  };

  useEffect(() => {
    // Mapping over recruitmentGrading to initialize scores with category names and zero scores
    let initialScores: any = {};
    recruitmentGrading?.forEach((grade, index) => {
      initialScores[`applicationEvaluationDTOList[${index}].categoryName`] =
        grade.category;
      initialScores[`applicationEvaluationDTOList[${index}].score`] = 0; // 초기 점수를 0으로 설정
    });

    const initialPerfectScores: PerfectScores = {};
    recruitmentGrading?.forEach((grade) => {
      initialPerfectScores[grade.category] = grade.perfectScore;
    });

    setScores(initialScores);
    setPerfectScores(initialPerfectScores);
  }, [recruitmentGrading]);

  // const calculateTotalScore = () => {
  //   return scores.reduce((sum, score) => sum + score.score, 0);
  // // };

  return (
    <div className="flex flex-col h-screen w-full pt-28 overflow-auto justify-start items-start gap-8">
      <div className="flex w-full">
        <div>
          <div className="flex-col justify-center bg-primary-neutral-100 gap-2">
            <div className="h-14 whitespace-nowrap bgColor-white p-xl textColor-mid-emphasis text-Subtitle-20 font-medium border-t border-r borderColor">
              경영일반
            </div>

            <div className="flex-col p-xl border-t borderColor">
              {inputFields1.map((field) => (
                <div key={field.keyString} className="flex gap-4">
                  <InputForm1
                    width="w-[350px]"
                    inputValues={inputValues}
                    inputType={field.inputType}
                    setInputValues={setInputValues}
                    checkboxStates={checkboxStates}
                    setCheckboxStates={setCheckboxStates}
                    keyString={field.keyString}
                    isButton={false}
                    placeholder={field.placeholder}
                  />
                  <div className="flex gap-2 items-center">
                    <ScoreInputForm
                      index={field.index}
                      inputValues={inputValues}
                      setInputValues={setScores}
                      inputType={field.scoreType}
                      scoreTable={field.scoreTable}
                      scoreTableType={field.scoreTableType}
                      checkboxStates={checkboxStates}
                      setCheckboxStates={setCheckboxStates}
                      isString={false}
                      keyString={field.keyString}
                      CheckString={field.checkString}
                      isButton={false}
                      placeholder={"점수"}
                    />
                    <div className="flex justify-start items-center">
                      {`(${perfectScores[field.keyString] ?? "N/A"})`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex-col justify-center bg-primary-neutral-100 gap-2">
              <div className="h-14 whitespace-nowrap bgColor-white p-xl textColor-mid-emphasis text-Subtitle-20 font-medium border-t border-r borderColor">
                재무정보
              </div>

              <div className="flex-col p-xl border-t borderColor">
                {inputFields2.map((field) => (
                  <div key={field.keyString} className="flex gap-4">
                    <InputForm1
                      width="w-[350px]"
                      inputValues={inputValues}
                      inputType={field.inputType}
                      setInputValues={setInputValues}
                      checkboxStates={checkboxStates}
                      setCheckboxStates={setCheckboxStates}
                      keyString={field.keyString}
                      isButton={false}
                      placeholder={field.placeholder}
                    />
                    <div className="flex gap-2 items-center">
                      <ScoreInputForm
                        index={field.index}
                        inputValues={inputValues}
                        setInputValues={setScores}
                        checkboxStates={checkboxStates}
                        setCheckboxStates={setCheckboxStates}
                        inputType={field.scoreType}
                        scoreTable={field.scoreTable}
                        scoreTableType={field.scoreTableType}
                        isString={false}
                        keyString={field.keyString}
                        CheckString={field.checkString}
                        isButton={false}
                        placeholder={"점수"}
                      />
                      <div className="flex justify-start items-center">
                        {typeof field.keyString === "string" &&
                        field.keyString !== "신용등급"
                          ? `(${perfectScores[field.keyString] ?? "N/A"})`
                          : typeof field.perfectScore === "string"
                          ? `(${perfectScores[field.perfectScore] ?? "N/A"})`
                          : "N/A"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-col justify-center bg-primary-neutral-100 gap-2">
            <div className="h-14 whitespace-nowrap bgColor-white p-xl textColor-mid-emphasis text-Subtitle-20 font-medium border-t border-r borderColor">
              실적정보
            </div>

            <div className="flex-col p-xl border-t borderColor">
              {inputFields3.map((field) => (
                <div key={field.keyString} className="flex gap-4">
                  <InputForm1
                    width="w-[350px]"
                    inputValues={inputValues}
                    inputType={field.inputType}
                    scoreTableType={field.scoreTableType}
                    setInputValues={setInputValues}
                    checkboxStates={checkboxStates}
                    setCheckboxStates={setCheckboxStates}
                    keyString={field.keyString}
                    isButton={false}
                    placeholder={field.placeholder}
                  />
                  <div className="flex gap-2 items-center">
                    <ScoreInputForm
                      index={field.index}
                      inputValues={inputValues}
                      setInputValues={setScores}
                      inputType={field.scoreType}
                      scoreTable={field.scoreTable}
                      scoreTableType={field.scoreTableType}
                      checkboxStates={checkboxStates}
                      setCheckboxStates={setCheckboxStates}
                      isString={false}
                      keyString={field.keyString}
                      CheckString={field.checkString}
                      isButton={false}
                      placeholder={"점수"}
                    />
                    <div className="flex justify-start items-center">
                      {`(${perfectScores[field.keyString] ?? "N/A"})`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DocDetail documentList={paper} isTab={false} />
      </div>
      <div className="flex bgColor-neutral rounded-s justify-between p-3.5">
        {inputFields4.map((field) => (
          <div key={field.keyString} className="flex gap-4">
            <InputForm1
              width=""
              width2={field.width2}
              inputValues={inputValues}
              inputType={field.inputType}
              setInputValues={setInputValues}
              checkboxStates={checkboxStates}
              setCheckboxStates={setCheckboxStates}
              keyString={field.keyString}
              isButton={false}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
