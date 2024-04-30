import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface Scores {
  categoryName: string;
  score: number;
}

interface ScoreInputFormProps {
  index: number;
  setInputValues?: Dispatch<SetStateAction<Scores[]>>;
  inputType?: string;
  checkboxStates?: any;
  setCheckboxStates?: any;
  isString?: boolean;
  keyString: string;
  CheckString: string;

  isButton: boolean;
  ButtonText?: string;
  placeholder?: string;
  width?: string;
}

const ScoreInputForm: React.FC<ScoreInputFormProps> = ({
  index,
  setInputValues,
  inputType,
  setCheckboxStates,
  isString = true,
  keyString,
  CheckString,

  isButton,
  ButtonText,
  placeholder,
  width = "w-[350px]",
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const parsedValue = parseInt(value, 10);
    const safeValue = parsedValue >= 0 ? parsedValue : 0;
    if (setInputValues) {
      setInputValues((prevScores) => {
        // 복사본을 만들어 점수를 업데이트합니다.
        const updatedScores: any = { ...prevScores };
        updatedScores[`applicationEvaluationDTOList[${index}].score`] =
          safeValue;
        return updatedScores;
      });
    }
    // if (setCheckboxStates) {
    //   setCheckboxStates((prevValues: any) => ({
    //     ...prevValues,
    //     [name]: !isError,
    //   }));
    // }
  };
  useEffect(() => {
    console.log("CheckString", CheckString);

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
