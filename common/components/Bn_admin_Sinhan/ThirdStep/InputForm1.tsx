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

interface isError {
  [key: string]: boolean;
}

interface InputForm1Props {
  inputValues: InputValues;
  inputType?: string;
  scoreTableType?: string;
  setInputValues?: Dispatch<SetStateAction<InputValues>>;
  checkboxStates?: any;
  setCheckboxStates?: any;
  isError: isError;
  setIsError?: Dispatch<SetStateAction<isError>>;
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
  isError,
  setIsError,
  isString = true,
  keyString,
  isButton,
  ButtonText,
  placeholder,
  width = "w-[350px]",
  width2 = "w-[150px]",
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  // 입력 유효성 검사
  const validateInput = (keyString: string, value: string) => {
    if (isError) {
      if (inputType === "number" && isNaN(Number(value))) {
        handleErrorChange(keyString, true);
        setErrorMessage("숫자를 입력하세요");
      } else if (inputType === "text" && !isNaN(Number(value))) {
        handleErrorChange(keyString, true);
        setErrorMessage("텍스트를 입력하세요");
      } else {
        handleErrorChange(keyString, false);
      }
    }
  };

  const handleErrorChange = (keyString: string, value: boolean) => {
    // console.log(name, value);
    if (setIsError) {
      setIsError((prevValues) => ({
        ...prevValues,
        [keyString]: value,
      }));
    }
  };

  // 입력 필드 값 변경을 처리하는 함수
  const handleInputChange = (
    keyString: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    // console.log(name, value);
    if (setInputValues) {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
    if (setCheckboxStates) {
      setCheckboxStates((prevValues: any) => ({
        ...prevValues,
        [keyString]: true,
      }));
    }
  };

  // console.log("isError", isError);

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
              handleInputChange(keyString, event);
              validateInput(keyString, event.target.value);
            }}
            isButton={isButton}
            buttonText={ButtonText}
            isDisabled={false}
            isError={isError[keyString]}
            errorMessage={errorMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default InputForm1;
