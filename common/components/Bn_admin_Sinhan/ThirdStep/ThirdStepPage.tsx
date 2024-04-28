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
    신용등급: false,
    현금흐름등급: false,
    부채비율: false,
    차입금의존도: false,
  });
  const inputFields1 = [
    { index: 1, keyString: "기술자수", placeholder: "입력하셈" },
    { index: 2, keyString: "회사설립경과년수", placeholder: "입력하셈" },
  ];
  const inputFields2 = [
    { index: 3, keyString: "신용등급", placeholder: "입력하셈" },
    { index: 4, keyString: "현금흐름등급", placeholder: "입력하셈" },
    { index: 5, keyString: "부채비율", placeholder: "입력하셈" },
    { index: 6, keyString: "차입금의존도", placeholder: "입력하셈" },
  ];
  const inputFields3 = [
    {
      index: 7,
      keyString: "직전년도시공능력평가액순위",
      placeholder: "입력하셈",
    },
    { index: 8, keyString: "최근3년간공사실적", placeholder: "입력하셈" },
  ];
  const inputFields4 = [
    { keyString: "면허명", width2: "w-[240px]" },
    { keyString: "시평액", placeholder: "입력하셈", width2: "w-[150px]" },
    {
      keyString: "시평액순위",
      placeholder: "입력하셈",
      width2: "w-[100px]",
    },
    {
      keyString: "시평액순위(%)",
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

  // console.log("checkboxStates", checkboxStates);

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
                      setInputValues={setScores}
                      isString={false}
                      keyString={field.keyString}
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
                        setInputValues={setScores}
                        isString={false}
                        keyString={field.keyString}
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
                      setInputValues={setScores}
                      isString={false}
                      keyString={field.keyString}
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
