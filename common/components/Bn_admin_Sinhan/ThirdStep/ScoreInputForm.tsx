import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface inputValues {
  [key: string]: string;
}

interface ScoreValues {
  [key: number | string]: number | undefined;
}

interface Scores {
  categoryName: string;
  score: number;
}

interface ScoreInputFormProps {
  index: number;
  inputValues: inputValues;
  setInputValues?: Dispatch<SetStateAction<Scores[]>>;
  inputType?: string;
  scoreTableType?: string;
  checkboxStates?: any;
  setCheckboxStates?: any;
  isString?: boolean;
  keyString: string;
  CheckString: string;
  scoreTable?: ScoreValues;
  isButton: boolean;
  ButtonText?: string;
  placeholder?: string;
  width?: string;
}

const ScoreInputForm: React.FC<ScoreInputFormProps> = ({
  index,
  inputValues,
  setInputValues,
  inputType,
  scoreTableType,
  scoreTable,
  setCheckboxStates,
  isString = true,
  keyString,
  CheckString,
  // scoreTable,
  isButton,
  ButtonText,
  placeholder,
  width = "w-[350px]",
}) => {
  const [calculatedValue, setCalculatedValue] = useState("");
  const [userInput, setUserInput] = useState(""); // 사용자 입력을 추적하는 상태
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInput(value);
  };

  useEffect(() => {
    if (setCheckboxStates) {
      setCheckboxStates((prevValues: any) => ({
        ...prevValues,
        [CheckString]: !isError,
      }));
    }
  }, [isError]); // 의존성 배열에 isError를 포함

  const validateInput = (value: string) => {
    if (inputType === "number" && isNaN(Number(value))) {
      setIsError(true);
      setErrorMessage("숫자 입력");
    } else {
      setIsError(false);
    }
  };
  useEffect(() => {
    if (!userInput && setInputValues) {
      setInputValues((prevScores) => {
        // 복사본을 만들어 점수를 업데이트합니다.
        const updatedScores: any = { ...prevScores };
        updatedScores[`applicationEvaluationDTOList[${index}].score`] =
          calculatedValue;
        return updatedScores;
      });
    } else if (userInput && setInputValues) {
      const parsedValue = parseInt(userInput, 10);
      const safeValue = parsedValue >= 0 ? parsedValue : "";
      setInputValues((prevScores) => {
        // 복사본을 만들어 점수를 업데이트합니다.
        const updatedScores: any = { ...prevScores };
        updatedScores[`applicationEvaluationDTOList[${index}].score`] =
          safeValue;
        return updatedScores;
      });
    }
  }, [userInput, calculatedValue]);

  useEffect(() => {
    if (!userInput && inputValues) {
      const value = Number(inputValues[keyString]);
      // console.log(keyString);
      // console.log(value);
      if (scoreTable) {
        if (scoreTableType === "number") {
          for (const [threshold, score] of Object.entries(scoreTable).sort(
            (a, b) => Number(b[0]) - Number(a[0])
          )) {
            if (value > Number(threshold)) {
              setCalculatedValue(`${score}`);
              break;
            } else if (inputValues[keyString] === "") {
              console.log(inputValues[keyString] === "");
              setCalculatedValue("");
            }
          }
        } else if (scoreTableType === "sigong") {
          if (inputValues[keyString] === "확인불가") {
            setCalculatedValue("0"); // "확인불가"인 경우 0점 할당
          } else {
            for (const [threshold, score] of Object.entries(scoreTable).sort(
              (a, b) => Number(b[0]) - Number(a[0])
            )) {
              if (value >= Number(threshold)) {
                setCalculatedValue(`${score}`);
                break;
              } else if (inputValues[keyString] === "") {
                setCalculatedValue("");
              }
            }
          }
        } else if (scoreTableType === "finance") {
          if (inputValues[keyString] === "") {
            setCalculatedValue("");
          } else {
            const rating = inputValues[keyString];
            const score = scoreTable[rating] || 0; // scoreTable에서 점수를 가져오고, 없는 경우 0점 처리
            setCalculatedValue(`${score}`);
            console.log("Rating:", rating, "Score:", score);
          }
        }
      }
    }
  }, [inputValues[keyString]]);
  // console.log("value", inputValues[keyString]);

  return (
    <div className="flex justify-between items-center gap-3 p-2">
      <div className={`flex ${isString ? width : ""}  justify-between gap-2`}>
        {isString && (
          <p className="flex whitespace-nowrap justify-center items-center">
            {keyString}
          </p>
        )}
        <div className="w-[80px]">
          <InputStyleBtn
            name={`applicationEvaluationDTOList[${index}].score`}
            type="text"
            value={userInput || calculatedValue}
            placeholder={placeholder}
            onChange={(event) => {
              handleInputChange(event);
              validateInput(event.target.value);
            }}
            isButton={isButton}
            buttonText={ButtonText}
            isDisabled={false}
            isError={isError}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreInputForm;
