import InputStyleBtn from "../../InputForm/InputStyleBtn";
import React, {
  useState,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface InputValues {
  [key: string]: string;
}

interface InputForm1Props {
  inputValues?: InputValues;
  inputType?: string;
  scoreTableType?: string;
  setInputValues?: Dispatch<SetStateAction<InputValues>>;
  checkboxStates?: any;
  setCheckboxStates?: any;
  isString?: boolean;
  keyString: string;
  isButton: boolean;
  ButtonText?: string;
  placeholder?: string;
  width?: string;
  width2?: string;
}

const InputForm1: React.FC<InputForm1Props> = ({
  inputValues,
  inputType,
  scoreTableType,
  setInputValues,
  setCheckboxStates,
  isString = true,
  keyString,
  isButton,
  ButtonText,
  placeholder,
  width = "w-[350px]",
  width2 = "w-[150px]",
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // 입력 유효성 검사
  const validateInput = (value: string) => {
    if (inputType === "number" && isNaN(Number(value))) {
      setIsError(true);
      if (scoreTableType === "sigong") {
        setIsError(false);
      }
      setErrorMessage("숫자를 입력하세요");
    } else if (inputType === "text" && !isNaN(Number(value))) {
      setIsError(true);
      setErrorMessage("텍스트를 입력하세요");
    } else {
      setIsError(false);
    }
  };
  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name, value);
    if (setInputValues) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    if (setCheckboxStates) {
      setCheckboxStates((prevValues: any) => ({
        ...prevValues,
        [keyString]: !isError,
      }));
    }
  }, [isError]); // 의존성 배열에 isError를 포함

  return (
    <div className="flex justify-between items-center gap-3 p-2">
      <div className={`flex ${isString ? width : ""}  justify-between gap-2`}>
        {isString && (
          <p className="flex whitespace-nowrap justify-center items-center">
            {keyString}
          </p>
        )}
        <div className={width2}>
          <InputStyleBtn
            name={keyString}
            type="text"
            value={
              inputValues ? inputValues[keyString as keyof InputValues] : ""
            }
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

export default InputForm1;
