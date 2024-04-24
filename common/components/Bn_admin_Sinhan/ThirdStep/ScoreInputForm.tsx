import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";

interface Scores {
  categoryName: string;
  score: number;
}

interface ScoreInputFormProps {
  index: number;
  setInputValues?: Dispatch<SetStateAction<Scores[]>>;
  checkboxStates?: any;
  setCheckboxStates?: any;
  isString?: boolean;
  keyString: string;
  isButton: boolean;
  ButtonText?: string;
  placeholder?: string;
  width?: string;
}

const ScoreInputForm: React.FC<ScoreInputFormProps> = ({
  index,
  setInputValues,
  setCheckboxStates,
  isString = true,
  keyString,
  isButton,
  ButtonText,
  placeholder,
  width = "w-[350px]",
}) => {
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
    if (setCheckboxStates) {
      setCheckboxStates((prevValues: any) => ({
        ...prevValues,
        [name]: true,
      }));
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
            type="number"
            placeholder={placeholder}
            onChange={handleInputChange}
            isButton={isButton}
            buttonText={ButtonText}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreInputForm;
